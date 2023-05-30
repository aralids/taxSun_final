from flask import render_template, url_for, request, jsonify, redirect
from app import app
import taxopy
import csv
from flask_redmail import RedMail
import json
import copy
from werkzeug.utils import secure_filename



@app.route("/send-email", methods=['GET', 'POST'])
def send_email():
    email = RedMail()
    url = '"' + str(request.form["url"]) + '"'
    
    print("state", json.loads(request.form["currentState"])["root"], json.loads(request.form["currentState"])["layer"], json.loads(request.form["currentState"])["collapse"])
    state = json.loads(request.form["currentState"])
    colors = state["colors"]
    root = state["root"]
    layer = state["layer"]
    collapse = state["collapse"]
    structure_by_taxon = state["structureByTaxon"]
    email.send(
        subject="Colors & Corrections",
        receivers=["dilara.sarach@abv.bg"],
        html="""
            <h1>Colors & Corrections</h1>
            <img width="700px" src=""" + url + """/>
            <p><b>colors:</b> <style='color: bluel'>""" + " ".join(colors) + """</style> </p>
            <p><b>root:</b> """ + root + """ </p>
            <p><b>layer:</b> """ + str(layer) + """ </p>
            <p><b>collapse:</b> """ + str(collapse) + """ </p>
            <p><b>structure_by_taxon:</b> """ + '<br/>'.join([f'{key}: {value}' for key, value in structure_by_taxon.items()]) + """ </p>

        """
    )
    return jsonify()

taxdb = None
taxdb = taxopy.TaxDb()

def flatten(l):
    return [item for sublist in l for item in sublist]

def get_count(key):
    return key["count"]

'''
@app.route('/')
def loading_database():
    global taxdb
    taxdb = taxopy.TaxDb()
    return redirect(url_for("index"))
'''

