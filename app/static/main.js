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
    // var mycosphaerellalesPlot:Plot = new Plot("Eurotiomycetes", 6, false);
    var mycosphaerellalesPlot = new Plot("Leotiomycetes", 6, false);
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
        this.structureByTaxon = {};
        this.svgPaths = {};
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
        // var colors:string[] = ["6CCFF6", "1B998B", "A1E887", "EA638C", "B33C86"];
        // var colors:string[] = ["1B998B", "A1E887", "1E96FC", "B33C86","003F91", ];
        var colors = ["1B998B", "A1E887", "1E96FC", "F21B3F", "B33C86", "003F91",];
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
        reactRoot.render(React.createElement(PlotDrawing, { lineages: lineagesNamesOnlyArray }));
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
            root: "",
            layer: -1,
            collapse: false,
            horizontalShift: viewportDimensions["cx"],
            verticalShift: viewportDimensions["cy"],
            croppedLineages: [],
            structureByDegrees: {},
            structureByTaxon: {},
            svgPaths: {},
            taxonLabels: {},
            taxonShapes: {},
            colors: ["d27979", "c0d279", "79d29c", "799cd2", "c079d2"]
        };
        return _this;
    }
    PlotDrawing.prototype.componentDidMount = function () {
        this.cropLineages();
    };
    // Leave only relevant lineages and crop them if necessary.
    PlotDrawing.prototype.cropLineages = function () {
        var _this = this;
        var croppedLineages;
        if (this.state.root === "" && this.state.layer === -1) { // if the full plot is requested
            croppedLineages = JSON.parse(JSON.stringify(this.props.lineages)); // make sure changing croppedLineages will not attempt to change this.props.lineages
            croppedLineages.map(function (item) { return item.indexOf("root") > -1 ? item : item.unshift("root"); }); // add "root" to the beginning of every lineage
        }
        else {
            croppedLineages = this.props.lineages.filter(function (item) { return item[_this.state.layer] === _this.state.root; }); // filter out all irrelevant lineages
            croppedLineages = croppedLineages.map(function (item) { return item.slice(_this.state.layer); }); // crop remaining lineages so they start with the root taxon
        }
        if (this.state.collapse) {
            croppedLineages = this.collapse(croppedLineages);
        }
        this.assignDegrees({ "croppedLineages": croppedLineages });
    };
    // Assign each cropped lineage a start and end degree.
    PlotDrawing.prototype.assignDegrees = function (newState) {
        var croppedLineagesCopy = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var unassignedCounts = croppedLineagesCopy.map(function (item) { return allTaxa[item[item.length - 1]]["unassignedCount"]; }); // get unassigned count of every cropped lineage from the global object allTaxa
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
        var _loop_3 = function (i) {
            var _loop_4 = function (j) {
                if (layers[i].filter(function (item) { return item === layers[i][j]; }).length === 1 && Boolean(layers[i + 1][j])) {
                    lineagesCopy[j].splice(i, 1, "toBeDeleted");
                }
            };
            for (var j = 0; j < layers[i].length; j++) {
                _loop_4(j);
            }
        };
        for (var i = 0; i < layers.length - 1; i++) {
            _loop_3(i);
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
        console.log("at getStructureByTaxon(): ", layersUnique);
        for (var i = 1; i < layersUnique.length; i++) {
            for (var j = 0; j < layersUnique[i].length; j++) {
                var key = layersUnique[i][j];
                var firstOccurrenceInLayer = layers[i].indexOf(key);
                var lastOccurrenceInLayer = layers[i].lastIndexOf(key);
                var structureSectionsArray = Object.keys(newState["structureByDegrees"]);
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
        newState["structureByTaxon"] = structureByTaxon;
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
        var dpmm = viewportDimensions["dpmm"];
        var lineagesCopy = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var layers = getLayers(lineagesCopy);
        var numberOfLayers = Object.keys(layers).length;
        var smallerDimension = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 5);
        var svgPaths = {};
        var firstLayer = function (key) { return newState["structureByTaxon"][key].verticalWidthInLayerIndices[0]; };
        var lastLayer = function (key) { return newState["structureByTaxon"][key].verticalWidthInLayerIndices[1]; };
        var startDeg = function (key) { return newState["structureByTaxon"][key].horizontalWidthInDeg[0]; };
        var endDeg = function (key) { return newState["structureByTaxon"][key].horizontalWidthInDeg[1]; };
        var breakingPt = function (key) { return newState["structureByTaxon"][key].breakingPoint; };
        for (var _i = 0, _a = Object.keys(newState["structureByTaxon"]); _i < _a.length; _i++) {
            var key = _a[_i];
            var innerArc = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
            var innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(round(firstLayer(key) * layerWidth), ",").concat(round(firstLayer(key) * layerWidth), " 0 0 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
            if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                var innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(innerArc["radius"], ",").concat(innerArc["radius"], " 0 1 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
            }
            ;
            var subpaths = [innerArcPath];
            if (Boolean(breakingPt(key))) {
                var outerArc = this.calculateArcEndpoints(lastLayer(key), layerWidth, startDeg(key), breakingPt(key));
                var outerArcPath = "L ".concat(outerArc["x2"], ",").concat(outerArc["y2"], " A ").concat(outerArc["radius"], ",").concat(outerArc["radius"], " 0 0 0 ").concat(outerArc["x1"], ",").concat(outerArc["y1"]);
                var midArc = this.calculateArcEndpoints((firstLayer(key) + 1), layerWidth, breakingPt(key), endDeg(key));
                var midArcPath = "L ".concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 0 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                if (Math.abs(endDeg(key) - breakingPt(key)) >= 180) {
                    var midArcPath = "L ".concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 1 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                }
                ;
                console.log("key, midArcPath: ", key, midArcPath);
                var lineInnerToMid = "L ".concat(innerArc["x2"], ",").concat(innerArc["y2"], " ").concat(midArc["x2"], ",").concat(midArc["y2"]);
                var lineOuterToMid = "L ".concat(midArc["x1"], ",").concat(midArc["y1"], " ").concat(outerArc["x2"], ",").concat(outerArc["y2"]);
                subpaths.push(lineInnerToMid);
                subpaths.push(midArcPath);
                subpaths.push(lineOuterToMid);
                subpaths.push(outerArcPath);
            }
            else {
                var outerArc = this.calculateArcEndpoints(lastLayer(key), layerWidth, startDeg(key), endDeg(key));
                var outerArcPath = "L ".concat(outerArc["x2"], ",").concat(outerArc["y2"], " A ").concat(outerArc["radius"], ",").concat(outerArc["radius"], " 0 0 0 ").concat(outerArc["x1"], ",").concat(outerArc["y1"]);
                if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                    var outerArcPath = "L ".concat(outerArc["x2"], ",").concat(outerArc["y2"], " A ").concat(outerArc["radius"], ",").concat(outerArc["radius"], " 0 1 0 ").concat(outerArc["x1"], ",").concat(outerArc["y1"]);
                }
                ;
                var lineInnerToOuter = "L ".concat(innerArc["x2"], ",").concat(innerArc["y2"], " ").concat(outerArc["x2"], ",").concat(outerArc["y2"]);
                subpaths.push(lineInnerToOuter);
                subpaths.push(outerArcPath);
            }
            var lineInnertoOuter = "L ".concat(outerArc["x1"], ",").concat(outerArc["y1"], " ").concat(innerArc["x1"], ",").concat(innerArc["y1"]);
            subpaths.push(lineInnertoOuter);
            var d = subpaths.join(" ");
            svgPaths[key] = d;
        }
        ;
        newState["svgPaths"] = svgPaths;
        this.calculateTaxonLabels(newState);
    };
    PlotDrawing.prototype.calculateTaxonLabels = function (newState) {
        var shapeCenters = {};
        var cx = this.state.horizontalShift;
        var cy = this.state.verticalShift;
        ;
        var lineagesCopy = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var layers = getLayers(lineagesCopy);
        var layerWidthInPx = Math.max((Math.min(cx, cy) - viewportDimensions["dpmm"] * 10) / Object.keys(layers).length, viewportDimensions["dpmm"] * 4);
        var firstLayer = function (key) { return newState["structureByTaxon"][key].verticalWidthInLayerIndices[0]; };
        var lastLayer = function (key) { return newState["structureByTaxon"][key].verticalWidthInLayerIndices[1]; };
        var startDeg = function (key) { return newState["structureByTaxon"][key].horizontalWidthInDeg[0]; };
        var endDeg = function (key) { return newState["structureByTaxon"][key].horizontalWidthInDeg[1]; };
        var breakingPt = function (key) { return newState["structureByTaxon"][key].breakingPoint; };
        var taxonLabels = {};
        console.log("at calculateTaxonLabels(): ", taxonLabels);
        for (var _i = 0, _a = Object.keys(newState["structureByTaxon"]); _i < _a.length; _i++) {
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
        for (var _b = 0, _c = Object.keys(newState["structureByTaxon"]); _b < _c.length; _b++) {
            var key = _c[_b];
            var direction = breakingPt(key) === null && lastLayer(key) === Object.keys(layers).length ? "radial" : "circumferential";
            var twist = void 0, left = void 0, right = void 0, top_2 = void 0, transform = void 0, transformOrigin = void 0;
            if (direction === "radial") {
                twist = shapeCenters[key][2] <= 180 ? -shapeCenters[key][2] : +shapeCenters[key][2];
                left = twist > 0 ? shapeCenters[key][0] : "unset";
                right = left === "unset" ? cx * 2 - shapeCenters[key][0] : "unset";
                twist = left === "unset" ? 270 - twist : 360 - (270 - twist);
                top_2 = shapeCenters[key][1] - 9;
                transform = "rotate(".concat(twist, "deg)");
                transformOrigin = left === "unset" ? "center right" : "center left";
            }
            else {
                twist = 270 - shapeCenters[key][2] < 0 ? shapeCenters[key][2] : shapeCenters[key][2] + 180;
                left = shapeCenters[key][0];
                right = "unset";
                top_2 = shapeCenters[key][1] - 9;
                transform = "translate(-50%, 0) rotate(".concat(twist, "deg)");
                transformOrigin = "center center";
            }
            taxonLabels[key] = {
                "direction": direction,
                "left": left,
                "right": right,
                "top": top_2,
                "transform": transform,
                "transformOrigin": transformOrigin
            };
        }
        ;
        console.log("at calculateTaxonLabels() 2: ", taxonLabels);
        newState["taxonLabels"] = taxonLabels;
        this.getTaxonShapes(newState);
    };
    PlotDrawing.prototype.getTaxonShapes = function (newState) {
        var _this = this;
        // var colors:string[] = ["6CCFF6", "1B998B", "A1E887", "EA638C", "B33C86"];
        // var colors:string[] = ["1B998B", "A1E887", "1E96FC", "B33C86","003F91", ];
        var colors = this.state.colors.map(hexToRGB);
        var lineagesCopy = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var layers = getLayers(lineagesCopy);
        var layersUnique = getLayers(lineagesCopy, true);
        var colorCalculationParameters = {};
        var taxonShapes = {};
        console.log("colors: ", colors);
        for (var i = 0; i < layersUnique[1].length; i++) {
            var firstAncestor = layersUnique[1][i];
            if (firstAncestor) {
                taxonShapes["".concat(firstAncestor, "_-_1")] = colors[i % colors.length];
            }
        }
        for (var i = 2; i < layers.length; i++) {
            for (var j = 0; j < layers[i].length; j++) {
                if (layers[i][j]) {
                    var firstAncestor = layers[1][j];
                    var ancestorColor = taxonShapes["".concat(firstAncestor, "_-_1")];
                    var nextColorIndex = (colors.indexOf(ancestorColor) + 1) % colors.length;
                    var nextColor = colors[nextColorIndex];
                    var selfStartingDegree = newState["structureByTaxon"]["".concat(layers[i][j], "_-_").concat(i)].horizontalWidthInDeg[0];
                    var ancestorDegrees = newState["structureByTaxon"]["".concat(layers[1][j], "_-_").concat(1)].horizontalWidthInDeg;
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
    PlotDrawing.prototype.handleClick = function (shapeId) {
        var _this = this;
        console.log("shapeId: ", shapeId);
        var taxon = shapeId.match(/.+?(?=_)/)[0];
        var currLayer = parseInt(shapeId.match(/\d+/)[0]);
        console.log("Clicked! ", taxon, currLayer + this.state.layer);
        this.setState({ "root": taxon, "layer": currLayer + Math.max(0, this.state.layer) }, function () { return _this.cropLineages(); });
    };
    PlotDrawing.prototype.render = function () {
        var _this = this;
        var shapes = [];
        var labels = [];
        var _loop_5 = function (item) {
            shapes.push(React.createElement(TaxonShape, { id: item, onClick: function () { return _this.handleClick(item); }, d: this_1.state.svgPaths[item], strokeWidth: viewportDimensions["dpmm"] * 0.265, fillColor: this_1.state.taxonShapes[item] }));
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(this.state.svgPaths); _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_5(item);
        }
        var _loop_6 = function (item) {
            labels.push(React.createElement(TaxonLabel, { taxon: item, transform: this_2.state.taxonLabels[item]["transform"], left: this_2.state.taxonLabels[item]["left"], right: this_2.state.taxonLabels[item]["right"], top: this_2.state.taxonLabels[item]["top"], transformOrigin: this_2.state.taxonLabels[item]["transformOrigin"], onClick: function () { _this.handleClick(item); } }));
        };
        var this_2 = this;
        for (var _b = 0, _c = Object.keys(this.state.taxonShapes); _b < _c.length; _b++) {
            var item = _c[_b];
            _loop_6(item);
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
