var path = "C:/Users/PC/Desktop/workflow diagram/krona.tsv";
var allTaxa;
var taxonList = [];
var lineagesNamesOnlyArray = [];
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
    var partialPlot = new Plot("Bacteria", 0, false);
    console.log("lineagesNamesOnlyArray changed?: ", lineagesNamesOnlyArray);
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
        this.root = root;
        this.layer = layer;
        this.getOnlyNecessaryLineages();
        if (collapse) {
            this.collapse();
        }
        this.assignDegrees();
        this.calculateSVGPaths();
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
        console.log("structure: ", this.structure);
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
        console.log("structureCollapsed: ", this.structure);
    };
    Plot.prototype.calculateSVGPaths = function () {
        var layerWidthMM = 10;
        var structureByTaxon = {};
        var lineagesCopy = JSON.parse(JSON.stringify(this.lineages));
        var layers = this.getLayers(lineagesCopy);
        var layersUnique = this.getLayers(lineagesCopy, true);
        console.log("layers: ", layers);
        console.log("layersUnique: ", layersUnique);
        for (var i = 1; i < layersUnique.length; i++) {
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
                console.log("layer index: ", i, "maxI: ", layersUnique.length, " next layer: ", layers[i + 1], " firstOccurenceInLayer: ", firstOccurrenceInLayer);
                if (i != layersUnique.length - 1) {
                    if (!Boolean(layers[i + 1][firstOccurrenceInLayer])) {
                        verticalMax = layers.length;
                    }
                    else {
                        verticalMax = i + 1;
                    }
                }
                else {
                    verticalMax = i + 1;
                }
                var breakingPoint = verticalMax === verticalMin + 1 || potentialMidDegrees === endDegrees ? null : potentialMidDegrees;
                structureByTaxon[key] = {
                    "horizontalWidthInDeg": [startDegrees, endDegrees],
                    "verticalWidthInLayerIndices": [verticalMin, verticalMax],
                    "breakingPoint": breakingPoint
                };
            }
        }
        console.log("structureByTaxon: ", structureByTaxon);
        var svgPaths = {};
        for (var _i = 0, _a = Object.keys(structureByTaxon); _i < _a.length; _i++) {
            var key = _a[_i];
            var innerArcX1 = structureByTaxon[key].verticalWidthInLayerIndices[0] * layerWidthMM * Math.cos(radians(structureByTaxon[key].horizontalWidthInDeg[0]));
            innerArcX1 = Math.round(innerArcX1 * 1000) / 1000;
            var innerArcY1 = -structureByTaxon[key].verticalWidthInLayerIndices[0] * layerWidthMM * Math.sin(radians(structureByTaxon[key].horizontalWidthInDeg[0]));
            innerArcY1 = Math.round(innerArcY1 * 1000) / 1000;
            var innerArcX2 = structureByTaxon[key].verticalWidthInLayerIndices[0] * layerWidthMM * Math.cos(radians(structureByTaxon[key].horizontalWidthInDeg[1]));
            innerArcX2 = Math.round(innerArcX2 * 1000) / 1000;
            var innerArcY2 = -structureByTaxon[key].verticalWidthInLayerIndices[0] * layerWidthMM * Math.sin(radians(structureByTaxon[key].horizontalWidthInDeg[1]));
            innerArcY2 = Math.round(innerArcY2 * 1000) / 1000;
            var innerArc = "M ".concat(innerArcX1, ",").concat(innerArcY1, " A ").concat(structureByTaxon[key].verticalWidthInLayerIndices[0] * layerWidthMM, ",").concat(structureByTaxon[key].verticalWidthInLayerIndices[0] * layerWidthMM, " 0 0 1 ").concat(innerArcX2, ",").concat(innerArcY2);
            var allMs = [innerArc];
            if (Boolean(structureByTaxon[key].breakingPoint)) {
                var outerArcX1 = structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM * Math.cos(radians(structureByTaxon[key].horizontalWidthInDeg[0]));
                outerArcX1 = Math.round(outerArcX1 * 1000) / 1000;
                var outerArcY1 = -structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM * Math.sin(radians(structureByTaxon[key].horizontalWidthInDeg[0]));
                outerArcY1 = Math.round(outerArcY1 * 1000) / 1000;
                var outerArcX2 = structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM * Math.cos(radians(structureByTaxon[key].breakingPoint));
                outerArcX2 = Math.round(outerArcX2 * 1000) / 1000;
                var outerArcY2 = -structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM * Math.sin(radians(structureByTaxon[key].breakingPoint));
                outerArcY2 = Math.round(outerArcY2 * 1000) / 1000;
                var outerArc = "M ".concat(outerArcX1, ",").concat(outerArcY1, " A ").concat(structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM, ",").concat(structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM, " 0 0 1 ").concat(outerArcX2, ",").concat(outerArcY2);
                allMs.push(outerArc);
                var midArcX1 = (structureByTaxon[key].verticalWidthInLayerIndices[0] + 1) * layerWidthMM * Math.cos(radians(structureByTaxon[key].breakingPoint));
                midArcX1 = Math.round(midArcX1 * 1000) / 1000;
                var midArcY1 = -(structureByTaxon[key].verticalWidthInLayerIndices[0] + 1) * layerWidthMM * Math.sin(radians(structureByTaxon[key].breakingPoint));
                midArcY1 = Math.round(midArcY1 * 1000) / 1000;
                var midArcX2 = (structureByTaxon[key].verticalWidthInLayerIndices[0] + 1) * layerWidthMM * Math.cos(radians(structureByTaxon[key].horizontalWidthInDeg[1]));
                midArcX2 = Math.round(midArcX2 * 1000) / 1000;
                var midArcY2 = -(structureByTaxon[key].verticalWidthInLayerIndices[0] + 1) * layerWidthMM * Math.sin(radians(structureByTaxon[key].horizontalWidthInDeg[1]));
                midArcY2 = Math.round(midArcY2 * 1000) / 1000;
                var midArc = "M ".concat(midArcX1, ",").concat(midArcY1, " A ").concat((structureByTaxon[key].verticalWidthInLayerIndices[0] + 1) * layerWidthMM, ",").concat((structureByTaxon[key].verticalWidthInLayerIndices[0] + 1) * layerWidthMM, " 0 0 1 ").concat(midArcX2, ",").concat(midArcY2);
                allMs.push(midArc);
                var lineOuterToMid = "M ".concat(outerArcX2, ",").concat(outerArcY2, " ").concat(midArcX1, ",").concat(midArcY1);
                allMs.push(lineOuterToMid);
                var lineMidToInner = "M ".concat(midArcX2, ",").concat(midArcY2, " ").concat(innerArcX2, ",").concat(innerArcY2);
                allMs.push(lineMidToInner);
            }
            else {
                var outerArcX1 = structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM * Math.cos(radians(structureByTaxon[key].horizontalWidthInDeg[0]));
                outerArcX1 = Math.round(outerArcX1 * 1000) / 1000;
                var outerArcY1 = -structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM * Math.sin(radians(structureByTaxon[key].horizontalWidthInDeg[0]));
                outerArcY1 = Math.round(outerArcY1 * 1000) / 1000;
                var outerArcX2 = structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM * Math.cos(radians(structureByTaxon[key].horizontalWidthInDeg[1]));
                outerArcX2 = Math.round(outerArcX2 * 1000) / 1000;
                var outerArcY2 = -structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM * Math.sin(radians(structureByTaxon[key].horizontalWidthInDeg[1]));
                outerArcY2 = Math.round(outerArcY2 * 1000) / 1000;
                var outerArc = "M ".concat(outerArcX1, ",").concat(outerArcY1, " A ").concat(structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM, ",").concat(structureByTaxon[key].verticalWidthInLayerIndices[1] * layerWidthMM, " 0 0 1 ").concat(outerArcX2, ",").concat(outerArcY2);
                var lineOuterToInner = "M ".concat(outerArcX2, ",").concat(outerArcY2, " ").concat(innerArcX2, ",").concat(innerArcY2);
                allMs.push(outerArc);
                allMs.push(lineOuterToInner);
            }
            var lineInnertoOuter = "M ".concat(innerArcX1, ",").concat(innerArcY1, " ").concat(outerArcX1, ",").concat(outerArcY1);
            allMs.push(lineInnertoOuter);
            var d = allMs.join(" ");
            console.log("key: ", key, "d: ", d);
        }
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
    return Plot;
}());
function radians(degrees) {
    degrees = 270 - degrees;
    var pi = Math.PI;
    return degrees * (pi / 180);
}
