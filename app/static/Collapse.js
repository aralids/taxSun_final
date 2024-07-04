"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var Collapse = function () {
    var ctx = React.useContext(App_1.RightSectionCtx);
    var signature = JSON.stringify(ctx["coll"]);
    return React.useMemo(function () {
        console.log("Collapse render");
        return (React.createElement("div", { style: { display: "flex", alignItems: "start" } },
            React.createElement("input", { type: "checkbox", name: "collapse", style: { accentColor: "#800080" }, onChange: ctx["collHandleChange"], checked: ctx["coll"] }),
            React.createElement("label", { htmlFor: "collapse", style: { padding: "0 0 0 0.5vw" } }, "Collapse")));
    }, [signature]);
};
exports["default"] = Collapse;
