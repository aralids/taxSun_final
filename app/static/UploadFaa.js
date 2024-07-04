"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var UploadFaa = function () {
    var ctx = React.useContext(App_1.RightSectionCtx);
    var signature = ctx["faaLoadStatus"];
    return React.useMemo(function () {
        return (React.createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "0.75vh"
            } },
            React.createElement("input", { id: "faa-file-input", type: "file", style: { display: "none" }, ref: ctx["faaFormRef"], onChange: ctx["uplFaaHandleChange"] }),
            React.createElement("label", { htmlFor: "faa-file-input", style: {
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
                React.createElement("span", { className: "material-symbols-outlined", style: { display: "inline" } }, "upload"),
                ".faa"),
            React.createElement("span", { className: "material-symbols-outlined", style: { display: "inline" } }, ctx["faaLoadStatus"])));
    }, [signature]);
};
exports["default"] = UploadFaa;
