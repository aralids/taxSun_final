"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var Views = function () {
    var ctx = React.useContext(App_1.RightSectionCtx);
    return React.useMemo(function () {
        return (React.createElement("fieldset", { onChange: ctx["viewHandleChange"], ref: ctx["radioRef"], style: { border: "none", padding: "0", margin: "2vh 0 0 0" } },
            React.createElement("div", { style: { display: "flex", alignItems: "start" } },
                React.createElement("input", { id: "unaltered", type: "radio", name: "radio", style: { accentColor: "#800080" } }),
                React.createElement("label", { htmlFor: "unaltered", style: { padding: "0 0 0 0.5vw" } }, "Unaltered")),
            React.createElement("div", { style: { display: "flex", alignItems: "start" } },
                React.createElement("input", { id: "married-i", type: "radio", name: "radio", style: { accentColor: "#800080" } }),
                React.createElement("label", { htmlFor: "married-i", style: { padding: "0 0 0 0.5vw" } }, "Married I")),
            React.createElement("div", { style: { display: "flex", alignItems: "start" } },
                React.createElement("input", { id: "married-ii", type: "radio", name: "radio", style: { accentColor: "#800080" } }),
                React.createElement("label", { htmlFor: "married-ii", style: { padding: "0 0 0 0.5vw" } }, "Married II")),
            React.createElement("div", { style: { display: "flex", alignItems: "start" } },
                React.createElement("input", { id: "all-equal", type: "radio", name: "radio", style: { accentColor: "#800080" } }),
                React.createElement("label", { htmlFor: "all-equal", style: { padding: "0 0 0 0.5vw" } }, "All equal"))));
    }, []);
};
exports["default"] = Views;
