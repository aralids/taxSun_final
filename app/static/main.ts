var path = "C:/Users/PC/Desktop/workflow diagram/krona.tsv"
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
        if (this.taxID === "NA") {
            this.name = "unidentified";
        }
        else {
            this.requestData();
        }
        this.getUnidentifiedCount();
        this.totalCount = this.unidentifiedCount;
    };

    getUnidentifiedCount():void {
        this.unidentifiedCount = taxIDArray.filter(item => this.taxID === item).length;
    }
    
    requestData():void {
        var self = this;
        $.ajax({
            type: "GET",
            url: "/get_tax_data",
            data: {"taxID": this.taxID},
            success: function (response) {
                self.name = response["name"]
                self.lineageNames = response["lineageNames"]
                self.lineageRanks = response["lineageRanks"]
            },
            error: function (response) {
                console.log("ERROR", response);
            }
          });
    }
}

// Generate mock-up data; reference: OSLEUM CLADE subplot from the LASALLIA PUSTULATA Krona plot.
loadDataFromTSV()
// ---

var taxIDArrayUnique:string[] = [];
var taxonArrayUnique:Taxon[] = [];
$(document).ajaxStop(function() { taxIDArrayUnique = taxIDArray.filter((value, index, self) => self.indexOf(value) === index); 
    
    console.log(taxIDArrayUnique.length);
    createTaxa();
    $(document).ajaxStop(function() { getTotalCounts() });
});

// Get total count for each taxon.
function createTaxa() {
    console.log("ln 54: Taxon objs")
    taxonArrayUnique = taxIDArrayUnique.map(taxID => new Taxon(taxID));

}

function getTotalCounts() {
    for (i=0; i<taxonArrayUnique.length; i++) {
        var currTaxon:Taxon = taxonArrayUnique[i];
        var otherTaxa:Taxon[] = taxonArrayUnique.filter(item => item !== currTaxon);
        var subTaxa:Taxon[] = otherTaxa.filter(item => item.lineageNames.indexOf(currTaxon.name) > -1);
        currTaxon.totalCount = subTaxa.reduce((totalCount, taxon) => totalCount + taxon.unidentifiedCount, currTaxon.unidentifiedCount);
    }
}



// ---

// Get 
var lineageObjArray:string[][] = taxonArrayUnique.map(taxon => taxon.lineageRanks).sort(function(a, b){ return a.length - b.length;});
var repeatedTaxa:string[] = [];

var i,j;
j = 0;
for (i=0; i<lineageObjArray.length-1; i++) {
    while (j<lineageObjArray[i].length) {
        if (lineageObjArray[i+1].indexOf(lineageObjArray[i][j]) > -1 && repeatedTaxa.indexOf(lineageObjArray[i][j]) <= -1) {
            repeatedTaxa.push(lineageObjArray[i][j]);
        }
        j++;
    }
    j = lineageObjArray[i+1].indexOf(repeatedTaxa[repeatedTaxa.length - 1]);
}

console.log("Done!")

function loadDataFromTSV() {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: {"path": path},
        success: function (response) {
            taxIDArray = response["taxIDArray"];
            console.log("AJAX DONE!")
        },
        error: function (response) {
            console.log("ERROR", response);
        }
      });
}