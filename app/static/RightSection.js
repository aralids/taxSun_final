"use strict";
exports.__esModule = true;
var React = require("react");
var Upload_js_1 = require("./Upload.js");
var ViewingModes_js_1 = require("./ViewingModes.js");
var Download_js_1 = require("./Download.js");
var RightSectionCtx = function () {
    return React.useMemo(function () {
        return (React.createElement("div", { style: {
                display: "flex",
                flexDirection: "column",
                left: "80vw",
                position: "fixed",
                top: "0",
                width: "18vw"
            } },
            React.createElement(Upload_js_1["default"], null),
            React.createElement(ViewingModes_js_1["default"], null),
            React.createElement(Download_js_1["default"], null)));
    }, []);
};
exports["default"] = RightSectionCtx;