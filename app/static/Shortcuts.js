"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var React = require("react");
var App_1 = require("./App");
var Shortcuts = function () {
    var ctx = React.useContext(App_1.LeftSectionCtx);
    var stl = {
        display: "block",
        margin: "0 0 0 0",
        cursor: "pointer"
    };
    var arr = [];
    for (var _i = 0, _a = ctx["ancestors"]; _i < _a.length; _i++) {
        var anc = _a[_i];
        arr = arr.concat(React.createElement("p", { onClick: anc["ancHandleClick"], style: stl },
            anc["ancPerc"],
            " of ",
            React.createElement("b", null, anc["ancName"])));
    }
    return React.createElement.apply(React, __spreadArray(["div", { style: { display: "block" } }], arr, false));
};
exports["default"] = Shortcuts;
