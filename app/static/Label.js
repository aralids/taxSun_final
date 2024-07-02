"use strict";
exports.__esModule = true;
var React = require("react");
var Label = function (_a) {
    var content = _a.content, display = _a.display, fill = _a.fill, fontFamily = _a.fontFamily, fontSize = _a.fontSize, fontWeight = _a.fontWeight, lineHeight = _a.lineHeight, margin = _a.margin, padding = _a.padding, position = _a.position, transform = _a.transform, x = _a.x, y = _a.y;
    return (React.createElement("text", { style: {
            display: display,
            fill: fill,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
            lineHeight: lineHeight,
            margin: margin,
            padding: padding,
            position: position
        }, transform: transform, x: x, y: y }, content));
};
exports["default"] = Label;
