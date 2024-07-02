"use strict";
exports.__esModule = true;
var React = require("react");
var HoverInfo_js_1 = require("./HoverInfo.js");
var LayerInfo_js_1 = require("./LayerInfo.js");
var LeftSection = function () {
    return (React.createElement("div", { style: {
            display: "flex",
            flexDirection: "column",
            left: "2vw",
            position: "fixed",
            top: "0",
            width: "18vw"
        } },
        React.createElement(LayerInfo_js_1["default"], null),
        React.createElement(HoverInfo_js_1["default"], null)));
};
exports["default"] = LeftSection;
