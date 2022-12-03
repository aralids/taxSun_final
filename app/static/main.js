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
    lineagesNamesOnlyArray.sort();
    console.log("taxNames: ", lineagesNamesOnlyArray);
    var fullPlot = new Plot();
    var partialPlot = new Plot("Bacteria", 0);
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
var Plot = /** @class */ (function () {
    function Plot(root, layer) {
        if (root === void 0) { root = ""; }
        if (layer === void 0) { layer = -1; }
        this.structure = {};
        this.root = root;
        this.layer = layer;
        this.getOnlyNecessaryLineages();
        this.assignDegrees();
    }
    Plot.prototype.getOnlyNecessaryLineages = function () {
        var _this = this;
        if (this.root === "" && this.layer === -1) {
            this.lineages = lineagesNamesOnlyArray;
        }
        else {
            this.lineages = lineagesNamesOnlyArray.filter(function (item) { return item[_this.layer] === _this.root; });
        }
    };
    Plot.prototype.assignDegrees = function () {
        var lineageCounts = this.lineages.map(function (item) { return allTaxa[item[item.length - 1]]["unassignedCount"]; });
        var lineageCountsSum = lineageCounts.reduce(function (accumulator, current) { return accumulator + current; }, 0);
        var sectionStart = 0;
        var sectionEnd;
        var key;
        for (var i = 0; i < this.lineages.length; i++) {
            sectionEnd = sectionStart + lineageCounts[i] * 360 / lineageCountsSum;
            key = "".concat(sectionStart, "-").concat(sectionEnd, " deg");
            this.structure[key] = this.lineages[i];
            sectionStart = sectionEnd;
        }
        console.log("structure: ", this.structure);
    };
    return Plot;
}());
