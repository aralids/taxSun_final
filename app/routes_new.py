from flask import render_template, request, jsonify
from app import app
import taxopy
import csv
import json
import copy
from werkzeug.utils import secure_filename

taxdb = None
taxdb = taxopy.TaxDb()

def flatten(l):
    return [item for sublist in l for item in sublist]

def get_count(key):
    return key["count"]

# previously @app.route('/index')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/load_tsv_data', methods=["POST", "GET"])
def load_tsv_data():
    rankPatternFull = ["root", "superkingdom", "kingdom", "subkingdom", "superphylum", "phylum", "subphylum", "superclass", "class", "subclass", "superorder", "order", "suborder", "superfamily", "family", "subfamily", "supergenus", "genus", "subgenus", "superspecies", "species"]
    allTaxaReduced = {"root": {"taxID": "1", "rank": "root", "unassignedCount": 0, "totalCount": 0, "lineageNames": [["root", "root"]], "descendants": [], "names": [["root", -1]], "geneNames": [], "eValues": [], "fastaHeaders": []}}
    idDict = {1: "root"}
    taxID_sum = 84

    if request.method == 'POST':
        f = request.files['file'].read()
        whole_file = (f.decode("utf-8")[:-1]).split("\n")
        first_line = whole_file[0]
        tsv_file = whole_file[1:]
        e_value_included = "bh_evalue" in first_line
        fasta_header_included = "fasta_header" in first_line

        if e_value_included and fasta_header_included:
            for line in tsv_file:
                line2list = line.split("\t")
                line2list = [item.replace("\r","") for item in line2list]
                gene_name = line2list[0]
                taxID = line2list[1]
                e_value = line2list[2]
                fasta_header = line2list[3]

                if not (taxID in idDict):
                    taxon = taxopy.Taxon(int(taxID), taxdb)
                    name = taxon.name
                    rank = taxon.rank
                    lineageNamesList = taxon.rank_name_dictionary

                    lst = list(lineageNamesList.items())
                    lst.reverse()
                    descendant = name
                    for r, n in lineageNamesList.items():
                        if r in rankPatternFull:
                            if r == rank and n == name:
                                allTaxaReduced[name + " " + rank] = {"taxID": taxID, "rank": rank, "unassignedCount": 1, "totalCount": 1,
                                                                    "lineageNames": [["root", "root"]] + lst, "descendants": [],
                                                                    "names": [n], "geneNames": [gene_name], "eValues": [e_value],
                                                                    "fastaHeaders": [fasta_header]}
                            else:
                                allTaxaReduced[n + " " + r]["unassignedCount"] += 1
                                allTaxaReduced[n + " " + r]["totalCount"] += 1
                                if descendant == None:
                                    descendant = n
                                else:
                                    allTaxaReduced[name + " " + rank]["descendants"].append(descendant)
                                    allTaxaReduced[name + " " + rank]["names"].append(descendant)
                

        if e_value_included:
            median = 1
    

    lineagesFull = []
    for taxName in list(filter(lambda item: (allTaxaReduced[item]["unassignedCount"] != 0), list(allTaxaReduced.keys()))):
        lineagesFull.append(list(map(lambda item: item[1] + "_*_" + item[0], allTaxaReduced[taxName]["lineageNames"])))
    lineagesFull.sort()

    lineagesNames = []
    lineagesRanks = []
    for lineage in lineagesFull:
        lineageNames = list(map(lambda item: item.split("_*_")[0], lineage))
        lineageRanks = list(map(lambda item: item.split("_*_")[1], lineage))
        lineagesNames.append(lineageNames)
        lineagesRanks.append(lineageRanks)

    return jsonify({"lineagesNames": lineagesNames, "lineagesRanks": lineagesRanks, "allTaxaReduced": allTaxaReduced, "rankPatternFull": rankPatternFull, "allTaxa": taxDict, "offset": offset, "median": median, "fastaHeaderIncluded": fasta_header_included})

