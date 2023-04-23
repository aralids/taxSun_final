from flask import render_template, url_for, request, jsonify, redirect
from app import app
import taxopy
import csv
from flask_redmail import RedMail
import json

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

@app.route('/load_tsv_data')
def load_tsv_data():
    taxdb = taxopy.TaxDb()
    path = request.args["tsv_path"]
    with open(path) as file:
        tsv_file = csv.reader(file, delimiter="\t", quotechar='"')
        taxIDList = [line[1] for line in tsv_file]
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
                print("aa")
    for taxon in taxDict.keys():
        subtaxa_counts = [taxDict[other_taxon]["unassignedCount"] for other_taxon in taxDict.keys() if taxon in flatten(taxDict[other_taxon]["lineageNames"])]
        taxDict[taxon]["totalCount"] = sum(subtaxa_counts)
    taxDict["root"]["totalCount"] = taxIDList.count("NA")

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
