"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var BasicLayerInfo = function () {
    var stl = {
        display: "block",
        margin: 0
    };
    var ctx = React.useContext(App_1.LeftSectionCtx);
    if (ctx["rawCount"] === 0) {
        return (React.createElement("div", null,
            React.createElement("p", { style: stl },
                "Taxon: ",
                React.createElement("b", null, ctx["name"])),
            React.createElement("p", { style: stl },
                "Rank: ",
                React.createElement("b", null, ctx["rank"])),
            React.createElement("p", { style: stl },
                "Total count: ",
                React.createElement("b", null, ctx["totCount"])),
            React.createElement("p", { style: stl },
                "Unspec. count: ",
                React.createElement("b", null, ctx["unaCount"]))));
    }
    return (React.createElement("div", null,
        React.createElement("p", { style: stl },
            "Taxon: ",
            React.createElement("b", null, ctx["name"])),
        React.createElement("p", { style: stl },
            "Rank: ",
            React.createElement("b", null, ctx["rank"])),
        React.createElement("p", { style: stl },
            "Total count: ",
            React.createElement("b", null, ctx["totCount"])),
        React.createElement("p", { style: stl },
            "Unspec. count: ",
            React.createElement("b", null, ctx["unaCount"])),
        React.createElement("p", { style: stl },
            "Raw file count: ",
            React.createElement("b", null, ctx["rawCount"]))));
};
exports["default"] = BasicLayerInfo;
