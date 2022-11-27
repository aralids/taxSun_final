from flask import render_template, url_for, request, jsonify
from app import app
import taxopy

taxdb = taxopy.TaxDb()

def get_rank(tax_name):
    taxID = taxopy.taxid_from_name(tax_name, taxdb)[0]
    taxon = taxopy.Taxon(taxID, taxdb)
    return taxon.rank

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/get_tax_data')
def get_tax_data():
    print("request.method: ", request.args["taxID"])
    taxon = taxopy.Taxon(int(request.args["taxID"]), taxdb)
    lineageNamesList = taxon.name_lineage[::-1][2:]
    lineageRanksList = list(map(get_rank, lineageNamesList))
    for i in reversed(range(0, len(lineageRanksList))):
        print(i)
        if lineageRanksList[i] == "clade":
            print(lineageRanksList[i])
            lineageRanksList.pop(i)
            lineageNamesList.pop(i)
    return jsonify({"name": taxon.name, "lineageNames": lineageNamesList, "lineageRanks": lineageRanksList})