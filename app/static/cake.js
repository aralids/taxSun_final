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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom/client");
var _html2canvas = require("html2canvas");
var currentState;
var skeletonColor = "#800080";
var html2canvas = _html2canvas;
var path = "C:/Users/PC/Desktop/krona/krona.tsv";
var allTaxa = JSON.parse("{\"not identified\":{\"lineageNames\":[[\"no rank\",\"not identified\"]],\"rank\":\"no rank\",\"taxID\":\"0\",\"totalCount\":44,\"unassignedCount\":44},\n\"root\":{\"lineageNames\":[[\"root\", \"root\"]],\"rank\":\"root\",\"taxID\":\"NA\",\"totalCount\":128,\"unassignedCount\":0},\n\"Eukaryota\":{\"lineageNames\":[[\"superkingdom\",\"Eukaryota\"]],\"rank\":\"superkingdom\",\"taxID\":\"1\",\"totalCount\":24,\"unassignedCount\":24},\n\"Acidobacteria\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Acidobacteria\"]],\"rank\":\"phylum\",\"taxID\":\"2\",\"totalCount\":8,\"unassignedCount\":8},\n\"Armatimonadetes\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Armatimonadetes\"]],\"rank\":\"phylum\",\"taxID\":\"13123\",\"totalCount\":1,\"unassignedCount\":0.6},\n\"Armatimonadetes bacterium\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Armatimonadetes\"],[\"species\", \"Armatimonadetes bacterium\"]],\"rank\":\"species\",\"taxID\":\"36546214\",\"totalCount\":0.4,\"unassignedCount\":0.4},\n\"Chloroflexi bacterium\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Chloroflexi\"],[\"species\",\"Chloroflexi bacterium\"]],\"rank\":\"species\",\"taxID\":\"555\",\"totalCount\":3,\"unassignedCount\":3},\n\"Chrysiogenetes\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Chrysiogenetes\"]],\"rank\":\"phylum\",\"taxID\":\"6756756\",\"totalCount\":4,\"unassignedCount\":4}, \n\"uncultured Segetibacter sp.\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Bacteroidota\"],[\"class\", \"Chitinophagia\"], [\"order\", \"Chitinophagales\"], [\"family\", \"Chitinophagaceae\"], [\"genus\", \"Segetibacter\"], [\"species\", \"uncultured Segetibacter sp.\"]],\"rank\":\"species\",\"taxID\":\"4678534\",\"totalCount\":2,\"unassignedCount\":2},\n\"Nitrospira sp.\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Nitrospirae\"],[\"class\", \"Nitrospira class\"], [\"order\", \"Nitrospirales\"],[\"family\", \"Nitrospiraceae\"], [\"genus\", \"Nitrospira genus\"], [\"species\", \"Nitrospira sp.\"]],\"rank\":\"species\",\"taxID\":\"867675\",\"totalCount\":6,\"unassignedCount\":6}, \n\"Cyanobacteria\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Cyanobacteria\"]],\"rank\":\"phylum\",\"taxID\":\"72243\",\"totalCount\":5,\"unassignedCount\":5}, \n\"Proteobacteria\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Proteobacteria\"]],\"rank\":\"phylum\",\"taxID\":\"11119\",\"totalCount\":7,\"unassignedCount\":1.75}, \n\"Alphaproteobacteria\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Proteobacteria\"], [\"class\", \"Alphaproteobacteria\"]],\"rank\":\"class\",\"taxID\":\"565649\",\"totalCount\":5.25,\"unassignedCount\":1.75}, \n\"Nitrobacteraceae\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Proteobacteria\"], [\"class\", \"Alphaproteobacteria\"], [\"order\", \"Hyphomicrobiales\"], [\"family\", \"Nitrobacteraceae\"]],\"rank\":\"family\",\"taxID\":\"15359\",\"totalCount\":1.75,\"unassignedCount\":1.75}, \n\"Acetobacteraceae bacterium\":{\"lineageNames\":[[\"superkingdom\",\"Bacteria\"],[\"phylum\",\"Proteobacteria\"], [\"class\", \"Alphaproteobacteria\"], [\"order\",\"Hyphomicrobiales\"], [\"family\",\"Acetobacteraceae\"], [\"species\",\"Acetobacteraceae bacterium\"]],\"rank\":\"species\",\"taxID\":\"29235\",\"totalCount\":1.75,\"unassignedCount\":1.75}, \n\"Viruses\":{\"lineageNames\":[[\"superkingdom\",\"Viruses\"]],\"rank\":\"superkingdom\",\"taxID\":\"16760\",\"totalCount\":24,\"unassignedCount\":24}}");
//var taxonList:Taxon[] = [];
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
        reactRoot.render(React.createElement(PlotDrawing, { lineages: lineagesNames, ranks: lineagesRanks }));
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
function TaxonShape(props) {
    return React.createElement("path", { id: props.id, d: props.d, onMouseOver: function () { return hoverHandler(props.id, props.fullLabel); }, onMouseOut: function () { return onMouseOutHandler(props.id, props.labelOpacity, props.abbr, props.display); }, onClick: props.onClick, style: { "stroke": props.stroke, "strokeWidth": "0.2vmin", "fill": props.fillColor } });
}
function TaxonLabel(props) {
    return React.createElement("p", { id: "".concat(props.id, "-label"), onMouseOver: function () { return hoverHandler(props.id, props.fullLabel); }, onMouseOut: function () { return onMouseOutHandler(props.id, props.opacity, props.abbr, props.display); }, onClick: props.onClick, style: { "margin": "0", "position": "absolute", "fontFamily": "calibri", "fontSize": "2vmin", "left": props.left, "right": props.right, "top": props.top, "transformOrigin": props.transformOrigin, "transform": props.transform, "color": "#800080", "opacity": props.opacity, "display": props.display } }, props.abbr);
}
function AncestorLabel(props) {
    return React.createElement("p", { id: props.id, className: "ancestor", style: { "margin": "0", "position": "fixed", "fontFamily": "calibri", "fontSize": "2vmin", "top": props.top, "left": "2vmin", "color": skeletonColor, "fontWeight": "bold" }, onClick: props.onClick }, props.taxon);
}
var PlotDrawing = /** @class */ (function (_super) {
    __extends(PlotDrawing, _super);
    function PlotDrawing(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
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
            colors: colors,
            ancestors: ["root"],
            rankPattern: [],
            alteration: "marriedTaxa",
            totalUnassignedCount: 0,
            numberOfLayers: -1,
            layerWidth: -1
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
            console.log("resize event", _this.state);
            var newViewportDimensions = getViewportDimensions();
            viewportDimensions = newViewportDimensions;
            _this.setState({ horizontalShift: newViewportDimensions["cx"], verticalShift: newViewportDimensions["cy"] }, function () { return _this.calculateSVGPaths({ "ancestors": _this.state.ancestors }); });
        });
        document.getElementById("radio-input").addEventListener("change", function () {
            var alteration = document.querySelector('input[name="radio"]:checked').getAttribute("id");
            _this.cropLineages(_this.state.root, _this.state.layer, alteration, _this.state.collapse);
        });
        document.getElementById("checkbox-input").addEventListener("change", function () {
            var element = document.getElementById("checkbox-input");
            var checked = element.checked;
            _this.cropLineages(_this.state.root, _this.state.layer, _this.state.alteration, checked);
        });
    };
    PlotDrawing.prototype.componentDidUpdate = function () {
        var abbreviatables = this.checkTaxonLabelWidth();
        if (abbreviatables.length > 0) {
            this.abbreviate(abbreviatables);
        }
    };
    // Leave only relevant lineages and crop them if necessary.
    PlotDrawing.prototype.cropLineages = function (root, layer, alteration, collapse) {
        if (root === void 0) { root = this.state.root; }
        if (layer === void 0) { layer = this.state.layer; }
        if (alteration === void 0) { alteration = "marriedTaxaI"; }
        if (collapse === void 0) { collapse = this.state.collapse; }
        // Get only relevant lineages.
        var croppedLineages = [];
        var croppedRanks = [];
        var rootTaxa = root.split(" & ");
        for (var i = 0; i < this.props.lineages.length; i++) {
            if (rootTaxa.indexOf(this.props.lineages[i][layer]) > -1) {
                croppedLineages.push(this.props.lineages[i]);
                croppedRanks.push(this.props.ranks[i]);
            }
        }
        // Crop lineages so they start with clicked taxon.
        var ancestors = [""];
        if (croppedLineages[0]) {
            ancestors = croppedLineages[0].slice(0, layer);
        }
        if (rootTaxa.length > 1) {
            croppedLineages = croppedLineages.map(function (item) { return item.slice(layer - 1); });
            croppedRanks = croppedRanks.map(function (item) { return item.slice(layer - 1); });
        }
        else {
            croppedLineages = croppedLineages.map(function (item) { return item.slice(layer); });
            croppedRanks = croppedRanks.map(function (item) { return item.slice(layer); });
        }
        // Get minimal rank pattern for this particular plot to prepare for aligning sequences.
        var ranksUnique = croppedRanks.reduce(function (accumulator, value) { return accumulator.concat(value); }, []);
        ranksUnique = ranksUnique.filter(function (value, index, self) { return Boolean(value) && self.indexOf(value) === index; });
        var rankPattern = rankPatternFull.filter(function (item) { return ranksUnique.indexOf(item) > -1; });
        // Mary taxa.
        if (alteration.startsWith("marriedTaxa")) {
            var cropped = this.marryTaxa(croppedLineages, croppedRanks, alteration);
            croppedLineages = cropped[0];
            croppedRanks = cropped[1];
        }
        // !!!!!!
        if (collapse) {
            var arr = this.collapse(croppedLineages, croppedRanks);
            croppedLineages = arr[0];
            croppedRanks = arr[1];
        }
        // Align cropped lineages by adding null as placeholder for missing ranks.
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
        // Save in state object taxonSpecifics.
        var taxonSpecifics = {};
        for (var i = 0; i < croppedLineages.length; i++) {
            var taxName = croppedLineages[i][croppedLineages[i].length - 1];
            if (taxName.includes("&")) {
                taxonSpecifics[taxName] = {};
                taxonSpecifics[taxName]["rank"] = croppedRanks[i][croppedRanks[i].length - 1];
                taxonSpecifics[taxName]["croppedLineage"] = croppedLineages[i];
                taxonSpecifics[taxName]["alignedCroppedLineage"] = alignedCropppedLineages[i];
                var taxa = taxName.split(" & ");
                var unassignedCount = taxa.map(function (item) { return allTaxaReduced[item]["totalCount"]; }).reduce(function (accumulator, value) { return accumulator + value; }, 0);
                taxonSpecifics[taxName]["unassignedCount"] = unassignedCount;
                taxonSpecifics[taxName]["totalCount"] = unassignedCount;
                taxonSpecifics[taxName]["firstLayerUnaligned"] = croppedLineages[i].length - 1;
                taxonSpecifics[taxName]["firstLayerAligned"] = alignedCropppedLineages[i].indexOf(taxName);
            }
            else {
                taxonSpecifics[taxName] = {};
                taxonSpecifics[taxName]["rank"] = croppedRanks[i][croppedRanks[i].length - 1];
                taxonSpecifics[taxName]["croppedLineage"] = croppedLineages[i];
                taxonSpecifics[taxName]["alignedCroppedLineage"] = alignedCropppedLineages[i];
                taxonSpecifics[taxName]["unassignedCount"] = allTaxaReduced[taxName].unassignedCount;
                taxonSpecifics[taxName]["totalCount"] = allTaxaReduced[taxName]["totalCount"];
                taxonSpecifics[taxName]["firstLayerUnaligned"] = croppedLineages[i].length - 1;
                taxonSpecifics[taxName]["firstLayerAligned"] = alignedCropppedLineages[i].indexOf(taxName);
            }
        }
        var totalUnassignedCount = 0;
        for (var _i = 0, _a = Object.keys(taxonSpecifics); _i < _a.length; _i++) {
            var taxName_1 = _a[_i];
            totalUnassignedCount += taxonSpecifics[taxName_1]["unassignedCount"];
        }
        if (alteration === "allEqual") {
            for (var _b = 0, _c = Object.keys(taxonSpecifics); _b < _c.length; _b++) {
                var taxName_2 = _c[_b];
                taxonSpecifics[taxName_2]["unassignedCount"] = 1;
            }
        }
        for (var i = 0; i < croppedLineages.length; i++) {
            for (var j = croppedLineages[i].length - 2; j >= 0; j--) {
                if (!taxonSpecifics[croppedLineages[i][j]]) {
                    taxonSpecifics[croppedLineages[i][j]] = {};
                    taxonSpecifics[croppedLineages[i][j]]["rank"] = croppedRanks[i][j];
                    taxonSpecifics[croppedLineages[i][j]]["croppedLineage"] = croppedLineages[i].slice(0, j + 1);
                    var index = alignedCropppedLineages[i].indexOf(croppedLineages[i][j]);
                    taxonSpecifics[croppedLineages[i][j]]["alignedCroppedLineage"] = alignedCropppedLineages[i].slice(0, index + 1);
                    taxonSpecifics[croppedLineages[i][j]]["unassignedCount"] = 0;
                    taxonSpecifics[croppedLineages[i][j]]["totalCount"] = allTaxaReduced[croppedLineages[i][j]]["totalCount"];
                    taxonSpecifics[croppedLineages[i][j]]["firstLayerUnaligned"] = j;
                    taxonSpecifics[croppedLineages[i][j]]["firstLayerAligned"] = index;
                }
            }
        }
        if (croppedLineages.length > 1) {
            this.assignDegrees({ "root": root, "layer": layer, "rankPattern": rankPattern, "taxonSpecifics": taxonSpecifics, "croppedLineages": croppedLineages, "alignedCroppedLineages": alignedCropppedLineages, "ancestors": ancestors, "alteration": alteration, "collapse": collapse, "totalUnassignedCount": totalUnassignedCount });
        }
    };
    PlotDrawing.prototype.marryTaxa = function (croppedLineages, croppedRanks, alteration) {
        if (alteration === void 0) { alteration = "marriedTaxaI"; }
        var totalUnassignedCounts = 0;
        //alteration = "marriedTaxaII";
        for (var _i = 0, croppedLineages_1 = croppedLineages; _i < croppedLineages_1.length; _i++) {
            var lineage = croppedLineages_1[_i];
            totalUnassignedCounts += allTaxaReduced[lineage[lineage.length - 1]]["unassignedCount"];
        }
        var reducibleLineages = [];
        var treshold = 0.06;
        for (var _a = 0, croppedLineages_2 = croppedLineages; _a < croppedLineages_2.length; _a++) {
            var lineage = croppedLineages_2[_a];
            if (allTaxaReduced[lineage[lineage.length - 1]]["totalCount"] / totalUnassignedCounts < treshold) {
                var lineageNumber = croppedLineages.indexOf(lineage);
                var lastWayTooThinLayer = lineage.length - 1;
                for (var i = lineage.length - 2; i >= 0; i--) {
                    if (allTaxaReduced[lineage[i]]["totalCount"] / totalUnassignedCounts >= treshold) {
                        lastWayTooThinLayer = i + 1;
                        break;
                    }
                }
                ;
                var partialLineage = lineage.slice(0, lastWayTooThinLayer);
                reducibleLineages.push([lineageNumber, partialLineage]);
            }
        }
        var reductionGroups = {};
        if (alteration === "marriedTaxaI") {
            for (var _b = 0, reducibleLineages_1 = reducibleLineages; _b < reducibleLineages_1.length; _b++) {
                var item = reducibleLineages_1[_b];
                if (!reductionGroups[item[1].join("")]) {
                    reductionGroups[item[1].join("")] = {};
                    reductionGroups[item[1].join("")]["spliceAt"] = item[1].length;
                    reductionGroups[item[1].join("")]["index"] = [item[0]];
                    reductionGroups[item[1].join("")]["commonName"] = croppedLineages[item[0]][item[1].length];
                }
                else {
                    reductionGroups[item[1].join("")]["index"].push(item[0]);
                    var taxa = reductionGroups[item[1].join("")]["commonName"].split(" & ");
                    if (taxa.indexOf(croppedLineages[item[0]][item[1].length]) === -1) {
                        reductionGroups[item[1].join("")]["commonName"] += " & ".concat(croppedLineages[item[0]][item[1].length]);
                    }
                }
            }
        }
        else {
            for (var _c = 0, reducibleLineages_2 = reducibleLineages; _c < reducibleLineages_2.length; _c++) {
                var item = reducibleLineages_2[_c];
                if (!reductionGroups[item[1].join("")]) {
                    reductionGroups[item[1].join("")] = {};
                    reductionGroups[item[1].join("")]["spliceAt"] = item[1].length;
                    reductionGroups[item[1].join("")]["index"] = [item[0]];
                }
                else {
                    reductionGroups[item[1].join("")]["index"].push(item[0]);
                }
            }
            var _loop_3 = function (group) {
                var spliceAt = reductionGroups[group]["spliceAt"];
                reductionGroups[group]["index"].sort(function (index1, index2) { return allTaxaReduced[croppedLineages[index1][spliceAt]]["totalCount"] - allTaxaReduced[croppedLineages[index2][spliceAt]]["totalCount"]; });
                var renameables = reductionGroups[group]["index"].map(function (item) { return croppedLineages[item][spliceAt]; });
                var temporaryObject = {};
                for (var i = 0; i < renameables.length; i++) {
                    var renameable = renameables[i];
                    if (!temporaryObject[renameable]) {
                        temporaryObject[renameable] = [reductionGroups[group]["index"][i]];
                    }
                    else {
                        temporaryObject[renameable].push(reductionGroups[group]["index"][i]);
                    }
                }
                var permanentObject = {};
                for (var _p = 0, _q = Object.keys(temporaryObject); _p < _q.length; _p++) {
                    var key = _q[_p];
                    permanentObject[temporaryObject[key][0]] = temporaryObject[key];
                }
                reductionGroups[group]["references"] = permanentObject;
                reductionGroups[group]["minimalIndexArray"] = Object.keys(permanentObject).sort(function (index1, index2) { return allTaxaReduced[croppedLineages[index1][spliceAt]]["totalCount"] - allTaxaReduced[croppedLineages[index2][spliceAt]]["totalCount"]; });
            };
            // Sort indices of reduction groups in ascending order.
            for (var _d = 0, _e = Object.keys(reductionGroups); _d < _e.length; _d++) {
                var group = _e[_d];
                _loop_3(group);
            }
            var _loop_4 = function (group) {
                var minimalIndexArray = reductionGroups[group]["minimalIndexArray"].map(function (item) { return parseInt(item); });
                var indexBeginning = 0;
                var indexEnd = minimalIndexArray.length - 1;
                var addNext = "indexBeginning";
                var sum = 0;
                var newIndexGroup = [];
                var newGroups = [];
                var iterations = minimalIndexArray.length % 2 === 0 ? minimalIndexArray.length / 2 : Math.floor(minimalIndexArray.length / 2) + 1;
                var spliceAt = reductionGroups[group]["spliceAt"];
                while ((minimalIndexArray.length % 2 === 0 && indexBeginning <= iterations && (minimalIndexArray.length - 1) - indexEnd < iterations) || (minimalIndexArray.length % 2 === 1 && indexBeginning !== iterations && (minimalIndexArray.length - 1) - indexEnd < iterations)) {
                    if (addNext === "indexBeginning") {
                        var newIndex = minimalIndexArray[indexBeginning];
                        newIndexGroup.push(newIndex);
                        var totalCount = allTaxaReduced[croppedLineages[newIndex][spliceAt]]["totalCount"];
                        var additive = totalCount / totalUnassignedCounts;
                        sum += additive;
                        addNext = "indexEnd";
                        indexBeginning++;
                    }
                    else {
                        var newIndex = minimalIndexArray[indexEnd];
                        newIndexGroup.push(newIndex);
                        var totalCount = allTaxaReduced[croppedLineages[newIndex][spliceAt]]["totalCount"];
                        var additive = totalCount / totalUnassignedCounts;
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
                    var lastGroup = newGroups[newGroups.length - 1];
                    lastGroup.splice.apply(lastGroup, __spreadArray([lastGroup.length, 0], newIndexGroup, false));
                    newGroups.push(newIndexGroup);
                }
                newGroups = newGroups.map(function (item) { return item.map(function (item1) { return reductionGroups[group]["references"][item1]; }); });
                newGroups = newGroups.map(function (item) { return item.reduce(function (accumulator, value) { return accumulator.concat(value); }, []); });
                reductionGroups[group]["newGroups"] = newGroups;
            };
            for (var _f = 0, _g = Object.keys(reductionGroups); _f < _g.length; _f++) {
                var group = _g[_f];
                _loop_4(group);
            }
            var newReductionGroups = {};
            var _loop_5 = function (group) {
                for (var i = 0; i < reductionGroups[group]["newGroups"].length; i++) {
                    newReductionGroups["".concat(group, "-").concat(i)] = {};
                    newReductionGroups["".concat(group, "-").concat(i)]["spliceAt"] = reductionGroups[group]["spliceAt"];
                    newReductionGroups["".concat(group, "-").concat(i)]["index"] = reductionGroups[group]["newGroups"][i];
                    names = reductionGroups[group]["newGroups"][i].map(function (item) { return croppedLineages[item][reductionGroups[group]["spliceAt"]]; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
                    newReductionGroups["".concat(group, "-").concat(i)]["commonName"] = names.join(" & ");
                }
            };
            var names;
            for (var _h = 0, _j = Object.keys(reductionGroups); _h < _j.length; _h++) {
                var group = _j[_h];
                _loop_5(group);
            }
            reductionGroups = newReductionGroups;
        }
        for (var _k = 0, _l = Object.keys(reductionGroups).filter(function (item) { return reductionGroups[item]["index"].length > 1; }); _k < _l.length; _k++) {
            var group = _l[_k];
            for (var _m = 0, _o = reductionGroups[group]["index"]; _m < _o.length; _m++) {
                var index = _o[_m];
                croppedLineages[index].splice(reductionGroups[group]["spliceAt"], croppedLineages[index].length - reductionGroups[group]["spliceAt"], reductionGroups[group]["commonName"]);
                croppedRanks[index].splice(reductionGroups[group]["spliceAt"] + 1);
            }
        }
        for (var i = croppedLineages.length - 1; i >= 0; i--) {
            var croppedLineageCopy = croppedLineages.map(function (item) { return JSON.stringify(item); });
            var lineage = croppedLineageCopy[i];
            var lastIndex = i;
            var firstIndex = croppedLineageCopy.indexOf(lineage);
            if (firstIndex !== lastIndex) {
                croppedLineages.splice(lastIndex, 1);
                croppedRanks.splice(lastIndex, 1);
            }
        }
        return [croppedLineages, croppedRanks];
    };
    // Assign each cropped lineage a start and end degree.
    PlotDrawing.prototype.assignDegrees = function (newState) {
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var croppedLineages = newState["croppedLineages"] ? newState["croppedLineages"] : this.state.taxonSpecifics;
        var taxonSpecifics = newState["taxonSpecifics"] ? newState["taxonSpecifics"] : this.state.taxonSpecifics;
        var totalUnassignedCounts = 0;
        for (var _i = 0, _a = Object.keys(taxonSpecifics).filter(function (item) { return taxonSpecifics[item]["unassignedCount"] !== 0; }); _i < _a.length; _i++) {
            var taxName = _a[_i];
            totalUnassignedCounts += taxonSpecifics[taxName]["unassignedCount"];
        }
        var ranges = {};
        var startDeg = 0;
        for (var i = 0; i < croppedLineages.length; i++) {
            for (var j = 0; j < croppedLineages[i].length; j++) {
                var currentTaxon = croppedLineages[i][j];
                var alignedIndex = taxonSpecifics[currentTaxon]["firstLayerAligned"];
                if (!ranges[currentTaxon]) {
                    ranges[currentTaxon] = {};
                    var firstLayer = taxonSpecifics[currentTaxon]["firstLayerUnaligned"] === 1 ? 1 : alignedIndex;
                    ranges[currentTaxon]["layers"] = [firstLayer];
                    ranges[currentTaxon]["degrees"] = [startDeg];
                }
                var lastLayer = void 0;
                if (j === croppedLineages[i].length - 1) {
                    lastLayer = alignedCroppedLineages[0].length;
                }
                else {
                    lastLayer = alignedCroppedLineages[i].indexOf(croppedLineages[i][j + 1]);
                }
                ranges[currentTaxon]["layers"].push(lastLayer);
                ranges[currentTaxon]["degrees"].push(startDeg + (taxonSpecifics[croppedLineages[i][croppedLineages[i].length - 1]]["unassignedCount"] * 360) / totalUnassignedCounts);
            }
            startDeg += (taxonSpecifics[croppedLineages[i][croppedLineages[i].length - 1]]["unassignedCount"] * 360) / totalUnassignedCounts;
        }
        for (var _b = 0, _c = Object.keys(ranges); _b < _c.length; _b++) {
            var taxName = _c[_b];
            for (var i = ranges[taxName]["layers"].length - 1; i >= 1; i--) {
                if (ranges[taxName]["layers"][i] === ranges[taxName]["layers"][i - 1]) {
                    var newValue = ranges[taxName]["degrees"][i];
                    ranges[taxName]["degrees"][i - 1] = newValue;
                    ranges[taxName]["layers"].splice(i, 1);
                    ranges[taxName]["degrees"].splice(i, 1);
                }
            }
        }
        for (var _d = 0, _e = Object.keys(taxonSpecifics); _d < _e.length; _d++) {
            var taxName = _e[_d];
            taxonSpecifics[taxName]["layers"] = ranges[taxName]["layers"];
            taxonSpecifics[taxName]["degrees"] = ranges[taxName]["degrees"];
        }
        this.calculateSVGPaths(newState);
    };
    // If collapse=true, remove taxa that only come up in the lineage of one other taxon and have no unassigned counts of their own.
    PlotDrawing.prototype.collapse = function (croppedLineages, croppedRanks) {
        var lineagesCopy = JSON.parse(JSON.stringify(croppedLineages));
        var ranksCopy = JSON.parse(JSON.stringify(croppedRanks));
        var layers = getLayers(lineagesCopy);
        var _loop_6 = function (i) {
            var _loop_7 = function (j) {
                if (layers[i].filter(function (item) { return item === layers[i][j]; }).length === 1 && Boolean(layers[i + 1][j])) {
                    lineagesCopy[j].splice(i, 1, "toBeDeleted");
                    ranksCopy[j].splice(i, 1, "toBeDeleted");
                }
            };
            for (var j = 0; j < layers[i].length; j++) {
                _loop_7(j);
            }
        };
        for (var i = 0; i < layers.length - 1; i++) {
            _loop_6(i);
        }
        for (var i = 0; i < lineagesCopy.length; i++) {
            lineagesCopy[i] = lineagesCopy[i].filter(function (item) { return item !== "toBeDeleted"; });
            ranksCopy[i] = ranksCopy[i].filter(function (item) { return item !== "toBeDeleted"; });
        }
        return [lineagesCopy, ranksCopy];
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
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var taxonSpecifics = newState["taxonSpecifics"] == undefined ? this.state.taxonSpecifics : newState["taxonSpecifics"];
        var dpmm = viewportDimensions["dpmm"];
        var numberOfLayers = alignedCroppedLineages[0].length;
        var smallerDimension = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 4);
        var firstLayer = function (key) { return taxonSpecifics[key]["layers"][0]; };
        var startDeg = function (key) { return taxonSpecifics[key]["degrees"][0]; };
        var endDeg = function (key) { return taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length - 1]; };
        for (var _i = 0, _a = Object.keys(taxonSpecifics); _i < _a.length; _i++) {
            var key = _a[_i];
            if (taxonSpecifics[key]["layers"][0] === 0) {
                taxonSpecifics[key]["svgPath"] = "M ".concat(this.state.horizontalShift, ", ").concat(this.state.verticalShift, " m -").concat(layerWidth, ", 0 a ").concat(layerWidth, ",").concat(layerWidth, " 0 1,0 ").concat((layerWidth) * 2, ",0 a ").concat(layerWidth, ",").concat(layerWidth, " 0 1,0 -").concat((layerWidth) * 2, ",0");
            }
            else {
                var innerArc = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
                var innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(round(firstLayer(key) * layerWidth), ",").concat(round(firstLayer(key) * layerWidth), " 0 0 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
                if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                    var innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(innerArc["radius"], ",").concat(innerArc["radius"], " 0 1 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
                }
                ;
                var subpaths = [innerArcPath];
                var midArc = {};
                for (var i = taxonSpecifics[key]["layers"].length - 1; i >= 0; i--) {
                    var curr = taxonSpecifics[key]["degrees"][i];
                    var prev = i === 0 ? startDeg(key) : taxonSpecifics[key]["degrees"][i - 1];
                    midArc = this.calculateArcEndpoints(taxonSpecifics[key]["layers"][i], layerWidth, prev, curr);
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
                taxonSpecifics[key]["svgPath"] = d;
            }
        }
        ;
        newState["numberOfLayers"] = numberOfLayers;
        newState["layerWidth"] = layerWidth;
        this.calculateTaxonLabels(newState);
    };
    PlotDrawing.prototype.calculateTaxonLabels = function (newState) {
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var totalUnassignedCount = newState["totalUnassignedCount"] ? newState["totalUnassignedCount"] : this.state.totalUnassignedCount;
        var root = newState["root"] ? newState["root"] : this.state.root;
        var taxonSpecifics = newState["taxonSpecifics"] == undefined ? this.state.taxonSpecifics : newState["taxonSpecifics"];
        var numberOfLayers = alignedCroppedLineages[0].length;
        var cx = this.state.horizontalShift;
        var cy = this.state.verticalShift;
        var layerWidthInPx = Math.max((Math.min(cx, cy) - viewportDimensions["dpmm"] * 10) / numberOfLayers, viewportDimensions["dpmm"] * 4);
        var startDeg = function (key) { return taxonSpecifics[key]["degrees"][0]; };
        var endDeg = function (key) { return taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length - 1]; };
        for (var _i = 0, _a = Object.keys(taxonSpecifics); _i < _a.length; _i++) {
            var key = _a[_i];
            var centerDegree = void 0, centerRadius = void 0;
            centerDegree = startDeg(key) + (endDeg(key) - startDeg(key)) / 2;
            centerRadius = taxonSpecifics[key]["firstLayerAligned"] + 0.5;
            var centerX = centerRadius * layerWidthInPx * cos(centerDegree);
            centerX = round(centerX) + cx;
            var centerY = -centerRadius * layerWidthInPx * sin(centerDegree);
            centerY = round(centerY) + cy;
            var center = [centerX, centerY, centerDegree];
            taxonSpecifics[key]["center"] = center;
            var alternativeCenterRadius = taxonSpecifics[key]["firstLayerAligned"] + 0.25;
            var alternativeCenterX = alternativeCenterRadius * layerWidthInPx * cos(centerDegree);
            alternativeCenterX = round(alternativeCenterX) + cx;
            var alternativeCenterY = -alternativeCenterRadius * layerWidthInPx * sin(centerDegree);
            alternativeCenterY = round(alternativeCenterY) + cy;
            var alternativeCenter = [alternativeCenterX, alternativeCenterY, centerDegree];
            taxonSpecifics[key]["alternativeCenter"] = alternativeCenter;
        }
        ;
        for (var _b = 0, _c = Object.keys(taxonSpecifics); _b < _c.length; _b++) {
            var key = _c[_b];
            if (taxonSpecifics[key]["layers"][0] === 0) {
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
                };
            }
            else {
                var direction = (taxonSpecifics[key]["layers"].length === 2 && taxonSpecifics[key]["layers"][1] === numberOfLayers) ? "radial" : "circumferential";
                //let direction = (numberOfLayers - taxonSpecifics[key]["firstLayerAligned"] === 1) ? "radial" : "circumferential";
                var angle = void 0, left = void 0, right = void 0, top_1 = void 0, transform = void 0, transformOrigin = void 0, alternativeAngle = void 0, alternativeLeft = void 0, alternativeRight = void 0, alternativeTransform = void 0, alternativeTransformOrigin = void 0, alternativeTop = void 0;
                if (direction === "radial") {
                    angle = taxonSpecifics[key]["center"][2] <= 180 ? -taxonSpecifics[key]["center"][2] : +taxonSpecifics[key]["center"][2];
                    left = angle > 0 ? taxonSpecifics[key]["alternativeCenter"][0] : "unset";
                    right = left === "unset" ? (document.documentElement.clientWidth - taxonSpecifics[key]["alternativeCenter"][0]) : "unset";
                    angle = left === "unset" ? 270 - angle : 360 - (270 - angle);
                    top_1 = taxonSpecifics[key]["alternativeCenter"][1];
                    transform = "translate(0, -50%) rotate(".concat(angle, "deg)");
                    transformOrigin = left === "unset" ? "center right" : "center left";
                }
                else {
                    angle = (((270 - taxonSpecifics[key]["center"][2]) + 360) % 360) > 180 && (((270 - taxonSpecifics[key]["center"][2]) + 360) % 360 <= 360) ? taxonSpecifics[key]["center"][2] % 360 : (taxonSpecifics[key]["center"][2] + 180) % 360;
                    left = taxonSpecifics[key]["center"][0];
                    right = "unset";
                    top_1 = taxonSpecifics[key]["center"][1];
                    transform = "translate(-50%, -50%) rotate(".concat(angle, "deg)");
                    transformOrigin = "center center";
                    alternativeAngle = taxonSpecifics[key]["alternativeCenter"][2] <= 180 ? -taxonSpecifics[key]["alternativeCenter"][2] : +taxonSpecifics[key]["alternativeCenter"][2];
                    alternativeLeft = alternativeAngle > 0 ? taxonSpecifics[key]["alternativeCenter"][0] : "unset";
                    alternativeRight = alternativeLeft === "unset" ? (document.documentElement.clientWidth - taxonSpecifics[key]["alternativeCenter"][0]) : "unset";
                    alternativeTop = taxonSpecifics[key]["alternativeCenter"][1];
                    alternativeAngle = alternativeLeft === "unset" ? 270 - alternativeAngle : 360 - (270 - alternativeAngle);
                    alternativeTransform = "translate(0, -50%) rotate(".concat(alternativeAngle, "deg)");
                    alternativeTransformOrigin = alternativeLeft === "unset" ? "center right" : "center left";
                }
                var percentage = round((taxonSpecifics[key]["totalCount"] / totalUnassignedCount) * 100);
                var oldPercentage = round(((taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length - 1] - taxonSpecifics[key]["degrees"][0]) / 360) * 100);
                taxonSpecifics[key]["label"] = {
                    "direction": direction,
                    "left": left,
                    "right": right,
                    "top": top_1,
                    "transform": transform,
                    "transformOrigin": transformOrigin,
                    "opacity": "1",
                    "angle": angle,
                    "abbreviation": key,
                    "display": "unset",
                    "fullLabel": key + " ".concat(percentage, "%"),
                    "alternativeAngle": alternativeAngle,
                    "alternativeLeft": alternativeLeft,
                    "alternativeRight": alternativeRight,
                    "alternativeTransform": alternativeTransform,
                    "alternativeTransformOrigin": alternativeTransformOrigin,
                    "alternativeTop": alternativeTop
                };
                if (taxonSpecifics[key]["rank"] === "species") {
                    var abbr = taxonSpecifics[key]["label"]["abbreviation"];
                    if (abbr.split(" ").length >= 2 && !(abbr.split(" ")[1] === "sp.")) {
                        var newAbbr = abbr.split(" ")[0].slice(0, 1) + ". " + abbr.split(" ").slice(1, abbr.split(" ").length).join(" ");
                        taxonSpecifics[key]["label"]["abbreviation"] = newAbbr;
                    }
                    else if (abbr.split(" ").indexOf("sp.") !== -1) {
                        var newAbbr = abbr.split(" ").slice(0, abbr.split(" ").indexOf("sp.") + 1).join(" ");
                        taxonSpecifics[key]["label"]["abbreviation"] = newAbbr;
                    }
                }
            }
        }
        ;
        this.getTaxonShapes(newState);
    };
    PlotDrawing.prototype.getTaxonShapes = function (newState) {
        var _this = this;
        // var colors:string[] = ["6CCFF6", "1B998B", "A1E887", "EA638C", "B33C86"];
        // var colors:string[] = ["1B998B", "A1E887", "1E96FC", "B33C86","003F91", ];
        //var colors:string[] = newState["colors"] ? newState["colors"].map(hexToRGB) : this.state.colors.map(hexToRGB);
        var croppedLineages = newState["croppedLineages"] == undefined ? this.state.croppedLineages : newState["croppedLineages"];
        var croppedLineages = JSON.parse(JSON.stringify(croppedLineages));
        var taxonSpecifics = newState["taxonSpecifics"] == undefined ? this.state.taxonSpecifics : newState["taxonSpecifics"];
        var strokes = [];
        var colorIndex = 0;
        for (var i = 0; i < croppedLineages.length; i++) {
            if (croppedLineages[i].length > 1) {
                var firstAncestor = croppedLineages[i][1];
                if (strokes.indexOf(firstAncestor) === -1) {
                    taxonSpecifics[firstAncestor]["fill"] = colors[colorIndex % colors.length];
                    taxonSpecifics[firstAncestor]["stroke"] = skeletonColor;
                    strokes.push(firstAncestor);
                    colorIndex++;
                }
                for (var j = 2; j < croppedLineages[i].length; j++) {
                    var ancestorColor = taxonSpecifics[croppedLineages[i][1]]["fill"];
                    var nextColorIndex = (colors.indexOf(ancestorColor) + 1) % colors.length;
                    var nextColor = colors[nextColorIndex];
                    var selfStartDeg = taxonSpecifics[croppedLineages[i][j]]["degrees"][0];
                    var ancestorStartDeg = taxonSpecifics[croppedLineages[i][1]]["degrees"][0];
                    var ancestorEndDeg = taxonSpecifics[croppedLineages[i][1]]["degrees"][taxonSpecifics[croppedLineages[i][1]]["degrees"].length - 1];
                    var coef = (selfStartDeg - ancestorStartDeg) / (ancestorEndDeg - ancestorStartDeg);
                    var tintFactor = (taxonSpecifics[croppedLineages[i][j]]["firstLayerAligned"] - 1) / 10;
                    var hue = midColor(ancestorColor, nextColor, coef);
                    var tintifiedHue = tintify(hue, tintFactor);
                    taxonSpecifics[croppedLineages[i][j]]["fill"] = tintifiedHue;
                    taxonSpecifics[croppedLineages[i][j]]["stroke"] = skeletonColor;
                }
            }
        }
        taxonSpecifics[croppedLineages[0][0]]["fill"] = "white";
        taxonSpecifics[croppedLineages[0][0]]["stroke"] = skeletonColor;
        this.setState(newState, function () { return console.log("state: ", _this.state); });
    };
    PlotDrawing.prototype.changePalette = function () {
        var newPaletteInput = document.getElementById("new-palette").value;
        var newPalette = Array.from(newPaletteInput.matchAll(/[0-9a-f]{6}/g)).map(String);
        this.getTaxonShapes({ "colors": newPalette });
    };
    PlotDrawing.prototype.handleClick = function (shapeId) {
        var taxon = shapeId.match(/.+?(?=_)/)[0];
        var currLayer = parseInt(shapeId.match(/-?\d+/)[0]);
        var nextLayer;
        if (this.state.root.includes("&")) {
            nextLayer = currLayer <= 0 ? this.state.layer + (currLayer - 1) : (currLayer + this.state.layer) - 1;
        }
        else {
            nextLayer = currLayer <= 0 ? this.state.layer + (currLayer - 1) : currLayer + this.state.layer;
        }
        this.cropLineages(taxon, nextLayer, this.state.alteration, this.state.collapse);
    };
    PlotDrawing.prototype.checkTaxonLabelWidth = function () {
        var taxonSpecifics = this.state.taxonSpecifics;
        var tooWide = [];
        for (var _i = 0, _a = Object.keys(taxonSpecifics); _i < _a.length; _i++) {
            var key = _a[_i];
            var height = document.getElementById("".concat(key, "_-_").concat(taxonSpecifics[key]["firstLayerUnaligned"], "-label")).offsetHeight;
            var width = document.getElementById("".concat(key, "_-_").concat(taxonSpecifics[key]["firstLayerUnaligned"], "-label")).offsetWidth;
            if (taxonSpecifics[key]["label"]["direction"] === "radial") {
                var topBeforeRotation = taxonSpecifics[key]["center"][1] - height / 2;
                var bottomBeforeRotation = taxonSpecifics[key]["center"][1] + height / 2;
                var leftBeforeRotation = taxonSpecifics[key]["center"][0];
                var rightBeforeRotation = taxonSpecifics[key]["center"][0] + width;
                var cx = taxonSpecifics[key]["center"][0];
                var cy = taxonSpecifics[key]["center"][1];
                var angle = taxonSpecifics[key]["label"]["angle"];
                var fourPoints = getFourCorners(topBeforeRotation, bottomBeforeRotation, leftBeforeRotation, rightBeforeRotation, cx, cy, angle);
                var shape = document.getElementById("".concat(key, "_-_").concat(taxonSpecifics[key]["firstLayerUnaligned"]));
                var bottomLeft = document.querySelector("svg").createSVGPoint();
                bottomLeft.x = fourPoints["bottomLeft"][0];
                bottomLeft.y = fourPoints["bottomLeft"][1];
                var bottomRight = document.querySelector("svg").createSVGPoint();
                bottomRight.x = fourPoints["bottomRight"][0];
                bottomRight.y = fourPoints["bottomRight"][1];
                var topLeft = document.querySelector("svg").createSVGPoint();
                topLeft.x = fourPoints["topLeft"][0];
                topLeft.y = fourPoints["topLeft"][1];
                var topRight = document.querySelector("svg").createSVGPoint();
                topRight.x = fourPoints["topRight"][0];
                topRight.y = fourPoints["topRight"][1];
                if (!((shape.isPointInFill(bottomLeft) && shape.isPointInFill(topLeft)) || (shape.isPointInFill(bottomRight) && shape.isPointInFill(topRight)))) {
                    tooWide.push(key);
                }
            }
            else {
                var shapeCenters0 = taxonSpecifics[key]["center"][0];
                var shapeCenters1 = taxonSpecifics[key]["center"][1];
                var topBeforeRotation = shapeCenters1 - height / 2;
                var bottomBeforeRotation = shapeCenters1 + height / 2;
                var leftBeforeRotation = shapeCenters0 - width / 2;
                var rightBeforeRotation = shapeCenters0 + width / 2;
                var cx = shapeCenters0;
                var cy = shapeCenters1;
                var angle = taxonSpecifics[key]["label"]["angle"];
                var fourPoints = getFourCorners(topBeforeRotation, bottomBeforeRotation, leftBeforeRotation, rightBeforeRotation, cx, cy, angle);
                var shape = document.getElementById("".concat(key, "_-_").concat(taxonSpecifics[key]["firstLayerUnaligned"]));
                var bottomLeft = document.querySelector("svg").createSVGPoint();
                bottomLeft.x = fourPoints["bottomLeft"][0];
                bottomLeft.y = fourPoints["bottomLeft"][1];
                var bottomRight = document.querySelector("svg").createSVGPoint();
                bottomRight.x = fourPoints["bottomRight"][0];
                bottomRight.y = fourPoints["bottomRight"][1];
                var topLeft = document.querySelector("svg").createSVGPoint();
                topLeft.x = fourPoints["topLeft"][0];
                topLeft.y = fourPoints["topLeft"][1];
                var topRight = document.querySelector("svg").createSVGPoint();
                topRight.x = fourPoints["topRight"][0];
                topRight.y = fourPoints["topRight"][1];
                // Calculate where alternative, radially positioned label would fit into the shape:
                var alternativeTopBeforeRotation = taxonSpecifics[key]["center"][1] - height / 2;
                var alternativeBottomBeforeRotation = taxonSpecifics[key]["center"][1] + height / 2;
                var alternativeLeftBeforeRotation = taxonSpecifics[key]["center"][0] > this.state.horizontalShift ? taxonSpecifics[key]["center"][0] : taxonSpecifics[key]["center"][0] - width;
                var alternativeRightBeforeRotation = taxonSpecifics[key]["center"][0] > this.state.horizontalShift ? taxonSpecifics[key]["center"][0] + width : taxonSpecifics[key]["center"][0];
                var alternativeAngle = taxonSpecifics[key]["label"]["alternativeAngle"];
                var alternativeFourPoints = getFourCorners(alternativeTopBeforeRotation, alternativeBottomBeforeRotation, alternativeLeftBeforeRotation, alternativeRightBeforeRotation, cx, cy, alternativeAngle);
                var alternativeBottomLeft = document.querySelector("svg").createSVGPoint();
                alternativeBottomLeft.x = alternativeFourPoints["bottomLeft"][0];
                alternativeBottomLeft.y = alternativeFourPoints["bottomLeft"][1];
                var alternativeBottomRight = document.querySelector("svg").createSVGPoint();
                alternativeBottomRight.x = alternativeFourPoints["bottomRight"][0];
                alternativeBottomRight.y = alternativeFourPoints["bottomRight"][1];
                var alternativeTopLeft = document.querySelector("svg").createSVGPoint();
                alternativeTopLeft.x = alternativeFourPoints["topLeft"][0];
                alternativeTopLeft.y = alternativeFourPoints["topLeft"][1];
                var alternativeTopRight = document.querySelector("svg").createSVGPoint();
                alternativeTopRight.x = alternativeFourPoints["topRight"][0];
                alternativeTopRight.y = alternativeFourPoints["topRight"][1];
                if (!(shape.isPointInFill(bottomLeft) && shape.isPointInFill(bottomRight) && shape.isPointInFill(topLeft) && shape.isPointInFill(topRight)) && !(taxonSpecifics[key]["label"]["abbreviation"] === "") && !(shape.isPointInFill(alternativeBottomLeft) && shape.isPointInFill(alternativeBottomRight) && shape.isPointInFill(alternativeTopLeft) && shape.isPointInFill(alternativeTopRight))) {
                    tooWide.push(key);
                }
                else {
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
    };
    PlotDrawing.prototype.abbreviate = function (abbreviatables) {
        var newTaxonSpecifics = JSON.parse(JSON.stringify(this.state.taxonSpecifics));
        for (var _i = 0, abbreviatables_1 = abbreviatables; _i < abbreviatables_1.length; _i++) {
            var key = abbreviatables_1[_i];
            var newAbbreviation = void 0;
            if (newTaxonSpecifics[key]["label"]["abbreviation"].length > 25) {
                newAbbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, 24) + ".";
            }
            else {
                newAbbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, newTaxonSpecifics[key]["label"]["abbreviation"].length - 2) + ".";
            }
            newAbbreviation = newAbbreviation.length < 4 ? "" : newAbbreviation;
            if (newAbbreviation.length === 0) {
                newTaxonSpecifics[key]["label"]["display"] = "none";
                newTaxonSpecifics[key]["label"]["direction"] = "circumferential";
            }
            newTaxonSpecifics[key]["label"]["abbreviation"] = newAbbreviation;
        }
        this.setState({ taxonSpecifics: newTaxonSpecifics });
    };
    PlotDrawing.prototype.render = function () {
        var _this = this;
        currentState = this.state;
        var shapes = [];
        var labels = [];
        var tS = this.state.taxonSpecifics;
        var _loop_8 = function (item) {
            var id = "".concat(item, "_-_").concat(tS[item]["firstLayerUnaligned"]);
            var redirectTo = tS[item]["layers"][0] === 0 ? "".concat(this_1.state.ancestors[this_1.state.ancestors.length - 1], "_-_0") : id;
            shapes.push(React.createElement(TaxonShape, { id: id, abbr: tS[item]["label"]["abbreviation"], onClick: function () { return _this.handleClick(redirectTo); }, d: tS[item]["svgPath"], strokeWidth: viewportDimensions["dpmm"] * 0.265, fillColor: tS[item]["fill"], labelOpacity: tS[item]["label"]["opacity"], display: tS[item]["label"]["display"], fullLabel: tS[item]["label"]["fullLabel"], stroke: tS[item]["stroke"] }));
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(tS); _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_8(item);
        }
        var _loop_9 = function (item) {
            var id = "".concat(item, "_-_").concat(tS[item]["firstLayerUnaligned"]);
            var redirectTo = tS[item]["layers"][0] === 0 ? "".concat(this_2.state.ancestors[this_2.state.ancestors.length - 1], "_-_0") : id;
            var label = React.createElement(TaxonLabel, { id: id, abbr: tS[item]["label"]["abbreviation"], transform: tS[item]["label"]["transform"], left: tS[item]["label"]["left"], right: tS[item]["label"]["right"], top: tS[item]["label"]["top"], transformOrigin: tS[item]["label"]["transformOrigin"], opacity: tS[item]["label"]["opacity"], display: tS[item]["label"]["display"], onClick: function () { _this.handleClick(redirectTo); }, fullLabel: tS[item]["label"]["fullLabel"] });
            labels.push(label);
        };
        var this_2 = this;
        for (var _b = 0, _c = Object.keys(tS); _b < _c.length; _b++) {
            var item = _c[_b];
            _loop_9(item);
        }
        var _loop_10 = function (i) {
            ancestor = this_3.state.ancestors[i];
            actualI = i - this_3.state.ancestors.length;
            labels.push(React.createElement(AncestorLabel, { id: "".concat(ancestor, "_-_").concat(actualI + 1), taxon: ancestor, top: "".concat(10 + 2.5 * (this_3.state.ancestors.length - i), "vmin"), onClick: function () { _this.handleClick("".concat(_this.state.ancestors[i], "_-_").concat((i - _this.state.ancestors.length) + 1)); } }));
        };
        var this_3 = this, ancestor, actualI;
        for (var i = this.state.ancestors.length - 1; i >= 0; i--) {
            _loop_10(i);
        }
        return [React.createElement("svg", { style: { "height": "100%", "width": "100%", "margin": "0", "padding": "0", "boxSizing": "border-box", "border": "none" }, id: "shapes" }, shapes), React.createElement("div", { id: "labels" }, labels)];
    };
    return PlotDrawing;
}(React.Component));
addEventListener("mousemove", function (event) { return handleMouseMove(event); });
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
function hoverHandler(id, fullLabel) {
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
    document.getElementById(label).style.opacity = "1";
    document.getElementById(label).style.display = "unset";
    document.getElementById(label).style.backgroundColor = "white";
    document.getElementById(label).innerText = fullLabel;
}
function onMouseOutHandler(id, usualOpacity, abbreviation, display) {
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
    document.getElementById(label).style.border = "none";
    document.getElementById(label).style.backgroundColor = "unset";
    document.getElementById(label).style.opacity = usualOpacity;
    document.getElementById(label).innerText = abbreviation;
    document.getElementById(label).style.display = display;
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
function getFourCorners(top, bottom, left, right, cx, cy, angle) {
    var topLeft = [((left - cx) * Math.cos(angle * (Math.PI / 180)) - (top - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((left - cx) * Math.sin(angle * (Math.PI / 180)) + (top - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var topRight = [((right - cx) * Math.cos(angle * (Math.PI / 180)) - (top - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((right - cx) * Math.sin(angle * (Math.PI / 180)) + (top - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var bottomLeft = [((left - cx) * Math.cos(angle * (Math.PI / 180)) - (bottom - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((left - cx) * Math.sin(angle * (Math.PI / 180)) + (bottom - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var bottomRight = [((right - cx) * Math.cos(angle * (Math.PI / 180)) - (bottom - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((right - cx) * Math.sin(angle * (Math.PI / 180)) + (bottom - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    return { topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight };
}
var rankPatternFull = ["root", "superkingdom", "kingdom", "subkingdom", "superphylum", "phylum", "subphylum", "superclass", "class", "subclass", "superorder", "order", "suborder", "superfamily", "family", "subfamily", "supergenus", "genus", "subgenus", "superspecies", "species"];
var allTaxaReduced = JSON.parse(JSON.stringify(allTaxa));
var reducibleTaxa = [];
var taxaWithReducibleLineages = [];
// Get the names of all taxa with reducible lineages:
for (var _i = 0, _a = Object.keys(allTaxa); _i < _a.length; _i++) {
    var taxName = _a[_i];
    var lineage = allTaxa[taxName].lineageNames;
    for (var i = 0; i < lineage.length; i++) {
        if (rankPatternFull.indexOf(lineage[i][0]) === -1) {
            taxaWithReducibleLineages.push(taxName);
            break;
        }
    }
}
// Reduce and alter in allTaxaReduced:
for (var _b = 0, taxaWithReducibleLineages_1 = taxaWithReducibleLineages; _b < taxaWithReducibleLineages_1.length; _b++) {
    var taxName = taxaWithReducibleLineages_1[_b];
    var lineage = allTaxa[taxName].lineageNames;
    var reducedLineage = lineage.map(function (item) { return item; });
    for (var i = lineage.length - 1; i >= 0; i--) {
        if (rankPatternFull.indexOf(lineage[i][0]) === -1) {
            reducedLineage.splice(i, 1);
        }
    }
    allTaxaReduced[taxName].lineageNames = reducedLineage;
}
// Find all reducible taxa.
for (var _c = 0, _d = Object.keys(allTaxaReduced); _c < _d.length; _c++) {
    var taxName = _d[_c];
    var rank = allTaxaReduced[taxName].rank;
    var lineage = allTaxaReduced[taxName].lineageNames;
    if (!lineage[lineage.length - 1] || rank !== lineage[lineage.length - 1][0]) {
        reducibleTaxa.push(taxName);
    }
}
// Set "root" as the first ancestor of every taxon.
for (var _e = 0, _f = Object.keys(allTaxaReduced); _e < _f.length; _e++) {
    var taxName = _f[_e];
    if (taxName !== "root") {
        allTaxaReduced[taxName].lineageNames.unshift(allTaxaReduced["root"].lineageNames[0]);
    }
}
// Finally, reduce allTaxa, ridding it of all taxa with weird, hardly-placable ranks - but making sure no information is lost.
for (var _g = 0, reducibleTaxa_1 = reducibleTaxa; _g < reducibleTaxa_1.length; _g++) {
    var taxName = reducibleTaxa_1[_g];
    var unassignedCount = allTaxa[taxName].unassignedCount;
    var lineage = allTaxaReduced[taxName].lineageNames;
    var lastPredecessor = lineage[lineage.length - 1][1];
    if (allTaxaReduced[lastPredecessor]) {
        allTaxaReduced[lastPredecessor]["unassignedCount"] += unassignedCount;
        delete allTaxaReduced[taxName];
    }
    else {
        var newRank = lineage[lineage.length - 1][0];
        var totalCount = allTaxa[taxName].totalCount;
        allTaxaReduced[lastPredecessor] = {};
        allTaxaReduced[lastPredecessor]["lineageNames"] = lineage;
        allTaxaReduced[lastPredecessor]["rank"] = newRank;
        allTaxaReduced[lastPredecessor]["totalCount"] = totalCount;
        allTaxaReduced[lastPredecessor]["unassignedCount"] = unassignedCount;
        delete allTaxaReduced[taxName];
    }
}
// Add taxa with no unassignedCounts as objects in allTaxaReduced, accounting for the fact that there are different taxa with the same name.
var newlyAdded = [];
for (var _h = 0, _j = Object.keys(allTaxaReduced); _h < _j.length; _h++) {
    var taxName = _j[_h];
    var unassignedCount = allTaxaReduced[taxName].unassignedCount;
    var lineage = allTaxaReduced[taxName].lineageNames;
    var _loop_1 = function (predecessor) {
        if (Object.keys(allTaxaReduced).filter(function (item) { return item.startsWith(predecessor[1]); }).length === 0) {
            newlyAdded.push(predecessor[1]);
            allTaxaReduced[predecessor[1]] = {};
            allTaxaReduced[predecessor[1]]["rank"] = predecessor[0];
            allTaxaReduced[predecessor[1]]["lineageNames"] = lineage.slice(0, lineage.indexOf(predecessor) + 1);
            allTaxaReduced[predecessor[1]]["totalCount"] = unassignedCount;
            allTaxaReduced[predecessor[1]]["unassignedCount"] = 0;
        }
        else {
            var falseNamesakes = Object.keys(allTaxaReduced).filter(function (item) { return item.startsWith(predecessor[1]) && allTaxaReduced[item]["rank"] === predecessor[0]; });
            var trueNamesakes = Object.keys(allTaxaReduced).filter(function (item) { return item.startsWith(predecessor[1]) && allTaxaReduced[item]["rank"] !== predecessor[0]; });
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
    };
    for (var _k = 0, lineage_1 = lineage; _k < lineage_1.length; _k++) {
        var predecessor = lineage_1[_k];
        _loop_1(predecessor);
    }
}
// Replace names in lineages with new names from previous step.
for (var _l = 0, _m = Object.keys(allTaxaReduced); _l < _m.length; _l++) {
    var taxName = _m[_l];
    var lineage = allTaxaReduced[taxName].lineageNames;
    var _loop_2 = function (predecessor) {
        if (Object.keys(allTaxaReduced).filter(function (item) { return item.startsWith(predecessor[1]); }).length > 1) {
            var newName = Object.keys(allTaxaReduced).filter(function (item) { return item.startsWith(predecessor[1]); }).filter(function (item1) { return allTaxaReduced[item1]["rank"] === predecessor[0]; })[0];
            predecessor[1] = newName;
        }
    };
    for (var _o = 0, lineage_2 = lineage; _o < lineage_2.length; _o++) {
        var predecessor = lineage_2[_o];
        _loop_2(predecessor);
    }
}
// Do not consider taxa without unassigned counts in croppedLineages() later.
for (var _p = 0, _q = Object.keys(allTaxaReduced); _p < _q.length; _p++) {
    var taxName = _q[_p];
    if (allTaxaReduced[taxName]["unassignedCount"] === 0) {
        allTaxaReduced[taxName]["skip"] = true;
    }
}
// Sort before separating rank from taxon.
var lineagesFull = [];
for (var _r = 0, _s = Object.keys(allTaxaReduced).filter(function (item) { return !allTaxaReduced[item]["skip"]; }); _r < _s.length; _r++) {
    var taxName = _s[_r];
    lineagesFull.push(allTaxaReduced[taxName].lineageNames.map(function (item) { return item[1] + "_*_" + item[0]; }));
}
//lineagesFull.sort();
// Separate.
var lineagesNames = [];
var lineagesRanks = [];
for (var _t = 0, lineagesFull_1 = lineagesFull; _t < lineagesFull_1.length; _t++) {
    var lineage = lineagesFull_1[_t];
    var lineageNames = lineage.map(function (item) { return item.split("_*_")[0]; });
    var lineageRanks = lineage.map(function (item) { return item.split("_*_")[1]; });
    lineagesNames.push(lineageNames);
    lineagesRanks.push(lineageRanks);
}
newlyAdded = newlyAdded.filter(function (v, i, a) { return a.indexOf(v) === i; });
var colors = [];
var colorOffset = 94; //Math.round(Math.random() * 100); //84, 98, 31, 20
console.log("color offset: ", colorOffset);
for (var i = 0; i < 7; i++) {
    var r = Math.sin(0.3 * colorOffset + 4) * 55 + 200;
    var g = Math.sin(0.3 * colorOffset + 2) * 55 + 200;
    var b = Math.sin(0.3 * colorOffset) * 55 + 200;
    var newColor = "rgb(".concat(round(r, 0), ", ").concat(round(g, 0), ", ").concat(round(b, 0), ")");
    colors.push(newColor);
    colorOffset += 3;
}
// var fullPlot:Plot = new Plot();
// var mycosphaerellalesPlot:Plot = new Plot("Bacteria", 0, true, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, true, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Mycosphaerellales", 8, false, viewportDimensions);
// var mycosphaerellalesPlot:Plot = new Plot("Eurotiomycetes", 6, false);
var mycosphaerellalesPlot = new Plot("Leotiomycetes", 6, false);
var snapshotButton = document.getElementById("take-snapshot");
snapshotButton === null || snapshotButton === void 0 ? void 0 : snapshotButton.addEventListener("click", function (event) {
    sendSnapshot();
});
