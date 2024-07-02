"use strict";
exports.__esModule = true;
exports.RightSectionCtx = exports.LeftSectionCtx = void 0;
var React = require("react");
var LeftSection_js_1 = require("./LeftSection.js");
var RightSection_js_1 = require("./RightSection.js");
var predefinedObjects_js_1 = require("./predefinedObjects.js");
exports.LeftSectionCtx = React.createContext({});
exports.RightSectionCtx = React.createContext({});
var App = function () {
    var _a = React.useState({
        fileName: "homsa.tsv",
        lns: predefinedObjects_js_1.lns,
        rks: predefinedObjects_js_1.rks,
        txSet: predefinedObjects_js_1.txSet,
        rawTxSet: predefinedObjects_js_1.rawTxSet
    }), rawData = _a[0], setRawData = _a[1];
    var tempFunc1 = function () {
        console.log("tempFunc1");
        return "Bacteria superkingdom";
    };
    var _b = React.useState(tempFunc1()), layer = _b[0], setLayer = _b[1];
    var _c = React.useState(""), hover = _c[0], setHover = _c[1];
    var handleIDClick = function () {
        console.log("handleIDClick");
    };
    var handlePlotClick = function (key) {
        setLayer(key);
    };
    var uplTSVHandleClick = function () {
        console.log("uplTSVHandleClick");
    };
    var relTxSet = {
        "root root": {
            id: undefined,
            ln: [],
            name: "root",
            rank: "root",
            rawCount: 22561,
            totCount: 408743,
            unaCount: 1201
        },
        "Bacteria superkingdom": {
            id: 2,
            ln: [["root", "root"]],
            name: "Bacteria",
            rank: "superkingdom",
            rawCount: 13962,
            totCount: 48334,
            unaCount: 15616
        },
        "Salmonella genus": {
            id: undefined,
            ln: [
                ["root", "root"],
                ["superkingdom", "Bacteria"],
                ["phylum", "Pseudomonadota"],
                ["class", "Gammaproteobacteria"],
                ["order", "Enterobacterales"],
                ["family", "Enterobacteriaceae"],
                ["genus", "Salmonella"],
            ],
            name: "Salmonella",
            rank: "genus",
            rawCount: 0,
            totCount: 314,
            unaCount: 0
        }
    };
    return (React.createElement("div", null,
        React.createElement(exports.LeftSectionCtx.Provider, { value: {
                bsc: relTxSet[layer],
                handleIDClick: handleIDClick,
                ancestors: [
                    {
                        ancName: "root",
                        ancPerc: "11.83%",
                        ancHandleClick: function () { return handlePlotClick("root root"); }
                    },
                    {
                        ancName: "Salmonella",
                        ancPerc: "10.13%",
                        ancHandleClick: function () { return handlePlotClick("Salmonella genus"); }
                    },
                ],
                hovered: relTxSet[hover]
            } },
            React.createElement(LeftSection_js_1["default"], null)),
        React.createElement(exports.RightSectionCtx.Provider, { value: {
                uplStatus: "",
                uplTSVHandleClick: uplTSVHandleClick
            } },
            React.createElement(RightSection_js_1["default"], null)),
        React.createElement("button", { onMouseOver: function () { return setHover("Salmonella genus"); }, onMouseOut: function () { return setHover(""); }, style: { position: "fixed", top: "50%", left: "50%" } }, "Salmonella")));
};
exports["default"] = App;
