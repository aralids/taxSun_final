import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as _html2canvas from "html2canvas";
var currentState;
var skeletonColor:string = "#800080";
const html2canvas: any = _html2canvas;
var path = "C:/Users/PC/Desktop/krona/krona.tsv";
var allTaxa:object = JSON.parse(`{"not identified":{"lineageNames":[["no rank","not identified"]],"rank":"no rank","taxID":"0","totalCount":44,"unassignedCount":44},
"root":{"lineageNames":[["root", "root"]],"rank":"root","taxID":"NA","totalCount":128,"unassignedCount":0},
"Eukaryota":{"lineageNames":[["superkingdom","Eukaryota"]],"rank":"superkingdom","taxID":"1","totalCount":24,"unassignedCount":24},
"Acidobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Acidobacteria"]],"rank":"phylum","taxID":"2","totalCount":8,"unassignedCount":8},
"Armatimonadetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"]],"rank":"phylum","taxID":"13123","totalCount":1,"unassignedCount":0.6},
"Armatimonadetes bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"],["species", "Armatimonadetes bacterium"]],"rank":"species","taxID":"36546214","totalCount":0.4,"unassignedCount":0.4},
"Chloroflexi bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chloroflexi"],["species","Chloroflexi bacterium"]],"rank":"species","taxID":"555","totalCount":3,"unassignedCount":3},
"Chrysiogenetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chrysiogenetes"]],"rank":"phylum","taxID":"6756756","totalCount":4,"unassignedCount":4}, 
"uncultured Segetibacter sp.":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Bacteroidota"],["class", "Chitinophagia"], ["order", "Chitinophagales"], ["family", "Chitinophagaceae"], ["genus", "Segetibacter"], ["species", "uncultured Segetibacter sp."]],"rank":"species","taxID":"4678534","totalCount":2,"unassignedCount":2},
"Nitrospira sp.":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Nitrospirae"],["class", "Nitrospira class"], ["order", "Nitrospirales"],["family", "Nitrospiraceae"], ["genus", "Nitrospira genus"], ["species", "Nitrospira sp."]],"rank":"species","taxID":"867675","totalCount":6,"unassignedCount":6}, 
"Cyanobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Cyanobacteria"]],"rank":"phylum","taxID":"72243","totalCount":5,"unassignedCount":5}, 
"Proteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"]],"rank":"phylum","taxID":"11119","totalCount":7,"unassignedCount":1.75}, 
"Alphaproteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"], ["class", "Alphaproteobacteria"]],"rank":"class","taxID":"565649","totalCount":5.25,"unassignedCount":1.75}, 
"Nitrobacteraceae":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"], ["class", "Alphaproteobacteria"], ["order", "Hyphomicrobiales"], ["family", "Nitrobacteraceae"]],"rank":"family","taxID":"15359","totalCount":1.75,"unassignedCount":1.75}, 
"Acetobacteraceae bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"], ["class", "Alphaproteobacteria"], ["order","Hyphomicrobiales"], ["family","Acetobacteraceae"], ["species","Acetobacteraceae bacterium"]],"rank":"species","taxID":"29235","totalCount":1.75,"unassignedCount":1.75}, 
"Viruses":{"lineageNames":[["superkingdom","Viruses"]],"rank":"superkingdom","taxID":"16760","totalCount":24,"unassignedCount":24}}`);
//var taxonList:Taxon[] = [];
const domContainer:any = document.querySelector('#plot-container');
var reactRoot = ReactDOM.createRoot(domContainer);
const domContainer2:any = document.querySelector('#labels');
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
        data: {"tsv_path": tsv_path},
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
class Plot {
    root:string;
    layer:number;
    viewportDimensions:object;
    lineages:string[][];
    structure:object = {};
    structureByTaxon:object = {};
    svgPaths:object = {};
    taxonLabelSpecifics:object = {};
    taxonShapeSpecifics:object = {};

    constructor (root:string = "", layer:number = -1, collapse:boolean = true) {
        this.root = root;
        this.layer = layer;
        this.viewportDimensions = viewportDimensions;
        this.draw();
    }

    draw():void {
        // remove GoL;
        reactRoot.render(<PlotDrawing lineages={lineagesNames} ranks={lineagesRanks}/>);
    }

    updateviewportDimensions(newDimensions):void {
        this.viewportDimensions = newDimensions;
    }
}

function radians(degrees):number {
    degrees = 270 - degrees;
    var pi = Math.PI;
    return degrees * (pi/180);
}

function getViewportDimensions():object {
    var dpmm:number = document.getElementById('dpmm')!.offsetWidth; // returns the div's width in px, thereby telling us how many px equal 1mm for our particular screen
    var cx:number = window.innerWidth / 2;
    var cy:number = window.innerHeight / 2;
    return {
        "cx": cx,
        "cy": cy,
        "dpmm": dpmm
    }
}

'use strict';

function TaxonShape(props) {
    return <path id={props.id} d={props.d} onMouseOver={() => hoverHandler(props.id, props.fullLabel)} onMouseOut={() => onMouseOutHandler(props.id, props.labelOpacity, props.abbr, props.display)} onClick={props.onClick} style={{"stroke": props.stroke, "strokeWidth": "0.2vmin", "fill": props.fillColor}}/>;
}
function TaxonLabel(props) {
    return <p id={`${props.id}-label`} onMouseOver={() => hoverHandler(props.id, props.fullLabel)} onMouseOut={() => onMouseOutHandler(props.id, props.opacity, props.abbr, props.display)} onClick={props.onClick} style={{"margin": "0", "position": "absolute", "fontFamily": "calibri", "fontSize": "2vmin", "left": props.left, "right": props.right, "top": props.top, "transformOrigin": props.transformOrigin, "transform": props.transform, "color": "#800080", "opacity": props.opacity, "display": props.display}}>{props.abbr}</p>
}

function AncestorLabel(props) {
    return <p id={props.id} className="ancestor" style={{"margin": "0", "position": "fixed", "fontFamily": "calibri", "fontSize": "2vmin", "top": props.top, "left": "2vmin", "color": skeletonColor, "fontWeight": "bold"}} onClick={props.onClick}>{props.taxon}</p>
}



class PlotDrawing extends React.Component<{lineages:string[][], ranks:string[][]}, {root:string, layer:number, collapse:boolean, horizontalShift:number, verticalShift:number, taxonSpecifics:object, croppedLineages:string[][], alignedCroppedLineages:string[][], croppedRanks:string[][], unassignedCounts:string[][], structureByDegrees:object, structureByTaxon: object, svgPaths:object, shapeComponents:object, shapeCenters:object, taxonLabels:object, taxonShapes:object, colors:string[], ancestors:string[], rankPattern:string[], alteration:string, totalUnassignedCount:number, numberOfLayers:number, layerWidth:number}> {
    constructor(props) {
        super(props);
        this.state = {
            root: "root",
            layer: 0,
            collapse: false,
            horizontalShift: viewportDimensions["cx"],
            verticalShift: viewportDimensions["cy"],
            taxonSpecifics: {},
            croppedLineages: [],
            alignedCroppedLineages: [],
            croppedRanks: [],
            unassignedCounts: [],
            structureByDegrees: {},
            structureByTaxon: {},
            svgPaths: {},
            shapeComponents: {},
            shapeCenters: {},
            taxonLabels: {},
            taxonShapes: {},
            colors: colors, //["d27979", "c0d279", "79d29c", "799cd2", "c079d2"],
            ancestors: ["root"],
            rankPattern: [],
            alteration: "marriedTaxa",
            totalUnassignedCount: 0,
            numberOfLayers: -1,
            layerWidth: -1
        }
    }

    componentDidMount() {
        this.cropLineages();
        document.getElementById("change-palette")!.addEventListener("click", () => {
            this.changePalette();
        })
        addEventListener("resize", (event) => {
            console.log("resize event", this.state);
            var newViewportDimensions = getViewportDimensions();
            viewportDimensions = newViewportDimensions;
            this.setState({horizontalShift: newViewportDimensions["cx"], verticalShift: newViewportDimensions["cy"]}, () => this.calculateSVGPaths({"ancestors": this.state.ancestors}));
        })
        document.getElementById("radio-input")!.addEventListener("change", () => {
            let alteration:any = document.querySelector('input[name="radio"]:checked')!.getAttribute("id");
            this.cropLineages(this.state.root, this.state.layer, alteration, this.state.collapse);
        })
        document.getElementById("checkbox-input")!.addEventListener("change", () => {
            let element:any =  document.getElementById("checkbox-input")!;
            let checked:boolean = element.checked;
            this.cropLineages(this.state.root, this.state.layer, this.state.alteration, checked);
        })
    }

