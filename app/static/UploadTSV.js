"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var UploadTSV = function () {
    var ctx = React.useContext(App_1.RightSectionCtx);
    var signature = ctx["uplStatus"];
    return React.useMemo(function () {
        return (React.createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            } },
            React.createElement("input", { id: "file-input", type: "file", style: { display: "none" } }),
            React.createElement("label", { onClick: ctx["uplTSVHandleClick"], htmlFor: "file-input", style: {
                    border: "1px solid grey",
                    borderRadius: "3px",
                    backgroundColor: "#F0F0F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Arial",
                    fontSize: "1.8vh",
                    padding: "1px 6px 1px 6px",
                    margin: "0",
                    width: "100%"
                } },
                React.createElement("span", { id: "status", className: "material-symbols-outlined", style: { display: "inline" } }, "upload"),
                ".tsv"),
            React.createElement("span", { id: "status", className: "material-symbols-outlined", style: { display: "inline" } }, ctx["uplStatus"])));
    }, [signature]);
};
exports["default"] = UploadTSV;