@app.route('/load_fasta_data', methods=["POST", "GET"])
def load_fasta_data():
    f = request.files['fasta-file'].read()
    fasta_file = (f.decode("utf-8")[:-1]).split(">")
    dict = {}
    for seq in fasta_file:
        seq2list = seq.split("\n")
        if len(seq2list) > 1:
            seq_name = seq2list[0]
            seq_body = seq2list[1].replace("*", "")
            dict[seq_name] = seq_body
    return jsonify({"headerSeqObject": dict})
   
def sum_to_2dig(sum_str, start=0, end=2):
    if start == len(sum_str):
        return 0
    elif end-1 == len(sum_str):
        return int(sum_str[start])
    else:
        sum = int(sum_str[start:end]) + sum_to_2dig(sum_str, start+2, end+2)
        if sum > 100:
            return sum_to_2dig(str(sum))
        else:
            return sum 
        
@app.route('/fetchID', methods = ['GET'])
def fetchID():
    print("taxName for fetching ID: ", request.args["taxName"])
    taxid = taxopy.taxid_from_name(request.args["taxName"], taxdb)
    return jsonify({"taxID": taxid[0]})

def read_line(line, taxDict, tempDict, taxID_sum, allEvals, e_value_included, fasta_header_included):
    line2list = line.split("\t")
    line2list = [item.replace("\r","") for item in line2list]
    gene_name = line2list[0]
    taxID = line2list[1]
    if e_value_included:
        e_value = line2list[2]
    if fasta_header_included:
        fasta_header = line2list[3]
    if taxID == "NA" or taxID == "":
        taxID = "1"

    # taxID lineageNames unassignedCount rank totalCount names geneNames descendants [eValues, [fastaHeaders]]

    if not (taxID in tempDict):
        taxID_sum += int(taxID)
        taxon = taxopy.Taxon(int(taxID), taxdb)
        name = taxon.name
        rank = taxon.rank
        lineageNamesList = taxon.rank_name_dictionary
        dictlist = []

        prevRank = None
        for r, n in lineageNamesList.items():
            # Make sure no rank comes up twice in a lineage
            if prevRank == r: 
                continue
            
            dictlist = [[r, n]] + dictlist
            prevRank = r

        if name in taxDict:
            name += " 1"
        taxDict[name] = {"taxID": taxID, "lineageNames": dictlist, "unassignedCount": 1, "rank": rank, "totalCount": 1, "names": [[name, 0]], "geneNames": [gene_name], "descendants": []}
        
        if e_value_included:
            if e_value != "":
                taxDict[name]["eValues"] = [float(e_value)]
                allEvals.append(float(e_value))
            else:
                taxDict[name]["eValues"] = [None]
            
        if fasta_header_included:
            if fasta_header != "":
                taxDict[name]["fastaHeaders"] = [fasta_header]
            else:
                taxDict[name]["fastaHeaders"] = [None]

        if len(dictlist) == 0 or not name in dictlist[-1]:
            taxDict[name]["lineageNames"].append([rank, name])
        tempDict[taxID] = name
    else:
        taxDict[tempDict[taxID]]["totalCount"] += 1
        taxDict[tempDict[taxID]]["unassignedCount"] += 1
        taxDict[tempDict[taxID]]["geneNames"].append(gene_name)
        taxDict[tempDict[taxID]]["names"][0][1] += 1

        if e_value_included:
            if e_value != "":
                taxDict[tempDict[taxID]]["eValues"].append(float(e_value))
                allEvals.append(float(e_value))
            else:
                taxDict[tempDict[taxID]]["eValues"].append(None)

        if fasta_header_included:
            if fasta_header != "":
                taxDict[tempDict[taxID]]["fastaHeaders"].append(fasta_header)
            else:
                taxDict[tempDict[taxID]]["fastaHeaders"].append(None)
    return taxDict, tempDict, taxID_sum, allEvals