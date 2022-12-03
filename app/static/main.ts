var path = "C:/Users/PC/Desktop/workflow diagram/krona.tsv"
var allTaxa:object;
var taxonList:Taxon[] = [];
var lineagesNamesOnlyArray:string[][] = [];

loadDataFromTSV(path);
$(document).ajaxStop(function() {
    var taxName:string;
    for (taxName of Object.keys(allTaxa)) {
        var newTaxon:Taxon = new Taxon(taxName);
        taxonList.push(newTaxon);
        lineagesNamesOnlyArray.push(newTaxon.lineage.map(item => item[1]));
    }
    lineagesNamesOnlyArray.sort();
    console.log("taxNames: ", lineagesNamesOnlyArray);
    var fullPlot:Plot = new Plot();
    var partialPlot:Plot = new Plot("Bacteria", 0);
    console.log("fullPlot lineages: ", partialPlot.lineages);
})

function loadDataFromTSV(tsv_path) {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: {"tsv_path": tsv_path},
        success: function (response) {
            allTaxa = response["taxDict"];
            console.log("SUCCESS: ", allTaxa)
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}

// 1 extra Talaromyces sect. Talaromyces

class Taxon {
    name:string;
    taxID:string;
    rank:string;
    lineage:string[][];
    unassignedCount:number;
    totalCount:number;

    constructor (name:string) {
        this.name = name;
        this.getData();
    }

    getData():void {
        this.taxID = allTaxa[this.name].taxID;
        this.rank = allTaxa[this.name].rank;
        this.lineage = allTaxa[this.name].lineageNames;
        this.totalCount = allTaxa[this.name].totalCount;
        this.unassignedCount = allTaxa[this.name].unassignedCount;
    }
}

class Plot {
    root:string;
    layer:number;
    lineages:string[][];
    structure:object;

    constructor (root:string = "", layer:number = -1) {
        this.root = root;
        this.layer = layer;
        this.getOnlyNecessaryLineages();
    }

    getOnlyNecessaryLineages():void {
        if (this.root === "" && this.layer === -1) {
            this.lineages = lineagesNamesOnlyArray;
        } else {
            var almostLineages:string[][] = lineagesNamesOnlyArray.filter(item => item[this.layer] === this.root);
            this.lineages = almostLineages.map(item => item.slice(1));
        }
    }

    assignDegrees():void {
        this.structure = {};
    }
}