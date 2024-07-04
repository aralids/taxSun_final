"use strict";
exports.__esModule = true;
var React = require("react");
var UploadTsv_js_1 = require("./UploadTsv.js");
var UploadFaa_js_1 = require("./UploadFaa.js");
var Upload = function () {
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
                } }, "LOAD YOUR DATA"),
            React.createElement(UploadTsv_js_1["default"], null),
            React.createElement(UploadFaa_js_1["default"], null)));
    }, []);
};
exports["default"] = Upload;