    componentDidUpdate() {
        var abbreviatables:string[] = this.checkTaxonLabelWidth();
        if (abbreviatables.length > 0) {
            this.abbreviate(abbreviatables);
        } 
    }

    // Leave only relevant lineages and crop them if necessary.
    cropLineages(root=this.state.root, layer=this.state.layer, alteration="marriedTaxaI", collapse=this.state.collapse):void {

        // Get only relevant lineages.
        var croppedLineages:string[][] = [];
        var croppedRanks:string[][] = [];
        let rootTaxa:string[] = root.split(" & ");
        for (let i=0; i<this.props.lineages.length; i++) {
            if (rootTaxa.indexOf(this.props.lineages[i][layer]) > -1) {
                croppedLineages.push(this.props.lineages[i]);
                croppedRanks.push(this.props.ranks[i]);
            }
        }

        // Crop lineages so they start with clicked taxon.
        var ancestors:string[] = [""];
        if (croppedLineages[0]) {     
            ancestors = croppedLineages[0].slice(0, layer);
        }
        if (rootTaxa.length > 1) {
            croppedLineages = croppedLineages.map(item => item.slice(layer-1));
            croppedRanks = croppedRanks.map(item => item.slice(layer-1));
        }
        else {
            croppedLineages = croppedLineages.map(item => item.slice(layer));
            croppedRanks = croppedRanks.map(item => item.slice(layer));
        }

        // Get minimal rank pattern for this particular plot to prepare for aligning sequences.
        var ranksUnique = croppedRanks.reduce((accumulator, value) => accumulator.concat(value), []);
        ranksUnique = ranksUnique.filter((value, index, self) => Boolean(value) && self.indexOf(value) === index);
        var rankPattern:string[] = rankPatternFull.filter(item => ranksUnique.indexOf(item) > -1);

        // Mary taxa.
        if (alteration.startsWith("marriedTaxa")) {
            let cropped = this.marryTaxa(croppedLineages, croppedRanks, alteration);
            croppedLineages = cropped[0];
            croppedRanks = cropped[1];
        }

        // !!!!!!
        if (collapse) {
            let arr:any = this.collapse(croppedLineages, croppedRanks);
            croppedLineages = arr[0];
            croppedRanks = arr[1];
        }
        
        // Align cropped lineages by adding null as placeholder for missing ranks.
        var alignedCropppedLineages:string[][] = [];
        var alignedCropppedRanks:string[][] = [];
        for (let i=0; i<croppedLineages.length; i++) {
            var alignedLineage:any = new Array(rankPattern.length).fill(null);
            var alignedRank:any = new Array(rankPattern.length).fill(null);
            for (let j=0; j<croppedRanks[i].length; j++) {
                var index = rankPattern.indexOf(croppedRanks[i][j]);
                if (index > -1) { 
                    alignedLineage.splice(index, 1, croppedLineages[i][j]);
                    alignedRank.splice(index, 1, croppedRanks[i][j]);
                }
            }
            alignedCropppedLineages.push(alignedLineage);
            alignedCropppedRanks.push(alignedRank);
        }

        // Save in state object taxonSpecifics.
        var taxonSpecifics:object = {};
        for (let i=0; i<croppedLineages.length; i++) {
            var taxName:string = croppedLineages[i][croppedLineages[i].length-1];

            if (taxName.includes("&")) {
                taxonSpecifics[taxName] = {};
                taxonSpecifics[taxName]["rank"] = croppedRanks[i][croppedRanks[i].length-1]
                taxonSpecifics[taxName]["croppedLineage"] = croppedLineages[i];
                taxonSpecifics[taxName]["alignedCroppedLineage"] = alignedCropppedLineages[i];
                let taxa:string[] = taxName.split(" & ");
                let unassignedCount:number = taxa.map(item => allTaxaReduced[item]["totalCount"]).reduce((accumulator, value) => accumulator + value, 0);
                taxonSpecifics[taxName]["unassignedCount"] = unassignedCount;
                taxonSpecifics[taxName]["totalCount"] = unassignedCount;
                taxonSpecifics[taxName]["firstLayerUnaligned"] = croppedLineages[i].length-1;
                taxonSpecifics[taxName]["firstLayerAligned"] = alignedCropppedLineages[i].indexOf(taxName);
            } else {
                taxonSpecifics[taxName] = {};
                taxonSpecifics[taxName]["rank"] = croppedRanks[i][croppedRanks[i].length-1]
                taxonSpecifics[taxName]["croppedLineage"] = croppedLineages[i];
                taxonSpecifics[taxName]["alignedCroppedLineage"] = alignedCropppedLineages[i];
                taxonSpecifics[taxName]["unassignedCount"] = allTaxaReduced[taxName].unassignedCount;
                taxonSpecifics[taxName]["totalCount"] = allTaxaReduced[taxName]["totalCount"];
                taxonSpecifics[taxName]["firstLayerUnaligned"] = croppedLineages[i].length-1;
                taxonSpecifics[taxName]["firstLayerAligned"] = alignedCropppedLineages[i].indexOf(taxName);
            }
        }

        let totalUnassignedCount:number = 0;
        for (let taxName of Object.keys(taxonSpecifics)) {
            totalUnassignedCount += taxonSpecifics[taxName]["unassignedCount"];
        }

        if (alteration === "allEqual") {
            for (let taxName of Object.keys(taxonSpecifics)) {
                taxonSpecifics[taxName]["unassignedCount"] = 1;
            }
        }

        for (let i=0; i<croppedLineages.length; i++) {
            for (let j=croppedLineages[i].length-2; j>=0; j--) {
                if (!taxonSpecifics[croppedLineages[i][j]]) {
                    taxonSpecifics[croppedLineages[i][j]] = {};
                    taxonSpecifics[croppedLineages[i][j]]["rank"] = croppedRanks[i][j];
                    taxonSpecifics[croppedLineages[i][j]]["croppedLineage"] = croppedLineages[i].slice(0, j+1);
                    var index = alignedCropppedLineages[i].indexOf(croppedLineages[i][j]);
                    taxonSpecifics[croppedLineages[i][j]]["alignedCroppedLineage"] = alignedCropppedLineages[i].slice(0, index+1);
                    taxonSpecifics[croppedLineages[i][j]]["unassignedCount"] = 0;
                    taxonSpecifics[croppedLineages[i][j]]["totalCount"] = allTaxaReduced[croppedLineages[i][j]]["totalCount"];
                    taxonSpecifics[croppedLineages[i][j]]["firstLayerUnaligned"] = j;
                    taxonSpecifics[croppedLineages[i][j]]["firstLayerAligned"] = index;
                }
            }
        }
        if (croppedLineages.length > 1) {
            this.assignDegrees({"root": root, "layer": layer, "rankPattern": rankPattern, "taxonSpecifics": taxonSpecifics, "croppedLineages": croppedLineages, "alignedCroppedLineages": alignedCropppedLineages, "ancestors": ancestors, "alteration": alteration, "collapse": collapse, "totalUnassignedCount": totalUnassignedCount});
        }
    }

