"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var EValue = function () {
    var ctx = React.useContext(App_1.RightSectionCtx);
    var signature = JSON.stringify(ctx["eValueApplied"]);
    return React.useMemo(function () {
        console.log("Evalue render");
        return (React.createElement("div", { style: { display: "flex", alignItems: "start" } },
            React.createElement("input", { type: "checkbox", name: "eValueApplied", style: { accentColor: "#800080" }, onChange: ctx["eValueAppliedHandleChange"], checked: ctx["eValueApplied"] }),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "eValueApplied", style: { padding: "0 0 0 0.5vw" } }, "Filter by e-value:"),
                React.createElement("input", { type: "text", style: { height: "2vh", maxWidth: "3vw", marginLeft: "0.5vw" }, onKeyDown: ctx["eValueHandleKeyDown"], ref: ctx["eValueRef"] }))));
    }, [signature]);
};
exports["default"] = EValue;
