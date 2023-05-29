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
var domContainer = document.querySelector('#plot-container');
var reactRoot = ReactDOM.createRoot(domContainer);
var viewportDimensions = getViewportDimensions();
var alreadyVisited = {};
/* ===== FETCHING THE DATA ===== */
var path = "C:/Users/PC/Desktop/krona/lessSpontaneous2.tsv";
loadDataFromTSV(path);
var lineagesNames = [];
var lineagesRanks = [];
var allTaxaReduced = {};
var rankPatternFull = ["root", "superkingdom", "kingdom", "subkingdom", "superphylum", "phylum", "subphylum", "superclass", "class", "subclass", "superorder", "order", "suborder", "superfamily", "family", "subfamily", "supergenus", "genus", "subgenus", "superspecies", "species"];
var colors = [];
var colorOffset = Math.round(Math.random() * 100); //84, 98, 31, 20, 1, 2
for (var i = 0; i < 7; i++) {
    var r = Math.sin(0.3 * colorOffset + 4) * 55 + 200;
    var g = Math.sin(0.3 * colorOffset + 2) * 55 + 200;
    var b = Math.sin(0.3 * colorOffset) * 55 + 200;
    var newColor = "rgb(".concat(round(r, 0), ", ").concat(round(g, 0), ", ").concat(round(b, 0), ")");
    colors.push(newColor);
    colorOffset += 3;
}
/* ===== DEFINING THE REACT COMPONENT ===== */
var PlotDrawing = /** @class */ (function (_super) {
    __extends(PlotDrawing, _super);
    function PlotDrawing(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            root: "Felinae",
            layer: 11,
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
            abbreviateLabels: true
        };
        return _this;
    }
    PlotDrawing.prototype.componentDidMount = function () {
        var _this = this;
        this.cropLineages();
        addEventListener("resize", function (event) {
            var newViewportDimensions = getViewportDimensions();
            viewportDimensions = newViewportDimensions;
            _this.setState({ horizontalShift: newViewportDimensions["cx"], verticalShift: newViewportDimensions["cy"], alteration: _this.state.alteration }, function () { return _this.cropLineages(); });
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
        // !!! Takes 3 sec !!!
        if (abbreviatables.length > 0 && this.state.abbreviateLabels) {
            this.abbreviate(abbreviatables);
        }
        else if (abbreviatables.length === 0 && this.state.count === 0) {
            this.setState({ count: 1 });
        }
    };
    // Leave only relevant lineages and crop them if necessary.
    PlotDrawing.prototype.cropLineages = function (root, layer, alteration, collapse) {
        if (root === void 0) { root = this.state.root; }
        if (layer === void 0) { layer = this.state.layer; }
        if (alteration === void 0) { alteration = this.state.alteration; }
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
        // Get minimal rank pattern for this particular plot to prepare for alignment.
        var ranksUnique = croppedRanks.reduce(function (accumulator, value) { return accumulator.concat(value); }, []);
        ranksUnique = ranksUnique.filter(function (value, index, self) { return Boolean(value) && self.indexOf(value) === index; });
        var rankPattern = rankPatternFull.filter(function (item) { return ranksUnique.indexOf(item) > -1; });
        // Mary taxa if necessary.
        var changedLineages = [];
        if (alteration.startsWith("marriedTaxa")) {
            var cropped = this.marryTaxa(croppedLineages, croppedRanks, alteration, root);
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
        var currPlotId = root + layer + collapse + alteration + round(layerWidth);
        if (Object.keys(alreadyVisited).indexOf(currPlotId) > -1) {
            this.setState(alreadyVisited[currPlotId]);
        }
        else if (croppedLineages.length > 1) {
            this.assignDegrees({ "root": root, "layer": layer, "rankPattern": rankPattern, "taxonSpecifics": taxonSpecifics, "croppedLineages": croppedLineages, "alignedCroppedLineages": alignedCropppedLineages, "ancestors": ancestors, "alteration": alteration, "collapse": collapse, "totalUnassignedCount": totalUnassignedCount, count: 0, "abbreviateLabels": true });
        }
    };
    PlotDrawing.prototype.marryTaxa = function (croppedLineages, croppedRanks, alteration, root) {
        if (alteration === void 0) { alteration = "marriedTaxaI"; }
        var totalUnassignedCounts = 0;
        for (var _i = 0, croppedLineages_1 = croppedLineages; _i < croppedLineages_1.length; _i++) {
            var lineage = croppedLineages_1[_i];
            totalUnassignedCounts += allTaxaReduced[lineage[lineage.length - 1]]["unassignedCount"];
        }
        var reducibleLineages = [];
        var threshold = 0.01;
        // Find all lineages that make up <1% of the whole, crop them so that they end in the most specific taxon >=1%, put them in an array called reducibleLineages. 
        for (var _a = 0, croppedLineages_2 = croppedLineages; _a < croppedLineages_2.length; _a++) {
            var lineage = croppedLineages_2[_a];
            if (allTaxaReduced[lineage[lineage.length - 1]]["totalCount"] / totalUnassignedCounts < threshold) {
                var lineageNumber = croppedLineages.indexOf(lineage);
                var lastWayTooThinLayer = lineage.length - 1;
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
            console.log("totalUnassignedCounts: ", totalUnassignedCounts);
            console.log("allTaxaReduced['root']['totalCount']: ", allTaxaReduced['root']['totalCount']);
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
            var firstLayerRadius = round(firstLayer(key) * layerWidth);
            if (taxonSpecifics[key]["layers"][0] === 0) { // If the shape to be drawn is the center of the plot (1 circle).
                taxonSpecifics[key]["svgPath"] = "M ".concat(this.state.horizontalShift, ", ").concat(this.state.verticalShift, " m -").concat(layerWidth, ", 0 a ").concat(layerWidth, ",").concat(layerWidth, " 0 1,0 ").concat((layerWidth) * 2, ",0 a ").concat(layerWidth, ",").concat(layerWidth, " 0 1,0 -").concat((layerWidth) * 2, ",0");
            }
            else { // If the shape to be drawn is NOT the center of the plot, but a complex shape, add:
                var subpaths = [];
                if (round(endDeg(key) - startDeg(key)) === 360) { // If the shape to be drawn completes a full circle:
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
            var centerX = centerRadius * layerWidthInPx * cos(centerDegree);
            centerX = round(centerX) + cx;
            var centerY = -centerRadius * layerWidthInPx * sin(centerDegree);
            centerY = round(centerY) + cy;
            var center = [centerX, centerY, centerDegree];
            taxonSpecifics[key]["center"] = center;
            var alternativeCenterRadius = taxonSpecifics[key]["firstLayerAligned"] + 0.333;
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
                    "fullLabel": key + " ".concat(percentage, "% ").concat(taxonSpecifics[key]["totalCount"]),
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
        var plotId = this.state.root + this.state.layer + this.state.collapse + this.state.alteration + round(this.state.layerWidth);
        if (Object.keys(alreadyVisited).indexOf(plotId) === -1) {
            alreadyVisited[plotId] = JSON.parse(JSON.stringify(this.state));
            alreadyVisited[plotId]["abbreviateLabels"] = false;
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
                var alternativeMidLeft = document.querySelector("svg").createSVGPoint();
                alternativeMidLeft.x = alternativeFourPoints["topLeft"][0] / 2 + alternativeFourPoints["bottomLeft"][0] / 2;
                alternativeMidLeft.y = alternativeFourPoints["topLeft"][1] / 2 + alternativeFourPoints["bottomLeft"][1] / 2;
                if (!(shape.isPointInFill(bottomLeft) && shape.isPointInFill(bottomRight) && shape.isPointInFill(topLeft) && shape.isPointInFill(topRight)) && !(taxonSpecifics[key]["label"]["abbreviation"] === "") && !(shape.isPointInFill(alternativeBottomLeft) && shape.isPointInFill(alternativeBottomRight) && shape.isPointInFill(alternativeTopLeft) && shape.isPointInFill(alternativeTopRight) && shape.isPointInFill(alternativeMidLeft))) {
                    tooWide.push(key);
                }
                else {
                    if (shape.isPointInFill(alternativeBottomLeft) && shape.isPointInFill(alternativeBottomRight) && shape.isPointInFill(alternativeTopLeft) && shape.isPointInFill(alternativeTopRight) && shape.isPointInFill(alternativeMidLeft)) {
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
            var newAbbreviationPlusOne = void 0;
            if (newTaxonSpecifics[key]["label"]["abbreviation"].length > 25) {
                newAbbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, 24) + ".";
            }
            else {
                newAbbreviation = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, newTaxonSpecifics[key]["label"]["abbreviation"].length / 2) + ".";
                newAbbreviationPlusOne = newTaxonSpecifics[key]["label"]["abbreviation"].slice(0, newTaxonSpecifics[key]["label"]["abbreviation"].length / 2 + 1) + ".";
            }
            var dotIndex = newAbbreviation.indexOf(".");
            if (newTaxonSpecifics[key]["label"]["fullLabel"][dotIndex] === " ") {
                newAbbreviation = newAbbreviation.slice(0, newAbbreviation.length - 1);
            }
            if (newTaxonSpecifics[key]["label"]["fullLabel"][dotIndex - 1] === " ") {
                newAbbreviation = newAbbreviation.slice(0, newAbbreviation.length - 2);
            }
            newAbbreviation = newAbbreviation.length < 4 ? "" : newAbbreviation;
            if (newAbbreviation.length === 0) {
                newTaxonSpecifics[key]["label"]["display"] = "none";
                newTaxonSpecifics[key]["label"]["direction"] = "circumferential";
            }
            newTaxonSpecifics[key]["label"]["abbreviation"] = newAbbreviation;
            //newTaxonSpecifics[key]["label"]["abbreviationPlusOne"] = newAbbreviationPlusOne;
        }
        this.setState({ taxonSpecifics: newTaxonSpecifics });
    };
    PlotDrawing.prototype.render = function () {
        var _this = this;
        //console.log("layerWidth: ", this.state.layerWidth);
        console.log("taxonSpecifics for animation: ", this.state.taxonSpecifics);
        currentState = this.state;
        var shapes = [];
        var labels = [];
        var clipPaths = [];
        var tS = this.state.taxonSpecifics;
        var tSkeys = Object.keys(tS);
        var _loop_6 = function (item) {
            var id = "".concat(item, "_-_").concat(tS[item]["firstLayerUnaligned"]);
            var redirectTo = tS[item]["layers"][0] === 0 ? "".concat(this_1.state.ancestors[this_1.state.ancestors.length - 1], "_-_0") : id;
            shapes.push(React.createElement(TaxonShape, { key: id, id: id, abbr: tS[item]["label"]["abbreviation"], onClick: function () { return _this.handleClick(redirectTo); }, d: tS[item]["svgPath"], strokeWidth: viewportDimensions["dpmm"] * 0.265, fillColor: tS[item]["fill"], labelOpacity: tS[item]["label"]["opacity"], display: tS[item]["label"]["display"], fullLabel: tS[item]["label"]["fullLabel"], stroke: tS[item]["stroke"] }));
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
            var label = React.createElement(TaxonLabel, { key: "".concat(id, "-label"), id: id, abbr: tS[item]["label"]["abbreviation"], transform: tS[item]["label"]["transform"], left: tS[item]["label"]["left"], right: tS[item]["label"]["right"], top: tS[item]["label"]["top"], transformOrigin: tS[item]["label"]["transformOrigin"], opacity: tS[item]["label"]["opacity"], display: tS[item]["label"]["display"], onClick: function () { _this.handleClick(redirectTo); }, fullLabel: tS[item]["label"]["fullLabel"] });
            labels.push(label);
        };
        var this_2 = this;
        for (var _a = 0, tSkeys_2 = tSkeys; _a < tSkeys_2.length; _a++) {
            var item = tSkeys_2[_a];
            _loop_7(item);
        }
        var _loop_8 = function (i) {
            ancestor = this_3.state.ancestors[i];
            actualI = i - this_3.state.ancestors.length;
            labels.push(React.createElement(AncestorLabel, { key: "".concat(ancestor, "_-_").concat(actualI + 1), id: "".concat(ancestor, "_-_").concat(actualI + 1), taxon: ancestor, top: "".concat(10 + 2.5 * (this_3.state.ancestors.length - i), "vmin"), onClick: function () { _this.handleClick("".concat(_this.state.ancestors[i], "_-_").concat((i - _this.state.ancestors.length) + 1)); } }));
        };
        var this_3 = this, ancestor, actualI;
        for (var i = this.state.ancestors.length - 1; i >= 0; i--) {
            _loop_8(i);
        }
        return [React.createElement("svg", { style: { "height": "100%", "width": "100%", "margin": "0", "padding": "0", "boxSizing": "border-box", "border": "none" }, id: "shapes" },
                shapes,
                " ",
                React.createElement("clipPath", { id: "mask" }, clipPaths)), React.createElement("div", { id: "labels" }, labels)];
    };
    return PlotDrawing;
}(React.Component));
/* ===== DRAWING THE PLOT ===== */
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
            console.log("allTaxa: ", allTaxa);
            console.log("allTaxaReduced: ", allTaxaReduced);
            reactRoot.render(React.createElement(PlotDrawing, { lineages: lineagesNames, ranks: lineagesRanks }));
            /*
            let keys = Object.keys(allTaxaFlask);
            for (let i=0; i<keys.length; i++) {
                if (JSON.stringify(allTaxaFlask[keys[i]]) !== JSON.stringify(temp[keys[i]])) {
                    console.log("Different values: ", allTaxaFlask[keys[i]], "a", temp[keys[i]])
                }
            }
            */
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}
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
function TaxonShape(props) {
    return React.createElement("path", { id: props.id, d: props.d, onMouseOver: function () { return hoverHandler(props.id, props.fullLabel); }, onMouseOut: function () { return onMouseOutHandler(props.id, props.labelOpacity, props.abbr, props.display); }, onClick: props.onClick, style: { "stroke": props.stroke, "strokeWidth": "0.2vmin", "fill": props.fillColor } });
}
function TaxonLabel(props) {
    return React.createElement("p", { id: "".concat(props.id, "-label"), onMouseOver: function () { return hoverHandler(props.id, props.fullLabel); }, onMouseOut: function () { return onMouseOutHandler(props.id, props.opacity, props.abbr, props.display); }, onClick: props.onClick, style: { "margin": "0", "padding": "0", "lineHeight": "2vmin", "position": "absolute", "fontFamily": "calibri", "fontSize": "2vmin", "left": props.left, "right": props.right, "top": props.top, "transformOrigin": props.transformOrigin, "transform": props.transform, "color": "#800080", "opacity": props.opacity, "display": props.display } }, props.abbr);
}
function AncestorLabel(props) {
    return React.createElement("p", { id: props.id, className: "ancestor", style: { "margin": "0", "position": "fixed", "fontFamily": "calibri", "fontSize": "2vmin", "top": props.top, "left": "2vmin", "color": skeletonColor, "fontWeight": "bold" }, onClick: props.onClick }, props.taxon);
}
//addEventListener("mousemove", (event) => handleMouseMove(event));
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
function getFourCorners(top, bottom, left, right, cx, cy, angle) {
    if (!angle && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        angle = 0;
    }
    var topLeft = [((left - cx) * Math.cos(angle * (Math.PI / 180)) - (top - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((left - cx) * Math.sin(angle * (Math.PI / 180)) + (top - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var topRight = [((right - cx) * Math.cos(angle * (Math.PI / 180)) - (top - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((right - cx) * Math.sin(angle * (Math.PI / 180)) + (top - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var bottomLeft = [((left - cx) * Math.cos(angle * (Math.PI / 180)) - (bottom - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((left - cx) * Math.sin(angle * (Math.PI / 180)) + (bottom - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var bottomRight = [((right - cx) * Math.cos(angle * (Math.PI / 180)) - (bottom - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((right - cx) * Math.sin(angle * (Math.PI / 180)) + (bottom - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    return { topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight };
}
var aTRKeys = Object.keys(allTaxaReduced);
var descendants = {};
for (var _i = 0, aTRKeys_1 = aTRKeys; _i < aTRKeys_1.length; _i++) {
    var taxName = aTRKeys_1[_i];
    var lineage = allTaxaReduced[taxName]["lineageNames"];
    for (var _a = 0, lineage_1 = lineage; _a < lineage_1.length; _a++) {
        var predecessor = lineage_1[_a];
        if (!descendants[predecessor[1]]) {
            descendants[predecessor[1]] = [taxName];
        }
        else {
            descendants[predecessor[1]].push(taxName);
        }
    }
}