    marryTaxa(croppedLineages:string[][], croppedRanks:string[][], alteration="marriedTaxaI") {
        var totalUnassignedCounts:number = 0;
        //alteration = "marriedTaxaII";
        for (let lineage of croppedLineages) {
            totalUnassignedCounts += allTaxaReduced[lineage[lineage.length - 1]]["unassignedCount"];
        }
        var reducibleLineages:any = [];
        var treshold:number = 0.06;
        for (let lineage of croppedLineages) {
            if (allTaxaReduced[lineage[lineage.length - 1]]["totalCount"] / totalUnassignedCounts < treshold) {
                let lineageNumber:number = croppedLineages.indexOf(lineage);
                let lastWayTooThinLayer:number = lineage.length - 1;
                for (let i=lineage.length-2; i>=0; i--) {
                    if (allTaxaReduced[lineage[i]]["totalCount"] / totalUnassignedCounts >= treshold) {
                        lastWayTooThinLayer = i+1;
                        break;
                    }
                };
                let partialLineage:string[] = lineage.slice(0, lastWayTooThinLayer);
                reducibleLineages.push([lineageNumber, partialLineage])
            }
        }
        var reductionGroups:object = {};
        if (alteration === "marriedTaxaI") {
            for (let item of reducibleLineages) {
                if (!reductionGroups[item[1].join("")]) {
                    reductionGroups[item[1].join("")] = {};
                    reductionGroups[item[1].join("")]["spliceAt"] = item[1].length;
                    reductionGroups[item[1].join("")]["index"] = [item[0]];
                    reductionGroups[item[1].join("")]["commonName"] = croppedLineages[item[0]][item[1].length];
                } else {
                    reductionGroups[item[1].join("")]["index"].push(item[0]);
                    let taxa:string = reductionGroups[item[1].join("")]["commonName"].split(" & ");
                    if (taxa.indexOf(croppedLineages[item[0]][item[1].length]) === -1) {
                        reductionGroups[item[1].join("")]["commonName"] += ` & ${croppedLineages[item[0]][item[1].length]}`;
                    }
                }
            }
        }
        else {
            for (let item of reducibleLineages) {
                if (!reductionGroups[item[1].join("")]) {
                    reductionGroups[item[1].join("")] = {};
                    reductionGroups[item[1].join("")]["spliceAt"] = item[1].length;
                    reductionGroups[item[1].join("")]["index"] = [item[0]];
                } else {
                    reductionGroups[item[1].join("")]["index"].push(item[0]);
                }
            }

            // Sort indices of reduction groups in ascending order.
            for (let group of Object.keys(reductionGroups)) {
                let spliceAt:number = reductionGroups[group]["spliceAt"];
                reductionGroups[group]["index"].sort((index1, index2) => allTaxaReduced[croppedLineages[index1][spliceAt]]["totalCount"] - allTaxaReduced[croppedLineages[index2][spliceAt]]["totalCount"])
                let renameables:string[] = reductionGroups[group]["index"].map(item => croppedLineages[item][spliceAt]);
                let temporaryObject:object = {};
                for (let i=0; i<renameables.length; i++) {
                    let renameable:string = renameables[i];
                    if (!temporaryObject[renameable]) {
                        temporaryObject[renameable] = [reductionGroups[group]["index"][i]]
                    }
                    else {
                        temporaryObject[renameable].push(reductionGroups[group]["index"][i])
                    }
                }
                let permanentObject:object = {};
                for (let key of Object.keys(temporaryObject)) {
                    permanentObject[temporaryObject[key][0]] = temporaryObject[key];
                }
                reductionGroups[group]["references"] = permanentObject;
                reductionGroups[group]["minimalIndexArray"] = Object.keys(permanentObject).sort((index1, index2) => allTaxaReduced[croppedLineages[index1][spliceAt]]["totalCount"] - allTaxaReduced[croppedLineages[index2][spliceAt]]["totalCount"])
            }
            for (let group of Object.keys(reductionGroups)) {
                let minimalIndexArray:number[] = reductionGroups[group]["minimalIndexArray"].map(item => parseInt(item));
                let indexBeginning:number = 0;
                let indexEnd:number = minimalIndexArray.length - 1;
                let addNext:string = "indexBeginning";
                let sum:number = 0;
                let newIndexGroup:number[] = [];
                let newGroups:any = [];
                let iterations:number = minimalIndexArray.length % 2 === 0 ? minimalIndexArray.length / 2 : Math.floor(minimalIndexArray.length / 2) + 1;
                let spliceAt:number = reductionGroups[group]["spliceAt"];
                while ((minimalIndexArray.length % 2 === 0 && indexBeginning <= iterations && (minimalIndexArray.length - 1) - indexEnd < iterations) || (minimalIndexArray.length % 2 === 1 && indexBeginning !== iterations && (minimalIndexArray.length - 1) - indexEnd < iterations)) {

                    if (addNext === "indexBeginning") {
                        let newIndex:number = minimalIndexArray[indexBeginning];
                        newIndexGroup.push(newIndex);
                        let totalCount:number = allTaxaReduced[croppedLineages[newIndex][spliceAt]]["totalCount"];
                        let additive:number = totalCount / totalUnassignedCounts;
                        sum += additive;
                        addNext = "indexEnd";
                        indexBeginning++;
                    }
                    else {
                        let newIndex:number = minimalIndexArray[indexEnd];
                        newIndexGroup.push(newIndex);
                        let totalCount:number = allTaxaReduced[croppedLineages[newIndex][spliceAt]]["totalCount"];
                        let additive:number = totalCount / totalUnassignedCounts;
                        sum += additive;
                        addNext = "indexBeginning";
                        indexEnd--;
                    }

                    if (sum >= treshold) {
                        newGroups.push(newIndexGroup);
                        newIndexGroup = [];
                        sum = 0;
                    }
                }
                if (newIndexGroup.length !== 0) {
                    if (newGroups.length === 0) {
                        newGroups = [[]];
                    }
                    let lastGroup:number[] = newGroups[newGroups.length - 1];
                    lastGroup.splice(lastGroup.length, 0, ...newIndexGroup);
                    newGroups.push(newIndexGroup);
                }
                newGroups = newGroups.map(item => item.map(item1 => reductionGroups[group]["references"][item1]));
                newGroups = newGroups.map(item => item.reduce((accumulator, value) => accumulator.concat(value), []));
                reductionGroups[group]["newGroups"] = newGroups;
            }
            let newReductionGroups:object = {};
            for (let group of Object.keys(reductionGroups)) {
                for (let i=0; i<reductionGroups[group]["newGroups"].length; i++) {
                    newReductionGroups[`${group}-${i}`] = {};
                    newReductionGroups[`${group}-${i}`]["spliceAt"] = reductionGroups[group]["spliceAt"];
                    newReductionGroups[`${group}-${i}`]["index"] = reductionGroups[group]["newGroups"][i];
                    var names:string[] = reductionGroups[group]["newGroups"][i].map(item => croppedLineages[item][reductionGroups[group]["spliceAt"]]).filter((v, i, a) => a.indexOf(v) === i);
                    newReductionGroups[`${group}-${i}`]["commonName"] = names.join(" & ");
                }
            }
            reductionGroups = newReductionGroups;
        }

        for (let group of Object.keys(reductionGroups).filter(item => reductionGroups[item]["index"].length > 1)) {
            for (let index of reductionGroups[group]["index"]) {
                croppedLineages[index].splice(reductionGroups[group]["spliceAt"], croppedLineages[index].length - reductionGroups[group]["spliceAt"], reductionGroups[group]["commonName"]);
                croppedRanks[index].splice(reductionGroups[group]["spliceAt"] + 1);
            }
        }
        for (let i=croppedLineages.length-1; i>=0; i--) {
            let croppedLineageCopy = croppedLineages.map(item => JSON.stringify(item));
            let lineage:string = croppedLineageCopy[i];
            let lastIndex = i;
            let firstIndex = croppedLineageCopy.indexOf(lineage);
            if (firstIndex !== lastIndex) {
                croppedLineages.splice(lastIndex, 1);
                croppedRanks.splice(lastIndex, 1);
            }
        }
        return [croppedLineages, croppedRanks];
    }

