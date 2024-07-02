"use strict";
exports.__esModule = true;
var React = require("react");
var BasicLayerInfo_js_1 = require("./BasicLayerInfo.js");
var IDInfo_js_1 = require("./IDInfo.js");
var Shortcuts_js_1 = require("./Shortcuts.js");
var App_1 = require("./App");
var LayerInfo = function () {
    var ctx = React.useContext(App_1.LeftSectionCtx);
    var signature = JSON.stringify(ctx["bsc"]);
    return React.useMemo(function () {
        console.log("LayerInfo render");
        return (React.createElement("fieldset", { style: {
                borderColor: "#800080",
                borderRadius: "5px",
                margin: "0",
                marginTop: "2vh",
                maxWidth: "18vw",
                padding: "1.5vh 1.5vw 1.5vh 1.5vw"
            } },
            React.createElement("legend", { style: { color: "#800080", fontWeight: "bold" } }, "CURRENT LAYER"),
            React.createElement(BasicLayerInfo_js_1["default"], null),
            React.createElement(IDInfo_js_1["default"], null),
            React.createElement(Shortcuts_js_1["default"], null)));
    }, [signature]);
};
exports["default"] = LayerInfo;
