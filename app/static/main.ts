var taxIDArray:string[] = [];

class Taxon {
    taxID:string;
    name:string;
    lineageNames:string[];
    lineageRanks:string[];
    unidentifiedCount:number;
    totalCount:number;

    constructor(taxID:string) {
        this.taxID = taxID;
        this.requestData();
        this.totalCount = this.unidentifiedCount;
    };

    getUnidentifiedCount():void {
        this.unidentifiedCount = taxIDArray.filter(item => this.taxID === item).length;
    }

    requestData():void {
        $.ajax({
            type: "GET",
            url: "/get_tax_data",
            data: {"taxID": this.taxID},
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
    }
}

// Generate mock-up data; reference: OSLEUM CLADE subplot from the LASALLIA PUSTULATA Krona plot.
var i:number;
var j:number = 0;
for (i=0; i<15; i++) {
    taxIDArray.push("560253");
}
for (i=0; i<40; i++) {
    taxIDArray.push("112416");
}
for (i=0; i<49; i++) {
    taxIDArray.push("112415");
}
for (i=0; i<32; i++) {
    taxIDArray.push("172621");
}
for (i=0; i<32; i++) {
    taxIDArray.push("1903189");
}
for (i=0; i<507; i++) {
    taxIDArray.push("78060");
}
for (i=0; i<15; i++) {
    taxIDArray.push("9975");
}
// ---

// Get total count for each taxon.
var taxIDArrayUnique:string[] = taxIDArray.filter((value, index, self) => self.indexOf(value) === index);
var taxonArrayUnique:Taxon[] = taxIDArrayUnique.map(taxID => new Taxon(taxID));

for (i=0; i<taxonArrayUnique.length; i++) {
    var currTaxon:Taxon = taxonArrayUnique[i];
    var otherTaxa:Taxon[] = taxonArrayUnique.filter(item => item !== currTaxon);
    var subTaxa:Taxon[] = otherTaxa.filter(item => item.lineageNames.indexOf(currTaxon.name) > -1);
    currTaxon.totalCount = subTaxa.reduce((totalCount, taxon) => totalCount + taxon.unidentifiedCount, currTaxon.unidentifiedCount);
}
// ---

// Get 
var lineageObjArray:string[][] = taxonArrayUnique.map(taxon => taxon.lineageRanks).sort(function(a, b){ return a.length - b.length;});
var repeatedTaxa:string[] = [];

for (i=0; i<lineageObjArray.length-1; i++) {
    while (j<lineageObjArray[i].length) {
        if (lineageObjArray[i+1].indexOf(lineageObjArray[i][j]) > -1 && repeatedTaxa.indexOf(lineageObjArray[i][j]) <= -1) {
            repeatedTaxa.push(lineageObjArray[i][j]);
        }
        j++;
    }
    j = lineageObjArray[i+1].indexOf(repeatedTaxa[repeatedTaxa.length - 1]);
}
taxonArrayUnique[0].requestData();