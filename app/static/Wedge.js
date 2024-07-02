"use strict";
exports.__esModule = true;
var React = require("react");
var Shape_js_1 = require("./Shape.js");
var Label_js_1 = require("./Label.js");
var LabelFrame_js_1 = require("./LabelFrame.js");
//import { calcSVGPath } from "./functions.js";
var Wedge = function (_a) {
    var shD = _a.shD, shFill = _a.shFill, shStrokeWidth = _a.shStrokeWidth, lbContent = _a.lbContent, lbDisplay = _a.lbDisplay, lbFontSize = _a.lbFontSize, lbFontWeight = _a.lbFontWeight, lbTransform = _a.lbTransform, lbX = _a.lbX, lbY = _a.lbY, lbfDisplay = _a.lbfDisplay, lbfTransform = _a.lbfTransform, lbfWidth = _a.lbfWidth, lbfX = _a.lbfX, lbfY = _a.lbfY;
    var immut = {
        shStroke: "#800080",
        lbFill: "#800080",
        lbFontFamily: "calibri",
        lbLineHeight: "2vmin",
        lbMargin: "0px",
        lbPadding: "0px",
        lbPosition: "absolute",
        lbfFill: "#ffffff",
        lbfHeight: "3vmin",
        lbfPosition: "absolute",
        lbfStroke: "#800080",
        lbfStrokeWidth: "0.2vmin"
    };
    //const d = calcSVGPath(layerWidth, params, windowCx, windowCy);
    return (React.createElement("g", null,
        React.createElement(Shape_js_1["default"], { d: shD, fill: shFill, stroke: immut["shStroke"], strokeWidth: shStrokeWidth }),
        React.createElement(LabelFrame_js_1["default"], { display: lbfDisplay, fill: immut["lbfFill"], height: immut["lbfHeight"], position: immut["lbfPosition"], stroke: immut["lbfStroke"], strokeWidth: immut["lbfStrokeWidth"], transform: lbfTransform, width: lbfWidth, x: lbfX, y: lbfY }),
        React.createElement(Label_js_1["default"], { content: lbContent, display: lbDisplay, fill: immut["lbFill"], fontFamily: immut["lbFontFamily"], fontSize: lbFontSize, fontWeight: lbFontWeight, lineHeight: immut["lbLineHeight"], margin: immut["lbMargin"], padding: immut["lbPadding"], position: immut["lbPosition"], transform: lbTransform, x: lbX, y: lbY })));
};
exports["default"] = React.memo(Wedge);
