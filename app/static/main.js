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
var _a;
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom/client");
var _html2canvas = require("html2canvas");
var objects_js_1 = require("./objects.js");
var helperFunctions_js_1 = require("./helperFunctions.js");
var currentState;
var skeletonColor = "#800080";
var html2canvas = _html2canvas;
var domContainer = document.querySelector('#plot-container');
var reactRoot = ReactDOM.createRoot(domContainer);
var viewportDimensions = (0, helperFunctions_js_1.getViewportDimensions)();
var alreadyVisited = {};
var fileName = "lessSpontaneous2.tsv";
var taxonName = "Laurasiatheria";
var layerName = 7;
var collapseName = "collapseFalse";
var modeName = "allEqual";
/* ===== FETCHING THE DATA ===== */
var path = "lessSpontaneous2.tsv";
//loadDataFromTSV(path);
var lineagesNames = objects_js_1.ln;
var lineagesRanks = objects_js_1.lr;
var allTaxaReduced = objects_js_1.atr;
var rankPatternFull = ["root", "superkingdom", "kingdom", "subkingdom", "superphylum", "phylum", "subphylum", "superclass", "class", "subclass", "superorder", "order", "suborder", "superfamily", "family", "subfamily", "supergenus", "genus", "subgenus", "superspecies", "species"];
var colors = [];
var colorOffset = Math.round(Math.random() * 100); //84, 98, 31, 20, 1, 2
colors = (0, helperFunctions_js_1.createPalette)(colorOffset);
/* ===== DEFINING THE REACT COMPONENTS ===== */
var AncestorSection = /** @class */ (function (_super) {
    __extends(AncestorSection, _super);
    function AncestorSection(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            root: "",
            layer: -1,
            rank: "",
            totalCount: 0,
            unassignedCount: 0,
            lines: []
        };
        return _this;
    }
    AncestorSection.prototype.componentDidUpdate = function () {
        if (this.props.root !== this.state.root) {
            this.getCounts();
        }
    };
    AncestorSection.prototype.getCounts = function () {
        var totalCount = 0;
        var unassignedCount = 0;
        var rank = "";
        if (this.props.root.indexOf("&") > -1) {
            var groupedTaxa = this.props.root.split(" & ");
            for (var _i = 0, groupedTaxa_1 = groupedTaxa; _i < groupedTaxa_1.length; _i++) {
                var taxon = groupedTaxa_1[_i];
                totalCount += allTaxaReduced[taxon]["totalCount"];
            }
            unassignedCount = 0;
            rank = allTaxaReduced[groupedTaxa[0]]["rank"];
        }
        else {
            totalCount = allTaxaReduced[this.props.root]["totalCount"];
            unassignedCount = allTaxaReduced[this.props.root]["unassignedCount"];
            rank = allTaxaReduced[this.props.root]["rank"];
        }
        var lines = this.props.ancestors.map(function (item) { return ("".concat((0, helperFunctions_js_1.round)(totalCount * 100 / allTaxaReduced[item]["totalCount"], 2), "%")); });
        this.setState({ totalCount: totalCount, unassignedCount: unassignedCount, root: this.props.root, layer: this.props.layer, lines: lines, rank: rank });
    };
    AncestorSection.prototype.render = function () {
        var firstLine = React.createElement("legend", { style: { "color": "#800080", "fontWeight": "bold" } }, "Current layer:");
        var nameLine = React.createElement("p", { style: { "padding": 0, "margin": 0, "paddingBottom": "1vmin" } },
            "Taxon: ",
            React.createElement("b", null, this.state.root),
            ", #",
            this.state.layer);
        var rankLine = React.createElement("p", { style: { "padding": 0, "margin": 0 } },
            "Rank: ",
            this.state.rank);
        var totalCountLine = React.createElement("p", { style: { "padding": 0, "margin": 0 } },
            "Total count: ",
            this.state.totalCount);
        var unassignedCountLine = React.createElement("p", { style: { "padding": 0, "margin": 0 } },
            "Unspecified ",
            this.state.root,
            ": ",
            this.state.unassignedCount);
        //!!! rewrite v
        var beforePreprocessing = allTaxa[this.state.root] ? allTaxa[this.state.root]["unassignedCount"] : 0;
        var bPLine = React.createElement("p", { style: { "padding": 0, "margin": 0, "paddingBottom": "1vmin" } },
            "(before preprocessing: ",
            beforePreprocessing,
            ")");
        var ps = [firstLine, nameLine, rankLine, totalCountLine, unassignedCountLine, bPLine];
        for (var i = 0; i < this.props.ancestors.length; i++) {
            ps.push(React.createElement("p", { style: { "padding": 0, "margin": 0 }, onClick: this.props.onClickArray[i] },
                this.state.lines[i],
                " of ",
                React.createElement("b", null, this.props.ancestors[i])));
        }
        return React.createElement("fieldset", { style: { "borderColor": "#800080" } }, ps);
    };
    return AncestorSection;
}(React.Component));
var DescendantSection = /** @class */ (function (_super) {
    __extends(DescendantSection, _super);
    function DescendantSection(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            self: "",
            layer: -1,
            rank: "",
            totalCount: 0,
            unassignedCount: 0,
            percentage: 0,
            hovered: false
        };
        return _this;
    }
    DescendantSection.prototype.componentDidMount = function () {
        var _this = this;
        var _a;
        (_a = document.getElementById("descendant-section")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
            var el = document.getElementById("descendant-section");
            var values;
            var self;
            var layer;
            var ancestor;
            var hovered;
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
            if (!(_this.state.self === self)) {
                _this.calculateParams(self, layer, ancestor, hovered);
            }
        });
    };
    DescendantSection.prototype.calculateParams = function (self, layer, ancestor, hovered) {
        if (hovered) {
            var totalCount = 0;
            var unassignedCount = 0;
            var rank = void 0;
            if (self.indexOf("&") > -1) {
                var groupedTaxa = self.split(" & ");
                for (var _i = 0, groupedTaxa_2 = groupedTaxa; _i < groupedTaxa_2.length; _i++) {
                    var taxon = groupedTaxa_2[_i];
                    totalCount += allTaxaReduced[taxon]["totalCount"];
                }
                unassignedCount = 0;
                rank = allTaxaReduced[groupedTaxa[0]]["rank"];
            }
            else {
                totalCount = allTaxaReduced[self]["totalCount"];
                unassignedCount = allTaxaReduced[self]["unassignedCount"];
                rank = allTaxaReduced[self]["rank"];
            }
            var percentage = totalCount * 100 / allTaxaReduced[ancestor]["totalCount"];
            this.setState({ totalCount: totalCount, unassignedCount: unassignedCount, rank: rank, percentage: percentage, layer: layer, self: self, hovered: hovered });
        }
        else {
            this.setState({ totalCount: 0, unassignedCount: 0, rank: "", percentage: 0, self: "", layer: 0, hovered: hovered });
        }
    };
    DescendantSection.prototype.render = function () {
        var ps = [];
        if (this.state.hovered) {
            var firstLine = React.createElement("legend", { style: { "color": "#800080", "fontWeight": "bold" } }, "Hovering over:");
            var nameLine = React.createElement("p", { style: { "padding": 0, "margin": 0, "paddingBottom": "1vmin" } },
                "Taxon: ",
                React.createElement("b", null, this.state.self),
                ", #",
                this.state.layer);
            var rankLine = React.createElement("p", { style: { "padding": 0, "margin": 0 } },
                "Rank: ",
                this.state.rank);
            var totalCountLine = React.createElement("p", { style: { "padding": 0, "margin": 0 } },
                "Total count: ",
                this.state.totalCount);
            var unassignedCountLine = React.createElement("p", { style: { "padding": 0, "margin": 0 } },
                "Unassigned ",
                this.state.self,
                ": ",
                this.state.unassignedCount);
            ps = [firstLine, nameLine, rankLine, totalCountLine, unassignedCountLine];
            return React.createElement("fieldset", { style: { "borderColor": "#800080" } }, ps);
        }
        return React.createElement("div", null);
    };
    return DescendantSection;
}(React.Component));
var PlotDrawing = /** @class */ (function (_super) {
    __extends(PlotDrawing, _super);
    function PlotDrawing(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
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
            colors: colors,
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
        };
        return _this;
    }
    PlotDrawing.prototype.componentDidMount = function () {
        var _this = this;
        // Once everything is initialized, calculate plot.
        this.cropLineages();
        // Recalculate plot on window resize.
        addEventListener("resize", function (event) {
            var newViewportDimensions = (0, helperFunctions_js_1.getViewportDimensions)();
            viewportDimensions = newViewportDimensions;
            _this.setState({ horizontalShift: newViewportDimensions["cx"], verticalShift: newViewportDimensions["cy"], alteration: _this.state.alteration }, function () { return _this.cropLineages(); });
        });
        // Recalculate plot when user changes settings - radio button, checkboxes, new file.
        document.getElementById("radio-input").addEventListener("change", function () {
            var alteration = document.querySelector('input[name="radio"]:checked').getAttribute("id");
            _this.cropLineages(_this.state.root, _this.state.layer, alteration, _this.state.collapse);
        });
        document.getElementById("checkbox-input").addEventListener("change", function () {
            var element = document.getElementById("checkbox-input");
            var checked = element.checked;
            _this.cropLineages(_this.state.root, _this.state.layer, _this.state.alteration, checked);
        });
        document.getElementById("new-data").addEventListener("change", function () {
            var newData = document.getElementById("new-data");
            var collapsed = document.getElementById("checkbox-input");
            var currentAlteration = document.querySelector('input[name="radio"]:checked');
            var allEqual = document.getElementById("allEqual");
            newData.checked = false;
            collapsed.checked = false;
            currentAlteration.checked = false;
            allEqual.checked = true;
            colors = (0, helperFunctions_js_1.createPalette)(colorOffset);
            _this.cropLineages("root", 0, "allEqual", false, lineagesNames, lineagesRanks);
        });
    };
    PlotDrawing.prototype.componentDidUpdate = function () {
        if (!this.state.labelsPlaced) {
            this.placeLabels();
        }
    };
    // Leave only relevant lineages and crop them if necessary.
    PlotDrawing.prototype.cropLineages = function (root, layer, alteration, collapse, lineages, ranks) {
        if (root === void 0) { root = this.state.root; }
        if (layer === void 0) { layer = this.state.layer; }
        if (alteration === void 0) { alteration = this.state.alteration; }
        if (collapse === void 0) { collapse = this.state.collapse; }
        if (lineages === void 0) { lineages = lineagesNames; }
        if (ranks === void 0) { ranks = lineagesRanks; }
        // Change some variables, so that when the SVG is downloaded, the SVG file name reflects all settings.
        taxonName = root.slice(0, 10);
        layerName = layer;
        modeName = alteration;
        collapseName = "collapse" + collapse;
        // Get only relevant lineages.
        var croppedLineages = [], croppedRanks = [];
        var rootTaxa = root.split(" & "); // In the root taxon is actually multiple taxa married together.
        for (var i = 0; i < lineages.length; i++) { // Iterate over all lineages.
            if (rootTaxa.indexOf(lineages[i][layer]) > -1) { // If the current lineage, at the relevant layer, contains the root taxon (or one of them), add it.
                croppedLineages.push(lineages[i]);
                croppedRanks.push(ranks[i]);
            }
        }
        // Crop lineages so they start with clicked taxon.
        var ancestors = [""];
        if (croppedLineages[0]) { // If there is anything to show at all, a.k.a if there are lineages that passed the first requirement above...
            ancestors = croppedLineages[0].slice(0, layer); // ...then, they all have the same ancestors, so we set up a variable that will become a part of the component state later.
        }
        if (rootTaxa.length > 1) { // If the clicked taxon is a married taxon, then crop the lineages to start with the parent taxon of the clicked (married) taxon.
            croppedLineages = croppedLineages.map(function (item) { return item.slice(layer - 1); });
            croppedRanks = croppedRanks.map(function (item) { return item.slice(layer - 1); });
        }
        else { // Otherwise, crop the lineages to start with the clicked taxon.
            croppedLineages = croppedLineages.map(function (item) { return item.slice(layer); });
            croppedRanks = croppedRanks.map(function (item) { return item.slice(layer); });
        }
        // Get minimal rank pattern for this particular plot to prepare for alignment.
        var ranksUnique = croppedRanks.reduce(function (accumulator, value) { return accumulator.concat(value); }, []); // Create an array of all ranks of all cropped lineages. Not unique yet.
        ranksUnique = ranksUnique.filter(function (value, index, self) { return Boolean(value) && self.indexOf(value) === index; }); // Uniquify.
        var rankPattern = rankPatternFull.filter(function (item) { return ranksUnique.indexOf(item) > -1; }); // Match the uniquified array to the fixed rank pattern to keep hierarchical order.
        // Mary taxa if necessary.
        var changedLineages = [];
        if (alteration.startsWith("marriedTaxa")) {
            var cropped = this.marryTaxa(croppedLineages, croppedRanks, alteration);
            croppedLineages = cropped[0];
            croppedRanks = cropped[1];
            changedLineages = cropped[2];
        }
        // Collapse lineages if necessary.
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
            if (changedLineages[i] || taxName.includes("&")) {
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
                taxonSpecifics[taxName]["married"] = true;
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
        if (root.indexOf("&") > -1) {
            for (var _i = 0, _a = Object.keys(taxonSpecifics); _i < _a.length; _i++) {
                var taxName_1 = _a[_i];
                totalUnassignedCount += taxonSpecifics[taxName_1]["unassignedCount"];
            }
        }
        else {
            totalUnassignedCount = allTaxaReduced[root]["totalCount"];
        }
        // Make all lineages take up the same amount of degrees in the plot if necessary.
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
        var dpmm = viewportDimensions["dpmm"];
        var numberOfLayers = alignedCropppedLineages[0].length;
        var smallerDimension = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 4);
        // Continue if more than one lineage fulfilling the criteria was found.
        var currPlotId = root + layer + collapse + alteration + (0, helperFunctions_js_1.round)(layerWidth);
        if (Object.keys(alreadyVisited).indexOf(currPlotId) > -1) {
            this.setState(alreadyVisited[currPlotId]);
        }
        else if (croppedLineages.length > 1) {
            this.assignDegrees({ "root": root, "layer": layer, "rankPattern": rankPattern, "taxonSpecifics": taxonSpecifics, "croppedLineages": croppedLineages, "alignedCroppedLineages": alignedCropppedLineages, "ancestors": ancestors, "alteration": alteration, "collapse": collapse, "totalUnassignedCount": totalUnassignedCount, count: 0, "abbreviateLabels": true, "labelsPlaced": false, "alreadyRepeated": false });
        }
    };
    PlotDrawing.prototype.marryTaxa = function (croppedLineages, croppedRanks, alteration) {
        if (alteration === void 0) { alteration = "marriedTaxaI"; }
        // Set threshold for marrying. Currently fixed at 2%.
        var threshold = 0.02;
        var totalUnassignedCounts = 0;
        for (var _i = 0, croppedLineages_1 = croppedLineages; _i < croppedLineages_1.length; _i++) {
            var lineage = croppedLineages_1[_i];
            totalUnassignedCounts += allTaxaReduced[lineage[lineage.length - 1]]["unassignedCount"];
        }
        var reducibleLineages = [];
        // Find all lineages that make up <2% of the whole, crop them so that they end in the most specific taxon >=1%, put them in an array called reducibleLineages. 
        for (var _a = 0, croppedLineages_2 = croppedLineages; _a < croppedLineages_2.length; _a++) {
            var lineage = croppedLineages_2[_a];
            if (allTaxaReduced[lineage[lineage.length - 1]]["totalCount"] / totalUnassignedCounts < threshold) { // So, the wedge is too thin?
                var lineageNumber = croppedLineages.indexOf(lineage);
                var lastWayTooThinLayer = lineage.length - 1;
                // Find the furthest wedge above it that is also too thin.
                for (var i = lineage.length - 2; i >= 0; i--) {
                    if (allTaxaReduced[lineage[i]]["totalCount"] / totalUnassignedCounts >= threshold) {
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
            var _loop_1 = function (group) {
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
            // Sort indices of reduction groups in ascending order, group some of them together if they are in the same subgroup.
            for (var _d = 0, _e = Object.keys(reductionGroups); _d < _e.length; _d++) {
                var group = _e[_d];
                _loop_1(group);
            }
            var _loop_2 = function (group) {
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
                    var lastGroup = newGroups[newGroups.length - 1];
                    lastGroup.splice.apply(lastGroup, __spreadArray([lastGroup.length, 0], newIndexGroup, false));
                    //newGroups.push(newIndexGroup);
                }
                newGroups = newGroups.map(function (item) { return item.map(function (item1) { return reductionGroups[group]["references"][item1]; }); });
                newGroups = newGroups.map(function (item) { return item.reduce(function (accumulator, value) { return accumulator.concat(value); }, []); });
                reductionGroups[group]["newGroups"] = newGroups;
            };
            for (var _f = 0, _g = Object.keys(reductionGroups); _f < _g.length; _f++) {
                var group = _g[_f];
                _loop_2(group);
            }
            var newReductionGroups = {};
            var _loop_3 = function (group) {
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
                _loop_3(group);
            }
            reductionGroups = newReductionGroups;
        }
        var changedLineages = new Array(croppedLineages.length).fill(false);
        for (var _k = 0, _l = Object.keys(reductionGroups).filter(function (item) { return reductionGroups[item]["index"].length > 1; }); _k < _l.length; _k++) {
            var group = _l[_k];
            for (var _m = 0, _o = reductionGroups[group]["index"]; _m < _o.length; _m++) {
                var index = _o[_m];
                croppedLineages[index].splice(reductionGroups[group]["spliceAt"], croppedLineages[index].length - reductionGroups[group]["spliceAt"], reductionGroups[group]["commonName"]);
                croppedRanks[index].splice(reductionGroups[group]["spliceAt"] + 1);
                changedLineages.splice(index, 1, true);
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
                changedLineages.splice(lastIndex, 1);
            }
        }
        return [croppedLineages, croppedRanks, changedLineages];
    };
    // Assign each cropped lineage a start and end degree.
    PlotDrawing.prototype.assignDegrees = function (newState) {
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var croppedLineages = newState["croppedLineages"] ? newState["croppedLineages"] : this.state.taxonSpecifics;
        var taxonSpecifics = newState["taxonSpecifics"] ? newState["taxonSpecifics"] : this.state.taxonSpecifics;
        var totalUnassignedCounts = 0;
        if (newState["alteration"] === "allEqual") {
            for (var _i = 0, _a = Object.keys(taxonSpecifics).filter(function (item) { return taxonSpecifics[item]["unassignedCount"] !== 0; }); _i < _a.length; _i++) {
                var taxName = _a[_i];
                totalUnassignedCounts += taxonSpecifics[taxName]["unassignedCount"];
            }
        }
        else {
            var totalUnassignedCounts = newState["totalUnassignedCount"];
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
        var _loop_4 = function (i) {
            var _loop_5 = function (j) {
                if (layers[i].filter(function (item) { return item === layers[i][j]; }).length === 1 && Boolean(layers[i + 1][j])) {
                    lineagesCopy[j].splice(i, 1, "toBeDeleted");
                    ranksCopy[j].splice(i, 1, "toBeDeleted");
                }
            };
            for (var j = 0; j < layers[i].length; j++) {
                _loop_5(j);
            }
        };
        for (var i = 0; i < layers.length - 1; i++) {
            _loop_4(i);
        }
        for (var i = 0; i < lineagesCopy.length; i++) {
            lineagesCopy[i] = lineagesCopy[i].filter(function (item) { return item !== "toBeDeleted"; });
            ranksCopy[i] = ranksCopy[i].filter(function (item) { return item !== "toBeDeleted"; });
        }
        return [lineagesCopy, ranksCopy];
    };
    PlotDrawing.prototype.calculateArcEndpoints = function (layer, layerWidthInPx, deg1, deg2) {
        var radius = layer * layerWidthInPx; // in px
        var x1 = (0, helperFunctions_js_1.round)(radius * (0, helperFunctions_js_1.cos)(deg1) + this.state.horizontalShift);
        var y1 = (0, helperFunctions_js_1.round)(-radius * (0, helperFunctions_js_1.sin)(deg1) + this.state.verticalShift);
        var x2 = (0, helperFunctions_js_1.round)(radius * (0, helperFunctions_js_1.cos)(deg2) + this.state.horizontalShift);
        var y2 = (0, helperFunctions_js_1.round)(-radius * (0, helperFunctions_js_1.sin)(deg2) + this.state.verticalShift);
        return { x1: x1, y1: y1, x2: x2, y2: y2, radius: (0, helperFunctions_js_1.round)(radius) };
    };
    PlotDrawing.prototype.calculateSVGPaths = function (newState) {
        var alignedCroppedLineages = newState["alignedCroppedLineages"] ? newState["alignedCroppedLineages"] : this.state.alignedCroppedLineages;
        var taxonSpecifics = newState["taxonSpecifics"] == undefined ? this.state.taxonSpecifics : newState["taxonSpecifics"];
        var dpmm = viewportDimensions["dpmm"];
        // Redundancy v
        var numberOfLayers = alignedCroppedLineages[0].length;
        var smallerDimension = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 4);
        var firstLayer = function (key) { return taxonSpecifics[key]["layers"][0]; };
        var secondLayer = function (key) { return taxonSpecifics[key]["layers"][1]; };
        var startDeg = function (key) { return taxonSpecifics[key]["degrees"][0]; };
        var endDeg = function (key) { return taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length - 1]; };
        for (var _i = 0, _a = Object.keys(taxonSpecifics); _i < _a.length; _i++) {
            var key = _a[_i];
            var firstLayerRadius = (0, helperFunctions_js_1.round)(firstLayer(key) * layerWidth);
            if (taxonSpecifics[key]["layers"][0] === 0) { // If the shape to be drawn is the center of the plot (1 circle).
                taxonSpecifics[key]["svgPath"] = "M ".concat(this.state.horizontalShift, ", ").concat(this.state.verticalShift, " m -").concat(layerWidth, ", 0 a ").concat(layerWidth, ",").concat(layerWidth, " 0 1,0 ").concat((layerWidth) * 2, ",0 a ").concat(layerWidth, ",").concat(layerWidth, " 0 1,0 -").concat((layerWidth) * 2, ",0");
            }
            else { // If the shape to be drawn is NOT the center of the plot, but a complex shape, add:
                var subpaths = [];
                if ((0, helperFunctions_js_1.round)(endDeg(key) - startDeg(key)) === 360) { // If the shape to be drawn completes a full circle:
                    var innerArc = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
                    var innerArcPath = "M ".concat(this.state.horizontalShift, ", ").concat(this.state.verticalShift, " m -").concat(firstLayerRadius, ", 0 a ").concat(firstLayerRadius, ",").concat(firstLayerRadius, " 0 1,0 ").concat((firstLayerRadius) * 2, ",0 a ").concat(firstLayerRadius, ",").concat(firstLayerRadius, " 0 1,0 -").concat((firstLayerRadius) * 2, ",0");
                    subpaths = [innerArcPath];
                    if (taxonSpecifics[key]["layers"].length === 2) { // If the shape to be drawm completes a full circle AND consists simply of two concentric circles.
                        var midArcPath = "M ".concat(this.state.horizontalShift, ", ").concat(this.state.verticalShift, " m -").concat(secondLayer(key) * layerWidth, ", 0 a ").concat(secondLayer(key) * layerWidth, ",").concat(secondLayer(key) * layerWidth, " 0 1,0 ").concat((secondLayer(key) * layerWidth) * 2, ",0 a ").concat(secondLayer(key) * layerWidth, ",").concat(secondLayer(key) * layerWidth, " 0 1,0 -").concat((secondLayer(key) * layerWidth) * 2, ",0");
                        subpaths.push(midArcPath);
                    }
                    else { // If the shape to be drawm completes a full circle AND is of irregular shape.
                        var midArc = {};
                        for (var i = taxonSpecifics[key]["layers"].length - 1; i >= 1; i--) {
                            var curr = taxonSpecifics[key]["degrees"][i];
                            var prev = taxonSpecifics[key]["degrees"][i - 1];
                            var startingLetter = i === taxonSpecifics[key]["layers"].length - 1 ? "M" : "L";
                            midArc = this.calculateArcEndpoints(taxonSpecifics[key]["layers"][i], layerWidth, prev, curr);
                            var midArcPath = "".concat(startingLetter, " ").concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 0 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                            if (Math.abs(curr - prev) >= 180) {
                                var midArcPath = "".concat(startingLetter, " ").concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 1 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                            }
                            ;
                            subpaths.push(midArcPath);
                        }
                        var lineInnertoOuter = "L ".concat(midArc["x1"], ",").concat(midArc["y1"], " ").concat(this.state.horizontalShift, ",").concat(this.state.verticalShift + taxonSpecifics[key]["layers"][taxonSpecifics[key]["layers"].length - 1] * layerWidth);
                        subpaths.push(lineInnertoOuter);
                    }
                    var d = subpaths.join(" ");
                    taxonSpecifics[key]["svgPath"] = d;
                }
                else { // If the shape doesn't complete a full circle.
                    var innerArc = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
                    var innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(firstLayerRadius, ",").concat(firstLayerRadius, " 0 0 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
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
            centerRadius = taxonSpecifics[key]["firstLayerAligned"] + 0.333;
            var centerX = centerRadius * layerWidthInPx * (0, helperFunctions_js_1.cos)(centerDegree);
            centerX = (0, helperFunctions_js_1.round)(centerX) + cx;
            var centerY = -centerRadius * layerWidthInPx * (0, helperFunctions_js_1.sin)(centerDegree);
            centerY = (0, helperFunctions_js_1.round)(centerY) + cy;
            var pointOnLeftBorderX = centerRadius * layerWidthInPx * (0, helperFunctions_js_1.cos)(startDeg(key));
            pointOnLeftBorderX = (0, helperFunctions_js_1.round)(pointOnLeftBorderX) + cx;
            var pointOnLeftBorderY = -centerRadius * layerWidthInPx * (0, helperFunctions_js_1.sin)(startDeg(key));
            pointOnLeftBorderY = (0, helperFunctions_js_1.round)(pointOnLeftBorderY) + cy;
            var pointOnRightBorderX = centerRadius * layerWidthInPx * (0, helperFunctions_js_1.cos)(endDeg(key));
            pointOnRightBorderX = (0, helperFunctions_js_1.round)(pointOnRightBorderX) + cx;
            var pointOnRightBorderY = -centerRadius * layerWidthInPx * (0, helperFunctions_js_1.sin)(endDeg(key));
            pointOnRightBorderY = (0, helperFunctions_js_1.round)(pointOnRightBorderY) + cy;
            var center = [centerX, centerY, centerDegree, pointOnLeftBorderX, pointOnLeftBorderY, pointOnRightBorderX, pointOnRightBorderY];
            taxonSpecifics[key]["center"] = center;
        }
        ;
        for (var _b = 0, _c = Object.keys(taxonSpecifics); _b < _c.length; _b++) {
            var key = _c[_b];
            if (taxonSpecifics[key]["layers"][0] === 0) {
                taxonSpecifics[key]["label"] = {
                    "direction": "horizontal",
                    "opacity": "1",
                    "left": 0,
                    "hoverLeft": 0,
                    "hoverWidth": 0,
                    "hoverDisplay": "unset",
                    "angle": 0,
                    "abbreviation": root.replace(RegExp(rankPatternFull.map(function (item) { return " " + item; }).join("|")), ""),
                    "display": "unset",
                    "fullLabel": root.replace(RegExp(rankPatternFull.map(function (item) { return " " + item; }).join("|")), "")
                };
            }
            else {
                var direction = (taxonSpecifics[key]["layers"].length === 2 && taxonSpecifics[key]["layers"][1] === numberOfLayers) ? "radial" : "verse";
                var angle = void 0, radialAngle = void 0;
                if (direction === "radial") {
                    angle = taxonSpecifics[key]["center"][2] <= 180 ? -taxonSpecifics[key]["center"][2] : taxonSpecifics[key]["center"][2];
                }
                else {
                    angle = (((270 - taxonSpecifics[key]["center"][2]) + 360) % 360) > 180 && (((270 - taxonSpecifics[key]["center"][2]) + 360) % 360 <= 360) ? taxonSpecifics[key]["center"][2] % 360 : (taxonSpecifics[key]["center"][2] + 180) % 360;
                    radialAngle = taxonSpecifics[key]["center"][2] <= 180 ? -taxonSpecifics[key]["center"][2] : taxonSpecifics[key]["center"][2];
                }
                var percentage = (0, helperFunctions_js_1.round)((taxonSpecifics[key]["totalCount"] / totalUnassignedCount) * 100);
                var oldPercentage = (0, helperFunctions_js_1.round)(((taxonSpecifics[key]["degrees"][taxonSpecifics[key]["degrees"].length - 1] - taxonSpecifics[key]["degrees"][0]) / 360) * 100);
                taxonSpecifics[key]["label"] = {
                    "direction": direction,
                    "opacity": "1",
                    "left": 0,
                    "hoverLeft": 0,
                    "hoverDisplay": "unset",
                    "hoverWidth": 0,
                    "top": 0,
                    "angle": angle,
                    "abbreviation": key.replace(RegExp(rankPatternFull.map(function (item) { return " " + item; }).join("|")), ""),
                    "display": "unset",
                    "fullLabel": key.replace(RegExp(rankPatternFull.map(function (item) { return " " + item; }).join("|")), "") + " ".concat(percentage, "%"),
                    "radialAngle": radialAngle
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
                    var hue = (0, helperFunctions_js_1.midColor)(ancestorColor, nextColor, coef);
                    var tintifiedHue = (0, helperFunctions_js_1.tintify)(hue, tintFactor);
                    taxonSpecifics[croppedLineages[i][j]]["fill"] = tintifiedHue;
                    taxonSpecifics[croppedLineages[i][j]]["stroke"] = skeletonColor;
                }
            }
        }
        taxonSpecifics[croppedLineages[0][0]]["fill"] = "white";
        taxonSpecifics[croppedLineages[0][0]]["stroke"] = skeletonColor;
        this.setState(newState);
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
        var plotId = this.state.root + this.state.layer + this.state.collapse + this.state.alteration + (0, helperFunctions_js_1.round)(this.state.layerWidth);
        if (Object.keys(alreadyVisited).indexOf(plotId) === -1) {
            alreadyVisited[plotId] = JSON.parse(JSON.stringify(this.state));
            alreadyVisited[plotId]["abbreviateLabels"] = false;
        }
        this.cropLineages(taxon, nextLayer, this.state.alteration, this.state.collapse);
    };
    PlotDrawing.prototype.placeLabels = function (alreadyRepeated) {
        if (alreadyRepeated === void 0) { alreadyRepeated = this.state.alreadyRepeated; }
        var newTaxonSpecifics = JSON.parse(JSON.stringify(this.state.taxonSpecifics));
        var height = 0;
        for (var _i = 0, _a = Object.keys(newTaxonSpecifics); _i < _a.length; _i++) {
            var key = _a[_i];
            var labelElement = document.getElementById("".concat(key, "_-_").concat(newTaxonSpecifics[key]["firstLayerUnaligned"], "-label"));
            var hoverLabelElement = document.getElementById("".concat(key, "_-_").concat(newTaxonSpecifics[key]["firstLayerUnaligned"], "-hoverLabel"));
            height = !alreadyRepeated ? labelElement.getBoundingClientRect().height / 2 : this.state.height;
            var width = labelElement.getBoundingClientRect().width;
            var hoverWidth = hoverLabelElement.getBoundingClientRect().width;
            var angle = newTaxonSpecifics[key]["label"]["angle"];
            var centerDegree = newTaxonSpecifics[key]["center"][2];
            var transformOrigin = "".concat(newTaxonSpecifics[key]["center"][0], " ").concat(newTaxonSpecifics[key]["center"][1]);
            var top_1 = newTaxonSpecifics[key]["center"][1] + height / 2;
            var left = void 0, radialLeft = void 0, horizontalSpace = void 0, abbreviation = void 0, howManyLettersFit = void 0, hoverLeft = void 0, hoverRadialLeft = void 0;
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
                left = newTaxonSpecifics[key]["center"][0] - width / 2;
                hoverLeft = newTaxonSpecifics[key]["center"][0] - hoverWidth / 2;
                var radialAngle = newTaxonSpecifics[key]["label"]["radialAngle"];
                // The circumferential space of the wedge (1).
                var topBeforeRotation = newTaxonSpecifics[key]["center"][1] - height / 2;
                var bottomBeforeRotation = newTaxonSpecifics[key]["center"][1] + height / 2;
                var leftBeforeRotation = left;
                var rightBeforeRotation = left + width;
                var cx = newTaxonSpecifics[key]["center"][0];
                var cy = newTaxonSpecifics[key]["center"][1];
                var fourPoints = (0, helperFunctions_js_1.getFourCorners)(topBeforeRotation, bottomBeforeRotation, leftBeforeRotation, rightBeforeRotation, cx, cy, angle);
                var leftIntersect = void 0, rightIntersect = void 0;
                if (centerDegree >= 180 && centerDegree < 360) {
                    radialLeft = hoverRadialLeft = newTaxonSpecifics[key]["center"][0];
                    radialAngle = 360 - (270 - radialAngle);
                    // (1)
                    leftIntersect = (0, helperFunctions_js_1.lineIntersect)(this.state.horizontalShift, this.state.verticalShift, newTaxonSpecifics[key]["center"][3], newTaxonSpecifics[key]["center"][4], fourPoints["bottomLeft"][0], fourPoints["bottomLeft"][1], fourPoints["bottomRight"][0], fourPoints["bottomRight"][1]);
                    rightIntersect = (0, helperFunctions_js_1.lineIntersect)(this.state.horizontalShift, this.state.verticalShift, newTaxonSpecifics[key]["center"][5], newTaxonSpecifics[key]["center"][6], fourPoints["bottomLeft"][0], fourPoints["bottomLeft"][1], fourPoints["bottomRight"][0], fourPoints["bottomRight"][1]);
                }
                else if (centerDegree >= 0 && centerDegree <= 180) {
                    radialLeft = newTaxonSpecifics[key]["center"][0] - width;
                    hoverRadialLeft = newTaxonSpecifics[key]["center"][0] - hoverWidth;
                    radialAngle = 270 - radialAngle;
                    // (1)
                    leftIntersect = (0, helperFunctions_js_1.lineIntersect)(this.state.horizontalShift, this.state.verticalShift, newTaxonSpecifics[key]["center"][3], newTaxonSpecifics[key]["center"][4], fourPoints["topLeft"][0], fourPoints["topLeft"][1], fourPoints["topRight"][0], fourPoints["topRight"][1]);
                    rightIntersect = (0, helperFunctions_js_1.lineIntersect)(this.state.horizontalShift, this.state.verticalShift, newTaxonSpecifics[key]["center"][5], newTaxonSpecifics[key]["center"][6], fourPoints["topLeft"][0], fourPoints["topLeft"][1], fourPoints["topRight"][0], fourPoints["topRight"][1]);
                }
                // (1)
                if (leftIntersect === null || rightIntersect === null) {
                    horizontalSpace = 0;
                }
                else {
                    horizontalSpace = (0, helperFunctions_js_1.lineLength)(leftIntersect["x"], leftIntersect["y"], rightIntersect["x"], rightIntersect["y"]);
                }
                // Calculate radial space.
                var layersCopy = JSON.parse(JSON.stringify(newTaxonSpecifics[key]["layers"]));
                var lastViableLayer = layersCopy.sort(function (a, b) { return a - b; })[1];
                var pointOnLastLayerX = lastViableLayer * this.state.layerWidth * (0, helperFunctions_js_1.cos)(newTaxonSpecifics[key]["center"][2]);
                pointOnLastLayerX = (0, helperFunctions_js_1.round)(pointOnLastLayerX) + viewportDimensions["cx"];
                var pointOnLastLayerY = -lastViableLayer * this.state.layerWidth * (0, helperFunctions_js_1.sin)(newTaxonSpecifics[key]["center"][2]);
                pointOnLastLayerY = (0, helperFunctions_js_1.round)(pointOnLastLayerY) + viewportDimensions["cy"];
                var verticalSpace = (0, helperFunctions_js_1.lineLength)(newTaxonSpecifics[key]["center"][0], newTaxonSpecifics[key]["center"][1], pointOnLastLayerX, pointOnLastLayerY);
                // Decide between radial and circumferential.
                if (verticalSpace > horizontalSpace) {
                    left = radialLeft;
                    hoverLeft = hoverRadialLeft;
                    angle = radialAngle;
                    var lengthPerLetter = width / newTaxonSpecifics[key]["label"]["abbreviation"].length;
                    howManyLettersFit = Math.floor(verticalSpace / lengthPerLetter) - 2;
                    abbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, howManyLettersFit);
                }
                else {
                    var lengthPerLetter = width / newTaxonSpecifics[key]["label"]["abbreviation"].length;
                    howManyLettersFit = Math.floor(horizontalSpace / lengthPerLetter) - 2 > 0 ? Math.floor(horizontalSpace / lengthPerLetter) - 2 : 0;
                    abbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, howManyLettersFit);
                }
            }
            // Calculations for root shape in the center.
            else {
                top_1 = this.state.verticalShift + height / 2;
                left = newTaxonSpecifics[key]["center"][0] - width / 2;
                hoverLeft = newTaxonSpecifics[key]["center"][0] - hoverWidth / 2;
                transformOrigin = "";
                var lengthPerLetter = width / newTaxonSpecifics[key]["label"]["abbreviation"].length;
                howManyLettersFit = Math.floor(this.state.layerWidth * 2 / lengthPerLetter) - 2 > 0 ? Math.floor(this.state.layerWidth * 2 / lengthPerLetter) - 2 : 0;
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
            var fourPoints = (0, helperFunctions_js_1.getFourCorners)((top_1 - height) - 2, top_1 + 2, left - 2, left + width + 2, newTaxonSpecifics[key]["center"][0], newTaxonSpecifics[key]["center"][1], angle);
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
            var shape = document.getElementById("".concat(key, "_-_").concat(this.state.taxonSpecifics[key]["firstLayerUnaligned"]));
            if (alreadyRepeated && (newTaxonSpecifics[key]["label"]["direction"] === "verse" || newTaxonSpecifics[key]["label"]["direction"] === "horizontal")) {
                if (!(shape.isPointInFill(bottomLeft) && shape.isPointInFill(topLeft) && shape.isPointInFill(bottomRight) && shape.isPointInFill(topRight))) {
                    newTaxonSpecifics[key]["label"]["display"] = "none";
                }
            }
            else if (alreadyRepeated && newTaxonSpecifics[key]["label"]["direction"] === "radial") {
                if (!((shape.isPointInFill(bottomLeft) && shape.isPointInFill(topLeft)) || (shape.isPointInFill(bottomRight) && shape.isPointInFill(topRight)))) {
                    newTaxonSpecifics[key]["label"]["display"] = "none";
                }
            }
            newTaxonSpecifics[key]["label"]["top"] = top_1;
            newTaxonSpecifics[key]["label"]["transformOrigin"] = transformOrigin;
            newTaxonSpecifics[key]["label"]["left"] = left;
            newTaxonSpecifics[key]["label"]["transform"] = !alreadyRepeated ? "rotate(0)" : "rotate(".concat(angle, " ").concat(transformOrigin, ")");
            if (!alreadyRepeated) {
                newTaxonSpecifics[key]["label"]["hoverLeft"] = hoverLeft;
                newTaxonSpecifics[key]["label"]["hoverDisplay"] = "none";
                newTaxonSpecifics[key]["label"]["hoverWidth"] = hoverWidth;
            }
        }
        if (!alreadyRepeated) {
            this.setState({ taxonSpecifics: newTaxonSpecifics, alreadyRepeated: true, height: height });
        }
        else {
            this.setState({ taxonSpecifics: newTaxonSpecifics, labelsPlaced: true });
        }
    };
    PlotDrawing.prototype.render = function () {
        var _this = this;
        console.log("layerWidth: ", this.state.layerWidth);
        console.log("taxonSpecifics for animation: ", JSON.stringify(this.state.taxonSpecifics));
        currentState = this.state;
        var shapes = [];
        var labels = [];
        var ancestors = [];
        var clipPaths = [];
        var tS = this.state.taxonSpecifics;
        var tSkeys = Object.keys(tS);
        var _loop_6 = function (item) {
            var id = "".concat(item, "_-_").concat(tS[item]["firstLayerUnaligned"]);
            var redirectTo = tS[item]["layers"][0] === 0 ? "".concat(this_1.state.ancestors[this_1.state.ancestors.length - 1], "_-_0") : id;
            shapes.push(React.createElement(TaxonShape, { key: id, id: id, abbr: tS[item]["label"]["abbreviation"], onClick: function () { return _this.handleClick(redirectTo); }, d: tS[item]["svgPath"], strokeWidth: viewportDimensions["dpmm"] * 0.265, fillColor: tS[item]["fill"], labelOpacity: tS[item]["label"]["opacity"], labelDisplay: tS[item]["label"]["display"], fullLabel: tS[item]["label"]["fullLabel"], stroke: tS[item]["stroke"], transformOrigin: tS[item]["label"]["transformOrigin"], root: this_1.state.root }));
            if (tS[item]["married"]) {
                clipPaths.push(React.createElement("path", { d: tS[item]["svgPath"] }));
            }
        };
        var this_1 = this;
        for (var _i = 0, tSkeys_1 = tSkeys; _i < tSkeys_1.length; _i++) {
            var item = tSkeys_1[_i];
            _loop_6(item);
        }
        var _loop_7 = function (item) {
            var id = "".concat(item, "_-_").concat(tS[item]["firstLayerUnaligned"]);
            var redirectTo = tS[item]["layers"][0] === 0 ? "".concat(this_2.state.ancestors[this_2.state.ancestors.length - 1], "_-_0") : id;
            var label = React.createElement(TaxonLabel, { key: "".concat(id, "-label"), id: "".concat(id, "-label"), abbr: tS[item]["label"]["abbreviation"], transform: tS[item]["label"]["transform"], left: tS[item]["label"]["left"], top: tS[item]["label"]["top"], opacity: tS[item]["label"]["opacity"], labelDisplay: tS[item]["label"]["display"], display: tS[item]["label"]["display"], onClick: function () { _this.handleClick(redirectTo); }, fullLabel: tS[item]["label"]["fullLabel"], fontWeight: "normal", root: this_2.state.root });
            labels.push(label);
        };
        var this_2 = this;
        for (var _a = 0, tSkeys_2 = tSkeys; _a < tSkeys_2.length; _a++) {
            var item = tSkeys_2[_a];
            _loop_7(item);
        }
        var _loop_8 = function (item) {
            var id = "".concat(item, "_-_").concat(tS[item]["firstLayerUnaligned"]);
            var redirectTo = tS[item]["layers"][0] === 0 ? "".concat(this_3.state.ancestors[this_3.state.ancestors.length - 1], "_-_0") : id;
            var labelBackground = React.createElement(LabelBackground, { key: "".concat(id, "-labelBackground"), id: "".concat(id, "-labelBackground"), transform: tS[item]["label"]["transform"], left: tS[item]["label"]["hoverLeft"] - 4, top: (tS[item]["label"]["top"] - this_3.state.height) - 4, selfDisplay: "none", labelDisplay: tS[item]["label"]["display"], onClick: function () { _this.handleClick(redirectTo); }, fullLabel: tS[item]["label"]["fullLabel"], height: this_3.state.height + 8, width: tS[item]["label"]["hoverWidth"] + 8, stroke: "#800080", fill: "#ffffff", root: this_3.state.root });
            var hoverLabel = React.createElement(TaxonLabel, { key: "".concat(id, "-hoverLabel"), id: "".concat(id, "-hoverLabel"), abbr: tS[item]["label"]["fullLabel"], transform: tS[item]["label"]["transform"], left: tS[item]["label"]["hoverLeft"], top: tS[item]["label"]["top"], opacity: tS[item]["label"]["opacity"], labelDisplay: tS[item]["label"]["display"], display: tS[item]["label"]["hoverDisplay"], onClick: function () { _this.handleClick(redirectTo); }, fullLabel: tS[item]["label"]["fullLabel"], fontWeight: "bold", root: this_3.state.root });
            labels.push(labelBackground);
            labels.push(hoverLabel);
        };
        var this_3 = this;
        for (var _b = 0, tSkeys_3 = tSkeys; _b < tSkeys_3.length; _b++) {
            var item = tSkeys_3[_b];
            _loop_8(item);
        }
        var anc = JSON.parse(JSON.stringify(this.state.ancestors)).reverse();
        return [React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", style: { "height": "100%", "width": "100%", "margin": "0", "padding": "0", "boxSizing": "border-box", "border": "none" }, id: "shapes" },
                shapes,
                " ",
                labels,
                React.createElement("clipPath", { id: "mask" }, clipPaths)), React.createElement("div", { id: "ancestors" }, ancestors), React.createElement("div", { style: { "display": "flex", "flexDirection": "column", "justifyContent": "start", "position": "fixed", "top": 0, "left": "2vmin", "width": "20%", "padding": 0, "margin": 0 } },
                React.createElement(AncestorSection, { ancestors: anc, root: this.state.root, layer: this.state.layer, onClickArray: anc.map(function (self, index) { return function () { _this.handleClick("".concat(self, "_-_").concat(-index)); }; }) }),
                React.createElement(DescendantSection, { self: "Felinae", layer: 0, ancestor: "Felidae", hovered: true }))];
    };
    return PlotDrawing;
}(React.Component));
/* ===== DRAWING THE PLOT ===== */
reactRoot.render(React.createElement(PlotDrawing, { lineages: lineagesNames, ranks: lineagesRanks }));
/* ===== FUNCTION DEFINITIONS ===== */
function loadDataFromTSV(tsv_path) {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: { "tsv_path": tsv_path },
        success: function (response) {
            lineagesNames = response["lineagesNames"];
            lineagesRanks = response["lineagesRanks"];
            allTaxaReduced = response["allTaxaReduced"];
            var allTaxa = response["allTaxa"];
            rankPatternFull = response["rankPatternFull"];
            reactRoot.render(React.createElement(PlotDrawing, { lineages: lineagesNames, ranks: lineagesRanks }));
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}
function TaxonShape(props) {
    return React.createElement("path", { id: props.id, className: "thing", d: props.d, onMouseOver: function () { return hoverHandler(props.id, props.fullLabel, props.root); }, onMouseOut: function () { return onMouseOutHandler(props.id, props.labelDisplay); }, onClick: props.onClick, style: { "stroke": props.stroke, "strokeWidth": "0.2vmin", "fill": props.fillColor } });
}
function TaxonLabel(props) {
    return React.createElement("text", { className: "thing", x: props.left, y: props.top, transform: props.transform, "transform-origin": props.transformOrigin, id: props.id, onMouseOver: function () { return hoverHandler(props.id, props.fullLabel, props.root); }, onMouseOut: function () { return onMouseOutHandler(props.id, props.labelDisplay); }, onClick: props.onClick, style: { "margin": "0", "padding": "0", "lineHeight": "2vmin", "position": "absolute", "fontFamily": "calibri", "fontSize": "2vmin", "transformOrigin": props.transformOrigin, "fill": "#800080", "opacity": props.opacity, "display": props.display, "fontWeight": props.fontWeight } }, props.abbr);
}
function LabelBackground(props) {
    return React.createElement("rect", { className: "thing", x: props.left, y: props.top, height: props.height, width: props.width, transform: props.transform, "transform-origin": props.transformOrigin, id: props.id, onMouseOver: function () { return hoverHandler(props.id, props.fullLabel, props.root); }, onMouseOut: function () { return onMouseOutHandler(props.id, props.labelDisplay); }, onClick: props.onClick, fill: props.fill, stroke: props.stroke, style: { "position": "fixed", "display": props.selfDisplay, "strokeWidth": "0.2vmin" } });
}
//addEventListener("mousemove", (event) => handleMouseMove(event));
function hoverHandler(id, fullLabel, root) {
    if (id.indexOf("-labelBackground") > -1) {
        var hoverLabel = id.replace("-labelBackground", "-hoverLabel");
        var shape = id.replace("-labelBackground", "");
        var label = id.replace("-labelBackground", "-label");
        var labelBackground = id;
    }
    else if (id.indexOf("-hoverLabel") > -1) {
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
    }
    else {
        var shape = id;
        var label = id + "-label";
        var hoverLabel = id + "-hoverLabel";
        var labelBackground = id + "-labelBackground";
    }
    document.getElementById(shape).style.strokeWidth = "0.4vmin";
    document.getElementById(hoverLabel).style.display = "unset";
    document.getElementById(label).style.display = "none";
    document.getElementById(labelBackground).style.display = "unset";
    document.getElementById("descendant-section").setAttribute('value', "".concat(shape.split("_-_")[0], "*").concat(shape.split("_-_")[1], "*").concat(root));
    var evt = new CustomEvent('change');
    document.getElementById("descendant-section").dispatchEvent(evt);
}
function onMouseOutHandler(id, initialLabelDisplay) {
    if (id.indexOf("-labelBackground") > -1) {
        var hoverLabel = id.replace("-labelBackground", "-hoverLabel");
        var shape = id.replace("-labelBackground", "");
        var label = id.replace("-labelBackground", "-label");
        var labelBackground = id;
    }
    else if (id.indexOf("-hoverLabel") > -1) {
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
    }
    else {
        var shape = id;
        var label = id + "-label";
        var hoverLabel = id + "-hoverLabel";
        var labelBackground = id + "-labelBackground";
    }
    document.getElementById(shape).style.strokeWidth = "0.2vmin";
    document.getElementById(label).style.display = initialLabelDisplay;
    document.getElementById(hoverLabel).style.display = "none";
    document.getElementById(labelBackground).style.display = "none";
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
var aTRKeys = Object.keys(allTaxaReduced);
var descendants = {};
for (var _i = 0, aTRKeys_1 = aTRKeys; _i < aTRKeys_1.length; _i++) {
    var taxName = aTRKeys_1[_i];
    var lineage = allTaxaReduced[taxName]["lineageNames"];
    for (var _b = 0, lineage_1 = lineage; _b < lineage_1.length; _b++) {
        var predecessor = lineage_1[_b];
        if (!descendants[predecessor[1]]) {
            descendants[predecessor[1]] = [taxName];
        }
        else {
            descendants[predecessor[1]].push(taxName);
        }
    }
}
var allTaxa = {};
(_a = document.getElementById("file")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
    var fileInput = document.getElementById("file");
    fileName = fileInput.files[0].name;
    document.getElementById("status").innerHTML = "pending";
    var uploadForm = document.getElementById("uploadForm");
    var form_data = new FormData(uploadForm);
    $.ajax({
        url: '/load_tsv_data',
        data: form_data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (response) {
            lineagesNames = response["lineagesNames"];
            lineagesRanks = response["lineagesRanks"];
            allTaxaReduced = response["allTaxaReduced"];
            rankPatternFull = response["rankPatternFull"];
            allTaxa = response["allTaxa"];
            colorOffset = response["offset"];
            var newData = document.getElementById("new-data");
            newData.checked = true;
            document.getElementById("status").innerHTML = "check";
            var evt = new CustomEvent('change');
            newData.dispatchEvent(evt);
        },
        error: function (response) {
            console.log("ERROR", response);
            document.getElementById("status").innerHTML = "close";
        }
    });
});
function downloadSVGasTextFile() {
    var base64doc = btoa(unescape(encodeURIComponent(document.querySelector('svg').outerHTML)));
    var a = document.createElement('a');
    var e = new MouseEvent('click');
    a.download = "".concat(fileName, "_").concat(taxonName).concat(layerName, "_").concat(modeName, "_").concat(collapseName, ".svg");
    a.href = 'data:text/html;base64,' + base64doc;
    a.dispatchEvent(e);
}
document.getElementById("download").addEventListener("click", function () {
    downloadSVGasTextFile();
});
addEventListener("mousemove", function (e) {
    var target = e.target;
    if (!target.classList.contains('thing')) {
        document.getElementById("descendant-section").setAttribute('value', "");
        var evt = new CustomEvent('change');
        document.getElementById("descendant-section").dispatchEvent(evt);
    }
});
document.getElementById("upload-button").addEventListener("click", function () {
    $('input[type="file"]').click();
});
