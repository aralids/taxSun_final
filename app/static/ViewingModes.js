"use strict";
exports.__esModule = true;
var React = require("react");
var Collapse_js_1 = require("./Collapse.js");
var EValue_js_1 = require("./EValue.js");
var Views_js_1 = require("./Views.js");
var ViewingModes = function () {
    return React.useMemo(function () {
        return (React.createElement("fieldset", { style: {
                borderColor: "#800080",
                borderRadius: "5px",
                margin: "0",
                marginTop: "2vh",
                maxWidth: "18vw",
                padding: "1.5vh 1.5vw 1.5vh 1.5vw",
                wordBreak: "break-all"
            } },
            React.createElement("legend", { style: {
                    color: "#800080",
                    fontWeight: "bold",
                    wordBreak: "keep-all"
                } }, "VIEW"),
            React.createElement(Collapse_js_1["default"], null),
            React.createElement(EValue_js_1["default"], null),
            React.createElement(Views_js_1["default"], null)));
    }, []);
};
exports["default"] = ViewingModes;
