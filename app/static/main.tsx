import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as _html2canvas from "html2canvas";
import { unmountComponentAtNode } from "react-dom";
import { json } from "stream/consumers";
import { ln, lr, atr } from "./objects.js";
import { createPalette, radians, round, sin, cos, handleMouseMove, hexToRGB, midColor, tintify, lineIntersect, lineLength, getFourCorners, getViewportDimensions} from "./helperFunctions.js";

var currentState;
var skeletonColor:string = "#800080";
const html2canvas: any = _html2canvas;
const domContainer:any = document.querySelector('#plot-container');
var reactRoot = ReactDOM.createRoot(domContainer);
var viewportDimensions = getViewportDimensions();
var alreadyVisited:object = {};
let fileName = "lessSpontaneous2.tsv";
let taxonName = "Laurasiatheria";
let layerName = 7;
let collapseName = "collapseFalse";
let modeName = "allEqual";
var eThreshold = null;

/* ===== FETCHING THE DATA ===== */

var path = "lessSpontaneous2.tsv";
//loadDataFromTSV(path);
let lineagesNames:string[][] = ln;
let lineagesRanks:string[][] = lr;
let allTaxaReduced:object = atr;
let rankPatternFull:string[] = ["root","superkingdom","kingdom","subkingdom","superphylum","phylum","subphylum","superclass","class","subclass","superorder","order","suborder","superfamily","family","subfamily","supergenus","genus","subgenus","superspecies","species"];

var colors:string[] = [];
var colorOffset:number = Math.round(Math.random() * 100); //84, 98, 31, 20, 1, 2
colors = createPalette(colorOffset);


/* ===== DEFINING THE REACT COMPONENTS ===== */

class AncestorSection extends React.Component<{ancestors:string[], root:string, layer:number, onClickArray:any}, {root:string, layer:number, rank:string, totalCount:number, unassignedCount:number, lines:string[]}> {
    constructor(props) {
        super(props);
        this.state = {
            root: "",
            layer: -1,
            rank: "",
            totalCount: 0,
            unassignedCount: 0,
            lines: []
        }
    }

    componentDidUpdate() {
        if (this.props.root !== this.state.root) {
            this.getCounts();
        }
    }

    getCounts() {
        let totalCount:number = 0;
        let unassignedCount:number = 0;
        let rank:string = "";
        if (this.props.root.indexOf("&") > -1) {
            let groupedTaxa:string[] = this.props.root.split(" & ");
            for (let taxon of groupedTaxa) {
                totalCount += allTaxaReduced[taxon]["totalCount"]
            }
            unassignedCount = 0;
            rank = allTaxaReduced[groupedTaxa[0]]["rank"];
        }
        else {
            totalCount = allTaxaReduced[this.props.root]["totalCount"];
            unassignedCount = allTaxaReduced[this.props.root]["unassignedCount"];
            rank = allTaxaReduced[this.props.root]["rank"];
        }

        let lines:string[] = this.props.ancestors.map(item => (`${round(totalCount * 100 / allTaxaReduced[item]["totalCount"], 2)}%`));

        this.setState({totalCount: totalCount, unassignedCount: unassignedCount, root: this.props.root, layer: this.props.layer, lines: lines, rank: rank});
    }

    render() {
        let firstLine:any = <legend style={{"color": "#800080", "fontWeight": "bold"}}>Current layer:</legend>;
        let nameLine:any = <p style={{"padding": 0, "margin": 0, "paddingBottom": "1vmin"}}>Taxon: <b>{this.state.root}</b>, #{this.state.layer}</p>
        let rankLine:any = <p style={{"padding": 0, "margin": 0}}>Rank: {this.state.rank}</p>;
        let totalCountLine:any = <p style={{"padding": 0, "margin": 0}}>Total count: {this.state.totalCount}</p>;
        let unassignedCountLine:any = <p style={{"padding": 0, "margin": 0}}>Unspecified {this.state.root}: {this.state.unassignedCount}</p>
        //!!! rewrite v
        let beforePreprocessing:number = allTaxa[this.state.root] ? allTaxa[this.state.root]["unassignedCount"] : 0;
        let bPLine:any = <p style={{"padding": 0, "margin": 0, "paddingBottom": "1vmin"}}>(before preprocessing: {beforePreprocessing})</p>;
        let ps:any = [firstLine, nameLine, rankLine, totalCountLine, unassignedCountLine, bPLine]
        for (let i=0; i<this.props.ancestors.length; i++) {
            ps.push(<p style={{"padding": 0, "margin": 0}} onClick={this.props.onClickArray[i]}>{this.state.lines[i]} of <b>{this.props.ancestors[i]}</b></p>)
        }
        return <fieldset style={{"borderColor": "#800080"}}>{ps}</fieldset>
    }
}

class DescendantSection extends React.Component<{self:string, ancestor:string, layer:number, hovered:boolean}, {rank:string, totalCount:number, unassignedCount:number, percentage:number, self:string, layer:number, hovered:boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            self: "",
            layer: -1,
            rank: "",
            totalCount: 0,
            unassignedCount: 0,
            percentage: 0,
            hovered: false
        }
    }

    componentDidMount(): void {
        document.getElementById("descendant-section")?.addEventListener("change", () => {
            let el:any = document.getElementById("descendant-section")!;
            let values:any[];
            let self:string;
            let layer:number;
            let ancestor:string;
            let hovered:boolean;
            if (el.value.length === 0) {
                self = "";
                layer = 0;
                ancestor = "";
                hovered = false;
            }
            else {
                values = el.value.split("*");
                self = values[0];
                layer = parseInt(values[1]);
                ancestor = values[2];
                hovered = true;
            }
            if (!(this.state.self === self)) {
                this.calculateParams(self, layer, ancestor, hovered);
            }
        })
    }

    calculateParams(self, layer, ancestor, hovered) {
        if (hovered) {
            let totalCount:number = 0;
            let unassignedCount:number = 0;
            let rank:string;
            if (self.indexOf("&") > -1) {
                let groupedTaxa:string[] = self.split(" & ");
                for (let taxon of groupedTaxa) {
                    totalCount += allTaxaReduced[taxon]["totalCount"]
                }
                unassignedCount = 0;
                rank = allTaxaReduced[groupedTaxa[0]]["rank"];
            }
            else {
                totalCount = allTaxaReduced[self]["totalCount"];
                unassignedCount = allTaxaReduced[self]["unassignedCount"];
                rank = allTaxaReduced[self]["rank"];
            }
            let percentage:number = totalCount * 100 / allTaxaReduced[ancestor]["totalCount"];
            this.setState({totalCount: totalCount, unassignedCount: unassignedCount, rank: rank, percentage: percentage, layer: layer, self: self, hovered: hovered});
        }
        else {
            this.setState({totalCount: 0, unassignedCount: 0, rank: "", percentage: 0, self: "", layer: 0, hovered: hovered});
        }
    }

    render() {
        let ps:any[] = [];
        if (this.state.hovered) {
            let firstLine:any = <legend style={{"color": "#800080", "fontWeight": "bold"}}>Hovering over:</legend>;
            let nameLine:any = <p style={{"padding": 0, "margin": 0, "paddingBottom": "1vmin"}}>Taxon: <b>{this.state.self}</b>, #{this.state.layer}</p>
            let rankLine:any = <p style={{"padding": 0, "margin": 0}}>Rank: {this.state.rank}</p>;
            let totalCountLine:any = <p style={{"padding": 0, "margin": 0}}>Total count: {this.state.totalCount}</p>;
            let unassignedCountLine:any = <p style={{"padding": 0, "margin": 0}}>Unassigned {this.state.self}: {this.state.unassignedCount}</p>
            ps = [firstLine, nameLine, rankLine, totalCountLine, unassignedCountLine]
            return <fieldset style={{"borderColor": "#800080"}}>{ps}</fieldset>
        }
        return <div></div>
    }
}

