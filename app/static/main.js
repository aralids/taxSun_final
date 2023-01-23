"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom/client");
var _html2canvas = require("html2canvas");
var html2canvas = _html2canvas;
var path = "C:/Users/PC/Desktop/krona/krona.tsv";
var allTaxa = JSON.parse('{"Acephala macrosclerotiorum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Mollisiaceae"],["genus","Acephala"],["species","Acephala macrosclerotiorum"]],"rank":"species","taxID":"886606","totalCount":4,"unassignedCount":4},"Acetobacteraceae bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"],["class","Alphaproteobacteria"],["order","Rhodospirillales"],["family","Acetobacteraceae"],["species","Acetobacteraceae bacterium"]],"rank":"species","taxID":"1909293","totalCount":1,"unassignedCount":1},"Acidobacteria bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Acidobacteria"],["species","Acidobacteria bacterium"]],"rank":"species","taxID":"1978231","totalCount":4,"unassignedCount":4},"Agaricomycetes":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Basidiomycota"],["subphylum","Agaricomycotina"],["class","Agaricomycetes"]],"rank":"class","taxID":"155619","totalCount":12,"unassignedCount":2},"Ajellomycetaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"],["family","Ajellomycetaceae"]],"rank":"family","taxID":"299071","totalCount":3,"unassignedCount":1},"Alectoria fallacina":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Parmeliaceae"],["genus","Alectoria"],["species","Alectoria fallacina"]],"rank":"species","taxID":"1903189","totalCount":32,"unassignedCount":32},"Alphaproteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"],["class","Alphaproteobacteria"]],"rank":"class","taxID":"28211","totalCount":3,"unassignedCount":1},"Alternaria":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Pleosporineae"],["family","Pleosporaceae"],["genus","Alternaria"]],"rank":"genus","taxID":"5598","totalCount":3,"unassignedCount":1},"Alternaria alternata":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Pleosporineae"],["family","Pleosporaceae"],["genus","Alternaria"],["section","Alternaria sect. Alternaria"],["species group","Alternaria alternata complex"],["species","Alternaria alternata"]],"rank":"species","taxID":"5599","totalCount":1,"unassignedCount":1},"Alternaria panax":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Pleosporineae"],["family","Pleosporaceae"],["genus","Alternaria"],["section","Alternaria sect. Panax"],["species","Alternaria panax"]],"rank":"species","taxID":"48097","totalCount":1,"unassignedCount":1},"Amniculicola lignicola CBS 123094":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["family","Amniculicolaceae"],["genus","Amniculicola"],["species","Amniculicola lignicola"],["strain","Amniculicola lignicola CBS 123094"]],"rank":"strain","taxID":"1392246","totalCount":1,"unassignedCount":1},"Amorphotheca resinae ATCC 22711":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Amorphothecaceae"],["genus","Amorphotheca"],["species","Amorphotheca resinae"],["strain","Amorphotheca resinae ATCC 22711"]],"rank":"strain","taxID":"857342","totalCount":7,"unassignedCount":7},"Amylocarpus encephaloides":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["genus","Amylocarpus"],["species","Amylocarpus encephaloides"]],"rank":"species","taxID":"45428","totalCount":1,"unassignedCount":1},"Aplosporella prunicola CBS 121167":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["order","Botryosphaeriales"],["family","Aplosporellaceae"],["genus","Aplosporella"],["species","Aplosporella prunicola"],["strain","Aplosporella prunicola CBS 121167"]],"rank":"strain","taxID":"1176127","totalCount":1,"unassignedCount":1},"Armatimonadetes":{"lineageNames":[["superkingdom","Bacteria"],["clade","Terrabacteria group"],["phylum","Armatimonadetes"]],"rank":"phylum","taxID":"67819","totalCount":6,"unassignedCount":2},"Armatimonadetes bacterium":{"lineageNames":[["superkingdom","Bacteria"],["clade","Terrabacteria group"],["phylum","Armatimonadetes"],["species","Armatimonadetes bacterium"]],"rank":"species","taxID":"2033014","totalCount":3,"unassignedCount":3},"Arthrodermataceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"],["family","Arthrodermataceae"]],"rank":"family","taxID":"34384","totalCount":2,"unassignedCount":1},"Ascomycota":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"]],"rank":"phylum","taxID":"4890","totalCount":8364,"unassignedCount":7},"Ascosphaera apis ARSEF 7405":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"],["family","Ascosphaeraceae"],["genus","Ascosphaera"],["species","Ascosphaera apis"],["strain","Ascosphaera apis ARSEF 7405"]],"rank":"strain","taxID":"392613","totalCount":1,"unassignedCount":1},"Aspergillaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Aspergillaceae"]],"rank":"family","taxID":"1131492","totalCount":15,"unassignedCount":5},"Aspergillus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Aspergillaceae"],["genus","Aspergillus"]],"rank":"genus","taxID":"5052","totalCount":9,"unassignedCount":4},"Aspergillus ellipticus CBS 707.79":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Aspergillaceae"],["genus","Aspergillus"],["species","Aspergillus ellipticus"],["strain","Aspergillus ellipticus CBS 707.79"]],"rank":"strain","taxID":"1448320","totalCount":1,"unassignedCount":1},"Aspergillus fumigatus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Aspergillaceae"],["genus","Aspergillus"],["subgenus","Aspergillus subgen. Fumigati"],["species","Aspergillus fumigatus"]],"rank":"species","taxID":"746128","totalCount":1,"unassignedCount":1},"Aspergillus thermomutatus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Aspergillaceae"],["genus","Aspergillus"],["species","Aspergillus thermomutatus"]],"rank":"species","taxID":"41047","totalCount":1,"unassignedCount":1},"Aspergillus udagawae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Aspergillaceae"],["genus","Aspergillus"],["species","Aspergillus udagawae"]],"rank":"species","taxID":"91492","totalCount":2,"unassignedCount":2},"Atheliaceae":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Basidiomycota"],["subphylum","Agaricomycotina"],["class","Agaricomycetes"],["subclass","Agaricomycetidae"],["order","Atheliales"],["family","Atheliaceae"]],"rank":"family","taxID":"80628","totalCount":1,"unassignedCount":1},"Aureobasidium melanogenum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Dothideales"],["family","Saccotheciaceae"],["genus","Aureobasidium"],["species","Aureobasidium melanogenum"]],"rank":"species","taxID":"46634","totalCount":1,"unassignedCount":1},"Aureobasidium pullulans":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Dothideales"],["family","Saccotheciaceae"],["genus","Aureobasidium"],["species","Aureobasidium pullulans"]],"rank":"species","taxID":"5580","totalCount":1,"unassignedCount":1},"Aureobasidium subglaciale EXF-2481":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Dothideales"],["family","Saccotheciaceae"],["genus","Aureobasidium"],["species","Aureobasidium subglaciale"],["strain","Aureobasidium subglaciale EXF-2481"]],"rank":"strain","taxID":"1043005","totalCount":1,"unassignedCount":1},"Bacidia gigantensis":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Ramalinaceae"],["genus","Bacidia"],["species","Bacidia gigantensis"]],"rank":"species","taxID":"2732470","totalCount":18,"unassignedCount":18},"Bacteria":{"lineageNames":[["superkingdom","Bacteria"]],"rank":"superkingdom","taxID":"2","totalCount":32,"unassignedCount":8},"Bisporella sp. PMI_857":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Helotiaceae"],["genus","Bisporella"],["species","Bisporella sp. PMI_857"]],"rank":"species","taxID":"1954211","totalCount":2,"unassignedCount":2},"Botryosphaeria dothidea":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["order","Botryosphaeriales"],["family","Botryosphaeriaceae"],["genus","Botryosphaeria"],["species","Botryosphaeria dothidea"]],"rank":"species","taxID":"55169","totalCount":2,"unassignedCount":2},"Botryosphaeriales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["order","Botryosphaeriales"]],"rank":"order","taxID":"451869","totalCount":4,"unassignedCount":1},"Byssothecium circinans":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Massarineae"],["family","Massarinaceae"],["genus","Byssothecium"],["species","Byssothecium circinans"]],"rank":"species","taxID":"147558","totalCount":1,"unassignedCount":1},"Cadophora malorum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["genus","Cadophora"],["species","Cadophora malorum"]],"rank":"species","taxID":"108018","totalCount":1,"unassignedCount":1},"Cadophora sp. M221":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["genus","Cadophora"],["species","Cadophora sp. M221"]],"rank":"species","taxID":"2774352","totalCount":1,"unassignedCount":1},"Calycina marina":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Pezizellaceae"],["genus","Calycina"],["species","Calycina marina"]],"rank":"species","taxID":"1763456","totalCount":1,"unassignedCount":1},"Capronia":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Capronia"]],"rank":"genus","taxID":"43220","totalCount":1,"unassignedCount":1},"Cenococcum geophilum 1.58":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["family","Gloniaceae"],["genus","Cenococcum"],["species","Cenococcum geophilum"],["strain","Cenococcum geophilum 1.58"]],"rank":"strain","taxID":"794803","totalCount":4,"unassignedCount":4},"Chaetomium globosum CBS 148.51":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Sordariomycetidae"],["order","Sordariales"],["family","Chaetomiaceae"],["genus","Chaetomium"],["species","Chaetomium globosum"],["strain","Chaetomium globosum CBS 148.51"]],"rank":"strain","taxID":"306901","totalCount":1,"unassignedCount":1},"Chaetothyriales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"]],"rank":"order","taxID":"34395","totalCount":18,"unassignedCount":1},"Chaetothyriales sp. CBS 132003":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["species","Chaetothyriales sp. CBS 132003"]],"rank":"species","taxID":"2249419","totalCount":2,"unassignedCount":2},"Chaetothyriomycetidae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"]],"rank":"subclass","taxID":"451870","totalCount":53,"unassignedCount":6},"Chalara longipes BDJ":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["genus","Chalara"],["species","Chalara longipes"],["strain","Chalara longipes BDJ"]],"rank":"strain","taxID":"1379296","totalCount":1,"unassignedCount":1},"Chlorociboria aeruginascens":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Chlorociboriaceae"],["genus","Chlorociboria"],["species","Chlorociboria aeruginascens"]],"rank":"species","taxID":"296797","totalCount":5,"unassignedCount":5},"Chloroflexi bacterium":{"lineageNames":[["superkingdom","Bacteria"],["clade","Terrabacteria group"],["phylum","Chloroflexi"],["species","Chloroflexi bacterium"]],"rank":"species","taxID":"2026724","totalCount":2,"unassignedCount":2},"Chthonomonadales bacterium":{"lineageNames":[["superkingdom","Bacteria"],["clade","Terrabacteria group"],["phylum","Armatimonadetes"],["class","Chthonomonadetes"],["order","Chthonomonadales"],["species","Chthonomonadales bacterium"]],"rank":"species","taxID":"2282151","totalCount":1,"unassignedCount":1},"Cladonia macilenta":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Cladoniaceae"],["genus","Cladonia"],["species","Cladonia macilenta"]],"rank":"species","taxID":"196765","totalCount":2,"unassignedCount":2},"Cladonia uncialis subsp. uncialis":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Cladoniaceae"],["genus","Cladonia"],["species","Cladonia uncialis"],["subspecies","Cladonia uncialis subsp. uncialis"]],"rank":"subspecies","taxID":"180999","totalCount":7,"unassignedCount":7},"Cladophialophora bantiana CBS 173.52":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Cladophialophora"],["species","Cladophialophora bantiana"],["strain","Cladophialophora bantiana CBS 173.52"]],"rank":"strain","taxID":"1442370","totalCount":1,"unassignedCount":1},"Cladophialophora immunda":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Cladophialophora"],["species","Cladophialophora immunda"]],"rank":"species","taxID":"569365","totalCount":1,"unassignedCount":1},"Clavicipitaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Hypocreales"],["family","Clavicipitaceae"]],"rank":"family","taxID":"34397","totalCount":2,"unassignedCount":1},"Coccidioides":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"],["family","Onygenaceae"],["genus","Coccidioides"]],"rank":"genus","taxID":"5500","totalCount":3,"unassignedCount":1},"Coccidioides immitis":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"],["family","Onygenaceae"],["genus","Coccidioides"],["species","Coccidioides immitis"]],"rank":"species","taxID":"5501","totalCount":2,"unassignedCount":2},"Coleophoma":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Dermateaceae"],["genus","Coleophoma"]],"rank":"genus","taxID":"453209","totalCount":1,"unassignedCount":1},"Colletotrichum gloeosporioides species complex":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Glomerellales"],["family","Glomerellaceae"],["genus","Colletotrichum"],["no rank","Colletotrichum gloeosporioides species complex"]],"rank":"no rank","taxID":"2707338","totalCount":1,"unassignedCount":1},"Colletotrichum spaethianum species complex":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Glomerellales"],["family","Glomerellaceae"],["genus","Colletotrichum"],["no rank","Colletotrichum spaethianum species complex"]],"rank":"no rank","taxID":"2707349","totalCount":2,"unassignedCount":2},"Colletotrichum tanaceti":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Glomerellales"],["family","Glomerellaceae"],["genus","Colletotrichum"],["species","Colletotrichum tanaceti"]],"rank":"species","taxID":"1306861","totalCount":1,"unassignedCount":1},"Coniosporium apollinis CBS 100218":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["genus","Coniosporium"],["species","Coniosporium apollinis"],["strain","Coniosporium apollinis CBS 100218"]],"rank":"strain","taxID":"1168221","totalCount":8,"unassignedCount":8},"Corynespora cassiicola Philippines":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["family","Corynesporascaceae"],["genus","Corynespora"],["species","Corynespora cassiicola"],["strain","Corynespora cassiicola Philippines"]],"rank":"strain","taxID":"1448308","totalCount":2,"unassignedCount":2},"Cryomyces minteri":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["genus","Cryomyces"],["species","Cryomyces minteri"]],"rank":"species","taxID":"331657","totalCount":10,"unassignedCount":10},"Cudoniella acicularis":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Tricladiaceae"],["genus","Cudoniella"],["species","Cudoniella acicularis"]],"rank":"species","taxID":"354080","totalCount":4,"unassignedCount":4},"Cyanobacteria":{"lineageNames":[["superkingdom","Bacteria"],["clade","Terrabacteria group"],["phylum","Cyanobacteria"]],"rank":"phylum","taxID":"1117","totalCount":1,"unassignedCount":1},"Delphinella strobiligena":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Dothideales"],["family","Dothioraceae"],["genus","Delphinella"],["species","Delphinella strobiligena"]],"rank":"species","taxID":"147560","totalCount":1,"unassignedCount":1},"Didymosphaeria enalia":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Massarineae"],["family","Didymosphaeriaceae"],["genus","Didymosphaeria"],["species","Didymosphaeria enalia"]],"rank":"species","taxID":"85948","totalCount":1,"unassignedCount":1},"Dikarya":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"]],"rank":"subkingdom","taxID":"451864","totalCount":8408,"unassignedCount":32},"Dioscorea alata":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Viridiplantae"],["phylum","Streptophyta"],["subphylum","Streptophytina"],["class","Magnoliopsida"],["clade","Embryophyta"],["subclass","Petrosaviidae"],["order","Dioscoreales"],["family","Dioscoreaceae"],["genus","Dioscorea"],["species","Dioscorea alata"]],"rank":"species","taxID":"55571","totalCount":1,"unassignedCount":1},"Diplocarpon rosae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Drepanopezizaceae"],["genus","Diplocarpon"],["species","Diplocarpon rosae"]],"rank":"species","taxID":"946125","totalCount":1,"unassignedCount":1},"Dissoconium aciculare CBS 342.82":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Mycosphaerellales"],["family","Dissoconiaceae"],["genus","Dissoconium"],["species","Dissoconium aciculare"],["strain","Dissoconium aciculare CBS 342.82"]],"rank":"strain","taxID":"1314786","totalCount":2,"unassignedCount":2},"Dothideomycetes":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"]],"rank":"class","taxID":"147541","totalCount":210,"unassignedCount":67},"Dothideomycetes incertae sedis":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["no rank","Dothideomycetes incertae sedis"]],"rank":"no rank","taxID":"159987","totalCount":10,"unassignedCount":10},"Dothideomycetidae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"]],"rank":"subclass","taxID":"451867","totalCount":21,"unassignedCount":2},"Emmonsia crescens UAMH 3008":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"],["family","Ajellomycetaceae"],["genus","Emmonsia"],["species","Emmonsia crescens"],["strain","Emmonsia crescens UAMH 3008"]],"rank":"strain","taxID":"1247875","totalCount":2,"unassignedCount":2},"Endocarpon pusillum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Verrucariales"],["family","Verrucariaceae"],["genus","Endocarpon"],["species","Endocarpon pusillum"]],"rank":"species","taxID":"364733","totalCount":29,"unassignedCount":21},"Endocarpon pusillum Z07020":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Verrucariales"],["family","Verrucariaceae"],["genus","Endocarpon"],["species","Endocarpon pusillum"],["strain","Endocarpon pusillum Z07020"]],"rank":"strain","taxID":"1263415","totalCount":8,"unassignedCount":8},"Epicoccum nigrum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Pleosporineae"],["family","Didymellaceae"],["genus","Epicoccum"],["species","Epicoccum nigrum"]],"rank":"species","taxID":"105696","totalCount":1,"unassignedCount":1},"Erysiphaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Erysiphales"],["family","Erysiphaceae"]],"rank":"family","taxID":"34371","totalCount":5,"unassignedCount":2},"Eukaryota":{"lineageNames":[["superkingdom","Eukaryota"]],"rank":"superkingdom","taxID":"2759","totalCount":8621,"unassignedCount":47},"Eurotiales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"]],"rank":"order","taxID":"5042","totalCount":29,"unassignedCount":6},"Eurotiomycetes":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"]],"rank":"class","taxID":"147545","totalCount":131,"unassignedCount":12},"Eurotiomycetidae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"]],"rank":"subclass","taxID":"451871","totalCount":66,"unassignedCount":21},"Exophiala":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Exophiala"]],"rank":"genus","taxID":"5583","totalCount":7,"unassignedCount":3},"Exophiala dermatitidis NIH/UT8656":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Exophiala"],["species","Exophiala dermatitidis"],["strain","Exophiala dermatitidis NIH/UT8656"]],"rank":"strain","taxID":"858893","totalCount":1,"unassignedCount":1},"Exophiala mesophila":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Exophiala"],["species","Exophiala mesophila"]],"rank":"species","taxID":"212818","totalCount":1,"unassignedCount":1},"Exophiala oligosperma":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Exophiala"],["species","Exophiala oligosperma"]],"rank":"species","taxID":"215243","totalCount":1,"unassignedCount":1},"Exophiala spinifera":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Exophiala"],["species","Exophiala spinifera"]],"rank":"species","taxID":"91928","totalCount":1,"unassignedCount":1},"Fonsecaea":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"],["genus","Fonsecaea"]],"rank":"genus","taxID":"40354","totalCount":2,"unassignedCount":2},"Fulvia fulva":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Mycosphaerellales"],["family","Mycosphaerellaceae"],["genus","Fulvia"],["species","Fulvia fulva"]],"rank":"species","taxID":"5499","totalCount":1,"unassignedCount":1},"Fungi":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"]],"rank":"kingdom","taxID":"4751","totalCount":8414,"unassignedCount":6},"Fusarium":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Hypocreales"],["family","Nectriaceae"],["genus","Fusarium"]],"rank":"genus","taxID":"5506","totalCount":4,"unassignedCount":2},"Fusarium oxysporum f. sp. radicis-lycopersici 26381":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Hypocreales"],["family","Nectriaceae"],["genus","Fusarium"],["species group","Fusarium oxysporum species complex"],["species","Fusarium oxysporum"],["forma specialis","Fusarium oxysporum f. sp. radicis-lycopersici"],["strain","Fusarium oxysporum f. sp. radicis-lycopersici 26381"]],"rank":"strain","taxID":"1089448","totalCount":2,"unassignedCount":2},"Geoglossaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Geoglossomycetes"],["order","Geoglossales"],["family","Geoglossaceae"]],"rank":"family","taxID":"34368","totalCount":52,"unassignedCount":19},"Glonium stellatum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["family","Gloniaceae"],["genus","Glonium"],["species","Glonium stellatum"]],"rank":"species","taxID":"574774","totalCount":8,"unassignedCount":8},"Glutinoglossum americanum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Geoglossomycetes"],["order","Geoglossales"],["family","Geoglossaceae"],["genus","Glutinoglossum"],["species","Glutinoglossum americanum"]],"rank":"species","taxID":"1670608","totalCount":20,"unassignedCount":20},"Golovinomyces cichoracearum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Erysiphales"],["family","Erysiphaceae"],["genus","Golovinomyces"],["species","Golovinomyces cichoracearum"]],"rank":"species","taxID":"62708","totalCount":2,"unassignedCount":2},"Golovinomyces magnicellulatus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Erysiphales"],["family","Erysiphaceae"],["genus","Golovinomyces"],["species","Golovinomyces magnicellulatus"]],"rank":"species","taxID":"62714","totalCount":1,"unassignedCount":1},"Gomphillus americanus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Ostropomycetidae"],["order","Ostropales"],["family","Graphidaceae"],["subfamily","Gomphilloideae"],["genus","Gomphillus"],["species","Gomphillus americanus"]],"rank":"species","taxID":"1940652","totalCount":10,"unassignedCount":10},"Helotiales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"]],"rank":"order","taxID":"5178","totalCount":107,"unassignedCount":54},"Herpotrichiellaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["family","Herpotrichiellaceae"]],"rank":"family","taxID":"43219","totalCount":14,"unassignedCount":2},"Heterodermia speciosa":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Caliciales"],["family","Physciaceae"],["genus","Heterodermia"],["species","Heterodermia speciosa"]],"rank":"species","taxID":"116794","totalCount":80,"unassignedCount":80},"Hortaea werneckii":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Mycosphaerellales"],["family","Teratosphaeriaceae"],["genus","Hortaea"],["species","Hortaea werneckii"]],"rank":"species","taxID":"91943","totalCount":1,"unassignedCount":1},"Hyaloscypha":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Hyaloscyphaceae"],["genus","Hyaloscypha"]],"rank":"genus","taxID":"47747","totalCount":7,"unassignedCount":3},"Hyaloscypha hepaticicola":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Hyaloscyphaceae"],["genus","Hyaloscypha"],["species","Hyaloscypha hepaticicola"]],"rank":"species","taxID":"2082293","totalCount":2,"unassignedCount":2},"Hyaloscypha sp. PMI_1271":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Hyaloscyphaceae"],["genus","Hyaloscypha"],["species","Hyaloscypha sp. PMI_1271"]],"rank":"species","taxID":"2614599","totalCount":1,"unassignedCount":1},"Hyaloscypha variabilis F":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Hyaloscyphaceae"],["genus","Hyaloscypha"],["species","Hyaloscypha variabilis"],["strain","Hyaloscypha variabilis F"]],"rank":"strain","taxID":"1149755","totalCount":1,"unassignedCount":1},"Hymenoscyphus varicosporioides":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Helotiaceae"],["genus","Hymenoscyphus"],["species","Hymenoscyphus varicosporioides"]],"rank":"species","taxID":"2075069","totalCount":2,"unassignedCount":2},"Hypocreales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Hypocreales"]],"rank":"order","taxID":"5125","totalCount":11,"unassignedCount":2},"Hypocreomycetidae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"]],"rank":"subclass","taxID":"222543","totalCount":17,"unassignedCount":2},"Hypoxylon sp. CI-4A":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Xylariomycetidae"],["order","Xylariales"],["family","Hypoxylaceae"],["genus","Hypoxylon"],["species","Hypoxylon sp. CI-4A"]],"rank":"species","taxID":"1001833","totalCount":1,"unassignedCount":1},"Imshaugia aleurites":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Parmeliaceae"],["genus","Imshaugia"],["species","Imshaugia aleurites"]],"rank":"species","taxID":"172621","totalCount":32,"unassignedCount":32},"Infundibulicybe gibba":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Basidiomycota"],["subphylum","Agaricomycotina"],["class","Agaricomycetes"],["subclass","Agaricomycetidae"],["order","Agaricales"],["suborder","Tricholomatineae"],["genus","Infundibulicybe"],["species","Infundibulicybe gibba"]],"rank":"species","taxID":"378275","totalCount":1,"unassignedCount":1},"Lachnellula":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Lachnaceae"],["genus","Lachnellula"]],"rank":"genus","taxID":"47830","totalCount":2,"unassignedCount":1},"Lachnellula suecica":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Lachnaceae"],["genus","Lachnellula"],["species","Lachnellula suecica"]],"rank":"species","taxID":"602035","totalCount":1,"unassignedCount":1},"Lecanorineae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"]],"rank":"suborder","taxID":"157822","totalCount":732,"unassignedCount":30},"Lecanoromycetes":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Lecanoromycetes"]],"rank":"class","taxID":"147547","totalCount":4745,"unassignedCount":1},"Lecanoromycetidae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"]],"rank":"subclass","taxID":"388435","totalCount":1853,"unassignedCount":881},"Leotiomycetes":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"]],"rank":"class","taxID":"147548","totalCount":171,"unassignedCount":48},"Leotiomycetes incertae sedis":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["no rank","Leotiomycetes incertae sedis"]],"rank":"no rank","taxID":"221903","totalCount":2,"unassignedCount":2},"Leotiomycetes sp. MPI-SDFR-AT-0126":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["species","Leotiomycetes sp. MPI-SDFR-AT-0126"]],"rank":"species","taxID":"2138324","totalCount":1,"unassignedCount":1},"Lepidopterella palustris CBS 459.81":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Mytilinidiales"],["family","Argynnaceae"],["genus","Lepidopterella"],["species","Lepidopterella palustris"],["strain","Lepidopterella palustris CBS 459.81"]],"rank":"strain","taxID":"1314670","totalCount":14,"unassignedCount":14},"Leptosphaeriaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Pleosporineae"],["family","Leptosphaeriaceae"]],"rank":"family","taxID":"34374","totalCount":1,"unassignedCount":1},"Letharia":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Parmeliaceae"],["genus","Letharia"]],"rank":"genus","taxID":"112415","totalCount":104,"unassignedCount":49},"Letharia columbiana":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Parmeliaceae"],["genus","Letharia"],["species","Letharia columbiana"]],"rank":"species","taxID":"112416","totalCount":40,"unassignedCount":40},"Letharia lupina":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Parmeliaceae"],["genus","Letharia"],["species","Letharia lupina"]],"rank":"species","taxID":"560253","totalCount":15,"unassignedCount":15},"Lineolata rhizophorae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["order","Lineolatales"],["family","Lineolataceae"],["genus","Lineolata"],["species","Lineolata rhizophorae"]],"rank":"species","taxID":"578093","totalCount":1,"unassignedCount":1},"Lophiotrema nucula":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["family","Lophiotremataceae"],["genus","Lophiotrema"],["species","Lophiotrema nucula"]],"rank":"species","taxID":"690887","totalCount":2,"unassignedCount":2},"Lophium mytilinum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Mytilinidiales"],["family","Mytilinidiaceae"],["genus","Lophium"],["species","Lophium mytilinum"]],"rank":"species","taxID":"390894","totalCount":2,"unassignedCount":2},"Massarina eburnea CBS 473.64":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Massarineae"],["family","Massarinaceae"],["genus","Massarina"],["species","Massarina eburnea"],["strain","Massarina eburnea CBS 473.64"]],"rank":"strain","taxID":"1395130","totalCount":1,"unassignedCount":1},"Metarhizium":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Hypocreales"],["family","Clavicipitaceae"],["genus","Metarhizium"]],"rank":"genus","taxID":"5529","totalCount":1,"unassignedCount":1},"Mollisiaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Mollisiaceae"]],"rank":"family","taxID":"2755564","totalCount":9,"unassignedCount":3},"Monilinia fructicola":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Sclerotiniaceae"],["genus","Monilinia"],["species","Monilinia fructicola"]],"rank":"species","taxID":"38448","totalCount":1,"unassignedCount":1},"Monosporascus sp. GIB2":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Xylariomycetidae"],["order","Xylariales"],["genus","Monosporascus"],["species","Monosporascus sp. GIB2"]],"rank":"species","taxID":"2211647","totalCount":1,"unassignedCount":1},"Morchella conica CCBAS932":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"],["class","Pezizomycetes"],["order","Pezizales"],["family","Morchellaceae"],["genus","Morchella"],["species","Morchella conica"],["strain","Morchella conica CCBAS932"]],"rank":"strain","taxID":"1392247","totalCount":2,"unassignedCount":2},"Morchella sect. Distantes":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"],["class","Pezizomycetes"],["order","Pezizales"],["family","Morchellaceae"],["genus","Morchella"],["section","Morchella sect. Distantes"]],"rank":"section","taxID":"1051054","totalCount":6,"unassignedCount":2},"Morchella sextelata":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"],["class","Pezizomycetes"],["order","Pezizales"],["family","Morchellaceae"],["genus","Morchella"],["section","Morchella sect. Distantes"],["species","Morchella sextelata"]],"rank":"species","taxID":"1174677","totalCount":4,"unassignedCount":4},"Mycena":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Basidiomycota"],["subphylum","Agaricomycotina"],["class","Agaricomycetes"],["subclass","Agaricomycetidae"],["order","Agaricales"],["suborder","Marasmiineae"],["family","Mycenaceae"],["genus","Mycena"]],"rank":"genus","taxID":"41247","totalCount":2,"unassignedCount":1},"Mycena venus":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Basidiomycota"],["subphylum","Agaricomycotina"],["class","Agaricomycetes"],["subclass","Agaricomycetidae"],["order","Agaricales"],["suborder","Marasmiineae"],["family","Mycenaceae"],["genus","Mycena"],["species","Mycena venus"]],"rank":"species","taxID":"2733690","totalCount":1,"unassignedCount":1},"Mycosphaerellaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Mycosphaerellales"],["family","Mycosphaerellaceae"]],"rank":"family","taxID":"93133","totalCount":6,"unassignedCount":4},"Mycosphaerellales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Mycosphaerellales"]],"rank":"order","taxID":"2726947","totalCount":13,"unassignedCount":4},"Mytilinidiales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Mytilinidiales"]],"rank":"order","taxID":"603422","totalCount":17,"unassignedCount":1},"Nitrobacteraceae":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"],["class","Alphaproteobacteria"],["order","Hyphomicrobiales"],["family","Nitrobacteraceae"]],"rank":"family","taxID":"41294","totalCount":1,"unassignedCount":1},"Nitrospira sp.":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Nitrospirae"],["class","Nitrospira"],["order","Nitrospirales"],["family","Nitrospiraceae"],["genus","Nitrospira"],["species","Nitrospira sp."]],"rank":"species","taxID":"70125","totalCount":1,"unassignedCount":1},"OSLEUM clade":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["clade","OSLEUM clade"]],"rank":"clade","taxID":"1520881","totalCount":2877,"unassignedCount":2877},"Oidiodendron maius Zn":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["family","Myxotrichaceae"],["genus","Oidiodendron"],["species","Oidiodendron maius"],["strain","Oidiodendron maius Zn"]],"rank":"strain","taxID":"913774","totalCount":1,"unassignedCount":1},"Onygenales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"]],"rank":"order","taxID":"33183","totalCount":16,"unassignedCount":5},"Opisthokonta":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"]],"rank":"clade","taxID":"33154","totalCount":8415,"unassignedCount":1},"Paecilomyces variotii":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Thermoascaceae"],["genus","Paecilomyces"],["species","Paecilomyces variotii"]],"rank":"species","taxID":"264951","totalCount":1,"unassignedCount":1},"Parmeliaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Lecanorales"],["suborder","Lecanorineae"],["family","Parmeliaceae"]],"rank":"family","taxID":"78060","totalCount":675,"unassignedCount":507},"Peltigera":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Peltigerales"],["suborder","Peltigerineae"],["family","Peltigeraceae"],["genus","Peltigera"]],"rank":"genus","taxID":"48861","totalCount":2,"unassignedCount":1},"Peltigera membranacea":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Peltigerales"],["suborder","Peltigerineae"],["family","Peltigeraceae"],["genus","Peltigera"],["species","Peltigera membranacea"]],"rank":"species","taxID":"161997","totalCount":1,"unassignedCount":1},"Penicillium steckii":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Aspergillaceae"],["genus","Penicillium"],["species","Penicillium steckii"]],"rank":"species","taxID":"303698","totalCount":1,"unassignedCount":1},"Pentapetalae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Viridiplantae"],["phylum","Streptophyta"],["subphylum","Streptophytina"],["class","Magnoliopsida"],["clade","Embryophyta"],["clade","Pentapetalae"]],"rank":"clade","taxID":"1437201","totalCount":1,"unassignedCount":1},"Periconia macrospinosa":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Massarineae"],["family","Periconiaceae"],["genus","Periconia"],["species","Periconia macrospinosa"]],"rank":"species","taxID":"97972","totalCount":1,"unassignedCount":1},"Pezizaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"],["class","Pezizomycetes"],["order","Pezizales"],["family","Pezizaceae"]],"rank":"family","taxID":"5186","totalCount":2,"unassignedCount":1},"Pezizales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"],["class","Pezizomycetes"],["order","Pezizales"]],"rank":"order","taxID":"5185","totalCount":18,"unassignedCount":5},"Pezizomycotina":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"]],"rank":"subphylum","taxID":"147538","totalCount":8350,"unassignedCount":23},"Phaeosphaeria sp. MPI-PUGE-AT-0046c":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Pleosporineae"],["family","Phaeosphaeriaceae"],["genus","Phaeosphaeria"],["species","Phaeosphaeria sp. MPI-PUGE-AT-0046c"]],"rank":"species","taxID":"2821754","totalCount":1,"unassignedCount":1},"Phialocephala subalpina":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Mollisiaceae"],["genus","Phialocephala"],["species","Phialocephala subalpina"]],"rank":"species","taxID":"576137","totalCount":2,"unassignedCount":2},"Physcia stellaris":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Caliciales"],["family","Physciaceae"],["genus","Physcia"],["species","Physcia stellaris"]],"rank":"species","taxID":"116821","totalCount":53,"unassignedCount":53},"Physciaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Lecanoromycetidae"],["order","Caliciales"],["family","Physciaceae"]],"rank":"family","taxID":"50934","totalCount":238,"unassignedCount":105},"Piedraia hortae CBS 480.64":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Capnodiales"],["family","Piedraiaceae"],["genus","Piedraia"],["species","Piedraia hortae"],["strain","Piedraia hortae CBS 480.64"]],"rank":"strain","taxID":"1314780","totalCount":1,"unassignedCount":1},"Pleosporales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"]],"rank":"order","taxID":"92860","totalCount":21,"unassignedCount":4},"Pleosporineae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Pleosporineae"]],"rank":"suborder","taxID":"715340","totalCount":8,"unassignedCount":1},"Pleosporomycetidae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"]],"rank":"subclass","taxID":"451868","totalCount":81,"unassignedCount":25},"Polytolypa hystricis UAMH7299":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"],["genus","Polytolypa"],["species","Polytolypa hystricis"],["strain","Polytolypa hystricis UAMH7299"]],"rank":"strain","taxID":"1447883","totalCount":2,"unassignedCount":2},"Porphyra umbilicalis":{"lineageNames":[["superkingdom","Eukaryota"],["phylum","Rhodophyta"],["class","Bangiophyceae"],["order","Bangiales"],["family","Bangiaceae"],["genus","Porphyra"],["species","Porphyra umbilicalis"]],"rank":"species","taxID":"2786","totalCount":1,"unassignedCount":1},"Proteobacteria bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"],["species","Proteobacteria bacterium"]],"rank":"species","taxID":"1977087","totalCount":1,"unassignedCount":1},"Pseudogymnoascus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["family","Pseudeurotiaceae"],["genus","Pseudogymnoascus"]],"rank":"genus","taxID":"78156","totalCount":6,"unassignedCount":2},"Pseudogymnoascus sp. VKM F-4514 (FW-929)":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["family","Pseudeurotiaceae"],["genus","Pseudogymnoascus"],["species","Pseudogymnoascus sp. VKM F-4514 (FW-929)"]],"rank":"species","taxID":"1420908","totalCount":1,"unassignedCount":1},"Pseudogymnoascus sp. VKM F-4519 (FW-2642)":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["family","Pseudeurotiaceae"],["genus","Pseudogymnoascus"],["species","Pseudogymnoascus sp. VKM F-4519 (FW-2642)"]],"rank":"species","taxID":"1420914","totalCount":1,"unassignedCount":1},"Pseudovirgaria hyperparasitica":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["order","Acrospermales"],["family","Acrospermaceae"],["genus","Pseudovirgaria"],["species","Pseudovirgaria hyperparasitica"]],"rank":"species","taxID":"470096","totalCount":2,"unassignedCount":2},"Punctularia strigosozonata HHB-11173 SS5":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Basidiomycota"],["subphylum","Agaricomycotina"],["class","Agaricomycetes"],["order","Corticiales"],["family","Punctulariaceae"],["genus","Punctularia"],["species","Punctularia strigosozonata"],["strain","Punctularia strigosozonata HHB-11173 SS5"]],"rank":"strain","taxID":"741275","totalCount":1,"unassignedCount":1},"Pyrenophora tritici-repentis":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Pleosporales"],["suborder","Pleosporineae"],["family","Pleosporaceae"],["genus","Pyrenophora"],["species","Pyrenophora tritici-repentis"]],"rank":"species","taxID":"45151","totalCount":1,"unassignedCount":1},"Pyronemataceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"],["class","Pezizomycetes"],["order","Pezizales"],["family","Pyronemataceae"]],"rank":"family","taxID":"110846","totalCount":3,"unassignedCount":2},"Rachicladosporium antarcticum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Cladosporiales"],["family","Cladosporiaceae"],["genus","Rachicladosporium"],["species","Rachicladosporium antarcticum"]],"rank":"species","taxID":"1507870","totalCount":1,"unassignedCount":1},"Rhizodiscina lignyota":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Aulographales"],["family","Rhizodiscinaceae"],["genus","Rhizodiscina"],["species","Rhizodiscina lignyota"]],"rank":"species","taxID":"1504668","totalCount":3,"unassignedCount":3},"Rickenella mellea":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Basidiomycota"],["subphylum","Agaricomycotina"],["class","Agaricomycetes"],["order","Hymenochaetales"],["family","Rickenellaceae"],["genus","Rickenella"],["species","Rickenella mellea"]],"rank":"species","taxID":"50990","totalCount":4,"unassignedCount":4},"Rosellinia necatrix":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Xylariomycetidae"],["order","Xylariales"],["family","Xylariaceae"],["genus","Rosellinia"],["species","Rosellinia necatrix"]],"rank":"species","taxID":"77044","totalCount":2,"unassignedCount":2},"Rutstroemia sp. NJR-2017a WRK4":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Rutstroemiaceae"],["genus","Rutstroemia"],["species","Rutstroemia sp. NJR-2017a WRK4"]],"rank":"species","taxID":"2070412","totalCount":1,"unassignedCount":1},"Saitoella complicata NRRL Y-17804":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Taphrinomycotina"],["genus","Saitoella"],["species","Saitoella complicata"],["strain","Saitoella complicata NRRL Y-17804"]],"rank":"strain","taxID":"698492","totalCount":1,"unassignedCount":1},"Sclerotiniaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Sclerotiniaceae"]],"rank":"family","taxID":"28983","totalCount":4,"unassignedCount":2},"Serpula lacrymans var. lacrymans":{"lineageNames":[["superkingdom","Eukaryota"],["clade","Opisthokonta"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Basidiomycota"],["subphylum","Agaricomycotina"],["class","Agaricomycetes"],["subclass","Agaricomycetidae"],["order","Boletales"],["suborder","Coniophorineae"],["family","Serpulaceae"],["genus","Serpula"],["species","Serpula lacrymans"],["varietas","Serpula lacrymans var. lacrymans"]],"rank":"varietas","taxID":"341189","totalCount":1,"unassignedCount":1},"Sordariomycetes":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"]],"rank":"class","taxID":"147550","totalCount":44,"unassignedCount":18},"Sphaerosporella brunnea":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"],["class","Pezizomycetes"],["order","Pezizales"],["family","Pyronemataceae"],["genus","Sphaerosporella"],["species","Sphaerosporella brunnea"]],"rank":"species","taxID":"1250544","totalCount":1,"unassignedCount":1},"Stromatinia cepivora":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Sclerotiniaceae"],["genus","Stromatinia"],["species","Stromatinia cepivora"]],"rank":"species","taxID":"38492","totalCount":1,"unassignedCount":1},"Talaromyces":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Trichocomaceae"],["genus","Talaromyces"]],"rank":"genus","taxID":"5094","totalCount":7,"unassignedCount":3},"Talaromyces islandicus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Trichocomaceae"],["genus","Talaromyces"],["section","Talaromyces sect. Islandici"],["species","Talaromyces islandicus"]],"rank":"species","taxID":"28573","totalCount":1,"unassignedCount":1},"Talaromyces pinophilus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Trichocomaceae"],["genus","Talaromyces"],["section","Talaromyces sect. Talaromyces"],["species","Talaromyces pinophilus"]],"rank":"species","taxID":"1472165","totalCount":1,"unassignedCount":1},"Talaromyces sect. Talaromyces":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Trichocomaceae"],["genus","Talaromyces"],["section","Talaromyces sect. Talaromyces"]],"rank":"section","taxID":"2752537","totalCount":3,"unassignedCount":1},"Talaromyces stipitatus ATCC 10500":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Eurotiales"],["family","Trichocomaceae"],["genus","Talaromyces"],["section","Talaromyces sect. Talaromyces"],["species","Talaromyces stipitatus"],["strain","Talaromyces stipitatus ATCC 10500"]],"rank":"strain","taxID":"441959","totalCount":1,"unassignedCount":1},"Terfezia claveryi":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["subphylum","Pezizomycotina"],["class","Pezizomycetes"],["order","Pezizales"],["family","Pezizaceae"],["genus","Terfezia"],["species","Terfezia claveryi"]],"rank":"species","taxID":"139407","totalCount":1,"unassignedCount":1},"Terrabacteria group":{"lineageNames":[["superkingdom","Bacteria"],["clade","Terrabacteria group"]],"rank":"clade","taxID":"1783272","totalCount":10,"unassignedCount":1},"Thelonectria olida":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Hypocreales"],["family","Nectriaceae"],["genus","Thelonectria"],["species","Thelonectria olida"]],"rank":"species","taxID":"1576542","totalCount":2,"unassignedCount":2},"Tothia fuscella":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Venturiales"],["family","Cylindrosympodiaceae"],["genus","Tothia"],["species","Tothia fuscella"]],"rank":"species","taxID":"1048955","totalCount":1,"unassignedCount":1},"Trebouxia sp. A1-2":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Viridiplantae"],["phylum","Chlorophyta"],["clade","core chlorophytes"],["class","Trebouxiophyceae"],["order","Trebouxiales"],["family","Trebouxiaceae"],["genus","Trebouxia"],["species","Trebouxia sp. A1-2"]],"rank":"species","taxID":"2608996","totalCount":156,"unassignedCount":156},"Trichoderma gamsii":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Hypocreomycetidae"],["order","Hypocreales"],["family","Hypocreaceae"],["genus","Trichoderma"],["species","Trichoderma gamsii"]],"rank":"species","taxID":"398673","totalCount":1,"unassignedCount":1},"Trichoglossum hirsutum":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Geoglossomycetes"],["order","Geoglossales"],["family","Geoglossaceae"],["genus","Trichoglossum"],["species","Trichoglossum hirsutum"]],"rank":"species","taxID":"265104","totalCount":13,"unassignedCount":13},"Trichophyton":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Eurotiomycetidae"],["order","Onygenales"],["family","Arthrodermataceae"],["genus","Trichophyton"]],"rank":"genus","taxID":"5550","totalCount":1,"unassignedCount":1},"Umbilicaria":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Umbilicariomycetidae"],["order","Umbilicariales"],["family","Umbilicariaceae"],["genus","Umbilicaria"]],"rank":"genus","taxID":"87270","totalCount":3,"unassignedCount":1},"Umbilicaria muhlenbergii":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Umbilicariomycetidae"],["order","Umbilicariales"],["family","Umbilicariaceae"],["genus","Umbilicaria"],["species","Umbilicaria muhlenbergii"]],"rank":"species","taxID":"2738368","totalCount":2,"unassignedCount":2},"Umbilicariaceae":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["class","Lecanoromycetes"],["clade","Opisthokonta"],["subclass","Umbilicariomycetidae"],["order","Umbilicariales"],["family","Umbilicariaceae"]],"rank":"family","taxID":"87265","totalCount":4,"unassignedCount":1},"Venturia nashicola":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Venturiales"],["family","Venturiaceae"],["genus","Venturia"],["species","Venturia nashicola"]],"rank":"species","taxID":"86259","totalCount":1,"unassignedCount":1},"Venustampulla echinocandica":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["order","Helotiales"],["family","Pleuroascaceae"],["genus","Venustampulla"],["species","Venustampulla echinocandica"]],"rank":"species","taxID":"2656787","totalCount":3,"unassignedCount":3},"Verruconis gallopava":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Pleosporomycetidae"],["order","Venturiales"],["family","Sympoventuriaceae"],["genus","Verruconis"],["species","Verruconis gallopava"]],"rank":"species","taxID":"253628","totalCount":1,"unassignedCount":1},"Viridothelium virens":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["order","Trypetheliales"],["family","Trypetheliaceae"],["genus","Viridothelium"],["species","Viridothelium virens"]],"rank":"species","taxID":"1048519","totalCount":4,"unassignedCount":4},"Xylaria flabelliformis":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Xylariomycetidae"],["order","Xylariales"],["family","Xylariaceae"],["genus","Xylaria"],["species","Xylaria flabelliformis"]],"rank":"species","taxID":"2512241","totalCount":1,"unassignedCount":1},"Xylaria multiplex":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Xylariomycetidae"],["order","Xylariales"],["family","Xylariaceae"],["genus","Xylaria"],["species","Xylaria multiplex"]],"rank":"species","taxID":"323545","totalCount":1,"unassignedCount":1},"Xylariales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Sordariomycetes"],["subclass","Xylariomycetidae"],["order","Xylariales"]],"rank":"order","taxID":"37989","totalCount":8,"unassignedCount":2},"Xylogone sp. PMI_703":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["genus","Xylogone"],["species","Xylogone sp. PMI_703"]],"rank":"species","taxID":"2614602","totalCount":1,"unassignedCount":1},"Xylona heveae TC161":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Xylonomycetes"],["order","Xylonales"],["family","Xylonaceae"],["genus","Xylona"],["species","Xylona heveae"],["strain","Xylona heveae TC161"]],"rank":"strain","taxID":"1328760","totalCount":40,"unassignedCount":40},"Zopfia rhizophila CBS 207.26":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["family","Zopfiaceae"],["genus","Zopfia"],["species","Zopfia rhizophila"],["strain","Zopfia rhizophila CBS 207.26"]],"rank":"strain","taxID":"1314779","totalCount":2,"unassignedCount":2},"Zymoseptoria tritici":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Dothideomycetes"],["subclass","Dothideomycetidae"],["order","Mycosphaerellales"],["family","Mycosphaerellaceae"],["genus","Zymoseptoria"],["species","Zymoseptoria tritici"]],"rank":"species","taxID":"1047171","totalCount":1,"unassignedCount":1},"cellular organisms":{"lineageNames":[["no rank","cellular organisms"]],"rank":"no rank","taxID":"131567","totalCount":11,"unassignedCount":11},"leotiomyceta":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["clade","leotiomyceta"]],"rank":"clade","taxID":"716546","totalCount":2893,"unassignedCount":2893},"root":{"lineageNames":[["no rank","root"]],"rank":"no rank","taxID":"NA","totalCount":1201,"unassignedCount":1201},"saccharomyceta":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["clade","Opisthokonta"],["clade","saccharomyceta"]],"rank":"clade","taxID":"716545","totalCount":6,"unassignedCount":6},"sordariomyceta":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["clade","sordariomyceta"]],"rank":"clade","taxID":"715989","totalCount":23,"unassignedCount":23},"unclassified Chaetothyriales":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Eurotiomycetes"],["subclass","Chaetothyriomycetidae"],["order","Chaetothyriales"],["no rank","unclassified Chaetothyriales"]],"rank":"no rank","taxID":"316340","totalCount":1,"unassignedCount":1},"unclassified Genomoviridae":{"lineageNames":[["superkingdom","Viruses"],["clade","Monodnaviria"],["kingdom","Shotokuvirae"],["phylum","Cressdnaviricota"],["class","Repensiviricetes"],["order","Geplafuvirales"],["family","Genomoviridae"],["no rank","unclassified Genomoviridae"]],"rank":"no rank","taxID":"1941235","totalCount":1,"unassignedCount":1},"unclassified Pseudogymnoascus":{"lineageNames":[["superkingdom","Eukaryota"],["kingdom","Fungi"],["subkingdom","Dikarya"],["phylum","Ascomycota"],["subphylum","Pezizomycotina"],["clade","Opisthokonta"],["class","Leotiomycetes"],["family","Pseudeurotiaceae"],["genus","Pseudogymnoascus"],["no rank","unclassified Pseudogymnoascus"]],"rank":"no rank","taxID":"2637121","totalCount":2,"unassignedCount":2},"uncultured Segetibacter sp.":{"lineageNames":[["superkingdom","Bacteria"],["clade","FCB group"],["phylum","Bacteroidota"],["class","Chitinophagia"],["order","Chitinophagales"],["family","Chitinophagaceae"],["genus","Segetibacter"],["species","uncultured Segetibacter sp."]],"rank":"species","taxID":"481133","totalCount":5,"unassignedCount":5}}');
//var taxonList:Taxon[] = [];
var lineagesNamesOnlyArray = [];
var domContainer = document.querySelector('#plot-container');
var reactRoot = ReactDOM.createRoot(domContainer);
var domContainer2 = document.querySelector('#labels');
var reactRoot2 = ReactDOM.createRoot(domContainer2);
var viewportDimensions = getViewportDimensions();
/*
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
    // var fullPlot:Plot = new Plot();
    // var mycosphaerellalesPlot:Plot = new Plot("Bacteria", 0, true, viewportDimensions);
    // var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, true, viewportDimensions);
    // var mycosphaerellalesPlot:Plot = new Plot("Mycosphaerellales", 8, false, viewportDimensions);
    // var mycosphaerellalesPlot:Plot = new Plot("Eurotiomycetes", 6, false);
    var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, false);
    addEventListener("resize", (event) => {
        console.log("resize event");
        viewportDimensions = getViewportDimensions();
        mycosphaerellalesPlot.updateviewportDimensions(viewportDimensions);
        mycosphaerellalesPlot.calculateSVGPaths();
        mycosphaerellalesPlot.getTaxonLabelSpecifics();
        mycosphaerellalesPlot.getTaxonShapeSpecifics();
        mycosphaerellalesPlot.draw();
    });
})
*/
function loadDataFromTSV(tsv_path) {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: { "tsv_path": tsv_path },
        success: function (response) {
            allTaxa = response["taxDict"];
            console.log("taxopy data as JSON object: ", JSON.stringify(allTaxa));
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}
// 1 extra Talaromyces sect. Talaromyces
var Plot = /** @class */ (function () {
    function Plot(root, layer, collapse) {
        if (root === void 0) { root = ""; }
        if (layer === void 0) { layer = -1; }
        if (collapse === void 0) { collapse = true; }
        this.structure = {};
        this.structureByTaxon = {};
        this.svgPaths = {};
        this.taxonLabelSpecifics = {};
        this.taxonShapeSpecifics = {};
        this.root = root;
        this.layer = layer;
        this.viewportDimensions = viewportDimensions;
        this.draw();
    }
    Plot.prototype.draw = function () {
        // remove GoL;
        reactRoot.render(React.createElement(PlotDrawing, { lineages: lineagesNamesOnlyArray, ranks: lineagesRanksOnlyArray }));
    };
    Plot.prototype.updateviewportDimensions = function (newDimensions) {
        this.viewportDimensions = newDimensions;
    };
    return Plot;
}());
function radians(degrees) {
    degrees = 270 - degrees;
    var pi = Math.PI;
    return degrees * (pi / 180);
}
// type TaxonShapeProps = {
//    d: string;
// }
//var TaxonShape = ({ d }: TaxonShapeProps) => <path d={d} />;
function getViewportDimensions() {
    var dpmm = document.getElementById('dpmm').offsetWidth; // returns the div's width in px, thereby telling us how many px equal 1mm for our particular screen
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    return {
        "cx": cx,
        "cy": cy,
        "dpmm": dpmm
    };
}
'use strict';
var e = React.createElement;
function TaxonShape(props) {
    return React.createElement("path", { id: props.id, d: props.d, onMouseOver: function () { return hoverHandler(props.id); }, onMouseOut: function () { return onMouseOutHandler(props.id); }, onClick: props.onClick, style: { "stroke": "#800080", "strokeWidth": "0.2vmin", "fill": props.fillColor } });
}
function TaxonLabel(props) {
    return React.createElement("p", { id: "".concat(props.taxon, "-label"), onMouseOver: function () { return hoverHandler(props.taxon); }, onMouseOut: function () { return onMouseOutHandler(props.taxon); }, onClick: props.onClick, style: { "backgroundColor": "white", "margin": "0", "position": "absolute", "fontFamily": "calibri", "fontSize": "2vmin", "left": props.left, "right": props.right, "top": props.top, "transformOrigin": props.transformOrigin, "transform": props.transform, "border": "0.2vmin solid #800080" } }, props.taxon.replace(/_-_\d+/, ""));
}
var PlotDrawing = /** @class */ (function (_super) {
    __extends(PlotDrawing, _super);
    function PlotDrawing(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            root: "Bacteria",
            layer: 1,
            collapse: false,
            horizontalShift: viewportDimensions["cx"],
            verticalShift: viewportDimensions["cy"],
            croppedLineages: [],
            croppedRanks: [],
            unassignedCounts: [],
            structureByDegrees: {},
            structureByTaxon: {},
            svgPaths: {},
            taxonLabels: {},
            taxonShapes: {},
            colors: ["d27979", "c0d279", "79d29c", "799cd2", "c079d2"],
            ancestors: [""]
        };
        return _this;
    }
    PlotDrawing.prototype.componentDidMount = function () {
        var _this = this;
        this.cropLineages();
        document.getElementById("change-palette").addEventListener("click", function () {
            _this.changePalette();
        });
        addEventListener("resize", function (event) {
            console.log("resize event");
            var newViewportDimensions = getViewportDimensions();
            _this.setState({ horizontalShift: newViewportDimensions["cx"], verticalShift: newViewportDimensions["cy"] }, function () { return _this.calculateSVGPaths({}); });
        });
    };
    // Leave only relevant lineages and crop them if necessary.
    PlotDrawing.prototype.cropLineages = function (root, layer) {
        if (root === void 0) { root = this.state.root; }
        if (layer === void 0) { layer = this.state.layer; }
        var ancestors = [""];
        var croppedLineages = JSON.parse(JSON.stringify(this.props.lineages)); // make sure changing croppedLineages will not attempt to change this.props.lineages
        var croppedRanks = JSON.parse(JSON.stringify(this.props.ranks));
        if (!(root === "root" && layer === 0)) { // if the full plot is requested
            console.log("root, croppedLineages unaltered, layer: ", root, croppedLineages, layer);
            croppedLineages = this.props.lineages.filter(function (item) { return item[layer] === root; }); // filter out all irrelevant lineages
            if (!croppedLineages[0]) {
                console.log("root, layer: ", root, layer + 1);
                layer++;
                croppedLineages = this.props.lineages.filter(function (item) { return item[layer] === root; });
            }
            var ancestors = croppedLineages[0].slice(0, layer);
            croppedLineages = croppedLineages.map(function (item) { return item.slice(layer); }); // crop remaining lineages so they start with the root taxon
        }
        var croppedRanks = [];
        for (var i = 0; i < this.props.lineages.length; i++) {
            if (this.props.lineages[i][layer] === root) {
                croppedRanks.push(this.props.ranks[i]);
            }
        }
        croppedRanks = croppedRanks.map(function (item) { return item.slice(layer); });
        var unassignedCounts = croppedLineages.map(function (item) { return allTaxa[item[item.length - 1]]["unassignedCount"]; });
        var ranksUnique = croppedRanks.reduce(function (accumulator, value) { return accumulator.concat(value); }, []);
        ranksUnique = ranksUnique.filter(function (value, index, self) { return Boolean(value) && self.indexOf(value) === index; });
        var rankPattern = ranks.filter(function (item) { return ranksUnique.indexOf(item) > -1; });
        console.log("rankPattern: ", rankPattern);
        for (var i = 0; i < croppedRanks.length; i++) {
            for (var j = croppedRanks[i].length - 1; j >= 0; j--) {
                if (!rankPattern.includes(croppedRanks[i][j])) {
                    console.log("excluded rank: ", croppedRanks[i][j]);
                    croppedRanks[i].splice(j, 1);
                    croppedLineages[i].splice(j, 1);
                }
            }
        }
        if (this.state.collapse) {
            croppedLineages = this.collapse(croppedLineages);
        }
        var croppedLineagesStrings = croppedLineages.map(function (item) { return item.join(" "); });
        for (var i = croppedLineagesStrings.length - 1; i >= 0; i--) {
            var lastOccurrence = i;
            var firstOccurrence = croppedLineagesStrings.indexOf(croppedLineagesStrings[i]);
            if (firstOccurrence !== lastOccurrence) {
                console.log("lineage, fO, lO: ", croppedLineagesStrings[i], firstOccurrence, lastOccurrence, unassignedCounts[firstOccurrence], unassignedCounts[lastOccurrence]);
                unassignedCounts[firstOccurrence] += unassignedCounts[lastOccurrence];
                console.log("result: ", unassignedCounts[firstOccurrence]);
                unassignedCounts.splice(i, 1);
                croppedLineages.splice(i, 1);
                croppedRanks.splice(i, 1);
            }
            ;
        }
        var alignedCropppedLineages = [];
        var alignedCropppedRanks = [];
        for (var i = 0; i < croppedLineages.length; i++) {
            var alignedLineage = new Array(rankPattern.length).fill(null);
            var alignedRank = new Array(rankPattern.length).fill(null);
            for (var j = 0; j < croppedRanks[i].length; j++) {
                var index = rankPattern.indexOf(croppedRanks[i][j]);
                if (index > -1) {
                    alignedLineage.splice(index, 1, croppedLineages[i][j]);
                    alignedRank.splice(index, 1, croppedRanks[i][j]);
                }
            }
            alignedCropppedLineages.push(alignedLineage);
            alignedCropppedRanks.push(alignedRank);
        }
        croppedLineages = alignedCropppedLineages;
        console.log("alignedCropppedLineages: ", alignedCropppedLineages);
        console.log("alignedCropppedRanks: ", alignedCropppedRanks);
        if (croppedLineages.length > 1) {
            this.assignDegrees({ "root": root, "layer": layer, "croppedLineages": croppedLineages, "croppedRanks": croppedRanks, "unassignedCounts": unassignedCounts, "ancestors": ancestors });
        }
    };
    // Assign each cropped lineage a start and end degree.
    PlotDrawing.prototype.assignDegrees = function (newState) {
        var unassignedCounts = newState["unassignedCounts"] === undefined ? this.state.unassignedCounts : newState["unassignedCounts"];
        var totalUnassignedCounts = unassignedCounts.reduce(function (accumulator, current) { return accumulator + current; }, 0); // sum up
        var lineageStartDeg = 0;
        var lineageEndDeg;
        var key;
        var structure = {};
        for (var taxonIndex = 0; taxonIndex < newState["croppedLineages"].length; taxonIndex++) {
            lineageEndDeg = lineageStartDeg + unassignedCounts[taxonIndex] * 360 / totalUnassignedCounts;
            if (lineageStartDeg === 0 && lineageEndDeg === 360) {
                lineageEndDeg = 359.75;
            }
            ;
            key = "".concat(lineageStartDeg, "-").concat(lineageEndDeg, " deg"); // name section
            structure[key] = newState["croppedLineages"][taxonIndex]; // assign
            lineageStartDeg = lineageEndDeg;
        }
        newState["structureByDegrees"] = structure;
        this.getStructureByTaxon(newState);
    };
    // If collapse=true, remove taxa that only come up in the lineage of one other taxon and have no unassigned counts of their own.
    PlotDrawing.prototype.collapse = function (croppedLineages) {
        var lineagesCopy = JSON.parse(JSON.stringify(croppedLineages));
        var layers = getLayers(lineagesCopy);
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (layers[i].filter(function (item) { return item === layers[i][j]; }).length === 1 && Boolean(layers[i + 1][j])) {
                    lineagesCopy[j].splice(i, 1, "toBeDeleted");
                }
            };
            for (var j = 0; j < layers[i].length; j++) {
                _loop_2(j);
            }
        };
        for (var i = 0; i < layers.length - 1; i++) {
            _loop_1(i);
        }
        for (var i = 0; i < lineagesCopy.length; i++) {
            lineagesCopy[i] = lineagesCopy[i].filter(function (item) { return item !== "toBeDeleted"; });
        }
        return lineagesCopy;
    };
    PlotDrawing.prototype.getStructureByTaxon = function (newState) {
        var structureByTaxon = {};
        var lineagesCopy = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var layers = getLayers(lineagesCopy);
        var layersUnique = getLayers(lineagesCopy, true);
        for (var i = 1; i < layers.length; i++) {
            for (var j = 0; j < layers[i].length; j++) {
                var key = layers[i][j];
            }
        }
        for (var i = 1; i < layersUnique.length; i++) {
            for (var j = 0; j < layersUnique[i].length; j++) {
                var key = layersUnique[i][j];
                var firstOccurrenceInLayer = layers[i].indexOf(key);
                var lastOccurrenceInLayer = layers[i].lastIndexOf(key);
                var structureSectionsArray = Object.keys(newState["structureByDegrees"]);
                var startDegrees = Number(structureSectionsArray[firstOccurrenceInLayer].slice(0, structureSectionsArray[firstOccurrenceInLayer].length - 4).split("-")[0]);
                var potentialMidDegrees = Number(structureSectionsArray[firstOccurrenceInLayer].slice(0, structureSectionsArray[firstOccurrenceInLayer].length - 4).split("-")[1]);
                var endDegrees = Number(structureSectionsArray[lastOccurrenceInLayer].slice(0, structureSectionsArray[lastOccurrenceInLayer].length - 4).split("-")[1]);
                var actualIndex = i;
                var verticalMin = i;
                var verticalMin0 = true;
                for (var k = 1; k < i; k++) {
                    verticalMin0 = verticalMin0 && layers[k][firstOccurrenceInLayer] === null;
                }
                if (verticalMin0) {
                    verticalMin = 1;
                }
                var verticalMax = i + 1;
                var breakingPoints = [];
                var breakingLayers = [];
                for (var l = firstOccurrenceInLayer; l <= lastOccurrenceInLayer; l++) {
                    var point = Number(structureSectionsArray[l].slice(0, structureSectionsArray[l].length - 4).split("-")[1]);
                    var layer = i + 1;
                    for (var m = i; m < layers.length - 1; m++) {
                        if (layers[m + 1][l] === null) {
                            layer++;
                        }
                        else {
                            break;
                        }
                    }
                    breakingPoints.push(point);
                    breakingLayers.push(layer);
                }
                var breakingPointsFiltered = [];
                var breakingLayersFiltered = [];
                for (var n = 0; n < breakingLayers.length - 1; n++) {
                    if (!(breakingLayers[n] === breakingLayers[n + 1])) {
                        breakingLayersFiltered.push(breakingLayers[n]);
                        breakingPointsFiltered.push(breakingPoints[n]);
                    }
                }
                breakingLayersFiltered.push(breakingLayers[breakingLayers.length - 1]);
                breakingPointsFiltered.push(breakingPoints[breakingLayers.length - 1]);
                for (var k = i + 1; k < layers.length; k++) {
                    if (layers[k][firstOccurrenceInLayer] === null) {
                        verticalMax++;
                    }
                }
                var breakingPoint = verticalMax === verticalMin + 1 || potentialMidDegrees === endDegrees ? null : potentialMidDegrees;
                key += "_-_".concat(verticalMin);
                structureByTaxon[key] = {
                    "horizontalWidthInDeg": [round(startDegrees), round(endDegrees)],
                    "verticalWidthInLayerIndices": [verticalMin, verticalMax],
                    "breakingLayers": breakingLayersFiltered,
                    "breakingPoints": breakingPointsFiltered,
                    "actualIndex": actualIndex
                };
            }
        }
        newState["structureByTaxon"] = structureByTaxon;
        console.log("newState[structureByTaxon]: ", newState["structureByTaxon"]);
        this.calculateSVGPaths(newState);
    };
    PlotDrawing.prototype.calculateArcEndpoints = function (layer, layerWidthInPx, deg1, deg2) {
        var radius = layer * layerWidthInPx; // in px
        var x1 = round(radius * cos(deg1) + this.state.horizontalShift);
        var y1 = round(-radius * sin(deg1) + this.state.verticalShift);
        var x2 = round(radius * cos(deg2) + this.state.horizontalShift);
        var y2 = round(-radius * sin(deg2) + this.state.verticalShift);
        return { x1: x1, y1: y1, x2: x2, y2: y2, radius: round(radius) };
    };
    PlotDrawing.prototype.calculateSVGPaths = function (newState) {
        var croppedLineages = newState["croppedLineages"] == undefined ? this.state.croppedLineages : newState["croppedLineages"];
        var structureByTaxon = newState["structureByTaxon"] == undefined ? this.state.structureByTaxon : newState["structureByTaxon"];
        var dpmm = viewportDimensions["dpmm"];
        var lineagesCopy = JSON.parse(JSON.stringify(croppedLineages));
        var layers = getLayers(lineagesCopy);
        var numberOfLayers = Object.keys(layers).length;
        var smallerDimension = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 5);
        var svgPaths = {};
        var firstLayer = function (key) { return structureByTaxon[key].verticalWidthInLayerIndices[0]; };
        var lastLayer = function (key) { return structureByTaxon[key].verticalWidthInLayerIndices[1]; };
        var startDeg = function (key) { return structureByTaxon[key].horizontalWidthInDeg[0]; };
        var endDeg = function (key) { return structureByTaxon[key].horizontalWidthInDeg[1]; };
        for (var _i = 0, _a = Object.keys(structureByTaxon); _i < _a.length; _i++) {
            var key = _a[_i];
            var innerArc = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
            var innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(round(firstLayer(key) * layerWidth), ",").concat(round(firstLayer(key) * layerWidth), " 0 0 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
            if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                var innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(innerArc["radius"], ",").concat(innerArc["radius"], " 0 1 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
            }
            ;
            var subpaths = [innerArcPath];
            var midArc = {};
            for (var i = structureByTaxon[key].breakingLayers.length - 1; i >= 0; i--) {
                var curr = structureByTaxon[key].breakingPoints[i];
                var prev = i === 0 ? startDeg(key) : structureByTaxon[key].breakingPoints[i - 1];
                midArc = this.calculateArcEndpoints(structureByTaxon[key].breakingLayers[i], layerWidth, prev, curr);
                var midArcPath = "L ".concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 0 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                if (Math.abs(curr - prev) >= 180) {
                    var midArcPath = "L ".concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 1 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                }
                ;
                subpaths.push(midArcPath);
            }
            var lineInnertoOuter = "L ".concat(midArc["x1"], ",").concat(midArc["y1"], " ").concat(innerArc["x1"], ",").concat(innerArc["y1"]);
            subpaths.push(lineInnertoOuter);
            var d = subpaths.join(" ");
            svgPaths[key] = d;
        }
        ;
        newState["svgPaths"] = svgPaths;
        console.log("newState[svgPaths]: ", newState["svgPaths"]);
        this.calculateTaxonLabels(newState);
    };
    PlotDrawing.prototype.calculateTaxonLabels = function (newState) {
        var croppedLineages = newState["croppedLineages"] == undefined ? this.state.croppedLineages : newState["croppedLineages"];
        var structureByTaxon = newState["structureByTaxon"] == undefined ? this.state.structureByTaxon : newState["structureByTaxon"];
        var shapeCenters = {};
        var cx = this.state.horizontalShift;
        var cy = this.state.verticalShift;
        ;
        var lineagesCopy = JSON.parse(JSON.stringify(croppedLineages));
        var layers = getLayers(lineagesCopy);
        var layerWidthInPx = Math.max((Math.min(cx, cy) - viewportDimensions["dpmm"] * 10) / Object.keys(layers).length, viewportDimensions["dpmm"] * 4);
        var firstLayer = function (key) { return structureByTaxon[key].verticalWidthInLayerIndices[0]; };
        var lastLayer = function (key) { return structureByTaxon[key].verticalWidthInLayerIndices[1]; };
        var startDeg = function (key) { return structureByTaxon[key].horizontalWidthInDeg[0]; };
        var endDeg = function (key) { return structureByTaxon[key].horizontalWidthInDeg[1]; };
        var breakingPt = function (key) { return structureByTaxon[key].breakingPoint; };
        var taxonLabels = {};
        for (var _i = 0, _a = Object.keys(structureByTaxon); _i < _a.length; _i++) {
            var key = _a[_i];
            var centerDegree = void 0, centerRadius = void 0;
            centerDegree = startDeg(key) + (endDeg(key) - startDeg(key)) / 2;
            centerRadius = structureByTaxon[key].actualIndex + 0.5;
            var centerX = centerRadius * layerWidthInPx * cos(centerDegree);
            centerX = round(centerX) + cx;
            var centerY = -centerRadius * layerWidthInPx * sin(centerDegree);
            centerY = round(centerY) + cy;
            var center = [centerX, centerY, centerDegree];
            shapeCenters[key] = center;
        }
        ;
        for (var _b = 0, _c = Object.keys(structureByTaxon); _b < _c.length; _b++) {
            var key = _c[_b];
            var direction = (Object.keys(layers).length - structureByTaxon[key].actualIndex === 1) ? "radial" : "circumferential";
            var twist = void 0, left = void 0, right = void 0, top_1 = void 0, transform = void 0, transformOrigin = void 0;
            if (direction === "radial") {
                twist = shapeCenters[key][2] <= 180 ? -shapeCenters[key][2] : +shapeCenters[key][2];
                left = twist > 0 ? shapeCenters[key][0] : "unset";
                right = left === "unset" ? cx * 2 - shapeCenters[key][0] : "unset";
                twist = left === "unset" ? 270 - twist : 360 - (270 - twist);
                top_1 = shapeCenters[key][1] - 9;
                transform = "rotate(".concat(twist, "deg)");
                transformOrigin = left === "unset" ? "center right" : "center left";
            }
            else {
                twist = (((270 - shapeCenters[key][2]) + 360) % 360) > 180 && (((270 - shapeCenters[key][2]) + 360) % 360 <= 360) ? shapeCenters[key][2] : shapeCenters[key][2] + 180;
                left = shapeCenters[key][0];
                right = "unset";
                top_1 = shapeCenters[key][1] - 9;
                transform = "translate(-50%, 0) rotate(".concat(twist, "deg)");
                transformOrigin = "center center";
            }
            taxonLabels[key] = {
                "direction": direction,
                "left": left,
                "right": right,
                "top": top_1,
                "transform": transform,
                "transformOrigin": transformOrigin
            };
        }
        ;
        newState["taxonLabels"] = taxonLabels;
        this.getTaxonShapes(newState);
    };
    PlotDrawing.prototype.getTaxonShapes = function (newState) {
        var _this = this;
        // var colors:string[] = ["6CCFF6", "1B998B", "A1E887", "EA638C", "B33C86"];
        // var colors:string[] = ["1B998B", "A1E887", "1E96FC", "B33C86","003F91", ];
        if ("colors" in newState) {
            var newColors = newState["colors"];
            var colors = newColors.map(hexToRGB);
        }
        else {
            var colors = this.state.colors.map(hexToRGB);
        }
        if ("croppedLineages" in newState) {
            var lineagesCopy = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        }
        else {
            var lineagesCopy = JSON.parse(JSON.stringify(this.state.croppedLineages));
        }
        if ("structureByTaxon" in newState) {
            var structureByTaxon = JSON.parse(JSON.stringify(newState["structureByTaxon"]));
        }
        else {
            var structureByTaxon = JSON.parse(JSON.stringify(this.state.structureByTaxon));
        }
        var layers = getLayers(lineagesCopy);
        var layersUnique = getLayers(lineagesCopy, true);
        var colorCalculationParameters = {};
        var taxonShapes = {};
        for (var i = 0; i < Object.keys(structureByTaxon).length; i++) {
            var firstAncestor = Object.keys(structureByTaxon)[i];
            if (firstAncestor.endsWith("_-_1")) {
                console.log("firstAncestor, firstAncestor.includes(_-_1): ", firstAncestor, firstAncestor.endsWith("_-_1"));
                taxonShapes["".concat(firstAncestor)] = colors[i % colors.length];
            }
        }
        console.log("taxonShapes firstAncestors:", taxonShapes);
        for (var i = 2; i < layers.length; i++) {
            for (var j = 0; j < layers[i].length; j++) {
                if (layers[i][j] && structureByTaxon["".concat(layers[i][j], "_-_").concat(i)]) {
                    var firstAncestor = layers[1][j];
                    for (var k = 1; k < i; k++) {
                        if (layers[k][j] !== null) {
                            firstAncestor = layers[k][j];
                            break;
                        }
                    }
                    var ancestorColor = taxonShapes["".concat(firstAncestor, "_-_1")];
                    var nextColorIndex = (colors.indexOf(ancestorColor) + 1) % colors.length;
                    var nextColor = colors[nextColorIndex];
                    var selfStartingDegree = structureByTaxon["".concat(layers[i][j], "_-_").concat(i)].horizontalWidthInDeg[0];
                    var ancestorDegrees = structureByTaxon["".concat(firstAncestor, "_-_").concat(1)].horizontalWidthInDeg;
                    var coef = (selfStartingDegree - ancestorDegrees[0]) / (ancestorDegrees[1] - ancestorDegrees[0]);
                    var tintFactor = (i - 1) / 10;
                    colorCalculationParameters[layers[i][j]] = [ancestorColor, nextColor, coef, tintFactor];
                    var hue = midColor(ancestorColor, nextColor, coef);
                    var tintifiedHue = tintify(hue, tintFactor);
                    taxonShapes["".concat(layers[i][j], "_-_").concat(i)] = tintifiedHue;
                }
            }
        }
        newState["taxonShapes"] = taxonShapes;
        this.setState(newState, function () { return console.log("taxonShapes: ", _this.state); });
    };
    PlotDrawing.prototype.changePalette = function () {
        var newPaletteInput = document.getElementById("new-palette").value;
        var newPalette = Array.from(newPaletteInput.matchAll(/[0-9a-f]{6}/g)).map(String);
        this.getTaxonShapes({ "colors": newPalette });
    };
    PlotDrawing.prototype.handleClick = function (shapeId) {
        var taxon = shapeId.match(/.+?(?=_)/)[0];
        var currLayer = parseInt(shapeId.match(/\d+/)[0]);
        var nextLayer = currLayer === 0 ? this.state.layer - 1 : currLayer + this.state.layer;
        this.cropLineages(taxon, nextLayer);
    };
    PlotDrawing.prototype.render = function () {
        var _this = this;
        currentState = this.state;
        var shapes = [];
        var labels = [];
        var _loop_3 = function (item) {
            shapes.push(React.createElement(TaxonShape, { id: item, onClick: function () { return _this.handleClick(item); }, d: this_1.state.svgPaths[item], strokeWidth: viewportDimensions["dpmm"] * 0.265, fillColor: this_1.state.taxonShapes[item] }));
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(this.state.svgPaths); _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_3(item);
        }
        var dpmm = viewportDimensions["dpmm"];
        var layers = getLayers(this.state.croppedLineages);
        var numberOfLayers = Object.keys(layers).length;
        var smallerDimension = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 5);
        shapes.push(React.createElement("circle", { id: "".concat(this.state.ancestors[this.state.ancestors.length - 1], "_-_0"), onClick: function () { return _this.handleClick("".concat(_this.state.ancestors[_this.state.ancestors.length - 1], "_-_0")); }, strokeWidth: viewportDimensions["dpmm"] * 0.265, fill: "white", cx: this.state.horizontalShift, cy: this.state.verticalShift, r: "calc(".concat(layerWidth, "px - ").concat(dpmm * 0.265, "px)") }));
        var _loop_4 = function (item) {
            labels.push(React.createElement(TaxonLabel, { taxon: item, transform: this_2.state.taxonLabels[item]["transform"], left: this_2.state.taxonLabels[item]["left"], right: this_2.state.taxonLabels[item]["right"], top: this_2.state.taxonLabels[item]["top"], transformOrigin: this_2.state.taxonLabels[item]["transformOrigin"], onClick: function () { _this.handleClick(item); } }));
        };
        var this_2 = this;
        for (var _b = 0, _c = Object.keys(this.state.taxonShapes); _b < _c.length; _b++) {
            var item = _c[_b];
            _loop_4(item);
        }
        return [React.createElement("svg", { style: { "height": "100%", "width": "100%", "margin": "0", "padding": "0", "boxSizing": "border-box", "border": "none" }, id: "shapes" }, shapes), React.createElement("div", { id: "labels" }, labels)];
    };
    return PlotDrawing;
}(React.Component));
function handleMouseMove(event) {
    var eventDoc, doc, body;
    event = event || window.event; // IE-ism
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }
    console.log("cursorX, cursorY: ", event.pageX, event.pageY);
}
function round(number, decimal) {
    if (decimal === void 0) { decimal = 3; }
    return (Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal));
}
function cos(number) {
    return Math.cos(radians(number));
}
function sin(number) {
    return Math.sin(radians(number));
}
function hexToRGB(hex) {
    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return "rgb(".concat(aRgb[0], ", ").concat(aRgb[1], ", ").concat(aRgb[2], ")");
}
function midColor(rgb1, rgb2, coef) {
    var _a, _b, _c, _d;
    var coef = coef / 2;
    var rgb1List = (_b = (_a = rgb1.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.map(function (item) { return parseInt(item); })) !== null && _b !== void 0 ? _b : [];
    var rgb2List = (_d = (_c = rgb2.match(/\d+/g)) === null || _c === void 0 ? void 0 : _c.map(function (item) { return parseInt(item); })) !== null && _d !== void 0 ? _d : [];
    var newRgb = [];
    for (var i = 0; i < 3; i++) {
        var newNum = rgb1List[i] < rgb2List[i] ? rgb1List[i] + (coef * (rgb2List[i] - rgb1List[i])) : rgb1List[i] - (coef * (rgb1List[i] - rgb2List[i]));
        newRgb.push(Math.round(newNum));
    }
    return "rgb(".concat(newRgb[0], ", ").concat(newRgb[1], ", ").concat(newRgb[2], ")");
}
function tintify(rgb, tintFactor) {
    var _a, _b;
    var rgbList = (_b = (_a = rgb.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.map(function (item) { return parseInt(item); })) !== null && _b !== void 0 ? _b : [];
    var newRgb = [];
    for (var i = 0; i < 3; i++) {
        var newNum = rgbList[i] + ((255 - rgbList[i]) * tintFactor);
        newRgb.push(Math.round(newNum));
    }
    return "rgb(".concat(newRgb[0], ", ").concat(newRgb[1], ", ").concat(newRgb[2], ")");
}
function hoverHandler(id) {
    if (id.indexOf("-label") > -1) {
        var label = id;
        var shape = id.replace("-label", "");
    }
    else {
        var shape = id;
        var label = id + "-label";
    }
    document.getElementById(shape).style.strokeWidth = "0.4vmin";
    document.getElementById(label).style.fontWeight = "bold";
    document.getElementById(label).style.zIndex = "1000";
    document.getElementById(label).style.border = "0.4vmin solid #800080";
}
function onMouseOutHandler(id) {
    if (id.indexOf("-label") > -1) {
        var label = id;
        var shape = id.replace("-label", "");
    }
    else {
        var shape = id;
        var label = id + "-label";
    }
    document.getElementById(shape).style.strokeWidth = "0.2vmin";
    document.getElementById(label).style.fontWeight = "normal";
    document.getElementById(label).style.zIndex = "unset";
    document.getElementById(label).style.border = "0.2vmin solid #800080";
}
// Returns a set of arrays, where each array contains all elements that will be on the same level in the plot.
function getLayers(lineagesCopy, unique) {
    if (unique === void 0) { unique = false; }
    var longestLineageLength = Math.max.apply(Math, lineagesCopy.map(function (item) { return item.length; })); // get the length of the longest lineage, i.e. how many layers the plot will have
    var layers = [];
    for (var i = 0; i < longestLineageLength; i++) {
        var layer = [];
        for (var j = 0; j < lineagesCopy.length; j++) {
            layer.push(lineagesCopy[j][i]);
        }
        if (unique) {
            layer = layer.filter(function (value, index, self) { return Boolean(value) && self.indexOf(value) === index; });
        }
        layers.push(layer);
    }
    return layers;
}
function sendSnapshot() {
    var srcElement = document.getElementById("plot-container");
    html2canvas(srcElement).then(function (canvas) {
        var url = canvas.toDataURL("image/jpeg", 0.2);
        $.ajax({
            type: "POST",
            url: "/send-email",
            data: { "url": url, "currentState": JSON.stringify(currentState) },
            success: function (response) {
                console.log("Success!");
            },
            error: function (response) {
                console.log("ERROR", response);
            }
        });
    });
}
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
var taxonList = [];
var currentState;
var taxName;
var lineagesRanksOnlyArray = [];
var lineagesFullInfo = [];
for (var _i = 0, _a = Object.keys(allTaxa); _i < _a.length; _i++) {
    taxName = _a[_i];
    var newTaxon = new Taxon(taxName);
    taxonList.push(newTaxon);
    lineagesFullInfo.push(newTaxon.lineage.map(function (item) { return item[1] + "_*_" + item[0]; }));
    lineagesNamesOnlyArray.push(newTaxon.lineage.map(function (item) { return item[1]; }));
}
lineagesFullInfo.sort();
lineagesRanksOnlyArray = lineagesFullInfo.map(function (item) { return item.map(function (item2) { return item2.split("_*_")[1]; }); });
lineagesRanksOnlyArray.map(function (item) { return item.unshift("root"); });
lineagesNamesOnlyArray.sort();
lineagesNamesOnlyArray.map(function (item) { return item.unshift("root"); });
//var ranksUnique = lineagesRanksOnlyArray.reduce((accumulator, value) => accumulator.concat(value), []);
//ranksUnique = ranksUnique.filter((value, index, self) => Boolean(value) && self.indexOf(value) === index);
var ranks = ["root", "superkingdom", "kingdom", "subkingdom", "superphylum", "phylum", "subphylum", "superclass", "class", "subclass", "superorder", "order", "suborder", "superfamily", "family", "subfamily", "supergenus", "genus", "subgenus", "superspecies", "species", "subspecies", "strain"];
//ranks = ranks.filter(item => ranksUnique.indexOf(item) > -1);
console.log("allTaxa: ", allTaxa);
console.log("lineagesFullInfo: ", lineagesFullInfo);
console.log("lineagesRanksOnlyArray: ", lineagesRanksOnlyArray);
console.log("taxNames: ", lineagesNamesOnlyArray.sort());
// var fullPlot:Plot = new Plot();
// var mycosphaerellalesPlot:Plot = new Plot("Bacteria", 0, true, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, true, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Mycosphaerellales", 8, false, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Eurotiomycetes", 6, false);
var mycosphaerellalesPlot = new Plot("Leotiomycetes", 6, false);
//addEventListener("resize", (event) => {
//    console.log("resize event");
//    viewportDimensions = getViewportDimensions();
//    mycosphaerellalesPlot.updateviewportDimensions(viewportDimensions);
//    mycosphaerellalesPlot.calculateSVGPaths();
//    mycosphaerellalesPlot.getTaxonLabelSpecifics();
//    mycosphaerellalesPlot.getTaxonShapeSpecifics();
//    mycosphaerellalesPlot.draw();
//});
var snapshotButton = document.getElementById("take-snapshot");
snapshotButton === null || snapshotButton === void 0 ? void 0 : snapshotButton.addEventListener("click", function (event) {
    sendSnapshot();
});