    // Assign each cropped lineage a start and end degree.
    assignDegrees(newState:object):void {
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var croppedLineages = newState["croppedLineages"] ? newState["croppedLineages"] : this.state.taxonSpecifics;
        var taxonSpecifics = newState["taxonSpecifics"] ? newState["taxonSpecifics"] : this.state.taxonSpecifics;
        var totalUnassignedCounts:number = 0;
        for (let taxName of Object.keys(taxonSpecifics).filter(item => taxonSpecifics[item]["unassignedCount"] !== 0)) {
            totalUnassignedCounts += taxonSpecifics[taxName]["unassignedCount"];
        }

        let ranges:object = {};
        let startDeg:number = 0;
        for (let i=0; i<croppedLineages.length; i++) {
            for (let j=0; j<croppedLineages[i].length; j++) {
                let currentTaxon:string = croppedLineages[i][j];

                let alignedIndex:number = taxonSpecifics[currentTaxon]["firstLayerAligned"];
                if (!ranges[currentTaxon]) {
                    ranges[currentTaxon] = {};
                    let firstLayer:number = taxonSpecifics[currentTaxon]["firstLayerUnaligned"] === 1 ? 1 : alignedIndex;
                    ranges[currentTaxon]["layers"] = [firstLayer];
                    ranges[currentTaxon]["degrees"] = [startDeg];
                }

                let lastLayer:number;
                if (j === croppedLineages[i].length - 1) {
                    lastLayer = alignedCroppedLineages[0].length;
                } else {
                    lastLayer = alignedCroppedLineages[i].indexOf(croppedLineages[i][j+1]);
                }
                ranges[currentTaxon]["layers"].push(lastLayer);
                ranges[currentTaxon]["degrees"].push(startDeg + (taxonSpecifics[croppedLineages[i][croppedLineages[i].length-1]]["unassignedCount"] * 360) / totalUnassignedCounts);
            }
            startDeg += (taxonSpecifics[croppedLineages[i][croppedLineages[i].length-1]]["unassignedCount"] * 360) / totalUnassignedCounts;
        }

        for (let taxName of Object.keys(ranges)) {
            for (let i=ranges[taxName]["layers"].length-1; i>=1; i--) {
                if (ranges[taxName]["layers"][i] === ranges[taxName]["layers"][i-1]) {
                    let newValue:number = ranges[taxName]["degrees"][i];
                    
                    ranges[taxName]["degrees"][i-1] = newValue;
                    ranges[taxName]["layers"].splice(i,1);
                    ranges[taxName]["degrees"].splice(i,1);
                }
            }
        }

        for (let taxName of Object.keys(taxonSpecifics)) {
            taxonSpecifics[taxName]["layers"] = ranges[taxName]["layers"];
            taxonSpecifics[taxName]["degrees"] = ranges[taxName]["degrees"];
        }

        this.calculateSVGPaths(newState);
    }

    // If collapse=true, remove taxa that only come up in the lineage of one other taxon and have no unassigned counts of their own.
    collapse(croppedLineages:string[][], croppedRanks:string[][]):string[][][] {
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(croppedLineages));
        var ranksCopy:string[][] = JSON.parse(JSON.stringify(croppedRanks));
        var layers = getLayers(lineagesCopy);