class PlotDrawing extends React.Component<{lineages:string[][], ranks:string[][]}, {root:string, layer:number, collapse:boolean, horizontalShift:number, verticalShift:number, taxonSpecifics:object, croppedLineages:string[][], alignedCroppedLineages:string[][], croppedRanks:string[][], unassignedCounts:string[][], structureByDegrees:object, structureByTaxon: object, svgPaths:object, shapeComponents:object, shapeCenters:object, taxonLabels:object, taxonShapes:object, colors:string[], ancestors:string[], rankPattern:string[], alteration:string, totalUnassignedCount:number, numberOfLayers:number, layerWidth:number, count:number, abbreviateLabels:boolean, labelsPlaced:boolean, height:number, alreadyRepeated:boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            root: "Laurasiatheria",
            layer: 7,
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
            alteration: "allEqual",
            totalUnassignedCount: 0,
            numberOfLayers: -1,
            layerWidth: -1,
            count: 0,
            abbreviateLabels: true,
            labelsPlaced: false,
            height: 0,
            alreadyRepeated: false
        }
    }

    componentDidMount() {

        // Once everything is initialized, calculate plot.
        this.cropLineages();

        // Recalculate plot on window resize.
        addEventListener("resize", (event) => {
            var newViewportDimensions = getViewportDimensions();
            viewportDimensions = newViewportDimensions;
            this.setState({horizontalShift: newViewportDimensions["cx"], verticalShift: newViewportDimensions["cy"], alteration:this.state.alteration}, () => this.cropLineages());
        })

        // Recalculate plot when user changes settings - radio button, checkboxes, new file.
        document.getElementById("radio-input")!.addEventListener("change", () => {
            let alteration:any = document.querySelector('input[name="radio"]:checked')!.getAttribute("id");
            this.cropLineages(this.state.root, this.state.layer, alteration, this.state.collapse);
        })
        document.getElementById("checkbox-input")!.addEventListener("change", () => {
            let element:any =  document.getElementById("checkbox-input")!;
            let checked:boolean = element.checked;
            this.cropLineages(this.state.root, this.state.layer, this.state.alteration, checked);
        })
        document.getElementById("new-data")!.addEventListener("change", () => {
            let newData:any = document.getElementById("new-data")!
            let collapsed:any = document.getElementById("checkbox-input")!
            let currentAlteration:any = document.querySelector('input[name="radio"]:checked')!
            let allEqual:any = document.getElementById("allEqual")!
            newData.checked = false;
            collapsed.checked = false;
            currentAlteration.checked = false;
            allEqual.checked = true;
            colors = createPalette(colorOffset);

            this.cropLineages("root", 0, "allEqual", false, lineagesNames, lineagesRanks);
        })
    }

    componentDidUpdate() {
        if (!this.state.labelsPlaced) {
            this.placeLabels();
        }
    }

    // Leave only relevant lineages and crop them if necessary.
    cropLineages(root=this.state.root, layer=this.state.layer, alteration=this.state.alteration, collapse=this.state.collapse, lineages=lineagesNames, ranks=lineagesRanks):void {

        console.log("eThreshold: ", eThreshold);

        // Change some variables, so that when the SVG is downloaded, the SVG file name reflects all settings.
        taxonName = root.slice(0, 10);
        layerName = layer;
        modeName = alteration;
        collapseName = "collapse" + collapse;

        // Get only relevant lineages.
        var croppedLineages:string[][] = [], croppedRanks:string[][] = [];
        let rootTaxa:string[] = root.split(" & "); // In the root taxon is actually multiple taxa married together.
        for (let i=0; i<lineages.length; i++) { // Iterate over all lineages.
            if (rootTaxa.indexOf(lineages[i][layer]) > -1) { // If the current lineage, at the relevant layer, contains the root taxon (or one of them), add it.
                croppedLineages.push(lineages[i]);
                croppedRanks.push(ranks[i]);
            }
        }

        // Crop lineages so they start with clicked taxon.
        var ancestors:string[] = [""];
        if (croppedLineages[0]) { // If there is anything to show at all, a.k.a if there are lineages that passed the first requirement above...
            ancestors = croppedLineages[0].slice(0, layer); // ...then, they all have the same ancestors, so we set up a variable that will become a part of the component state later.
        }
        if (rootTaxa.length > 1) { // If the clicked taxon is a married taxon, then crop the lineages to start with the parent taxon of the clicked (married) taxon.
            croppedLineages = croppedLineages.map(item => item.slice(layer-1));
            croppedRanks = croppedRanks.map(item => item.slice(layer-1));
        }
        else { // Otherwise, crop the lineages to start with the clicked taxon.
            croppedLineages = croppedLineages.map(item => item.slice(layer));
            croppedRanks = croppedRanks.map(item => item.slice(layer));
        }

        // Get minimal rank pattern for this particular plot to prepare for alignment.
        var ranksUnique:string[] = croppedRanks.reduce((accumulator, value) => accumulator.concat(value), []); // Create an array of all ranks of all cropped lineages. Not unique yet.
        ranksUnique = ranksUnique.filter((value, index, self) => Boolean(value) && self.indexOf(value) === index); // Uniquify.
        var rankPattern:string[] = rankPatternFull.filter(item => ranksUnique.indexOf(item) > -1); // Match the uniquified array to the fixed rank pattern to keep hierarchical order.

        // Mary taxa if necessary.
        let changedLineages:Boolean[] = [];
        if (alteration.startsWith("marriedTaxa")) {
            let cropped = this.marryTaxa(croppedLineages, croppedRanks, alteration);
            croppedLineages = cropped[0];
            croppedRanks = cropped[1];
            changedLineages = cropped[2];
        }

        // Collapse lineages if necessary.
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
            if (changedLineages[i] || taxName.includes("&")) {
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
                taxonSpecifics[taxName]["married"] = true;
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
        if (root.indexOf("&") > -1) {
            for (let taxName of Object.keys(taxonSpecifics)) {
                totalUnassignedCount += taxonSpecifics[taxName]["unassignedCount"];
            }
        }
        else {
            totalUnassignedCount = allTaxaReduced[root]["totalCount"];
        }
        
        // Make all lineages take up the same amount of degrees in the plot if necessary.
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

        var dpmm:number = viewportDimensions["dpmm"];
        var numberOfLayers:number = alignedCropppedLineages[0].length;
        var smallerDimension:number = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth:number = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 4);

        // Continue if more than one lineage fulfilling the criteria was found.
        var currPlotId:string = root + layer + collapse + alteration + round(layerWidth);
        if (Object.keys(alreadyVisited).indexOf(currPlotId) > -1) {
            this.setState(alreadyVisited[currPlotId]);
        } else if (croppedLineages.length > 1) {
            this.assignDegrees({"root": root, "layer": layer, "rankPattern": rankPattern, "taxonSpecifics": taxonSpecifics, "croppedLineages": croppedLineages, "alignedCroppedLineages": alignedCropppedLineages, "ancestors": ancestors, "alteration": alteration, "collapse": collapse, "totalUnassignedCount": totalUnassignedCount, count: 0, "abbreviateLabels": true, "labelsPlaced": false, "alreadyRepeated": false});
        }
    }

    marryTaxa(croppedLineages:string[][], croppedRanks:string[][], alteration="marriedTaxaI") {
        // Set threshold for marrying. Currently fixed at 2%.
        var threshold:number = 0.02;

        var totalUnassignedCounts:number = 0;
        for (let lineage of croppedLineages) {
            totalUnassignedCounts += allTaxaReduced[lineage[lineage.length - 1]]["unassignedCount"];
        }

        var reducibleLineages:any = [];

        // Find all lineages that make up <2% of the whole, crop them so that they end in the most specific taxon >=1%, put them in an array called reducibleLineages. 
        for (let lineage of croppedLineages) {
            if (allTaxaReduced[lineage[lineage.length - 1]]["totalCount"] / totalUnassignedCounts < threshold) { // So, the wedge is too thin?
                let lineageNumber:number = croppedLineages.indexOf(lineage);
                let lastWayTooThinLayer:number = lineage.length - 1;
                // Find the furthest wedge above it that is also too thin.
                for (let i=lineage.length-2; i>=0; i--) {
                    if (allTaxaReduced[lineage[i]]["totalCount"] / totalUnassignedCounts >= threshold) {
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

            // Sort indices of reduction groups in ascending order, group some of them together if they are in the same subgroup.
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

                    if (sum >= threshold) {
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
                    //newGroups.push(newIndexGroup);
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
                    //let names1 = names.map(item => item.replace(RegExp(rankPatternFull.map(item => " " + item).join("|")),""));
                    newReductionGroups[`${group}-${i}`]["commonName"] = names.join(" & ");
                }
            }
            reductionGroups = newReductionGroups;
        }

        let changedLineages:any[] = new Array(croppedLineages.length).fill(false);

        for (let group of Object.keys(reductionGroups).filter(item => reductionGroups[item]["index"].length > 1)) {
            for (let index of reductionGroups[group]["index"]) {
                croppedLineages[index].splice(reductionGroups[group]["spliceAt"], croppedLineages[index].length - reductionGroups[group]["spliceAt"], reductionGroups[group]["commonName"]);
                croppedRanks[index].splice(reductionGroups[group]["spliceAt"] + 1);
                changedLineages.splice(index, 1, true);
            }
            //console.log("group cm: ", group["commonName"])
            //group["commonName"] = group.replace(RegExp(rankPatternFull.map(item => " " + item).join("|")),"");
        }
        
        for (let i=croppedLineages.length-1; i>=0; i--) {
            let croppedLineageCopy = croppedLineages.map(item => JSON.stringify(item));
            let lineage:string = croppedLineageCopy[i];
            let lastIndex = i;
            let firstIndex = croppedLineageCopy.indexOf(lineage);
            if (firstIndex !== lastIndex) {
                croppedLineages.splice(lastIndex, 1);
                croppedRanks.splice(lastIndex, 1);
                changedLineages.splice(lastIndex, 1);
            }
        }
        return [croppedLineages, croppedRanks, changedLineages];
    }

    // Assign each cropped lineage a start and end degree.
    assignDegrees(newState:object):void {
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var croppedLineages = newState["croppedLineages"] ? newState["croppedLineages"] : this.state.taxonSpecifics;
        var taxonSpecifics = newState["taxonSpecifics"] ? newState["taxonSpecifics"] : this.state.taxonSpecifics;
        var totalUnassignedCounts:number = 0;
        if (newState["alteration"] === "allEqual") {
            for (let taxName of Object.keys(taxonSpecifics).filter(item => taxonSpecifics[item]["unassignedCount"] !== 0)) {
                totalUnassignedCounts += taxonSpecifics[taxName]["unassignedCount"];
            }
        }
        else {     
            var totalUnassignedCounts = newState["totalUnassignedCount"];
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
        var alignedCroppedLineages:string[][] = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var taxonSpecifics:object = newState["taxonSpecifics"] == undefined ? this.state.taxonSpecifics : newState["taxonSpecifics"];
        var dpmm:number = viewportDimensions["dpmm"];
        // Redundancy v
        var numberOfLayers:number = alignedCroppedLineages[0].length;
        var smallerDimension:number = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth:number = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 4);

        var firstLayer = (key) => {return taxonSpecifics[key]["layers"][0]};
        var secondLayer = (key) => {return taxonSpecifics[key]["layers"][1]};
        var startDeg = (key) => {return taxonSpecifics[key]["degrees"][0]};
        var endDeg = (key) => {return taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length-1]};
        

        for (var key of Object.keys(taxonSpecifics)) {
            var firstLayerRadius:number = round(firstLayer(key)*layerWidth);
            if (taxonSpecifics[key]["layers"][0] === 0) { // If the shape to be drawn is the center of the plot (1 circle).
                taxonSpecifics[key]["svgPath"] = `M ${this.state.horizontalShift}, ${this.state.verticalShift} m -${layerWidth}, 0 a ${layerWidth},${layerWidth} 0 1,0 ${(layerWidth)* 2},0 a ${layerWidth},${layerWidth} 0 1,0 -${(layerWidth)* 2},0`;
            } else { // If the shape to be drawn is NOT the center of the plot, but a complex shape, add:
                var subpaths:string[] = [];
                if (round(endDeg(key) - startDeg(key)) === 360) { // If the shape to be drawn completes a full circle:
                    var innerArc:object = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
                    var innerArcPath:string = `M ${this.state.horizontalShift}, ${this.state.verticalShift} m -${firstLayerRadius}, 0 a ${firstLayerRadius},${firstLayerRadius} 0 1,0 ${(firstLayerRadius)* 2},0 a ${firstLayerRadius},${firstLayerRadius} 0 1,0 -${(firstLayerRadius)* 2},0`;
                    subpaths = [innerArcPath];

                    if (taxonSpecifics[key]["layers"].length === 2) { // If the shape to be drawm completes a full circle AND consists simply of two concentric circles.
                        var midArcPath:string = `M ${this.state.horizontalShift}, ${this.state.verticalShift} m -${secondLayer(key)*layerWidth}, 0 a ${secondLayer(key)*layerWidth},${secondLayer(key)*layerWidth} 0 1,0 ${(secondLayer(key)*layerWidth)* 2},0 a ${secondLayer(key)*layerWidth},${secondLayer(key)*layerWidth} 0 1,0 -${(secondLayer(key)*layerWidth)* 2},0`;
                        subpaths.push(midArcPath);
                    }
                    else { // If the shape to be drawm completes a full circle AND is of irregular shape.
                        var midArc:object = {};
                        for (let i=taxonSpecifics[key]["layers"].length-1; i>=1; i--) {
                            var curr = taxonSpecifics[key]["degrees"][i];
                            var prev = taxonSpecifics[key]["degrees"][i-1];
                            var startingLetter:string = i === taxonSpecifics[key]["layers"].length-1 ? "M" : "L";
                            midArc = this.calculateArcEndpoints(taxonSpecifics[key]["layers"][i], layerWidth, prev, curr);
                            var midArcPath:string = `${startingLetter} ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 0 0 ${midArc["x1"]},${midArc["y1"]}`;
                            if (Math.abs(curr - prev) >= 180) {
                                var midArcPath:string = `${startingLetter} ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 1 0 ${midArc["x1"]},${midArc["y1"]}`;  
                            };
                            subpaths.push(midArcPath);
                        }
                        var lineInnertoOuter = `L ${midArc["x1"]},${midArc["y1"]} ${this.state.horizontalShift},${this.state.verticalShift + taxonSpecifics[key]["layers"][taxonSpecifics[key]["layers"].length-1]*layerWidth}`;
                        subpaths.push(lineInnertoOuter);
                    }
                    
                    var d:string = subpaths.join(" ");
                    taxonSpecifics[key]["svgPath"] = d;

                } else { // If the shape doesn't complete a full circle.
                    var innerArc:object = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
                    var innerArcPath:string = `M ${innerArc["x1"]},${innerArc["y1"]} A ${firstLayerRadius},${firstLayerRadius} 0 0 1 ${innerArc["x2"]},${innerArc["y2"]}`;
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
            centerRadius = taxonSpecifics[key]["firstLayerAligned"] + 0.333;
            let centerX = centerRadius * layerWidthInPx * cos(centerDegree);
            centerX = round(centerX) + cx;
            let centerY = - centerRadius * layerWidthInPx * sin(centerDegree);
            centerY = round(centerY) + cy;

            let pointOnLeftBorderX = centerRadius * layerWidthInPx * cos(startDeg(key));
            pointOnLeftBorderX = round(pointOnLeftBorderX) + cx;
            let pointOnLeftBorderY = - centerRadius * layerWidthInPx * sin(startDeg(key));
            pointOnLeftBorderY = round(pointOnLeftBorderY) + cy;
            let pointOnRightBorderX = centerRadius * layerWidthInPx * cos(endDeg(key));
            pointOnRightBorderX = round(pointOnRightBorderX) + cx;
            let pointOnRightBorderY = - centerRadius * layerWidthInPx * sin(endDeg(key));
            pointOnRightBorderY = round(pointOnRightBorderY) + cy;

            let center = [centerX, centerY, centerDegree, pointOnLeftBorderX, pointOnLeftBorderY, pointOnRightBorderX, pointOnRightBorderY];
            taxonSpecifics[key]["center"] = center;
        };

        for (var key of Object.keys(taxonSpecifics)) {
            if (taxonSpecifics[key]["layers"][0] === 0 ) {
                taxonSpecifics[key]["label"] = {
                    "direction": "horizontal",
                    "opacity": "1",
                    "left": 0,
                    "hoverLeft": 0,
                    "hoverWidth": 0,
                    "hoverDisplay": "unset",
                    "angle": 0,
                    "abbreviation": root.replace(RegExp(rankPatternFull.map(item => " " + item).join("|")),""),
                    "display": "unset",
                    "fullLabel": root.replace(RegExp(rankPatternFull.map(item => " " + item).join("|")),""),
                }
            } else {
                let direction = (taxonSpecifics[key]["layers"].length === 2 && taxonSpecifics[key]["layers"][1] === numberOfLayers) ? "radial" : "verse";
                let angle, radialAngle;
                if (direction === "radial") {
                    angle = taxonSpecifics[key]["center"][2] <= 180 ? -taxonSpecifics[key]["center"][2] : taxonSpecifics[key]["center"][2];
                } else {
                    angle = (((270 - taxonSpecifics[key]["center"][2]) + 360) % 360) > 180 && (((270 - taxonSpecifics[key]["center"][2]) + 360) % 360 <= 360) ? taxonSpecifics[key]["center"][2] % 360 : (taxonSpecifics[key]["center"][2] + 180) % 360;
                    radialAngle = taxonSpecifics[key]["center"][2] <= 180 ? -taxonSpecifics[key]["center"][2] : taxonSpecifics[key]["center"][2];
                }
                let percentage:number = round((taxonSpecifics[key]["totalCount"] / totalUnassignedCount) * 100);
                let oldPercentage:number = round(((taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length-1] - taxonSpecifics[key]["degrees"][0]) / 360) * 100);
                taxonSpecifics[key]["label"] = {
                    "direction": direction,
                    "opacity": "1",
                    "left": 0,
                    "hoverLeft": 0,
                    "hoverDisplay": "unset",
                    "hoverWidth": 0,
                    "top": 0,
                    "angle": angle,
                    "abbreviation": key.replace(RegExp(rankPatternFull.map(item => " " + item).join("|")),""),
                    "display": "unset",
                    "fullLabel": key.replace(RegExp(rankPatternFull.map(item => " " + item).join("|")),"") + ` ${percentage}%`,
                    "radialAngle": radialAngle,
                }

                if (taxonSpecifics[key]["rank"] === "species") {
                    let abbr:string = taxonSpecifics[key]["label"]["abbreviation"];
                    if (abbr.split(" ").length >= 2 && !(abbr.split(" ")[1] === "sp.")) {
                        let newAbbr:string = (abbr.split(" ")[0].slice(0, 1) + ". " + abbr.split(" ").slice(1, abbr.split(" ").length).join(" ")).slice(0,15);
                        taxonSpecifics[key]["label"]["abbreviation"] = newAbbr;
                    }
                    else if (abbr.split(" ").indexOf("sp.") !== -1) {
                        let newAbbr:string = (abbr.split(" ").slice(0, abbr.split(" ").indexOf("sp.") + 1).join(" ")).slice(0,15);
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
        this.setState(newState);
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
        let plotId:string = this.state.root + this.state.layer + this.state.collapse + this.state.alteration + round(this.state.layerWidth);
        if (Object.keys(alreadyVisited).indexOf(plotId) === -1) {
            alreadyVisited[plotId] = JSON.parse(JSON.stringify(this.state));
            alreadyVisited[plotId]["abbreviateLabels"] = false;
        }
        this.cropLineages(taxon, nextLayer, this.state.alteration, this.state.collapse);
    }

    placeLabels(alreadyRepeated:boolean = this.state.alreadyRepeated) {
        let newTaxonSpecifics:object = JSON.parse(JSON.stringify(this.state.taxonSpecifics))
        let height:number = 0;
        for (let key of Object.keys(newTaxonSpecifics)) {
            let labelElement:any = document.getElementById(`${key}_-_${newTaxonSpecifics[key]["firstLayerUnaligned"]}-label`)!;
            let hoverLabelElement:any = document.getElementById(`${key}_-_${newTaxonSpecifics[key]["firstLayerUnaligned"]}-hoverLabel`)!;
            height = !alreadyRepeated ? labelElement.getBoundingClientRect().height / 2 : this.state.height;
            let width = labelElement.getBoundingClientRect().width;
            let hoverWidth = hoverLabelElement.getBoundingClientRect().width;
            let angle = newTaxonSpecifics[key]["label"]["angle"];
            let centerDegree:number = newTaxonSpecifics[key]["center"][2];
            let transformOrigin = `${newTaxonSpecifics[key]["center"][0]} ${newTaxonSpecifics[key]["center"][1]}`;
            let top = newTaxonSpecifics[key]["center"][1] + height/2;
            let left, radialLeft, horizontalSpace, abbreviation, howManyLettersFit, hoverLeft, hoverRadialLeft;

            // Calculate left and angle for all labels of the last layer, which are always radial.
            if (newTaxonSpecifics[key]["label"]["direction"] === "radial") {
                if (centerDegree >= 180 && centerDegree < 360) {
                    left = hoverLeft = newTaxonSpecifics[key]["center"][0];
                    angle = 360 - (270 - angle);    
                }
                else if (centerDegree >= 0 && centerDegree <= 180) {
                    left = newTaxonSpecifics[key]["center"][0] - width;
                    hoverLeft = newTaxonSpecifics[key]["center"][0] - hoverWidth;
                    angle = 270 - angle;
                }
                abbreviation = newTaxonSpecifics[key]["label"]["abbreviation"];
            }

            // For internal wedges, calculate: 
            else if (newTaxonSpecifics[key]["label"]["direction"] === "verse") {
                left = newTaxonSpecifics[key]["center"][0] - width/2;
                hoverLeft = newTaxonSpecifics[key]["center"][0] - hoverWidth/2;
                let radialAngle = newTaxonSpecifics[key]["label"]["radialAngle"];

                // The circumferential space of the wedge (1).
                var topBeforeRotation = newTaxonSpecifics[key]["center"][1] - height/2;
                var bottomBeforeRotation = newTaxonSpecifics[key]["center"][1] + height/2;
                var leftBeforeRotation = left;
                var rightBeforeRotation = left + width;
                var cx = newTaxonSpecifics[key]["center"][0];
                var cy = newTaxonSpecifics[key]["center"][1];
                var fourPoints = getFourCorners(topBeforeRotation, bottomBeforeRotation, leftBeforeRotation, rightBeforeRotation, cx, cy, angle);

                let leftIntersect, rightIntersect;
                if (centerDegree >= 180 && centerDegree < 360) {
                    radialLeft = hoverRadialLeft = newTaxonSpecifics[key]["center"][0];
                    radialAngle = 360 - (270 - radialAngle);
                    
                    // (1)
                    leftIntersect = lineIntersect(this.state.horizontalShift, this.state.verticalShift, newTaxonSpecifics[key]["center"][3], newTaxonSpecifics[key]["center"][4], fourPoints["bottomLeft"][0], fourPoints["bottomLeft"][1], fourPoints["bottomRight"][0], fourPoints["bottomRight"][1])!
                    rightIntersect = lineIntersect(this.state.horizontalShift, this.state.verticalShift, newTaxonSpecifics[key]["center"][5], newTaxonSpecifics[key]["center"][6], fourPoints["bottomLeft"][0], fourPoints["bottomLeft"][1], fourPoints["bottomRight"][0], fourPoints["bottomRight"][1])!
                }
                else if (centerDegree >= 0 && centerDegree <= 180) {
                    radialLeft = newTaxonSpecifics[key]["center"][0] - width;
                    hoverRadialLeft = newTaxonSpecifics[key]["center"][0] - hoverWidth;
                    radialAngle = 270 - radialAngle;

                    // (1)
                    leftIntersect = lineIntersect(this.state.horizontalShift, this.state.verticalShift, newTaxonSpecifics[key]["center"][3], newTaxonSpecifics[key]["center"][4], fourPoints["topLeft"][0], fourPoints["topLeft"][1], fourPoints["topRight"][0], fourPoints["topRight"][1])!
                    rightIntersect = lineIntersect(this.state.horizontalShift, this.state.verticalShift, newTaxonSpecifics[key]["center"][5], newTaxonSpecifics[key]["center"][6], fourPoints["topLeft"][0], fourPoints["topLeft"][1], fourPoints["topRight"][0], fourPoints["topRight"][1])!
                }

                // (1)
                if (leftIntersect === null || rightIntersect === null) {
                    horizontalSpace = 0;
                }
                else {
                    horizontalSpace = lineLength(leftIntersect["x"], leftIntersect["y"], rightIntersect["x"], rightIntersect["y"])
                }

                // Calculate radial space.
                let layersCopy = JSON.parse(JSON.stringify(newTaxonSpecifics[key]["layers"]));
                let lastViableLayer = layersCopy.sort(function(a, b){return a-b})[1]
                let pointOnLastLayerX = lastViableLayer * this.state.layerWidth * cos(newTaxonSpecifics[key]["center"][2]);
                pointOnLastLayerX = round(pointOnLastLayerX) + viewportDimensions["cx"];
                let pointOnLastLayerY = - lastViableLayer * this.state.layerWidth * sin(newTaxonSpecifics[key]["center"][2]);
                pointOnLastLayerY = round(pointOnLastLayerY) + viewportDimensions["cy"];
                let verticalSpace = lineLength(newTaxonSpecifics[key]["center"][0], newTaxonSpecifics[key]["center"][1], pointOnLastLayerX, pointOnLastLayerY);

                // Decide between radial and circumferential.
                if (verticalSpace > horizontalSpace) {
                    left = radialLeft;
                    hoverLeft = hoverRadialLeft;
                    angle = radialAngle;

                    let lengthPerLetter = width/newTaxonSpecifics[key]["label"]["abbreviation"].length;
                    howManyLettersFit = Math.floor(verticalSpace/lengthPerLetter) - 2;
                    abbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, howManyLettersFit);
                }
                else {
                    let lengthPerLetter = width/newTaxonSpecifics[key]["label"]["abbreviation"].length;
                    howManyLettersFit = Math.floor(horizontalSpace/lengthPerLetter) - 2 > 0 ? Math.floor(horizontalSpace/lengthPerLetter) - 2 : 0;
                    abbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, howManyLettersFit);
                }
            }

            // Calculations for root shape in the center.
            else {
                top = this.state.verticalShift + height/2;
                left = newTaxonSpecifics[key]["center"][0] - width/2;
                hoverLeft = newTaxonSpecifics[key]["center"][0] - hoverWidth/2;
                transformOrigin = "";

                let lengthPerLetter = width/newTaxonSpecifics[key]["label"]["abbreviation"].length;
                howManyLettersFit = Math.floor(this.state.layerWidth*2/lengthPerLetter) - 2 > 0 ? Math.floor(this.state.layerWidth*2/lengthPerLetter) - 2 : 0;
                abbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, howManyLettersFit);
            }

            // Decide if the label should be hidden due to being too short, and if a dot is needed.
            abbreviation = abbreviation.indexOf(".") >= 0 || !(newTaxonSpecifics[key]["label"]["fullLabel"].split(" ")[0][howManyLettersFit]) ? abbreviation : abbreviation + ".";
            newTaxonSpecifics[key]["label"]["abbreviation"] = abbreviation;
            if (newTaxonSpecifics[key]["label"]["abbreviation"].length < 4) {
                newTaxonSpecifics[key]["label"]["abbreviation"] = "";
                newTaxonSpecifics[key]["label"]["display"] = "none"; 
            } 

            // Check one time if, after all the calculations, the abbreviated label indeed fits its shape. If not, set its display to none.
            var fourPoints = getFourCorners((top-height)-2, top+2, left-2, left+width+2, newTaxonSpecifics[key]["center"][0], newTaxonSpecifics[key]["center"][1], angle);
            let bottomLeft = document.querySelector("svg")!.createSVGPoint();
            bottomLeft.x = fourPoints!["bottomLeft"][0];
            bottomLeft.y = fourPoints!["bottomLeft"][1];

            let bottomRight = document.querySelector("svg")!.createSVGPoint();
            bottomRight.x = fourPoints!["bottomRight"][0];
            bottomRight.y = fourPoints!["bottomRight"][1];

            let topLeft = document.querySelector("svg")!.createSVGPoint();
            topLeft.x = fourPoints!["topLeft"][0];
            topLeft.y = fourPoints!["topLeft"][1];

            let topRight = document.querySelector("svg")!.createSVGPoint();
            topRight.x = fourPoints!["topRight"][0];
            topRight.y = fourPoints!["topRight"][1];

            var shape:any = document.getElementById(`${key}_-_${this.state.taxonSpecifics[key]["firstLayerUnaligned"]}`)!;

            if (alreadyRepeated && (newTaxonSpecifics[key]["label"]["direction"] === "verse" || newTaxonSpecifics[key]["label"]["direction"] === "horizontal")) {
                if (!(shape.isPointInFill(bottomLeft) && shape.isPointInFill(topLeft) && shape.isPointInFill(bottomRight) && shape.isPointInFill(topRight))) {
                    newTaxonSpecifics[key]["label"]["display"] = "none"; 
                }
            } else if (alreadyRepeated && newTaxonSpecifics[key]["label"]["direction"] === "radial") {
                if (!((shape.isPointInFill(bottomLeft) && shape.isPointInFill(topLeft)) || (shape.isPointInFill(bottomRight) && shape.isPointInFill(topRight)))) {
                    newTaxonSpecifics[key]["label"]["display"] = "none"; 
                }
            }

            newTaxonSpecifics[key]["label"]["top"] = top;
            newTaxonSpecifics[key]["label"]["transformOrigin"] = transformOrigin;
            newTaxonSpecifics[key]["label"]["left"] = left;
            newTaxonSpecifics[key]["label"]["transform"] = !alreadyRepeated ? `rotate(0)` : `rotate(${angle} ${transformOrigin})`;

            if (!alreadyRepeated) {
                newTaxonSpecifics[key]["label"]["hoverLeft"] = hoverLeft;
                newTaxonSpecifics[key]["label"]["hoverDisplay"] = "none";
                newTaxonSpecifics[key]["label"]["hoverWidth"] = hoverWidth;
            }

        }
        if (!alreadyRepeated) {
            this.setState({taxonSpecifics: newTaxonSpecifics, alreadyRepeated: true, height: height})
        }
        else {
            this.setState({taxonSpecifics: newTaxonSpecifics, labelsPlaced: true})
        }
        
    }


    render() {
        console.log("layerWidth: ", this.state.layerWidth);
        console.log("taxonSpecifics for animation: ", JSON.stringify(this.state.taxonSpecifics));

        currentState = this.state;
        var shapes:any = [];
        var labels:any = [];
        var ancestors:any = [];
        var clipPaths:any = [];
        let tS:object = this.state.taxonSpecifics;
        let tSkeys = Object.keys(tS);
        for (let item of tSkeys) {
            let id:string = `${item}_-_${tS[item]["firstLayerUnaligned"]}`;
            let redirectTo:string = tS[item]["layers"][0] === 0 ? `${this.state.ancestors[this.state.ancestors.length - 1]}_-_0` : id;
            shapes.push(<TaxonShape key={id} id={id} abbr={tS[item]["label"]["abbreviation"]} onClick={() => this.handleClick(redirectTo)} d={tS[item]["svgPath"]} strokeWidth={viewportDimensions["dpmm"] * 0.265} fillColor={tS[item]["fill"]} labelOpacity={tS[item]["label"]["opacity"]} labelDisplay={tS[item]["label"]["display"]} fullLabel={tS[item]["label"]["fullLabel"]} stroke={tS[item]["stroke"]} transformOrigin={tS[item]["label"]["transformOrigin"]} root={this.state.root}/>);
            if (tS[item]["married"]) {
                clipPaths.push(<path d={tS[item]["svgPath"]}/>)
            }
        }
        
        for (let item of tSkeys) {
            let id:string = `${item}_-_${tS[item]["firstLayerUnaligned"]}`;
            let redirectTo:string = tS[item]["layers"][0] === 0 ? `${this.state.ancestors[this.state.ancestors.length - 1]}_-_0` : id;
            let label = <TaxonLabel key={`${id}-label`} id={`${id}-label`} abbr={tS[item]["label"]["abbreviation"]} transform={tS[item]["label"]["transform"]} left={tS[item]["label"]["left"]} top={tS[item]["label"]["top"]} opacity={tS[item]["label"]["opacity"]} labelDisplay={tS[item]["label"]["display"]} display={tS[item]["label"]["display"]} onClick={() => {this.handleClick(redirectTo)}} fullLabel={tS[item]["label"]["fullLabel"]} fontWeight="normal" root={this.state.root}/>;

            labels.push(label);
        }

        for (let item of tSkeys) {
            let id:string = `${item}_-_${tS[item]["firstLayerUnaligned"]}`;
            let redirectTo:string = tS[item]["layers"][0] === 0 ? `${this.state.ancestors[this.state.ancestors.length - 1]}_-_0` : id;

            let labelBackground = <LabelBackground key={`${id}-labelBackground`} id={`${id}-labelBackground`} transform={tS[item]["label"]["transform"]} left={tS[item]["label"]["hoverLeft"]-4} top={(tS[item]["label"]["top"]-this.state.height) - 4} selfDisplay="none" labelDisplay={tS[item]["label"]["display"]} onClick={() => {this.handleClick(redirectTo)}} fullLabel={tS[item]["label"]["fullLabel"]} height={this.state.height+8} width={tS[item]["label"]["hoverWidth"]+8} stroke="#800080" fill="#ffffff" root={this.state.root}/>

            let hoverLabel = <TaxonLabel key={`${id}-hoverLabel`} id={`${id}-hoverLabel`} abbr={tS[item]["label"]["fullLabel"]} transform={tS[item]["label"]["transform"]} left={tS[item]["label"]["hoverLeft"]} top={tS[item]["label"]["top"]} opacity={tS[item]["label"]["opacity"]} labelDisplay={tS[item]["label"]["display"]} display={tS[item]["label"]["hoverDisplay"]} onClick={() => {this.handleClick(redirectTo)}} fullLabel={tS[item]["label"]["fullLabel"]} fontWeight="bold" root={this.state.root}/>;
            labels.push(labelBackground);
            labels.push(hoverLabel);
        }

        let anc:any[] = JSON.parse(JSON.stringify(this.state.ancestors)).reverse();

        return [<svg xmlns="http://www.w3.org/2000/svg" style={{"height": "100%", "width": "100%", "margin": "0", "padding": "0", "boxSizing": "border-box", "border": "none"}} id="shapes">{shapes} {labels}<clipPath id="mask">{clipPaths}</clipPath></svg>,<div id="ancestors">{ancestors}</div>,<div style={{"display": "flex", "flexDirection": "column", "justifyContent": "start", "position": "fixed", "top": 0, "left": "2vmin", "width": "20%", "padding": 0, "margin": 0}}><AncestorSection ancestors={anc} root={this.state.root} layer={this.state.layer} onClickArray={anc.map((self, index) => () => {this.handleClick(`${self}_-_${-index}`)})}/><DescendantSection self="Felinae" layer={0} ancestor="Felidae" hovered={true}/></div>]
    }
    //<AncestorSection ancestors={anc} root={this.state.root} layer={this.state.layer} onClickArray={anc.map((self, index) => () => {this.handleClick(`${self}_-_${-index}`)})}/>
}

/* ===== DRAWING THE PLOT ===== */
reactRoot.render(<PlotDrawing lineages={lineagesNames} ranks={lineagesRanks}/>);

/* ===== FUNCTION DEFINITIONS ===== */
function loadDataFromTSV(tsv_path) {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: {"tsv_path": tsv_path},
        success: function (response) {
            lineagesNames = response["lineagesNames"];
            lineagesRanks = response["lineagesRanks"];
            allTaxaReduced = response["allTaxaReduced"];
            let allTaxa = response["allTaxa"];
            rankPatternFull = response["rankPatternFull"];
            reactRoot.render(<PlotDrawing lineages={lineagesNames} ranks={lineagesRanks}/>);
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}

function TaxonShape(props) {
    return <path id={props.id} className="thing" d={props.d} onMouseOver={() => hoverHandler(props.id, props.fullLabel, props.root)} onMouseOut={() => onMouseOutHandler(props.id, props.labelDisplay)} onClick={props.onClick} style={{"stroke": props.stroke, "strokeWidth": "0.2vmin", "fill": props.fillColor}}/>;
}
function TaxonLabel(props) {
    return <text className="thing" x={props.left} y={props.top} transform={props.transform} transform-origin={props.transformOrigin} id={props.id} onMouseOver={() => hoverHandler(props.id, props.fullLabel, props.root)} onMouseOut={() => onMouseOutHandler(props.id, props.labelDisplay)} onClick={props.onClick} style={{"margin": "0", "padding": "0", "lineHeight": "2vmin", "position": "absolute", "fontFamily": "calibri", "fontSize": "2vmin", "transformOrigin": props.transformOrigin, "fill": "#800080", "opacity": props.opacity, "display": props.display, "fontWeight": props.fontWeight}}>{props.abbr}</text>
}

function LabelBackground(props) {
    return <rect className="thing" x={props.left} y={props.top} height={props.height} width={props.width} transform={props.transform} transform-origin={props.transformOrigin} id={props.id} onMouseOver={() => hoverHandler(props.id, props.fullLabel, props.root)} onMouseOut={() => onMouseOutHandler(props.id, props.labelDisplay)} onClick={props.onClick} fill={props.fill} stroke={props.stroke} style={{"position": "fixed", "display": props.selfDisplay, "strokeWidth":"0.2vmin"}}/>
}

//addEventListener("mousemove", (event) => handleMouseMove(event));

function hoverHandler(id:string, fullLabel:string, root:string):void {
    if (id.indexOf("-labelBackground") > -1) {
        var hoverLabel = id.replace("-labelBackground", "-hoverLabel");
        var shape = id.replace("-labelBackground", "");
        var label = id.replace("-labelBackground", "-label");
        var labelBackground = id;
    } else if (id.indexOf("-hoverLabel") > -1) {
        var hoverLabel = id;
        var shape = id.replace("-hoverLabel", "");
        var label = id.replace("-hoverLabel", "-label");
        var labelBackground = id.replace("-hoverLabel", "-labelBackground");
    }
    else if (id.indexOf("-label") > -1) {
        var label = id;
        var shape = id.replace("-label", "");
        var hoverLabel = id.replace("-label", "-hoverLabel");
        var labelBackground = id.replace("-label", "-labelBackground");
    } else {
        var shape = id;
        var label = id + "-label";
        var hoverLabel = id + "-hoverLabel";
        var labelBackground = id + "-labelBackground";
    }

    document.getElementById(shape)!.style.strokeWidth = "0.4vmin";
    document.getElementById(hoverLabel)!.style.display = "unset";
    document.getElementById(label)!.style.display = "none";
    document.getElementById(labelBackground)!.style.display = "unset";
    document.getElementById("descendant-section")!.setAttribute('value', `${shape.split("_-_")[0]}*${shape.split("_-_")[1]}*${root}`);
    var evt = new CustomEvent('change');
    document.getElementById("descendant-section")!.dispatchEvent(evt);
}

function onMouseOutHandler(id:string, initialLabelDisplay:string):void {
    if (id.indexOf("-labelBackground") > -1) {
        var hoverLabel = id.replace("-labelBackground", "-hoverLabel");
        var shape = id.replace("-labelBackground", "");
        var label = id.replace("-labelBackground", "-label");
        var labelBackground = id;
    } else if (id.indexOf("-hoverLabel") > -1) {
        var hoverLabel = id;
        var shape = id.replace("-hoverLabel", "");
        var label = id.replace("-hoverLabel", "-label");
        var labelBackground = id.replace("-hoverLabel", "-labelBackground");
    }
    else if (id.indexOf("-label") > -1) {
        var label = id;
        var shape = id.replace("-label", "");
        var hoverLabel = id.replace("-label", "-hoverLabel");
        var labelBackground = id.replace("-label", "-labelBackground");
    } else {
        var shape = id;
        var label = id + "-label";
        var hoverLabel = id + "-hoverLabel";
        var labelBackground = id + "-labelBackground";
    }

    document.getElementById(shape)!.style.strokeWidth = "0.2vmin";
    document.getElementById(label)!.style.display = initialLabelDisplay;
    document.getElementById(hoverLabel)!.style.display = "none";
    document.getElementById(labelBackground)!.style.display = "none";
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

let aTRKeys:string[] = Object.keys(allTaxaReduced);
let descendants:object = {}
for (let taxName of aTRKeys) {
    let lineage = allTaxaReduced[taxName]["lineageNames"];
    for (let predecessor of lineage) {
        if (!descendants[predecessor[1]]) {
            descendants[predecessor[1]] = [taxName];
        }
        else {
            descendants[predecessor[1]].push(taxName);
        }
    }
}

let allTaxa:object = {};

document.getElementById("file")?.addEventListener("change", () => {
    let fileInput:any = document.getElementById("file")!
    fileName = fileInput.files[0].name;
    document.getElementById("status")!.innerHTML = "pending";
    let uploadForm:any = document.getElementById("uploadForm")!
    let form_data = new FormData(uploadForm);
    $.ajax({
        url: '/load_tsv_data',
        data: form_data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function(response) {
            lineagesNames = response["lineagesNames"];
            lineagesRanks = response["lineagesRanks"];
            allTaxaReduced = response["allTaxaReduced"];
            rankPatternFull = response["rankPatternFull"];
            allTaxa = response["allTaxa"];
            colorOffset = response["offset"]
            eThreshold = response["median"];
            console.log("median: ", response["median"])
            let newData:any = document.getElementById("new-data")!
            newData.checked = true;
            document.getElementById("status")!.innerHTML = "check";
            var evt = new CustomEvent('change');
            newData.dispatchEvent(evt);
        },
        error: function (response) {
            console.log("ERROR", response);
            document.getElementById("status")!.innerHTML = "close";
        }
    });
});

function downloadSVGasTextFile() {
    const base64doc = btoa(unescape(encodeURIComponent(document.querySelector('svg')!.outerHTML)));
    const a = document.createElement('a');
    const e = new MouseEvent('click');
  
    a.download = `${fileName}_${taxonName}${layerName}_${modeName}_${collapseName}.svg`;
    a.href = 'data:text/html;base64,' + base64doc;
    a.dispatchEvent(e);
}
  
document.getElementById("download")!.addEventListener("click", () => {
    downloadSVGasTextFile();
})

addEventListener("mousemove", (e) => {
    let target:any = e.target!
    if (!target.classList.contains('thing')) {
        document.getElementById("descendant-section")!.setAttribute('value', "");
        var evt = new CustomEvent('change');
        document.getElementById("descendant-section")!.dispatchEvent(evt);
    }
})

document.getElementById("upload-button")!.addEventListener("click", () => {
    $('input[type="file"]').click();
})