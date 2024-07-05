from flask import render_template, request, jsonify
from app import app
import copy
import taxopy

database_dir = "."
taxdb = taxopy.TaxDb(nodes_dmp=database_dir + "/nodes.dmp",
                     names_dmp=database_dir + "/names.dmp",
                     merged_dmp=database_dir + "/merged.dmp",
                     keep_files=True)
rankPatternFull = ["root", "superkingdom", "kingdom", "subkingdom", "superphylum", "phylum", "subphylum", "superclass", "class", "subclass", "superorder", "order", "suborder", "superfamily", "family", "subfamily", "supergenus", "genus", "subgenus", "superspecies", "species"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/load_tsv_data', methods=["POST"])
def load_tsv_data():
    if request.method == 'POST':
        file = request.files['file'].read()
        file_lines = (file.decode("utf-8")[:-1]).split("\n")
        header_line = file_lines[0]
        lines = file_lines[1:]
        
        raw_tax_set, raw_lns, e_value_enabled, fasta_enabled = calc_raw_tax_set(lines)
        tax_set, lns = calc_tax_set(raw_tax_set, raw_lns, e_value_enabled, fasta_enabled)
        lns = sort_n_uniquify(lns)
        tax_set = correct_tot_counts(lns, tax_set)
        for key,value in tax_set.items():
            print(key)
            print(value)
            print('\n')

        return jsonify({"lns": lns, "taxSet": tax_set, "eValueEnabled": e_value_enabled, "fastaEnabled": fasta_enabled, "rankPatternFull": rankPatternFull})


def calc_raw_tax_set(lines):
    raw_tax_set = {"root root": {"taxID": "1", 
                                "rawCount": 0, 
                                "totCount": 0, 
                                #"lineageNames": [["root", "root"]], 
                                "rank": "root", 
                                "names": [["root root", -1]], 
                                "geneNames": [], 
                                "eValues": [], 
                                "fastaHeaders": [], 
                                "children": []}}
    id_set = {"1": "root root"}
    id_sum = 0
    raw_lns = [[["root", "root"]]]
    for line in lines:
        line2list = line.split("\t")
        line2list = [item.replace("\r","") for item in line2list]
        gene_name = line2list[0]
        taxID = line2list[1]

        e_value_enabled = False
        if len(line2list) >= 3:
            e_value = line2list[2]
            e_value_enabled = True

        fasta_enabled = False
        if len(line2list) >= 4:
            fasta_header = line2list[3]
            fasta_enabled = True

        if taxID == "NA" or taxID == "":
            taxID = "1"

        if not (taxID in id_set):
            id_sum += int(taxID)
            taxon = taxopy.Taxon(int(taxID), taxdb)
            name = taxon.name
            rank = taxon.rank
            lineageNamesList = taxon.rank_name_dictionary
            dictlist = [["root", "root"]] + [[k,v] for k,v in lineageNamesList.items()][::-1]
            if not (dictlist[-1][0] == rank and dictlist[-1][1] == name):
                dictlist += [[rank, name]]
            raw_tax_set[name + " " + rank] = {"taxID": taxID, 
                                              #"lineageNames": dictlist, 
                                              "rawCount": 1, 
                                              "rank": rank, 
                                              "totCount": 1, 
                                              "names": [[name + " " + rank, 0]], 
                                              "geneNames": [gene_name], 
                                              "children": []}
            
            if e_value_enabled:
                if e_value != "":
                    raw_tax_set[name + " " + rank]["eValues"] = [float(e_value)]
                else:
                    raw_tax_set[name + " " + rank]["eValues"] = [None]

            if fasta_enabled:    
                if fasta_header != "":
                    raw_tax_set[name + " " + rank]["fastaHeaders"] = [fasta_header]
                else:
                    raw_tax_set[name + " " + rank]["fastaHeaders"] = [None]

            id_set[taxID] = name + " " + rank
            raw_lns.append(dictlist)
        else:
            raw_tax_set[id_set[taxID]]["totCount"] += 1
            raw_tax_set[id_set[taxID]]["rawCount"] += 1
            raw_tax_set[id_set[taxID]]["geneNames"].append(gene_name)
            raw_tax_set[id_set[taxID]]["names"][0][1] += 1

            if e_value_enabled:
                if e_value != "":
                    raw_tax_set[id_set[taxID]]["eValues"].append(float(e_value))
                else:
                    raw_tax_set[id_set[taxID]]["eValues"].append(None)

            if fasta_enabled:
                if fasta_header != "":
                    raw_tax_set[id_set[taxID]]["fastaHeaders"].append(fasta_header)
                else:
                    raw_tax_set[id_set[taxID]]["fastaHeaders"].append(None)
    return raw_tax_set, raw_lns, e_value_enabled, fasta_enabled

def calc_tax_set(raw_tax_set, raw_lns, e_value_enabled, fasta_enabled):
    existent = {}
    deleted ={}
    created = {}
    lns = copy.deepcopy(raw_lns)

    for i in reversed(range(0, len(raw_lns))):
        ln = raw_lns[i]

        inherited_taxon = ""
        inherited_unaCount = 0
        inherited_geneNames = []

        if e_value_enabled:
            inherited_eValues = []
        if fasta_enabled:
            inherited_fastaHeaders = []

        for j in reversed(range(0, len(ln))):
            name = ln[j][1]
            rank = ln[j][0]
            taxon = name + " " + rank

            if rank in rankPatternFull:
                if taxon in raw_tax_set:
                    if not (taxon in existent):
                        existent[taxon] = raw_tax_set[taxon]
                        existent[taxon]["unaCount"] = raw_tax_set[taxon]["rawCount"]
                    if inherited_unaCount > 0:
                        existent[taxon]["unaCount"] += inherited_unaCount
                        existent[taxon]["totCount"] += inherited_unaCount
                        existent[taxon]["geneNames"] += inherited_geneNames
                        existent[taxon]["names"] += [[inherited_taxon, existent[taxon]["names"][-1][1] + inherited_unaCount]]
                        if e_value_enabled:
                            existent[taxon]["eValues"] += inherited_eValues
                            inherited_eValues = []
                        if fasta_enabled:
                            existent[taxon]["fastaHeaders"] += inherited_fastaHeaders
                            inherited_fastaHeaders = []
                        inherited_taxon = ""
                        inherited_geneNames = []
                        inherited_unaCount = 0
                else:
                    if not (taxon in created):
                        created[taxon] = {"taxID": "", 
                                          "children": [],
                                          "unaCount": 0, 
                                          "rawCount": 0, 
                                          "totCount": 0,
                                          "rank": rank, 
                                          "names": [[taxon, -1]], 
                                          "geneNames": []
                        }
                        if fasta_enabled:
                            created[taxon]["eValues"] = []
                        if fasta_enabled:
                            created[taxon]["fastaHeaders"] = []
                    if inherited_unaCount > 0:
                        created[taxon]["unaCount"] += inherited_unaCount
                        created[taxon]["totCount"] += inherited_unaCount
                        created[taxon]["geneNames"] += inherited_geneNames
                        created[taxon]["names"] += [[inherited_taxon, created[taxon]["names"][-1][1] + inherited_unaCount]]
                        if e_value_enabled:
                            created[taxon]["eValues"] += inherited_eValues
                            inherited_eValues = []
                        if fasta_enabled:
                            created[taxon]["fastaHeaders"] += inherited_fastaHeaders
                            inherited_fastaHeaders = []
                        inherited_taxon = ""
                        inherited_geneNames = []
                        inherited_unaCount = 0
            else:
                if j == len(ln) - 1:
                    deleted[taxon] = raw_tax_set[taxon]
                    inherited_taxon = taxon
                    inherited_geneNames = raw_tax_set[taxon]["geneNames"]
                    inherited_unaCount = raw_tax_set[taxon]["rawCount"]
                    if e_value_enabled:
                        inherited_eValues = raw_tax_set[taxon]["eValues"]
                    if fasta_enabled:
                        inherited_fastaHeaders = raw_tax_set[taxon]["fastaHeaders"]
                    lns[i] = lns[i][:j]
                else:
                    lns[i] = lns[i][:j] + lns[i][(j+1):]

    tax_set = {**created, **existent}

    return tax_set, lns

def sort_n_uniquify(lns):
    lns.sort(key=sort_func)

    newlns = copy.deepcopy(lns)
    for i in reversed(range(1, len(lns))):
        if (newlns[i] == newlns[i-1]):
            newlns = newlns[:i] + newlns[i+1:]

    return newlns

def sort_func(ln):
    return ln[-1][1]

def correct_tot_counts(lns, tax_set):
    for i in range(0, len(lns)):
        child = lns[i][-1][1] + " " + lns[i][-1][0]
        for j in reversed(range(0, len(lns[i]) - 1)):
            next_name = lns[i][j+1][1]
            next_rank = lns[i][j+1][0]
            next_taxon = next_name + " " + next_rank
            own_name = lns[i][j][1]
            own_rank = lns[i][j][0]
            own_taxon = own_name + " " + own_rank
            tax_set[own_taxon]["totCount"] += tax_set[next_taxon]["totCount"]
            tax_set[own_taxon]["children"] += [child]
    return tax_set

@app.route('/fetchID', methods = ['GET'])
def fetchID():
    print("taxName for fetching ID: ", request.args["taxName"])
    taxid = taxopy.taxid_from_name(request.args["taxName"], taxdb)
    #taxid = ""
    return jsonify({"taxID": taxid[0]})
