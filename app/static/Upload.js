"use strict";
exports.__esModule = true;
var React = require("react");
var UploadTSV_js_1 = require("./UploadTSV.js");
var Upload = function () {
    return React.useMemo(function () {
        return (React.createElement("fieldset", { style: {
                borderColor: "#800080",
                borderRadius: "5px",
                margin: "0",
                marginTop: "2vh",
                maxWidth: "18vw",
                padding: "1.5vh 1.5vw 1.5vh 1.5vw"
            } },
            React.createElement("legend", { style: { color: "#800080", fontWeight: "bold" } }, "UPLOAD YOUR DATA"),
            React.createElement(UploadTSV_js_1["default"], null)));
    }, []);
};
exports["default"] = Upload;
