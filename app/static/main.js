var path = "C:/Users/PC/Desktop/workflow diagram/krona.tsv";
var allTaxa;
var taxonList = [];
var lineagesNamesOnlyArray = [];
loadDataFromTSV(path);
$(document).ajaxStop(function () {
    var taxName;
    for (var _i = 0, _a = Object.keys(allTaxa); _i < _a.length; _i++) {
        taxName = _a[_i];
        var newTaxon = new Taxon(taxName);
        taxonList.push(newTaxon);
        lineagesNamesOnlyArray.push(newTaxon.lineage.map(function (item) { return item[1]; }));
    }
    console.log("taxNames: ", lineagesNamesOnlyArray);
});
function loadDataFromTSV(tsv_path) {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: { "tsv_path": tsv_path },
        success: function (response) {
            allTaxa = response["taxDict"];
            console.log("SUCCESS: ", allTaxa);
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}
// 1 extra Talaromyces sect. Talaromyces
var Taxon = /** @class */ (function () {
    function Taxon(name) {
        this.name = name;
        this.getData();
    }
    Taxon.prototype.getData = function () {
        this.taxID = allTaxa[this.name].taxID;
        this.rank = allTaxa[this.name].rank;
        this.lineage = allTaxa[this.name].lineageNames;
        this.totalCount = allTaxa[this.name].totalCount;
        this.unassignedCount = allTaxa[this.name].unassignedCount;
    };
    return Taxon;
}());