        for (let i=0; i<layers.length-1; i++) {
            for (let j=0; j<layers[i].length; j++) {
                if (layers[i].filter(item => item === layers[i][j]).length === 1 && Boolean(layers[i+1][j])) {
                    lineagesCopy[j].splice(i,1, "toBeDeleted");
                    ranksCopy[j].splice(i,1, "toBeDeleted");
                }
            }
        }
        for (let i=0; i<lineagesCopy.length; i++) {
            lineagesCopy[i] = lineagesCopy[i].filter(item => item !== "toBeDeleted");
            ranksCopy[i] = ranksCopy[i].filter(item => item !== "toBeDeleted");
        }
        return [lineagesCopy, ranksCopy];
    }

    calculateArcEndpoints(layer:number, layerWidthInPx:number, deg1:number, deg2:number):object {
        var radius:number = layer * layerWidthInPx; // in px
        var x1:number = round(radius * cos(deg1) + this.state.horizontalShift);
        var y1:number = round(- radius * sin(deg1) + this.state.verticalShift);
        var x2:number = round(radius * cos(deg2) + this.state.horizontalShift);
        var y2:number = round(- radius * sin(deg2) + this.state.verticalShift);
    
        return {x1: x1, y1: y1, x2: x2, y2: y2, radius:round(radius)};
    }

    calculateSVGPaths(newState:object):void {
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var taxonSpecifics:object = newState["taxonSpecifics"] == undefined ? this.state.taxonSpecifics : newState["taxonSpecifics"];
        var dpmm:number = viewportDimensions["dpmm"];
        var numberOfLayers:number = alignedCroppedLineages[0].length;
        var smallerDimension:number = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth:number = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 4);

        var firstLayer = (key) => {return taxonSpecifics[key]["layers"][0]};
        var startDeg = (key) => {return taxonSpecifics[key]["degrees"][0]};
        var endDeg = (key) => {return taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length-1]};
        

        for (var key of Object.keys(taxonSpecifics)) {
            if (taxonSpecifics[key]["layers"][0] === 0) {
                taxonSpecifics[key]["svgPath"] = `M ${this.state.horizontalShift}, ${this.state.verticalShift} m -${layerWidth}, 0 a ${layerWidth},${layerWidth} 0 1,0 ${(layerWidth)* 2},0 a ${layerWidth},${layerWidth} 0 1,0 -${(layerWidth)* 2},0`;
            } else {
                var innerArc:object = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
                var innerArcPath:string = `M ${innerArc["x1"]},${innerArc["y1"]} A ${round(firstLayer(key)*layerWidth)},${round(firstLayer(key)*layerWidth)} 0 0 1 ${innerArc["x2"]},${innerArc["y2"]}`;
                if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                    var innerArcPath:string = `M ${innerArc["x1"]},${innerArc["y1"]} A ${innerArc["radius"]},${innerArc["radius"]} 0 1 1 ${innerArc["x2"]},${innerArc["y2"]}`;
                };

                var subpaths:string[] = [innerArcPath];
                var midArc:object = {};
                for (let i=taxonSpecifics[key]["layers"].length-1; i>=0; i--) {
                    var curr = taxonSpecifics[key]["degrees"][i];
                    var prev = i === 0 ? startDeg(key) : taxonSpecifics[key]["degrees"][i-1];
                    midArc = this.calculateArcEndpoints(taxonSpecifics[key]["layers"][i], layerWidth, prev, curr);
                    var midArcPath:string = `L ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 0 0 ${midArc["x1"]},${midArc["y1"]}`;
                    if (Math.abs(curr - prev) >= 180) {
                        var midArcPath:string = `L ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 1 0 ${midArc["x1"]},${midArc["y1"]}`;  
                    };
                    subpaths.push(midArcPath);
                }
                
                var lineInnertoOuter = `L ${midArc["x1"]},${midArc["y1"]} ${innerArc["x1"]},${innerArc["y1"]}`;
                subpaths.push(lineInnertoOuter);
                var d:string = subpaths.join(" ");
                taxonSpecifics[key]["svgPath"] = d;
            }
        };
        newState["numberOfLayers"] = numberOfLayers;
        newState["layerWidth"] = layerWidth;
        this.calculateTaxonLabels(newState);
    }

    calculateTaxonLabels(newState:object):void {
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var totalUnassignedCount = newState["totalUnassignedCount"] ? newState["totalUnassignedCount"] : this.state.totalUnassignedCount;
        var root:string = newState["root"] ? newState["root"] : this.state.root;
        var taxonSpecifics = newState["taxonSpecifics"] == undefined ? this.state.taxonSpecifics : newState["taxonSpecifics"];
        var numberOfLayers:number = alignedCroppedLineages[0].length;
        var cx:number = this.state.horizontalShift;
        var cy:number = this.state.verticalShift;
        var layerWidthInPx:number = Math.max((Math.min(cx, cy) - viewportDimensions["dpmm"] * 10) / numberOfLayers , viewportDimensions["dpmm"] * 4);
        var startDeg = (key) => {return taxonSpecifics[key]["degrees"][0]};
        var endDeg = (key) => {return taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length-1]};

        for (var key of Object.keys(taxonSpecifics)) {
            let centerDegree, centerRadius;
            centerDegree = startDeg(key) + (endDeg(key) - startDeg(key))/2;
            centerRadius = taxonSpecifics[key]["firstLayerAligned"] + 0.5;
            let centerX = centerRadius * layerWidthInPx * cos(centerDegree);
            
            centerX = round(centerX) + cx;
            
            let centerY = - centerRadius * layerWidthInPx * sin(centerDegree);
            centerY = round(centerY) + cy;
            let center = [centerX, centerY, centerDegree];
            taxonSpecifics[key]["center"] = center;

            let alternativeCenterRadius = taxonSpecifics[key]["firstLayerAligned"] + 0.25;
            let alternativeCenterX = alternativeCenterRadius * layerWidthInPx * cos(centerDegree);
            alternativeCenterX = round(alternativeCenterX) + cx;
            let alternativeCenterY = - alternativeCenterRadius * layerWidthInPx * sin(centerDegree);
            alternativeCenterY = round(alternativeCenterY) + cy;
            let alternativeCenter = [alternativeCenterX, alternativeCenterY, centerDegree];
            taxonSpecifics[key]["alternativeCenter"] = alternativeCenter;
        };

        for (var key of Object.keys(taxonSpecifics)) {
            if (taxonSpecifics[key]["layers"][0] === 0 ) {
                taxonSpecifics[key]["label"] = {
                    "direction": "circumferential",
                    "left": this.state.horizontalShift,
                    "right": "unset",
                    "top": this.state.verticalShift,
                    "transform": "translate(-50%, -50%)",
                    "transformOrigin": "center center",
                    "opacity": "1",
                    "angle": 0,
                    "abbreviation": root,
                    "display": "unset",
                    "fullLabel": root
                }
            } else {
                let direction = (taxonSpecifics[key]["layers"].length === 2 && taxonSpecifics[key]["layers"][1] === numberOfLayers) ? "radial" : "circumferential";
                //let direction = (numberOfLayers - taxonSpecifics[key]["firstLayerAligned"] === 1) ? "radial" : "circumferential";
                let angle, left, right, top, transform, transformOrigin, alternativeAngle, alternativeLeft, alternativeRight, alternativeTransform, alternativeTransformOrigin, alternativeTop;
                if (direction === "radial") {
                    angle = taxonSpecifics[key]["center"][2] <= 180 ? - taxonSpecifics[key]["center"][2] : + taxonSpecifics[key]["center"][2];
                    left = angle > 0 ? taxonSpecifics[key]["alternativeCenter"][0] : "unset";
                    right = left === "unset" ? (document.documentElement.clientWidth - taxonSpecifics[key]["alternativeCenter"][0]) : "unset";
                    angle = left === "unset" ? 270 - angle : 360 - (270 - angle);
                    top = taxonSpecifics[key]["alternativeCenter"][1];
                    transform = `translate(0, -50%) rotate(${angle}deg)`;
                    transformOrigin = left === "unset" ? "center right" : "center left";
                } else {
                    angle = (((270 - taxonSpecifics[key]["center"][2]) + 360) % 360) > 180 && (((270 - taxonSpecifics[key]["center"][2]) + 360) % 360 <= 360) ? taxonSpecifics[key]["center"][2] % 360 : (taxonSpecifics[key]["center"][2] + 180) % 360;
                    left = taxonSpecifics[key]["center"][0];
                    right = "unset";
                    top = taxonSpecifics[key]["center"][1];
                    transform = `translate(-50%, -50%) rotate(${angle}deg)`;
                    transformOrigin = "center center";

                    alternativeAngle = taxonSpecifics[key]["alternativeCenter"][2] <= 180 ? - taxonSpecifics[key]["alternativeCenter"][2] : + taxonSpecifics[key]["alternativeCenter"][2];
                    alternativeLeft = alternativeAngle > 0 ? taxonSpecifics[key]["alternativeCenter"][0] : "unset";
                    alternativeRight = alternativeLeft === "unset" ? (document.documentElement.clientWidth - taxonSpecifics[key]["alternativeCenter"][0]) : "unset";
                    alternativeTop = taxonSpecifics[key]["alternativeCenter"][1];
                    alternativeAngle = alternativeLeft === "unset" ? 270 - alternativeAngle : 360 - (270 - alternativeAngle);
                    alternativeTransform = `translate(0, -50%) rotate(${alternativeAngle}deg)`;
                    alternativeTransformOrigin = alternativeLeft === "unset" ? "center right" : "center left";
                }
                let percentage:number = round((taxonSpecifics[key]["totalCount"] / totalUnassignedCount) * 100);
                let oldPercentage:number = round(((taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length-1] - taxonSpecifics[key]["degrees"][0]) / 360) * 100);
                taxonSpecifics[key]["label"] = {
                    "direction": direction,
                    "left": left,
                    "right": right,
                    "top": top,
                    "transform": transform,
                    "transformOrigin": transformOrigin,
                    "opacity": "1",
                    "angle": angle,
                    "abbreviation": key,
                    "display": "unset",
                    "fullLabel": key + ` ${percentage}%`,
                    "alternativeAngle": alternativeAngle,
                    "alternativeLeft": alternativeLeft,
                    "alternativeRight": alternativeRight,
                    "alternativeTransform": alternativeTransform,
                    "alternativeTransformOrigin": alternativeTransformOrigin,
                    "alternativeTop": alternativeTop
                }

                if (taxonSpecifics[key]["rank"] === "species") {
                    let abbr:string = taxonSpecifics[key]["label"]["abbreviation"];
                    if (abbr.split(" ").length >= 2 && !(abbr.split(" ")[1] === "sp.")) {
                        let newAbbr:string = abbr.split(" ")[0].slice(0, 1) + ". " + abbr.split(" ").slice(1, abbr.split(" ").length).join(" ");
                        taxonSpecifics[key]["label"]["abbreviation"] = newAbbr;
                    }
                    else if (abbr.split(" ").indexOf("sp.") !== -1) {
                        let newAbbr:string = abbr.split(" ").slice(0, abbr.split(" ").indexOf("sp.") + 1).join(" ");
                        taxonSpecifics[key]["label"]["abbreviation"] = newAbbr;
                    }
                }
            }
        };
        this.getTaxonShapes(newState);
    }

    getTaxonShapes(newState:object):void {
        // var colors:string[] = ["6CCFF6", "1B998B", "A1E887", "EA638C", "B33C86"];
        // var colors:string[] = ["1B998B", "A1E887", "1E96FC", "B33C86","003F91", ];
        //var colors:string[] = newState["colors"] ? newState["colors"].map(hexToRGB) : this.state.colors.map(hexToRGB);
        var croppedLineages:string[][] = newState["croppedLineages"] == undefined ? this.state.croppedLineages : newState["croppedLineages"];
        var croppedLineages:string[][] = JSON.parse(JSON.stringify(croppedLineages));
        var taxonSpecifics = newState["taxonSpecifics"] == undefined ? this.state.taxonSpecifics : newState["taxonSpecifics"];

        let strokes:string[] = [];
        let colorIndex:number = 0;
        for (let i=0; i<croppedLineages.length; i++) {
            if (croppedLineages[i].length > 1) {
                let firstAncestor:string = croppedLineages[i][1];
                if (strokes.indexOf(firstAncestor) === -1) {
                    taxonSpecifics[firstAncestor]["fill"] = colors[colorIndex % colors.length];
                    taxonSpecifics[firstAncestor]["stroke"] = skeletonColor;
                    strokes.push(firstAncestor);
                    colorIndex++;
                }

                for (let j=2; j<croppedLineages[i].length; j++) {
                    let ancestorColor = taxonSpecifics[croppedLineages[i][1]]["fill"];
                    let nextColorIndex = (colors.indexOf(ancestorColor) + 1) % colors.length;
                    let nextColor = colors[nextColorIndex];
                    let selfStartDeg:number = taxonSpecifics[croppedLineages[i][j]]["degrees"][0];
                    let ancestorStartDeg:number = taxonSpecifics[croppedLineages[i][1]]["degrees"][0];
                    let ancestorEndDeg:number = taxonSpecifics[croppedLineages[i][1]]["degrees"][taxonSpecifics[croppedLineages[i][1]]["degrees"].length-1];
                    let coef:number = (selfStartDeg - ancestorStartDeg) / (ancestorEndDeg - ancestorStartDeg);
                    let tintFactor:number = (taxonSpecifics[croppedLineages[i][j]]["firstLayerAligned"] - 1) / 10;
                    var hue = midColor(ancestorColor, nextColor, coef);
                    var tintifiedHue = tintify(hue, tintFactor);
                    taxonSpecifics[croppedLineages[i][j]]["fill"] = tintifiedHue;
                    taxonSpecifics[croppedLineages[i][j]]["stroke"] = skeletonColor;
                }
            }
        }
        taxonSpecifics[croppedLineages[0][0]]["fill"] = "white";
        taxonSpecifics[croppedLineages[0][0]]["stroke"] = skeletonColor;
        this.setState(newState, () => console.log("state: ", this.state));
    }

    changePalette() {
        var newPaletteInput:string = (document.getElementById("new-palette") as HTMLInputElement).value;
        var newPalette:string[] = Array.from(newPaletteInput.matchAll(/[0-9a-f]{6}/g)).map(String);
        this.getTaxonShapes({"colors": newPalette});
    }

    handleClick(shapeId):void {
        var taxon:string = shapeId.match(/.+?(?=_)/)[0];
        var currLayer:number = parseInt(shapeId.match(/-?\d+/)[0]);
        var nextLayer;
        if (this.state.root.includes("&")) {
            nextLayer = currLayer <= 0 ? this.state.layer + (currLayer-1) : (currLayer + this.state.layer) - 1;
        }
        else {
            nextLayer = currLayer <= 0 ? this.state.layer + (currLayer-1) : currLayer + this.state.layer;
        }
        this.cropLineages(taxon, nextLayer, this.state.alteration, this.state.collapse);
    }

    checkTaxonLabelWidth():string[] {
        var taxonSpecifics:object = this.state.taxonSpecifics;
        var tooWide:string[] = [];
        for (let key of Object.keys(taxonSpecifics)) {
            let height = document.getElementById(`${key}_-_${taxonSpecifics[key]["firstLayerUnaligned"]}-label`)!.offsetHeight;
            let width = document.getElementById(`${key}_-_${taxonSpecifics[key]["firstLayerUnaligned"]}-label`)!.offsetWidth;
            
            if (taxonSpecifics[key]["label"]["direction"] === "radial") {
                var topBeforeRotation = taxonSpecifics[key]["center"][1] - height/2;
                var bottomBeforeRotation = taxonSpecifics[key]["center"][1] + height/2;
                var leftBeforeRotation = taxonSpecifics[key]["center"][0];
                var rightBeforeRotation = taxonSpecifics[key]["center"][0] + width;
                var cx = taxonSpecifics[key]["center"][0];
                var cy = taxonSpecifics[key]["center"][1];
                var angle = taxonSpecifics[key]["label"]["angle"];
                var fourPoints = getFourCorners(topBeforeRotation, bottomBeforeRotation, leftBeforeRotation, rightBeforeRotation, cx, cy, angle);

                var shape:any = document.getElementById(`${key}_-_${taxonSpecifics[key]["firstLayerUnaligned"]}`)!;
                let bottomLeft = document.querySelector("svg")!.createSVGPoint();
                bottomLeft.x = fourPoints["bottomLeft"][0];
                bottomLeft.y = fourPoints["bottomLeft"][1];

                let bottomRight = document.querySelector("svg")!.createSVGPoint();
                bottomRight.x = fourPoints["bottomRight"][0];
                bottomRight.y = fourPoints["bottomRight"][1];

                let topLeft = document.querySelector("svg")!.createSVGPoint();
                topLeft.x = fourPoints["topLeft"][0];
                topLeft.y = fourPoints["topLeft"][1];

                let topRight = document.querySelector("svg")!.createSVGPoint();
                topRight.x = fourPoints["topRight"][0];
                topRight.y = fourPoints["topRight"][1];
                if (!((shape.isPointInFill(bottomLeft) && shape.isPointInFill(topLeft)) || (shape.isPointInFill(bottomRight) && shape.isPointInFill(topRight)))) {
                    tooWide.push(key);
                }
            } else {
                var shapeCenters0:number = taxonSpecifics[key]["center"][0];
                var shapeCenters1:number = taxonSpecifics[key]["center"][1];
                var topBeforeRotation = shapeCenters1 - height/2;
                var bottomBeforeRotation = shapeCenters1 + height/2;
                var leftBeforeRotation = shapeCenters0 - width/2;
                var rightBeforeRotation = shapeCenters0 + width/2;
                var cx = shapeCenters0;
                var cy = shapeCenters1;
                var angle = taxonSpecifics[key]["label"]["angle"];
                var fourPoints = getFourCorners(topBeforeRotation, bottomBeforeRotation, leftBeforeRotation, rightBeforeRotation, cx, cy, angle);

                var shape:any = document.getElementById(`${key}_-_${taxonSpecifics[key]["firstLayerUnaligned"]}`)!;
                let bottomLeft = document.querySelector("svg")!.createSVGPoint();
                bottomLeft.x = fourPoints["bottomLeft"][0];
                bottomLeft.y = fourPoints["bottomLeft"][1];

                let bottomRight = document.querySelector("svg")!.createSVGPoint();
                bottomRight.x = fourPoints["bottomRight"][0];
                bottomRight.y = fourPoints["bottomRight"][1];

                let topLeft = document.querySelector("svg")!.createSVGPoint();
                topLeft.x = fourPoints["topLeft"][0];
                topLeft.y = fourPoints["topLeft"][1];

                let topRight = document.querySelector("svg")!.createSVGPoint();
                topRight.x = fourPoints["topRight"][0];
                topRight.y = fourPoints["topRight"][1];

                // Calculate where alternative, radially positioned label would fit into the shape:
                var alternativeTopBeforeRotation = taxonSpecifics[key]["center"][1] - height/2;
                var alternativeBottomBeforeRotation = taxonSpecifics[key]["center"][1] + height/2;
                var alternativeLeftBeforeRotation = taxonSpecifics[key]["center"][0] > this.state.horizontalShift ? taxonSpecifics[key]["center"][0] : taxonSpecifics[key]["center"][0] - width;
                var alternativeRightBeforeRotation = taxonSpecifics[key]["center"][0] > this.state.horizontalShift ? taxonSpecifics[key]["center"][0] + width : taxonSpecifics[key]["center"][0];
                var alternativeAngle = taxonSpecifics[key]["label"]["alternativeAngle"];
                var alternativeFourPoints = getFourCorners(alternativeTopBeforeRotation, alternativeBottomBeforeRotation, alternativeLeftBeforeRotation, alternativeRightBeforeRotation, cx, cy, alternativeAngle);

                let alternativeBottomLeft = document.querySelector("svg")!.createSVGPoint();
                alternativeBottomLeft.x = alternativeFourPoints["bottomLeft"][0];
                alternativeBottomLeft.y = alternativeFourPoints["bottomLeft"][1];

                let alternativeBottomRight = document.querySelector("svg")!.createSVGPoint();
                alternativeBottomRight.x = alternativeFourPoints["bottomRight"][0];
                alternativeBottomRight.y = alternativeFourPoints["bottomRight"][1];

                let alternativeTopLeft = document.querySelector("svg")!.createSVGPoint();
                alternativeTopLeft.x = alternativeFourPoints["topLeft"][0];
                alternativeTopLeft.y = alternativeFourPoints["topLeft"][1];

                let alternativeTopRight = document.querySelector("svg")!.createSVGPoint();
                alternativeTopRight.x = alternativeFourPoints["topRight"][0];
                alternativeTopRight.y = alternativeFourPoints["topRight"][1];

                if (!(shape.isPointInFill(bottomLeft) && shape.isPointInFill(bottomRight) && shape.isPointInFill(topLeft) && shape.isPointInFill(topRight)) && !(taxonSpecifics[key]["label"]["abbreviation"] === "") && !(shape.isPointInFill(alternativeBottomLeft) && shape.isPointInFill(alternativeBottomRight) && shape.isPointInFill(alternativeTopLeft) && shape.isPointInFill(alternativeTopRight))) {
                    tooWide.push(key);
                } else {
                    if (shape.isPointInFill(alternativeBottomLeft) && shape.isPointInFill(alternativeBottomRight) && shape.isPointInFill(alternativeTopLeft) && shape.isPointInFill(alternativeTopRight)) {
                        taxonSpecifics[key]["label"]["angle"] = taxonSpecifics[key]["label"]["alternativeAngle"];
                        taxonSpecifics[key]["label"]["left"] = taxonSpecifics[key]["label"]["alternativeLeft"];
                        taxonSpecifics[key]["label"]["right"] = taxonSpecifics[key]["label"]["alternativeRight"];
                        taxonSpecifics[key]["label"]["transform"] = taxonSpecifics[key]["label"]["alternativeTransform"];
                        taxonSpecifics[key]["label"]["transformOrigin"] = taxonSpecifics[key]["label"]["alternativeTransformOrigin"];
                        taxonSpecifics[key]["label"]["top"] = taxonSpecifics[key]["label"]["alternativeTop"];
                    }
                }
            }
        }
        return tooWide;
    }    

    abbreviate(abbreviatables:string[]) {
        let newTaxonSpecifics:object = JSON.parse(JSON.stringify(this.state.taxonSpecifics))
        for (let key of abbreviatables) {
            let newAbbreviation:string;
            if (newTaxonSpecifics[key]["label"]["abbreviation"].length > 25) {
                newAbbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, 24) + ".";
            } else {
                newAbbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, newTaxonSpecifics[key]["label"]["abbreviation"].length-2) + ".";
            }
            newAbbreviation = newAbbreviation.length < 4 ? "" : newAbbreviation;
            if (newAbbreviation.length === 0) {
                newTaxonSpecifics[key]["label"]["display"] = "none";
                newTaxonSpecifics[key]["label"]["direction"] = "circumferential";
            }
            newTaxonSpecifics[key]["label"]["abbreviation"] = newAbbreviation;
        }

        this.setState({taxonSpecifics: newTaxonSpecifics});
    }


    render() {
        currentState = this.state;
        var shapes:any = [];
        var labels:any = [];
        let tS:object = this.state.taxonSpecifics;
        for (let item of Object.keys(tS)) {
            let id:string = `${item}_-_${tS[item]["firstLayerUnaligned"]}`;
            let redirectTo:string = tS[item]["layers"][0] === 0 ? `${this.state.ancestors[this.state.ancestors.length - 1]}_-_0` : id;
            shapes.push(<TaxonShape id={id} abbr={tS[item]["label"]["abbreviation"]} onClick={() => this.handleClick(redirectTo)} d={tS[item]["svgPath"]} strokeWidth={viewportDimensions["dpmm"] * 0.265} fillColor={tS[item]["fill"]} labelOpacity={tS[item]["label"]["opacity"]} display={tS[item]["label"]["display"]} fullLabel={tS[item]["label"]["fullLabel"]} stroke={tS[item]["stroke"]}/>);
        }
        
        for (let item of Object.keys(tS)) {
            let id:string = `${item}_-_${tS[item]["firstLayerUnaligned"]}`;
            let redirectTo:string = tS[item]["layers"][0] === 0 ? `${this.state.ancestors[this.state.ancestors.length - 1]}_-_0` : id;
            let label = <TaxonLabel id={id} abbr={tS[item]["label"]["abbreviation"]} transform={tS[item]["label"]["transform"]} left={tS[item]["label"]["left"]} right={tS[item]["label"]["right"]} top={tS[item]["label"]["top"]} transformOrigin={tS[item]["label"]["transformOrigin"]} opacity={tS[item]["label"]["opacity"]} display={tS[item]["label"]["display"]} onClick={() => {this.handleClick(redirectTo)}} fullLabel={tS[item]["label"]["fullLabel"]}/>;
            labels.push(label);
        }

        for (let i=this.state.ancestors.length-1; i>=0; i--) {
            var ancestor = this.state.ancestors[i];
            var actualI = i - this.state.ancestors.length;
            labels.push(<AncestorLabel id={`${ancestor}_-_${actualI+1}`} taxon={ancestor} top={`${10+2.5*(this.state.ancestors.length-i)}vmin`} onClick={() => {this.handleClick(`${this.state.ancestors[i]}_-_${(i-this.state.ancestors.length)+1}`)}}/>)
        }

        return [<svg style={{"height": "100%", "width": "100%", "margin": "0", "padding": "0", "boxSizing": "border-box", "border": "none"}} id="shapes">{shapes}</svg>,<div id="labels">{labels}</div>]
    }
}