# previously @app.route('/index')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/load_tsv_data', methods=["POST", "GET"])
def load_tsv_data():
    if request.method == 'GET':
        print("Here ", request.args)
        path = request.args["tsv_path"]
        with open(path) as file:
            tsv_file = csv.reader(file, delimiter="\t", quotechar='"')
            taxIDList = [line[1] for line in tsv_file]
    elif request.method == 'POST':
        f = request.files['file'].read()
        tsv_file = f.decode("utf-8")[:-1]
        taxIDList = [line.split("\t")[1] for line in tsv_file.split("\n")]
    del taxIDList[0]
    taxIDListUnique = list(dict.fromkeys(taxIDList))
    taxDict = {}
    for taxID in taxIDListUnique:
        if taxID == "NA" or taxID == '':
            taxDict["root"] = {"taxID": "NA", "lineageNames": [["root", "root"]], "unassignedCount": taxIDList.count("NA"), "rank": "root", "totalCount": taxIDList.count("NA")}
        else:
            taxon = taxopy.Taxon(int(taxID), taxdb)
            name = taxon.name
            rank = taxon.rank
            lineageNamesList = taxon.rank_name_dictionary
            dictlist = [[k,v] for k,v in lineageNamesList.items()][::-1]
            if name in taxDict:
                name += " 1"
            taxDict[name] = {"taxID": taxID, "lineageNames": dictlist, "unassignedCount": taxIDList.count(taxID), "rank": rank, "totalCount": taxIDList.count(taxID)}
            if not (name in flatten(taxDict[name]["lineageNames"])):
                taxDict[name]["lineageNames"].append([rank, name])
    for taxon in taxDict.keys():
        subtaxa_counts = [taxDict[other_taxon]["unassignedCount"] for other_taxon in taxDict.keys() if taxon in flatten(taxDict[other_taxon]["lineageNames"])]
        taxDict[taxon]["totalCount"] = sum(subtaxa_counts)
    taxDict["root"]["totalCount"] = taxIDList.count("NA")

    rankPatternFull = ["root", "superkingdom", "kingdom", "subkingdom", "superphylum", "phylum", "subphylum", "superclass", "class", "subclass", "superorder", "order", "suborder", "superfamily", "family", "subfamily", "supergenus", "genus", "subgenus", "superspecies", "species"]
    
    # Get the names of all taxa with reducible lineages:
    allTaxaReduced = copy.deepcopy(taxDict)
    taxaWithReducibleLineages = []
    for key,value in taxDict.items():
        lineage = value["lineageNames"]
        for i in range(0, len(lineage)):
            if not (lineage[i][0] in rankPatternFull):
                taxaWithReducibleLineages.append(key)
                break

    for taxName in taxaWithReducibleLineages:
        lineage = taxDict[taxName]["lineageNames"]
        reducedLineage = copy.deepcopy(lineage)
        for i in reversed(range(0, len(lineage))):
            if not(lineage[i][0] in rankPatternFull):
                del reducedLineage[i]
        allTaxaReduced[taxName]["lineageNames"] = reducedLineage

    reducibleTaxa = []
    for key,value in allTaxaReduced.items():
        rank = value["rank"]
        lineage = value["lineageNames"]
        if (len(lineage) == 0) or rank != lineage[len(lineage)-1][0]:
            reducibleTaxa.append(key)

    for key,value in allTaxaReduced.items():
        if (key != "root"):
            value["lineageNames"] = [allTaxaReduced["root"]["lineageNames"][0]] + value["lineageNames"]
 
    newlyAdded = []
    for taxName in reducibleTaxa:
        unassignedCount = taxDict[taxName]["unassignedCount"]
        lineage = allTaxaReduced[taxName]["lineageNames"]
        lastPredecessor = lineage[-1][1]
        if lastPredecessor in allTaxaReduced.keys() and lastPredecessor in newlyAdded:
            allTaxaReduced[lastPredecessor]["unassignedCount"] += unassignedCount
            allTaxaReduced[lastPredecessor]["deletedDescendants"].append(taxName)
            del allTaxaReduced[taxName]
        elif lastPredecessor in allTaxaReduced.keys() and (not lastPredecessor in newlyAdded):
            allTaxaReduced[lastPredecessor]["unassignedCount"] += unassignedCount
            if "deletedDescendants" in allTaxaReduced[lastPredecessor]:
                allTaxaReduced[lastPredecessor]["deletedDescendants"].append(taxName)
            else: 
                allTaxaReduced[lastPredecessor]["deletedDescendants"] = [taxName]
            del allTaxaReduced[taxName]
        else:
            newlyAdded.append(lastPredecessor)
            newRank = lineage[-1][0]
            allTaxaReduced[lastPredecessor] = {}
            allTaxaReduced[lastPredecessor]["lineageNames"] = lineage
            allTaxaReduced[lastPredecessor]["rank"] = newRank
            allTaxaReduced[lastPredecessor]["totalCount"] = 0
            allTaxaReduced[lastPredecessor]["unassignedCount"] = unassignedCount
            allTaxaReduced[lastPredecessor]["deletedDescendants"] = [taxName]
            del allTaxaReduced[taxName]

    for taxName in list(allTaxaReduced.keys()):
        unassignedCount = allTaxaReduced[taxName]["unassignedCount"]
        lineage = allTaxaReduced[taxName]["lineageNames"]
        allTaxaReducedKeys = list(allTaxaReduced.keys())
        for predecessor in lineage:
            if (not (predecessor[1] in allTaxaReducedKeys and allTaxaReduced[predecessor[1]]["rank"] == predecessor[0])) and (not predecessor[1] + " " + predecessor[0] in allTaxaReducedKeys):
                newName = predecessor[1] + " " + predecessor[0]
                newlyAdded.append(newName)
                allTaxaReduced[newName] = {}
                allTaxaReduced[newName]["rank"] = predecessor[0]
                allTaxaReduced[newName]["lineageNames"] = lineage[:lineage.index(predecessor)+1]
                allTaxaReduced[newName]["totalCount"] = 0
                allTaxaReduced[newName]["unassignedCount"] = 0

    for taxName in list(allTaxaReduced.keys()):
        lineage = allTaxaReduced[taxName]["lineageNames"]
        allTaxaReducedKeys = list(allTaxaReduced.keys())
        for predecessor in lineage:
            if predecessor[1] + " " + predecessor[0] in newlyAdded:
                predecessor[1] = predecessor[1] + " " + predecessor[0]
    
    for taxName in list(allTaxaReduced.keys()):
        unassignedCount = allTaxaReduced[taxName]["unassignedCount"]
        lineage = allTaxaReduced[taxName]["lineageNames"]
        allTaxaReducedKeys = list(allTaxaReduced.keys())
        for predecessor in lineage:
            if predecessor[1] in newlyAdded:
                allTaxaReduced[predecessor[1]]["totalCount"] += unassignedCount

    for taxName in list(allTaxaReduced.keys()):
        if (allTaxaReduced[taxName]["unassignedCount"] == 0):
            allTaxaReduced[taxName]["skip"] = True
        else:
            allTaxaReduced[taxName]["skip"] = False

    for taxName in list(allTaxaReduced.keys()):
        allTaxaReduced["root"]["totalCount"] += allTaxaReduced[taxName]["unassignedCount"]
        lineage = allTaxaReduced[taxName]["lineageNames"]
        for i in range(0, len(lineage)-1):
            if lineage[i][0] == lineage[i+1][0]:
                del lineage[i]

    lineagesFull = []
    for taxName in list(filter(lambda item: (not allTaxaReduced[item]["skip"]), list(allTaxaReduced.keys()))):
        lineagesFull.append(list(map(lambda item: item[1] + "_*_" + item[0], allTaxaReduced[taxName]["lineageNames"])))
    lineagesFull.sort()

    lineagesNames = []
    lineagesRanks = []
    for lineage in lineagesFull:
        lineageNames = list(map(lambda item: item.split("_*_")[0], lineage))
        lineageRanks = list(map(lambda item: item.split("_*_")[1], lineage))
        lineagesNames.append(lineageNames)
        lineagesRanks.append(lineageRanks)

    

    return jsonify({"lineagesNames": lineagesNames, "lineagesRanks": lineagesRanks, "allTaxaReduced": allTaxaReduced, "rankPatternFull": rankPatternFull, "allTaxa": taxDict})

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

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file'].read()
      #f.save(secure_filename(f.filename))
      print("f: ", f)
      return redirect(url_for("load_tsv_data"))
