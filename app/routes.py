from flask import render_template, url_for, request, jsonify, redirect
from app import app
import taxopy
import csv

taxdb = None

def flatten(l):
    return [item for sublist in l for item in sublist]

def get_count(key):
    return key["count"]

@app.route('/')
def loading_database():
    global taxdb
    taxdb = taxopy.TaxDb()
    return redirect(url_for("index"))

@app.route('/index')
def index():
    print("At index")
    return render_template('index.html')

@app.route('/load_tsv_data')
def load_tsv_data():
    path = request.args["tsv_path"]
    with open(path) as file:
        tsv_file = csv.reader(file, delimiter="\t", quotechar='"')
        taxIDList = [line[1] for line in tsv_file]
    del taxIDList[0]
    taxIDListUnique = list(dict.fromkeys(taxIDList))
    taxDict = {}
    for taxID in taxIDListUnique:
        if taxID == "NA":
            taxDict["unidentifiedTaxa"] = {"taxID": "NA", "lineageNames": [["no rank", "unidentifiedTaxa"]], "unassignedCount": taxIDList.count("NA"), "rank": "no rank", "totalCount": taxIDList.count("NA")}
        else:
            taxon = taxopy.Taxon(int(taxID), taxdb)
            name = taxon.name
            rank = taxon.rank
            lineageNamesList = taxon.rank_name_dictionary
            dictlist = [[k,v] for k,v in lineageNamesList.items()][::-1]
            taxDict[name] = {"taxID": taxID, "lineageNames": dictlist, "unassignedCount": taxIDList.count(taxID), "rank": rank, "totalCount": taxIDList.count(taxID)}
            if not (name in flatten(taxDict[name]["lineageNames"])):
                taxDict[name]["lineageNames"].append([rank, name])
            print("Done!")
    for taxon in taxDict.keys():
        subtaxa_counts = [taxDict[other_taxon]["unassignedCount"] for other_taxon in taxDict.keys() if taxon in flatten(taxDict[other_taxon]["lineageNames"])]
        taxDict[taxon]["totalCount"] = sum(subtaxa_counts)
        print(taxon, subtaxa_counts)
    taxDict["unidentifiedTaxa"]["totalCount"] = taxIDList.count("NA")

    return jsonify({"taxDict": taxDict})

@app.route('/get_tax_data')
def get_tax_data():
    print("request.method: ", request.args["taxID"])
    taxon = taxopy.Taxon(int(request.args["taxID"]), taxdb)
    lineageNamesList = taxon.name_lineage[::-1][2:]
    lineageRanksList = list(map(get_rank, lineageNamesList))
    for i in reversed(range(0, len(lineageRanksList))):
        if lineageRanksList[i] == "clade":
            del lineageRanksList[i]
            del lineageNamesList[i]
    return jsonify({"name": taxon.name, "lineageNames": lineageNamesList, "lineageRanks": lineageRanksList})