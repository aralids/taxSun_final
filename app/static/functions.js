"use strict";
exports.__esModule = true;
exports.calcSVGPath = void 0;
var helperFunctions_1 = require("./helperFunctions");
var calcSVGPath = function (layerWidth, params, windowCx, windowCy) {
    var SVGPath = "";
    var layerArr = params["layerArr"];
    var degArr = params["degArr"];
    var startDeg = degArr[0];
    var endDeg = degArr[degArr.length - 1];
    var innRad = (0, helperFunctions_1.round)(layerArr[0] * layerWidth);
    // If calculating root taxon shape - circle.
    if (layerArr[0] === 0) {
        SVGPath = "M ".concat(windowCx, ", ").concat(windowCy, " m -").concat(layerWidth, ", 0 a ").concat(layerWidth, ",").concat(layerWidth, " 0 1,0 ").concat(layerWidth * 2, ",0 a ").concat(layerWidth, ",").concat(layerWidth, " 0 1,0 -").concat(layerWidth * 2, ",0");
    }
    else {
        // If the shape to be drawn completes a full circle...
        if ((0, helperFunctions_1.round)(endDeg - startDeg) === 360) {
            var innerArcPath = "M ".concat(windowCx, ", ").concat(windowCy, " m -").concat(innRad, ", 0 a ").concat(innRad, ",").concat(innRad, " 0 1,0 ").concat(innRad * 2, ",0 a ").concat(innRad, ",").concat(innRad, " 0 1,0 -").concat(innRad * 2, ",0");
            SVGPath = innerArcPath;
            // ...and consists simply of two concentric circles.
            if (layerArr.length === 2) {
                var outerCirc = layerArr[1] * layerWidth;
                var midArcPath = "M ".concat(windowCx, ", ").concat(windowCy, " m -").concat(outerCirc, ", 0 a ").concat(outerCirc, ",").concat(outerCirc, " 0 1,0 ").concat(outerCirc * 2, ",0 a ").concat(outerCirc, ",").concat(outerCirc, " 0 1,0 -").concat(outerCirc * 2, ",0");
                SVGPath = SVGPath + " " + midArcPath;
            }
            // ...and is of irregular shape.
            else {
                var midArc = {};
                for (var i = layerArr.length - 1; i >= 1; i--) {
                    var curr = degArr[i];
                    var prev = degArr[i - 1];
                    var MorL = i === layerArr.length - 1 ? "M" : "L";
                    midArc = (0, helperFunctions_1.calculateArcEndpoints)(layerArr[i], layerWidth, prev, curr, windowCx, windowCy);
                    var midArcPath = "".concat(MorL, " ").concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 0 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                    if (Math.abs(curr - prev) >= 180) {
                        midArcPath = "".concat(MorL, " ").concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 1 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                    }
                    SVGPath = SVGPath + " " + midArcPath;
                }
                var lineInnertoOuter = "L ".concat(midArc["x1"], ",").concat(midArc["y1"], " ").concat(windowCx, ",").concat(windowCy + layerArr[layerArr.length - 1] * layerWidth);
                SVGPath = SVGPath + " " + lineInnertoOuter;
            }
        }
        // If the shape doesn't complete a full circle.
        else {
            console.log("func.tsx: ", windowCx, windowCy);
            var innerArc = (0, helperFunctions_1.calculateArcEndpoints)(layerArr[0], layerWidth, startDeg, endDeg, windowCx, windowCy);
            var innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(innRad, ",").concat(innRad, " 0 0 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
            if (Math.abs(endDeg - startDeg) >= 180) {
                innerArcPath = "M ".concat(innerArc["x1"], ",").concat(innerArc["y1"], " A ").concat(innerArc["radius"], ",").concat(innerArc["radius"], " 0 1 1 ").concat(innerArc["x2"], ",").concat(innerArc["y2"]);
            }
            SVGPath = innerArcPath;
            var midArc = {};
            for (var i = layerArr.length - 1; i >= 0; i--) {
                var curr = degArr[i];
                var prev = i === 0 ? startDeg : degArr[i - 1];
                midArc = (0, helperFunctions_1.calculateArcEndpoints)(layerArr[i], layerWidth, prev, curr, windowCx, windowCy);
                var midArcPath = "L ".concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 0 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                if (Math.abs(curr - prev) >= 180) {
                    midArcPath = "L ".concat(midArc["x2"], ",").concat(midArc["y2"], " A ").concat(midArc["radius"], ",").concat(midArc["radius"], " 0 1 0 ").concat(midArc["x1"], ",").concat(midArc["y1"]);
                }
                SVGPath = SVGPath + " " + midArcPath;
            }
            var lineInnertoOuter = "L ".concat(midArc["x1"], ",").concat(midArc["y1"], " ").concat(innerArc["x1"], ",").concat(innerArc["y1"]);
            SVGPath = SVGPath + " " + lineInnertoOuter;
        }
    }
    console.log("functions.tsx SVGPath: ", windowCx, windowCy, params, layerWidth);
    return SVGPath;
};
exports.calcSVGPath = calcSVGPath;