addEventListener("mousemove", (event) => handleMouseMove(event));

function handleMouseMove(event):void {
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
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    
    console.log("cursorX, cursorY: ", event.pageX, event.pageY);
}

function round(number, decimal=3):number {
    return (Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal));
}

function cos(number):number {
    return Math.cos(radians(number));
}

function sin(number):number {
    return Math.sin(radians(number));
}

function hexToRGB(hex):string {
    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return `rgb(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]})`;
}

function midColor(rgb1:string, rgb2:string, coef:number):string {
    var coef = coef / 2;
    var rgb1List:number[] = rgb1.match(/\d+/g)?.map(item => parseInt(item)) ?? [];
    var rgb2List:number[] = rgb2.match(/\d+/g)?.map(item => parseInt(item)) ?? [];
    var newRgb:number[] = [];
    for (let i = 0; i < 3; i++) {
        var newNum = rgb1List[i] < rgb2List[i] ? rgb1List[i] + (coef * (rgb2List[i] - rgb1List[i])) : rgb1List[i] - (coef * (rgb1List[i] - rgb2List[i]));
        newRgb.push(Math.round(newNum));
    }
    return `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
}

function tintify(rgb:string, tintFactor:number):string {
    var rgbList:number[] = rgb.match(/\d+/g)?.map(item => parseInt(item)) ?? [];
    var newRgb:number[] = [];
    for (let i = 0; i < 3; i++) {
        var newNum = rgbList[i] + ((255 - rgbList[i]) * tintFactor);
        newRgb.push(Math.round(newNum));
    }
    return `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
}

