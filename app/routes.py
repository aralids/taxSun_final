from flask import render_template, url_for, request, jsonify
from app import app
import taxopy
import csv

taxdb = taxopy.TaxDb()

def get_rank(tax_name):
    taxID = taxopy.taxid_from_name(tax_name, taxdb)[0]
    taxon = taxopy.Taxon(taxID, taxdb)
    return taxon.rank

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/load_tsv_data')
def load_tsv_data():
    path = request.args["path"]
    with open(path) as file:
        tsv_file = csv.reader(file, delimiter="\t", quotechar='"')
        taxIDList = [line[1] for line in tsv_file]
    del taxIDList[0]
    return jsonify({"taxIDArray": taxIDList})

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