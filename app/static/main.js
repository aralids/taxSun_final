var taxIDArray = [];
var Taxon = /** @class */ (function () {
    function Taxon(taxID) {
        this.taxID = taxID;
        this.requestData();
        this.totalCount = this.unidentifiedCount;
    }
    ;
    Taxon.prototype.getUnidentifiedCount = function () {
        var _this = this;
        this.unidentifiedCount = taxIDArray.filter(function (item) { return _this.taxID === item; }).length;
    };
    Taxon.prototype.requestData = function () {
        $.ajax({
            type: "GET",
            url: "/get_tax_data",
            data: { "taxID": this.taxID },
            success: function (response) {
                this.name = response["name"];
                this.lineageNames = response["lineageNames"];
                this.lineageRanks = response["lineageRanks"];
                console.log(this.name, this.lineageNames, this.lineageRanks);
            },
            error: function (response) {
                console.log("ERROR", response);
            }
        });
    };
    return Taxon;
}());
// Generate mock-up data; reference: OSLEUM CLADE subplot from the LASALLIA PUSTULATA Krona plot.
var i;
var j = 0;
for (i = 0; i < 15; i++) {
    taxIDArray.push("560253");
}
for (i = 0; i < 40; i++) {
    taxIDArray.push("112416");
}
for (i = 0; i < 49; i++) {
    taxIDArray.push("112415");
}
for (i = 0; i < 32; i++) {
    taxIDArray.push("172621");
}
for (i = 0; i < 32; i++) {
    taxIDArray.push("1903189");
}
for (i = 0; i < 507; i++) {
    taxIDArray.push("78060");
}
for (i = 0; i < 15; i++) {
    taxIDArray.push("9975");
}
// ---
// Get total count for each taxon.
var taxIDArrayUnique = taxIDArray.filter(function (value, index, self) { return self.indexOf(value) === index; });
var taxonArrayUnique = taxIDArrayUnique.map(function (taxID) { return new Taxon(taxID); });
for (i = 0; i < taxonArrayUnique.length; i++) {
    var currTaxon = taxonArrayUnique[i];
    var otherTaxa = taxonArrayUnique.filter(function (item) { return item !== currTaxon; });
    var subTaxa = otherTaxa.filter(function (item) { return item.lineageNames.indexOf(currTaxon.name) > -1; });
    currTaxon.totalCount = subTaxa.reduce(function (totalCount, taxon) { return totalCount + taxon.unidentifiedCount; }, currTaxon.unidentifiedCount);
}
// ---
// Get 
var lineageObjArray = taxonArrayUnique.map(function (taxon) { return taxon.lineageRanks; }).sort(function (a, b) { return a.length - b.length; });
var repeatedTaxa = [];
for (i = 0; i < lineageObjArray.length - 1; i++) {
    while (j < lineageObjArray[i].length) {
        if (lineageObjArray[i + 1].indexOf(lineageObjArray[i][j]) > -1 && repeatedTaxa.indexOf(lineageObjArray[i][j]) <= -1) {
            repeatedTaxa.push(lineageObjArray[i][j]);
        }
        j++;
    }
    j = lineageObjArray[i + 1].indexOf(repeatedTaxa[repeatedTaxa.length - 1]);
}
taxonArrayUnique[0].requestData();