function hoverHandler(id:string, fullLabel:string):void {
    if (id.indexOf("-label") > -1) {
        var label = id;
        var shape = id.replace("-label", "");
    } else {
        var shape = id;
        var label = id + "-label";
    }

    document.getElementById(shape)!.style.strokeWidth = "0.4vmin";
    document.getElementById(label)!.style.fontWeight = "bold";
    document.getElementById(label)!.style.zIndex = "1000";
    document.getElementById(label)!.style.border = "0.4vmin solid #800080";
    document.getElementById(label)!.style.opacity = "1";
    document.getElementById(label)!.style.display = "unset";
    document.getElementById(label)!.style.backgroundColor = "white";
    document.getElementById(label)!.innerText = fullLabel;
}

function onMouseOutHandler(id:string, usualOpacity:string, abbreviation:string, display:string):void {
    if (id.indexOf("-label") > -1) {
        var label = id;
        var shape = id.replace("-label", "");
    } else {
        var shape = id;
        var label = id + "-label";
    }
    document.getElementById(shape)!.style.strokeWidth = "0.2vmin";
    document.getElementById(label)!.style.fontWeight = "normal";
    document.getElementById(label)!.style.zIndex = "unset";
    document.getElementById(label)!.style.border = "none";
    document.getElementById(label)!.style.backgroundColor = "unset";
    document.getElementById(label)!.style.opacity = usualOpacity;
    document.getElementById(label)!.innerText = abbreviation;
    document.getElementById(label)!.style.display = display;
}


// Returns a set of arrays, where each array contains all elements that will be on the same level in the plot.
function getLayers(lineagesCopy:string[][], unique:boolean=false):string[][] {
    var longestLineageLength:number = Math.max(...lineagesCopy.map(item => item.length)); // get the length of the longest lineage, i.e. how many layers the plot will have
    var layers:string[][] = [];
    for (let i=0; i<longestLineageLength; i++) {
        var layer:string[] = [];
        for (let j=0; j<lineagesCopy.length; j++) {
            layer.push(lineagesCopy[j][i]);
        }
        if (unique) { 
            layer = layer.filter((value, index, self) => Boolean(value) && self.indexOf(value) === index);
        }
        layers.push(layer);
    }
    return layers;
}

function sendSnapshot() {
    var srcElement = document.getElementById("plot-container")!;
    html2canvas(srcElement).then(function (canvas) {
        var url = canvas.toDataURL("image/jpeg", 0.2);
        $.ajax({
            type: "POST",
            url: "/send-email",
            data: {"url": url, "currentState": JSON.stringify(currentState)},
            success: function (response) {
                console.log("Success!");
            },
            error: function (response) {
                console.log("ERROR", response);
            }
        });
    });
}

function getFourCorners(top:number, bottom:number, left:number, right:number, cx:number, cy:number, angle:number):object {
    var topLeft:number[] = [((left-cx)*Math.cos(angle* (Math.PI/180)) - (top-cy)*Math.sin(angle* (Math.PI/180))) + cx, ((left-cx)*Math.sin(angle* (Math.PI/180)) + (top-cy)*Math.cos(angle* (Math.PI/180))) + cy];
    var topRight:number[] = [((right-cx)*Math.cos(angle* (Math.PI/180)) - (top-cy)*Math.sin(angle* (Math.PI/180))) + cx, ((right-cx)*Math.sin(angle* (Math.PI/180)) + (top-cy)*Math.cos(angle* (Math.PI/180))) + cy];
    var bottomLeft:number[] = [((left-cx)*Math.cos(angle* (Math.PI/180)) - (bottom-cy)*Math.sin(angle* (Math.PI/180))) + cx, ((left-cx)*Math.sin(angle* (Math.PI/180)) + (bottom-cy)*Math.cos(angle* (Math.PI/180))) + cy];
    var bottomRight:number[] = [((right-cx)*Math.cos(angle* (Math.PI/180)) - (bottom-cy)*Math.sin(angle* (Math.PI/180))) + cx, ((right-cx)*Math.sin(angle* (Math.PI/180)) + (bottom-cy)*Math.cos(angle* (Math.PI/180))) + cy];
    return {topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight};
}

