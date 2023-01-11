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
var path = "C:/Users/PC/Desktop/krona/krona.tsv";
var allTaxa;
var taxonList = [];
var lineagesNamesOnlyArray = [];
var domContainer = document.querySelector('#plot-container');
var reactRoot = ReactDOM.createRoot(domContainer);
var domContainer2 = document.querySelector('#labels');
var reactRoot2 = ReactDOM.createRoot(domContainer2);
var viewportDimensions = getViewportDimensions();
loadDataFromTSV(path);
$(document).ajaxStop(function () {
    var taxName;
    for (var _i = 0, _a = Object.keys(allTaxa); _i < _a.length; _i++) {
        taxName = _a[_i];
        var newTaxon = new Taxon(taxName);
        taxonList.push(newTaxon);
        lineagesNamesOnlyArray.push(newTaxon.lineage.map(function (item) { return item[1]; }));
    }
    lineagesNamesOnlyArray.sort();
    console.log("taxNames: ", lineagesNamesOnlyArray);
    // var fullPlot:Plot = new Plot();
    // var mycosphaerellalesPlot:Plot = new Plot("Bacteria", 0, true, viewportDimensions);
    // var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, true, viewportDimensions);
    // var mycosphaerellalesPlot:Plot = new Plot("Mycosphaerellales", 8, false, viewportDimensions);
    var mycosphaerellalesPlot = new Plot("Eurotiomycetes", 6, false);
    addEventListener("resize", function (event) {
        console.log("resize event");
        viewportDimensions = getViewportDimensions();
        mycosphaerellalesPlot.updateviewportDimensions(viewportDimensions);
        mycosphaerellalesPlot.calculateSVGPaths();
        mycosphaerellalesPlot.getTaxonLabelSpecifics();
        mycosphaerellalesPlot.getTaxonShapeSpecifics();
        mycosphaerellalesPlot.draw();
    });
});
function loadDataFromTSV(tsv_path) {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: { "tsv_path": tsv_path },
        success: function (response) {
            allTaxa = response["taxDict"];
            console.log("SUCCESS: ", allTaxa);
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}
// 1 extra Talaromyces sect. Talaromyces
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
var Plot = /** @class */ (function () {
    function Plot(root, layer, collapse) {
        if (root === void 0) { root = ""; }
        if (layer === void 0) { layer = -1; }
        if (collapse === void 0) { collapse = true; }
        this.structure = {};
        this.svgPaths = {};
        this.structureByTaxon = {};
        this.taxonLabelSpecifics = {};
        this.taxonShapeSpecifics = {};
        this.root = root;
        this.layer = layer;
        this.viewportDimensions = viewportDimensions;
        this.getOnlyNecessaryLineages();
        if (collapse) {
            this.collapse();
        }
        this.assignDegrees();
        this.calculateSVGPaths();
        this.getTaxonLabelSpecifics();
        this.getTaxonShapeSpecifics();
        this.draw();
    }
    Plot.prototype.getOnlyNecessaryLineages = function () {
        var _this = this;
        if (this.root === "" && this.layer === -1) {
            this.lineages = lineagesNamesOnlyArray;
            this.lineages = JSON.parse(JSON.stringify(this.lineages));
            this.lineages.map(function (item) { return item.indexOf("root") > -1 ? item : item.unshift("root"); });
        }
        else {
            this.lineages = lineagesNamesOnlyArray.filter(function (item) { return item[_this.layer] === _this.root; });
            this.lineages = this.lineages.map(function (item) { return item.slice(_this.layer); });
        }
    };
    Plot.prototype.assignDegrees = function () {
        var lineageCounts = this.lineages.map(function (item) { return allTaxa[item[item.length - 1]]["unassignedCount"]; });
        var lineageCountsSum = lineageCounts.reduce(function (accumulator, current) { return accumulator + current; }, 0);
        var sectionStart = 0;
        var sectionEnd;
        var key;
        for (var i = 0; i < this.lineages.length; i++) {
            sectionEnd = sectionStart + lineageCounts[i] * 360 / lineageCountsSum;
            key = "".concat(sectionStart, "-").concat(sectionEnd, " deg");
            this.structure[key] = this.lineages[i];
            sectionStart = sectionEnd;
        }
    };
    Plot.prototype.collapse = function () {
        var lineagesCopy = JSON.parse(JSON.stringify(this.lineages));
        var layers = this.getLayers(lineagesCopy);
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
        this.lineages = lineagesCopy;
    };
    Plot.prototype.calculateSVGPaths = function () {
        var _this = this;
        var cx = this.viewportDimensions["cx"];
        var cy = this.viewportDimensions["cy"];
        var dpmm = this.viewportDimensions["dpmm"];
        var structureByTaxon = {};
        var lineagesCopy = JSON.parse(JSON.stringify(this.lineages));
        var layers = this.getLayers(lineagesCopy);
        var layersUnique = this.getLayers(lineagesCopy, true);
        var numberOfLayers = Object.keys(layers).length;
        var smallerDimension = Math.min(cx, cy);
        var layerWidthInPx = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 5);
        for (var i = 1; i < Object.keys(layersUnique).length; i++) {
            for (var j = 0; j < layersUnique[i].length; j++) {
                var key = layersUnique[i][j];
                var firstOccurrenceInLayer = layers[i].indexOf(key);
                var lastOccurrenceInLayer = layers[i].lastIndexOf(key);
                var structureSectionsArray = Object.keys(this.structure);
                var startDegrees = Number(structureSectionsArray[firstOccurrenceInLayer].slice(0, structureSectionsArray[firstOccurrenceInLayer].length - 4).split("-")[0]);
                var potentialMidDegrees = Number(structureSectionsArray[firstOccurrenceInLayer].slice(0, structureSectionsArray[firstOccurrenceInLayer].length - 4).split("-")[1]);
                var endDegrees = Number(structureSectionsArray[lastOccurrenceInLayer].slice(0, structureSectionsArray[lastOccurrenceInLayer].length - 4).split("-")[1]);
                var verticalMin = i;
                var verticalMax;
                if (i != Object.keys(layersUnique).length - 1) {
                    if (!Boolean(layers[i + 1][firstOccurrenceInLayer])) {
                        verticalMax = Object.keys(layers).length;
                    }
                    else {
                        verticalMax = i + 1;
                    }
                }
                else {
                    verticalMax = i + 1;
                }
                var breakingPoint = verticalMax === verticalMin + 1 || potentialMidDegrees === endDegrees ? null : potentialMidDegrees;
                key += "_-_".concat(i);
                structureByTaxon[key] = {
                    "horizontalWidthInDeg": [startDegrees, endDegrees],
                    "verticalWidthInLayerIndices": [verticalMin, verticalMax],
                    "breakingPoint": breakingPoint
                };
            }
        }
        this.structureByTaxon = structureByTaxon;
        var firstLayer = function (key) { return _this.structureByTaxon[key].verticalWidthInLayerIndices[0]; };
        var lastLayer = function (key) { return _this.structureByTaxon[key].verticalWidthInLayerIndices[1]; };
        var startDeg = function (key) { return _this.structureByTaxon[key].horizontalWidthInDeg[0]; };
        var endDeg = function (key) { return _this.structureByTaxon[key].horizontalWidthInDeg[1]; };
        var breakingPt = function (key) { return _this.structureByTaxon[key].breakingPoint; };
        for (var _i = 0, _a = Object.keys(this.structureByTaxon); _i < _a.length; _i++) {
            var key = _a[_i];
            var innerArcX1 = firstLayer(key) * layerWidthInPx * cos(startDeg(key));
            innerArcX1 = round(innerArcX1) + cx;
            var innerArcY1 = -firstLayer(key) * layerWidthInPx * sin(startDeg(key));
            innerArcY1 = round(innerArcY1) + cy;
            var innerArcX2 = firstLayer(key) * layerWidthInPx * cos(endDeg(key));
            innerArcX2 = round(innerArcX2) + cx;
            var innerArcY2 = -firstLayer(key) * layerWidthInPx * sin(endDeg(key));
            innerArcY2 = round(innerArcY2) + cy;
            var innerArc = "M ".concat(innerArcX1, ",").concat(innerArcY1, " A ").concat(round(firstLayer(key) * layerWidthInPx), ",").concat(round(firstLayer(key) * layerWidthInPx), " 0 0 1 ").concat(innerArcX2, ",").concat(innerArcY2);
            if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                var innerArc = "M ".concat(innerArcX1, ",").concat(innerArcY1, " A ").concat(round(firstLayer(key) * layerWidthInPx), ",").concat(round(firstLayer(key) * layerWidthInPx), " 0 1 1 ").concat(innerArcX2, ",").concat(innerArcY2);
            }
            ;
            var allMs = [innerArc];
            if (Boolean(breakingPt(key))) {
                var outerArcX1 = lastLayer(key) * layerWidthInPx * cos(startDeg(key));
                outerArcX1 = round(outerArcX1) + cx;
                var outerArcY1 = -lastLayer(key) * layerWidthInPx * sin(startDeg(key));
                outerArcY1 = round(outerArcY1) + cy;
                var outerArcX2 = lastLayer(key) * layerWidthInPx * cos(breakingPt(key));
                outerArcX2 = round(outerArcX2) + cx;
                var outerArcY2 = -lastLayer(key) * layerWidthInPx * sin(breakingPt(key));
                outerArcY2 = round(outerArcY2) + cy;
                var outerArc = "L ".concat(outerArcX2, ",").concat(outerArcY2, " A ").concat(round(lastLayer(key) * layerWidthInPx), ",").concat(round(lastLayer(key) * layerWidthInPx), " 0 0 0 ").concat(outerArcX1, ",").concat(outerArcY1);
                var midArcX1 = (firstLayer(key) + 1) * layerWidthInPx * cos(breakingPt(key));
                midArcX1 = round(midArcX1) + cx;
                var midArcY1 = -(firstLayer(key) + 1) * layerWidthInPx * sin(breakingPt(key));
                midArcY1 = round(midArcY1) + cy;
                var midArcX2 = (firstLayer(key) + 1) * layerWidthInPx * cos(endDeg(key));
                midArcX2 = round(midArcX2) + cx;
                var midArcY2 = -(firstLayer(key) + 1) * layerWidthInPx * sin(endDeg(key));
                midArcY2 = (Math.round(midArcY2 * 1000) / 1000) + cy;
                var midArc = "L ".concat(midArcX2, ",").concat(midArcY2, " A ").concat(round((firstLayer(key) + 1) * layerWidthInPx), ",").concat(round((firstLayer(key) + 1) * layerWidthInPx), " 0 0 0 ").concat(midArcX1, ",").concat(midArcY1);
                if (Math.abs(breakingPt(key) - startDeg(key)) >= 180) {
                    var midArc = "L ".concat(midArcX2, ",").concat(midArcY2, " A ").concat(round((firstLayer(key) + 1) * layerWidthInPx), ",").concat(round((firstLayer(key) + 1) * layerWidthInPx), " 0 1 0 ").concat(midArcX1, ",").concat(midArcY1);
                }
                ;
                var lineInnerToMid = "L ".concat(innerArcX2, ",").concat(innerArcY2, " ").concat(midArcX2, ",").concat(midArcY2);
                var lineOuterToMid = "L ".concat(midArcX1, ",").concat(midArcY1, " ").concat(outerArcX2, ",").concat(outerArcY2);
                allMs.push(lineInnerToMid);
                allMs.push(midArc);
                allMs.push(lineOuterToMid);
                allMs.push(outerArc);
            }
            else {
                var outerArcX1 = lastLayer(key) * layerWidthInPx * cos(startDeg(key));
                outerArcX1 = (Math.round(outerArcX1 * 1000) / 1000) + cx;
                var outerArcY1 = -lastLayer(key) * layerWidthInPx * sin(startDeg(key));
                outerArcY1 = (Math.round(outerArcY1 * 1000) / 1000) + cy;
                var outerArcX2 = lastLayer(key) * layerWidthInPx * cos(endDeg(key));
                outerArcX2 = (Math.round(outerArcX2 * 1000) / 1000) + cx;
                var outerArcY2 = -lastLayer(key) * layerWidthInPx * sin(endDeg(key));
                outerArcY2 = (Math.round(outerArcY2 * 1000) / 1000) + cy;
                var outerArc = "L ".concat(outerArcX2, ",").concat(outerArcY2, " A ").concat(round(lastLayer(key) * layerWidthInPx), ",").concat(round(lastLayer(key) * layerWidthInPx), " 0 0 0 ").concat(outerArcX1, ",").concat(outerArcY1);
                if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                    var outerArc = "L ".concat(outerArcX2, ",").concat(outerArcY2, " A ").concat(round(lastLayer(key) * layerWidthInPx), ",").concat(round(lastLayer(key) * layerWidthInPx), " 0 1 0 ").concat(outerArcX1, ",").concat(outerArcY1);
                }
                ;
                var lineInnerToOuter = "L ".concat(innerArcX2, ",").concat(innerArcY2, " ").concat(outerArcX2, ",").concat(outerArcY2);
                allMs.push(lineInnerToOuter);
                allMs.push(outerArc);
            }
            var lineInnertoOuter = "L ".concat(outerArcX1, ",").concat(outerArcY1, " ").concat(innerArcX1, ",").concat(innerArcY1);
            allMs.push(lineInnertoOuter);
            var d = allMs.join(" ");
            this.svgPaths[key] = d;
        }
        ;
    };
    Plot.prototype.getTaxonLabelSpecifics = function () {
        var _this = this;
        var shapeCenters = {};
        var cx = this.viewportDimensions["cx"];
        var cy = this.viewportDimensions["cy"];
        var lineagesCopy = JSON.parse(JSON.stringify(this.lineages));
        var layers = this.getLayers(lineagesCopy);
        var layerWidthInPx = Math.max((Math.min(cx, cy) - this.viewportDimensions["dpmm"] * 10) / Object.keys(layers).length, this.viewportDimensions["dpmm"] * 4);
        var firstLayer = function (key) { return _this.structureByTaxon[key].verticalWidthInLayerIndices[0]; };
        var lastLayer = function (key) { return _this.structureByTaxon[key].verticalWidthInLayerIndices[1]; };
        var startDeg = function (key) { return _this.structureByTaxon[key].horizontalWidthInDeg[0]; };
        var endDeg = function (key) { return _this.structureByTaxon[key].horizontalWidthInDeg[1]; };
        var breakingPt = function (key) { return _this.structureByTaxon[key].breakingPoint; };
        for (var _i = 0, _a = Object.keys(this.structureByTaxon); _i < _a.length; _i++) {
            var key = _a[_i];
            var centerDegree = void 0, centerRadius = void 0;
            if (breakingPt(key) === null) {
                centerDegree = startDeg(key) + (endDeg(key) - startDeg(key)) / 2;
                centerRadius = firstLayer(key) + (lastLayer(key) - firstLayer(key)) / 2;
            }
            else {
                centerDegree = startDeg(key) + (endDeg(key) - startDeg(key)) / 2;
                centerRadius = firstLayer(key) + 0.5;
            }
            var centerX = centerRadius * layerWidthInPx * cos(centerDegree);
            centerX = round(centerX) + cx;
            var centerY = -centerRadius * layerWidthInPx * sin(centerDegree);
            centerY = round(centerY) + cy;
            var center = [centerX, centerY, centerDegree];
            shapeCenters[key] = center;
        }
        ;
        for (var _b = 0, _c = Object.keys(this.structureByTaxon); _b < _c.length; _b++) {
            var key = _c[_b];
            var direction = breakingPt(key) === null && lastLayer(key) === Object.keys(layers).length ? "radial" : "circumferential";
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
                twist = 270 - shapeCenters[key][2] < 0 ? shapeCenters[key][2] : shapeCenters[key][2] + 180;
                left = shapeCenters[key][0];
                right = "unset";
                top_1 = shapeCenters[key][1] - 9;
                transform = "translate(-50%, 0) rotate(".concat(twist, "deg)");
                transformOrigin = "center center";
            }
            this.taxonLabelSpecifics[key] = {
                "direction": direction,
                "left": left,
                "right": right,
                "top": top_1,
                "transform": transform,
                "transformOrigin": transformOrigin
            };
        }
        ;
    };
    Plot.prototype.getTaxonShapeSpecifics = function () {
        var colors = ["d27979", "c0d279", "79d29c", "799cd2", "c079d2"];
        colors = colors.map(hexToRGB);
        var lineagesCopy = JSON.parse(JSON.stringify(this.lineages));
        var layers = this.getLayers(lineagesCopy);
        var layersUnique = this.getLayers(lineagesCopy, true);
        var colorCalculationParameters = {};
        for (var i = 0; i < layersUnique[1].length; i++) {
            var firstAncestor = layersUnique[1][i];
            if (firstAncestor) {
                this.taxonShapeSpecifics["".concat(firstAncestor, "_-_1")] = colors[i % colors.length];
            }
        }
        for (var i = 2; i < layers.length; i++) {
            for (var j = 0; j < layers[i].length; j++) {
                if (layers[i][j]) {
                    var firstAncestor = layers[1][j];
                    var ancestorColor = this.taxonShapeSpecifics["".concat(firstAncestor, "_-_1")];
                    var nextColorIndex = (colors.indexOf(ancestorColor) + 1) % colors.length;
                    var nextColor = colors[nextColorIndex];
                    var selfStartingDegree = this.structureByTaxon["".concat(layers[i][j], "_-_").concat(i)].horizontalWidthInDeg[0];
                    var ancestorDegrees = this.structureByTaxon["".concat(layers[1][j], "_-_").concat(1)].horizontalWidthInDeg;
                    var coef = (selfStartingDegree - ancestorDegrees[0]) / (ancestorDegrees[1] - ancestorDegrees[0]);
                    var tintFactor = (i - 1) / 10;
                    colorCalculationParameters[layers[i][j]] = [ancestorColor, nextColor, coef, tintFactor];
                    var hue = midColor(ancestorColor, nextColor, coef);
                    var tintifiedHue = tintify(hue, tintFactor);
                    this.taxonShapeSpecifics["".concat(layers[i][j], "_-_").concat(i)] = tintifiedHue;
                }
            }
        }
    };
    Plot.prototype.draw = function () {
        // remove GoL;
        var taxonShapes = [];
        var taxonLabels = [];
        var item;
        for (var _i = 0, _a = Object.keys(this.svgPaths); _i < _a.length; _i++) {
            item = _a[_i];
            taxonShapes.push(React.createElement(TaxonShape, { id: item, d: this.svgPaths[item], strokeWidth: this.viewportDimensions["dpmm"] * 0.265, fillColor: this.taxonShapeSpecifics[item] }));
        }
        reactRoot.render(taxonShapes);
        for (var _b = 0, _c = Object.keys(this.taxonLabelSpecifics); _b < _c.length; _b++) {
            item = _c[_b];
            taxonLabels.push(React.createElement(TaxonLabel, { taxon: item, transform: this.taxonLabelSpecifics[item]["transform"], left: this.taxonLabelSpecifics[item]["left"], right: this.taxonLabelSpecifics[item]["right"], top: this.taxonLabelSpecifics[item]["top"], transformOrigin: this.taxonLabelSpecifics[item]["transformOrigin"] }));
        }
        reactRoot2.render(taxonLabels);
    };
    Plot.prototype.getLayers = function (lineagesCopy, unique) {
        if (unique === void 0) { unique = false; }
        var longestLineageLength = Math.max.apply(Math, lineagesCopy.map(function (item) { return item.length; }));
        var layers = [];
        for (var i = 0; i < longestLineageLength; i++) {
            var layer = [];
            for (var j = 0; j < lineagesCopy.length; j++) {
                layer.push(this.lineages[j][i]);
            }
            if (unique) {
                layer = layer.filter(function (value, index, self) { return Boolean(value) && self.indexOf(value) === index; });
            }
            layers.push(layer);
        }
        return layers;
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
    return React.createElement("path", { id: props.id, d: props.d, onMouseOver: function () { return hoverHandler(props.id); }, onMouseOut: function () { return onMouseOutHandler(props.id); }, style: { "stroke": "#800080", "strokeWidth": "0.2vmin", "fill": props.fillColor } });
}
function TaxonLabel(props) {
    return React.createElement("p", { id: "".concat(props.taxon, "-label"), onMouseOver: function () { return hoverHandler(props.taxon); }, onMouseOut: function () { return onMouseOutHandler(props.taxon); }, style: { "backgroundColor": "white", "margin": "0", "position": "absolute", "fontFamily": "calibri", "fontSize": "2vmin", "left": props.left, "right": props.right, "top": props.top, "transformOrigin": props.transformOrigin, "transform": props.transform, "border": "0.2vmin solid #800080" } }, props.taxon.replace(/_-_\d+/, ""));
}
var PlotDrawing = /** @class */ (function (_super) {
    __extends(PlotDrawing, _super);
    function PlotDrawing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlotDrawing.prototype.render = function () {
        var htmlElements = [];
        var item;
        for (var _i = 0, _a = Object.keys(this.props.svgPaths); _i < _a.length; _i++) {
            item = _a[_i];
            htmlElements.push(React.createElement(TaxonShape, { d: this.props.svgPaths[item] }));
        }
        return htmlElements;
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
    console.log("id: ", id);
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
    console.log("id: ", id);
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
