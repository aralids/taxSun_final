"use strict";
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var Download = function () {
    var ctx = React.useContext(App_1.RightSectionCtx);
    return React.useMemo(function () {
        return (React.createElement("fieldset", { style: {
                borderColor: "#800080",
                borderRadius: "5px",
                margin: "0",
                marginTop: "2vh",
                maxWidth: "18vw",
                padding: "1.5vh 1.5vw 1.5vh 1.5vw",
                wordBreak: "break-all"
            } },
            React.createElement("legend", { style: {
                    color: "#800080",
                    fontWeight: "bold",
                    wordBreak: "keep-all"
                } }, "DOWNLOAD"),
            React.createElement("button", { onClick: ctx["dldOnClick"], style: {
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
                React.createElement("span", { className: "material-symbols-outlined", style: { display: "inline" } }, "download"),
                "SVG")));
    }, []);
};
exports["default"] = Download;
