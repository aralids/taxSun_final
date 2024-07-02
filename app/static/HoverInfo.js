"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var HoverInfo = function () {
    var ctx = React.useContext(App_1.LeftSectionCtx);
    var signature = JSON.stringify(ctx["hovered"]);
    return React.useMemo(function () {
        console.log("HoverInfo render");
        if (!ctx["hovered"]) {
            return React.createElement(React.Fragment, null);
        }
        var stl = {
            display: "block",
            margin: 0
        };
        return (React.createElement("fieldset", { style: {
                borderColor: "#800080",
                borderRadius: "5px",
                margin: "0",
                marginTop: "2vh",
                maxWidth: "18vw",
                padding: "1.5vh 1.5vw 1.5vh 1.5vw"
            } },
            React.createElement("legend", { style: { color: "#800080", fontWeight: "bold" } }, "HOVERING OVER"),
            React.createElement("p", { style: stl },
                "Rank: ",
                React.createElement("b", null, ctx["hovered"]["name"])),
            React.createElement("p", { style: stl },
                "Rank: ",
                React.createElement("b", null, ctx["hovered"]["rank"])),
            React.createElement("p", { style: stl },
                "Total count: ",
                React.createElement("b", null, ctx["hovered"]["totCount"])),
            React.createElement("p", { style: stl },
                "Unassigned count: ",
                React.createElement("b", null, ctx["hovered"]["unaCount"]))));
    }, [signature]);
};
exports["default"] = HoverInfo;
