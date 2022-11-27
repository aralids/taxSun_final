var path = "C:/Users/PC/Desktop/workflow diagram/krona.tsv";
var taxIDArray = [];
var Taxon = /** @class */ (function () {
    function Taxon(taxID) {
        this.taxID = taxID;
        if (this.taxID === "NA") {
            this.name = "unidentified";
        }
        else {
            this.requestData();
        }
        this.getUnidentifiedCount();
        this.totalCount = this.unidentifiedCount;
    }
    ;
    Taxon.prototype.getUnidentifiedCount = function () {
        var _this = this;
        this.unidentifiedCount = taxIDArray.filter(function (item) { return _this.taxID === item; }).length;
    };
    Taxon.prototype.requestData = function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: "/get_tax_data",
            data: { "taxID": this.taxID },
            success: function (response) {
                self.name = response["name"];
                self.lineageNames = response["lineageNames"];
                self.lineageRanks = response["lineageRanks"];
            },
            error: function (response) {
                console.log("ERROR", response);
            }
        });
    };
    return Taxon;
}());
// Generate mock-up data; reference: OSLEUM CLADE subplot from the LASALLIA PUSTULATA Krona plot.
loadDataFromTSV();
// ---
var taxIDArrayUnique = [];
var taxonArrayUnique = [];
$(document).ajaxStop(function () {
    taxIDArrayUnique = taxIDArray.filter(function (value, index, self) { return self.indexOf(value) === index; });
    console.log(taxIDArrayUnique.length);
    createTaxa();
    $(document).ajaxStop(function () { getTotalCounts(); });
});
// Get total count for each taxon.
function createTaxa() {
    console.log("ln 54: Taxon objs");
    taxonArrayUnique = taxIDArrayUnique.map(function (taxID) { return new Taxon(taxID); });
}
function getTotalCounts() {
    for (i = 0; i < taxonArrayUnique.length; i++) {
        var currTaxon = taxonArrayUnique[i];
        var otherTaxa = taxonArrayUnique.filter(function (item) { return item !== currTaxon; });
        var subTaxa = otherTaxa.filter(function (item) { return item.lineageNames.indexOf(currTaxon.name) > -1; });
        currTaxon.totalCount = subTaxa.reduce(function (totalCount, taxon) { return totalCount + taxon.unidentifiedCount; }, currTaxon.unidentifiedCount);
    }
}
// ---
// Get 
var lineageObjArray = taxonArrayUnique.map(function (taxon) { return taxon.lineageRanks; }).sort(function (a, b) { return a.length - b.length; });
var repeatedTaxa = [];
var i, j;
j = 0;
for (i = 0; i < lineageObjArray.length - 1; i++) {
    while (j < lineageObjArray[i].length) {
        if (lineageObjArray[i + 1].indexOf(lineageObjArray[i][j]) > -1 && repeatedTaxa.indexOf(lineageObjArray[i][j]) <= -1) {
            repeatedTaxa.push(lineageObjArray[i][j]);
        }
        j++;
    }
    j = lineageObjArray[i + 1].indexOf(repeatedTaxa[repeatedTaxa.length - 1]);
}
console.log("Done!");
function loadDataFromTSV() {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: { "path": path },
        success: function (response) {
            taxIDArray = response["taxIDArray"];
            console.log("AJAX DONE!");
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}
