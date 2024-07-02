"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var IDInfo = function () {
    var ctx = React.useContext(App_1.LeftSectionCtx);
    var stl = {
        display: "block",
        margin: "2vh 0 2vh 0"
    };
    if (ctx["bsc"]["name"] === "root") {
        return React.createElement(React.Fragment, null);
    }
    else if (!ctx["bsc"]["id"]) {
        return (React.createElement("div", { style: stl },
            React.createElement("p", { style: { display: "inline" } }, "NCBI ID: "),
            React.createElement("button", { style: { display: "inline" }, onClick: ctx["handleIDClick"] }, "FETCH")));
    }
    return (React.createElement("div", { style: stl },
        React.createElement("p", { style: { display: "inline" } }, "NCBI ID: "),
        React.createElement("a", { style: { display: "inline" }, target: "_blank", href: "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=".concat(ctx["bsc"]["id"], "&lvl=3&lin=f&keep=1&srchmode=1&unlock") }, ctx["bsc"]["id"])));
};
exports["default"] = IDInfo;
