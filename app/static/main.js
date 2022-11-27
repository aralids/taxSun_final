var taxIDArray = [];
var Taxon = /** @class */ (function () {
    function Taxon(taxID) {
        this.taxID = taxID;
        this.getName();
        this.getLineageArray();
        this.getLineageObj();
        this.getUnidentifiedCount();
        this.totalCount = this.unidentifiedCount;
    }
    ;
    Taxon.prototype.getName = function () {
        if (this.taxID === "560253") {
            this.name = "Letharia lupina";
        }
        else if (this.taxID === "112416") {
            this.name = "Letharia columbiana";
        }
        else if (this.taxID === "112415") {
            this.name = "Letharia";
        }
        else if (this.taxID === "172621") {
            this.name = "Imshaugia aleurites";
        }
        else if (this.taxID === "1903189") {
            this.name = "Alectoria fallacina";
        }
        else if (this.taxID === "78060") {
            this.name = "Parmeliaceae";
        }
        else if (this.taxID === "9975") {
            this.name = "Lagomorpha";
        }
    };
    ;
    Taxon.prototype.getLineageArray = function () {
        if (this.taxID === "560253") {
            this.lineageArray = ["Eukaryota", "Opisthokonta", "Fungi", "Dikarya", "Ascomycota", "saccharomyceta", "Pezizomycotina", "leotiomyceta", "Lecanoromycetes", "OSLEUM clade", "Lecanoromycetidae", "Lecanorales", "Lecanorineae", "Parmeliaceae", "Letharia"];
        }
        else if (this.taxID === "112416") {
            this.lineageArray = ["Eukaryota", "Opisthokonta", "Fungi", "Dikarya", "Ascomycota", "saccharomyceta", "Pezizomycotina", "leotiomyceta", "Lecanoromycetes", "OSLEUM clade", "Lecanoromycetidae", "Lecanorales", "Lecanorineae", "Parmeliaceae", "Letharia"];
        }
        else if (this.taxID === "112415") {
            this.lineageArray = ["Eukaryota", "Opisthokonta", "Fungi", "Dikarya", "Ascomycota", "saccharomyceta", "Pezizomycotina", "leotiomyceta", "Lecanoromycetes", "OSLEUM clade", "Lecanoromycetidae", "Lecanorales", "Lecanorineae", "Parmeliaceae"];
        }
        else if (this.taxID === "172621") {
            this.lineageArray = ["Eukaryota", "Opisthokonta", "Fungi", "Dikarya", "Ascomycota", "saccharomyceta", "Pezizomycotina", "leotiomyceta", "Lecanoromycetes", "OSLEUM clade", "Lecanoromycetidae", "Lecanorales", "Lecanorineae", "Parmeliaceae", "Imshaugia"];
        }
        else if (this.taxID === "1903189") {
            this.lineageArray = ["Eukaryota", "Opisthokonta", "Fungi", "Dikarya", "Ascomycota", "saccharomyceta", "Pezizomycotina", "leotiomyceta", "Lecanoromycetes", "OSLEUM clade", "Lecanoromycetidae", "Lecanorales", "Lecanorineae", "Parmeliaceae", "Alectoria"];
        }
        else if (this.taxID === "78060") {
            this.lineageArray = ["Eukaryota", "Opisthokonta", "Fungi", "Dikarya", "Ascomycota", "saccharomyceta", "Pezizomycotina", "leotiomyceta", "Lecanoromycetes", "OSLEUM clade", "Lecanoromycetidae", "Lecanorales", "Lecanorineae"];
        }
        else if (this.taxID === "9975") {
            this.lineageArray = ['Lagomorpha', 'Glires', 'Euarchontoglires', 'Boreoeutheria', 'Eutheria', 'Theria', 'Mammalia', 'Amniota', 'Tetrapoda', 'Dipnotetrapodomorpha', 'Sarcopterygii', 'Euteleostomi', 'Teleostomi', 'Gnathostomata', 'Vertebrata', 'Craniata', 'Chordata', 'Deuterostomia', 'Bilateria', 'Eumetazoa', 'Metazoa', 'Opisthokonta', 'Eukaryota'].reverse();
        }
    };
    Taxon.prototype.getUnidentifiedCount = function () {
        var _this = this;
        this.unidentifiedCount = taxIDArray.filter(function (item) { return _this.taxID === item; }).length;
    };
    Taxon.prototype.getLineageObj = function () {
        if (this.taxID === "560253") {
            this.lineageObj = {
                "superkingdom": "Eukaryota",
                "kingdom": "Fungi",
                "subkingdom": "Dikarya",
                "phylum": "Ascomycota",
                "subphylum": "Pezizomycotina",
                "class": "Lecanoromycetes",
                "clade": "OSLEUM clade",
                "subclass": "Lecanoromycetidae",
                "order": "Lecanorales",
                "suborder": "Lecanorineae",
                "family": "Parmeliaceae",
                "genus": "Letharia",
                "species": "Letharia lupina"
            };
        }
        else if (this.taxID === "112416") {
            this.lineageObj = {
                "superkingdom": "Eukaryota",
                "kingdom": "Fungi",
                "subkingdom": "Dikarya",
                "phylum": "Ascomycota",
                "subphylum": "Pezizomycotina",
                "class": "Lecanoromycetes",
                "clade": "OSLEUM clade",
                "subclass": "Lecanoromycetidae",
                "order": "Lecanorales",
                "suborder": "Lecanorineae",
                "family": "Parmeliaceae",
                "genus": "Letharia",
                "species": "Letharia columbiana"
            };
        }
        else if (this.taxID === "112415") {
            this.lineageObj = {
                "superkingdom": "Eukaryota",
                "kingdom": "Fungi",
                "subkingdom": "Dikarya",
                "phylum": "Ascomycota",
                "subphylum": "Pezizomycotina",
                "class": "Lecanoromycetes",
                "clade": "OSLEUM clade",
                "subclass": "Lecanoromycetidae",
                "order": "Lecanorales",
                "suborder": "Lecanorineae",
                "family": "Parmeliaceae",
                "genus": "Letharia"
            };
        }
        else if (this.taxID === "172621") {
            this.lineageObj = {
                "superkingdom": "Eukaryota",
                "kingdom": "Fungi",
                "subkingdom": "Dikarya",
                "phylum": "Ascomycota",
                "subphylum": "Pezizomycotina",
                "class": "Lecanoromycetes",
                "clade": "OSLEUM clade",
                "subclass": "Lecanoromycetidae",
                "order": "Lecanorales",
                "suborder": "Lecanorineae",
                "family": "Parmeliaceae",
                "genus": "Imshaugia",
                "species": "Imshaugia aleurites"
            };
        }
        else if (this.taxID === "1903189") {
            this.lineageObj = {
                "superkingdom": "Eukaryota",
                "kingdom": "Fungi",
                "subkingdom": "Dikarya",
                "phylum": "Ascomycota",
                "subphylum": "Pezizomycotina",
                "class": "Lecanoromycetes",
                "clade": "OSLEUM clade",
                "subclass": "Lecanoromycetidae",
                "order": "Lecanorales",
                "suborder": "Lecanorineae",
                "family": "Parmeliaceae",
                "genus": "Alectoria",
                "species": "Alectoria fallacina"
            };
        }
        else if (this.taxID === "78060") {
            this.lineageObj = {
                "superkingdom": "Eukaryota",
                "kingdom": "Fungi",
                "subkingdom": "Dikarya",
                "phylum": "Ascomycota",
                "subphylum": "Pezizomycotina",
                "class": "Lecanoromycetes",
                "clade": "OSLEUM clade",
                "subclass": "Lecanoromycetidae",
                "order": "Lecanorales",
                "suborder": "Lecanorineae",
                "family": "Parmeliaceae"
            };
        }
        else if (this.taxID === "9975") {
            this.lineageObj = {
                "superkingdom": "Eukaryota",
                "kingdom": "Metazoa",
                "phylum": "Chordata",
                "subphylum": "Craniata",
                "superclass": "Sarcopterygii",
                "class": "Mammalia",
                "superorder": "Euarchontoglires",
                "order": "Lagomorpha"
            };
        }
    };
    Taxon.prototype.request_data = function () {
        $.ajax({
            type: "GET",
            url: "/get_tax_data",
            data: JSON.stringify(this.taxID),
            contentType: "application/json",
            dataType: 'json',
            success: function (response) {
                console.log("success", response);
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
    var subTaxa = otherTaxa.filter(function (item) { return item.lineageArray.indexOf(currTaxon.name) > -1; });
    currTaxon.totalCount = subTaxa.reduce(function (totalCount, taxon) { return totalCount + taxon.unidentifiedCount; }, currTaxon.unidentifiedCount);
}
// ---
// Get 
var lineageObjArray = taxonArrayUnique.map(function (taxon) { return Object.keys(taxon.lineageObj); }).sort(function (a, b) { return a.length - b.length; });
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
taxonArrayUnique[0].request_data();
