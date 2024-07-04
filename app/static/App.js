"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.RightSectionCtx = exports.LeftSectionCtx = void 0;
var React = require("react");
var LeftSection_js_1 = require("./LeftSection.js");
var RightSection_js_1 = require("./RightSection.js");
var predefinedObjects_js_1 = require("./predefinedObjects.js");
exports.LeftSectionCtx = React.createContext({});
exports.RightSectionCtx = React.createContext({});
var App = function () {
    var _a;
    var _b = React.useState({
        lyr: "Bacteria superkingdom",
        relLns: predefinedObjects_js_1.lns,
        relTaxSet: predefinedObjects_js_1.taxSet,
        ancestors: [
            {
                ancName: "root",
                ancPerc: "11.83%",
                ancHandleClick: function () { return shortcutsHandleClick("root root"); }
            },
        ],
        lns: predefinedObjects_js_1.lns,
        taxSet: predefinedObjects_js_1.taxSet,
        rawTaxSet: predefinedObjects_js_1.rawTaxSet,
        tsvLastTry: "",
        tsvLoadStatus: "",
        tsvName: "default",
        faaLastTry: "",
        faaLoadStatus: "",
        faaName: "",
        faaObj: {},
        collapse: true,
        eValue: Infinity,
        eValueApplied: false,
        view: "allEqual",
        fetchedIDs: {}
    }), stt = _b[0], setStt = _b[1];
    var _c = React.useState(false), ctxMenuVis = _c[0], setCtxMenuVis = _c[1];
    var _d = React.useState(""), hover = _d[0], setHover = _d[1];
    var sttRef = React.useRef(stt);
    sttRef.current = stt;
    var IDInfoHandleClick = function () {
        console.log("IDInfoHandleClick");
    };
    var shortcutsHandleClick = function (key) {
        console.log("shortcutsHandleClick");
    };
    var uplTsvHandleChange = function () {
        console.log("uplTsvHandleChange");
        console.log("tsvRef.current: ", tsvRef);
    };
    var uplFaaHandleChange = function () {
        console.log("uplFaaHandleChange");
        console.log("faaRef.current: ", faaRef);
    };
    var collHandleChange = function () {
        setStt(__assign(__assign({}, sttRef.current), { collapse: !sttRef.current["collapse"] }));
        console.log("collHandleChange");
    };
    var eValueAppliedHandleChange = function () {
        setStt(__assign(__assign({}, sttRef.current), { eValueApplied: !sttRef.current["eValueApplied"] }));
        console.log("eValueAppliedHandleChange");
    };
    var eValueHandleKeyDown = function (event) {
        if (event.key === "Enter") {
            if (sttRef.current["eValueApplied"]) {
                setStt(__assign(__assign({}, sttRef.current), { eValue: eValueRef.current.value }));
            }
            else {
                setStt(__assign(__assign({}, sttRef.current), { eValue: eValueRef.current.value }));
            }
            console.log("eValueHandleKeyDown: ", eValueRef.current.value);
        }
    };
    var viewHandleChange = function () {
        console.log("viewHandleChange", radioRef.current);
    };
    var dldOnClick = function () {
        console.log("dldOnClick");
    };
    var tsvRef = React.useRef();
    var faaRef = React.useRef();
    var eValueRef = React.useRef({ value: 0 });
    var radioRef = React.useRef({ value: 0 });
    return (React.createElement("div", null,
        React.createElement(exports.LeftSectionCtx.Provider, { value: __assign(__assign({}, stt["relTaxSet"][stt["lyr"]]), { rawCount: stt["rawTaxSet"][stt["lyr"]]
                    ? stt["rawTaxSet"][stt["lyr"]]["unaCount"]
                    : 0, id: stt["rawTaxSet"][stt["lyr"]]
                    ? stt["rawTaxSet"][stt["lyr"]]["taxID"]
                    : (_a = stt["fetchedIDs"][stt["lyr"]]) !== null && _a !== void 0 ? _a : undefined, IDInfoHandleClick: IDInfoHandleClick, ancestors: stt["ancestors"], hovered: stt["relTaxSet"][hover] }) },
            React.createElement(LeftSection_js_1["default"], null)),
        React.createElement(exports.RightSectionCtx.Provider, { value: {
                tsvLastTry: stt.tsvLastTry,
                tsvLoadStatus: stt.tsvLoadStatus,
                uplTsvHandleChange: uplTsvHandleChange,
                tsvFormRef: tsvRef,
                faaLastTry: stt.faaLastTry,
                faaLoadStatus: stt.faaLoadStatus,
                uplFaaHandleChange: uplFaaHandleChange,
                faaFormRef: faaRef,
                coll: stt["collapse"],
                collHandleChange: collHandleChange,
                eValueApplied: stt["eValueApplied"],
                eValueAppliedHandleChange: eValueAppliedHandleChange,
                eValueHandleKeyDown: eValueHandleKeyDown,
                eValueRef: eValueRef,
                radioRef: radioRef,
                viewHandleChange: viewHandleChange,
                dldOnClick: dldOnClick
            } },
            React.createElement(RightSection_js_1["default"], null)),
        React.createElement("button", { onMouseOver: function () { return setHover("Salmonella genus"); }, onMouseOut: function () { return setHover(""); }, style: { position: "fixed", top: "50%", left: "50%" } }, "Salmonella")));
};
exports["default"] = App;