var rankPatternFull:string[] = ["root", "superkingdom", "kingdom", "subkingdom", "superphylum", "phylum", "subphylum", "superclass", "class", "subclass", "superorder", "order", "suborder", "superfamily", "family", "subfamily", "supergenus", "genus", "subgenus", "superspecies", "species"];

var allTaxaReduced:object = JSON.parse(JSON.stringify(allTaxa));
var reducibleTaxa:string[] = [];
var taxaWithReducibleLineages:string[] = [];

// Get the names of all taxa with reducible lineages:
for (let taxName of Object.keys(allTaxa)) {
    let lineage:string[][] = allTaxa[taxName].lineageNames;
    for (let i=0; i<lineage.length; i++) {
        if (rankPatternFull.indexOf(lineage[i][0]) === -1) {
            taxaWithReducibleLineages.push(taxName);
            break;
        }
    }
}

// Reduce and alter in allTaxaReduced:
for (let taxName of taxaWithReducibleLineages) {
    let lineage:string[][] = allTaxa[taxName].lineageNames;
    let reducedLineage: string[][] = lineage.map(item => item);
    for (let i=lineage.length-1; i>=0; i--) {
        if (rankPatternFull.indexOf(lineage[i][0]) === -1) {
            reducedLineage.splice(i,1);
        }
    }
    allTaxaReduced[taxName].lineageNames = reducedLineage;
}

// Find all reducible taxa.
for (let taxName of Object.keys(allTaxaReduced)) {
    let rank:string = allTaxaReduced[taxName].rank;
    let lineage:string[][] = allTaxaReduced[taxName].lineageNames;
    if (!lineage[lineage.length - 1] || rank !== lineage[lineage.length - 1][0]) {
        reducibleTaxa.push(taxName);
    }
}

// Set "root" as the first ancestor of every taxon.
for (let taxName of Object.keys(allTaxaReduced)) {
    if (taxName !== "root") {
        allTaxaReduced[taxName].lineageNames.unshift(allTaxaReduced["root"].lineageNames[0]);
    }
}

// Finally, reduce allTaxa, ridding it of all taxa with weird, hardly-placable ranks - but making sure no information is lost.
for (let taxName of reducibleTaxa) {
    let unassignedCount = allTaxa[taxName].unassignedCount;
    let lineage:string[][] = allTaxaReduced[taxName].lineageNames;
    let lastPredecessor = lineage[lineage.length-1][1];
    if (allTaxaReduced[lastPredecessor]) {
        allTaxaReduced[lastPredecessor]["unassignedCount"] += unassignedCount;
        delete allTaxaReduced[taxName];
    } else {
        let newRank = lineage[lineage.length-1][0];
        let totalCount = allTaxa[taxName].totalCount;
        allTaxaReduced[lastPredecessor] = {};
        allTaxaReduced[lastPredecessor]["lineageNames"] = lineage;
        allTaxaReduced[lastPredecessor]["rank"] = newRank;
        allTaxaReduced[lastPredecessor]["totalCount"] = totalCount;
        allTaxaReduced[lastPredecessor]["unassignedCount"] = unassignedCount;
        delete allTaxaReduced[taxName];
    }
}


// Add taxa with no unassignedCounts as objects in allTaxaReduced, accounting for the fact that there are different taxa with the same name.
var newlyAdded:string[] = [];
for (let taxName of Object.keys(allTaxaReduced)) {
    let unassignedCount = allTaxaReduced[taxName].unassignedCount;
    let lineage:string[][] = allTaxaReduced[taxName].lineageNames;
    for (let predecessor of lineage) {
        if (Object.keys(allTaxaReduced).filter(item => item.startsWith(predecessor[1])).length === 0) {
            newlyAdded.push(predecessor[1]);
            allTaxaReduced[predecessor[1]] = {};
            allTaxaReduced[predecessor[1]]["rank"] = predecessor[0];
            allTaxaReduced[predecessor[1]]["lineageNames"] = lineage.slice(0, lineage.indexOf(predecessor) + 1);
            allTaxaReduced[predecessor[1]]["totalCount"] = unassignedCount;
            allTaxaReduced[predecessor[1]]["unassignedCount"] = 0;
        }
        else {
            let falseNamesakes:string[] = Object.keys(allTaxaReduced).filter(item => item.startsWith(predecessor[1]) && allTaxaReduced[item]["rank"] === predecessor[0]);
            let trueNamesakes:string[] = Object.keys(allTaxaReduced).filter(item => item.startsWith(predecessor[1]) && allTaxaReduced[item]["rank"] !== predecessor[0]);

            if (falseNamesakes.length > 0) {
                if (newlyAdded.indexOf(falseNamesakes[0]) > -1) {
                    allTaxaReduced[falseNamesakes[0]]["totalCount"] += unassignedCount;
                }
            }
            else {
                newlyAdded.push(predecessor[1] + " " + predecessor[0]);
                allTaxaReduced[predecessor[1] + " " + predecessor[0]] = {};
                allTaxaReduced[predecessor[1] + " " + predecessor[0]]["rank"] = predecessor[0];
                allTaxaReduced[predecessor[1] + " " + predecessor[0]]["lineageNames"] = lineage.slice(0, lineage.indexOf(predecessor) + 1);
                allTaxaReduced[predecessor[1] + " " + predecessor[0]]["totalCount"] = unassignedCount;
                allTaxaReduced[predecessor[1] + " " + predecessor[0]]["unassignedCount"] = 0;
            }
        }
    }
}

// Replace names in lineages with new names from previous step.
for (let taxName of Object.keys(allTaxaReduced)) {
    let lineage:string[][] = allTaxaReduced[taxName].lineageNames;
    for (let predecessor of lineage) {
        if (Object.keys(allTaxaReduced).filter(item => item.startsWith(predecessor[1])).length > 1) {
            let newName:string = Object.keys(allTaxaReduced).filter(item => item.startsWith(predecessor[1])).filter(item1 => allTaxaReduced[item1]["rank"] === predecessor[0])[0];
            predecessor[1] = newName;
        }
    }
}

// Do not consider taxa without unassigned counts in croppedLineages() later.
for (let taxName of Object.keys(allTaxaReduced)) {
    if (allTaxaReduced[taxName]["unassignedCount"] === 0){
        allTaxaReduced[taxName]["skip"] = true;
    }
}

// Sort before separating rank from taxon.
var lineagesFull:string[][] = [];
for (let taxName of Object.keys(allTaxaReduced).filter(item => !allTaxaReduced[item]["skip"])) {
    lineagesFull.push(allTaxaReduced[taxName].lineageNames.map(item => item[1] + "_*_" + item[0]))
}
//lineagesFull.sort();

// Separate.
var lineagesNames:string[][] = [];
var lineagesRanks:string[][] = [];
for (let lineage of lineagesFull) {
    var lineageNames:string[] = lineage.map(item => item.split("_*_")[0]);
    var lineageRanks:string[] = lineage.map(item => item.split("_*_")[1]);
    lineagesNames.push(lineageNames);
    lineagesRanks.push(lineageRanks);
}

newlyAdded = newlyAdded.filter((v, i, a) => a.indexOf(v) === i);

var colors:string[] = [];
var colorOffset:number = 94 //Math.round(Math.random() * 100); //84, 98, 31, 20
console.log("color offset: ", colorOffset)
for (let i=0; i<7; i++) {
    var r = Math.sin(0.3 * colorOffset + 4) * 55 + 200;
    var g = Math.sin(0.3 * colorOffset + 2) * 55 + 200;
    var b = Math.sin(0.3 * colorOffset) * 55 + 200;
    var newColor = `rgb(${round(r,0)}, ${round(g,0)}, ${round(b,0)})`;
    colors.push(newColor);
    colorOffset += 3;
}

// var fullPlot:Plot = new Plot();
// var mycosphaerellalesPlot:Plot = new Plot("Bacteria", 0, true, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, true, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Mycosphaerellales", 8, false, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Eurotiomycetes", 6, false);
var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, false);

var snapshotButton = document.getElementById("take-snapshot");
snapshotButton?.addEventListener("click", (event) => {
    sendSnapshot();
})