"use strict";
exports.__esModule = true;
exports.makeID = exports.getViewportDimensions = exports.getFourCorners = exports.lineLength = exports.lineIntersect = exports.tintify = exports.midColor = exports.hexToRGB = exports.handleMouseMove = exports.cos = exports.sin = exports.round = exports.radians = exports.createPalette = void 0;
function createPalette(colorOffset) {
    var newColors = [];
    for (var i = 0; i < 7; i++) {
        var r = Math.sin(0.3 * colorOffset + 4) * 55 + 200;
        var g = Math.sin(0.3 * colorOffset + 2) * 55 + 200;
        var b = Math.sin(0.3 * colorOffset) * 55 + 200;
        var newColor = "rgb(".concat(round(r, 0), ", ").concat(round(g, 0), ", ").concat(round(b, 0), ")");
        newColors.push(newColor);
        colorOffset += 3;
    }
    return newColors;
}
exports.createPalette = createPalette;
function round(number, decimal) {
    if (decimal === void 0) { decimal = 3; }
    return (Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal));
}
exports.round = round;
function radians(degrees) {
    degrees = 270 - degrees;
    var pi = Math.PI;
    return degrees * (pi / 180);
}
exports.radians = radians;
function cos(number) {
    return Math.cos(radians(number));
}
exports.cos = cos;
function sin(number) {
    return Math.sin(radians(number));
}
exports.sin = sin;
function handleMouseMove(event) {
    var eventDoc, doc, body;
    event = event || window.event; // IE-ism
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }
    console.log("cursorX, cursorY: ", event.pageX, event.pageY);
}
exports.handleMouseMove = handleMouseMove;
function hexToRGB(hex) {
    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return "rgb(".concat(aRgb[0], ", ").concat(aRgb[1], ", ").concat(aRgb[2], ")");
}
exports.hexToRGB = hexToRGB;
function midColor(rgb1, rgb2, coef) {
    var _a, _b, _c, _d;
    var coef = coef / 2;
    var rgb1List = (_b = (_a = rgb1.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.map(function (item) { return parseInt(item); })) !== null && _b !== void 0 ? _b : [];
    var rgb2List = (_d = (_c = rgb2.match(/\d+/g)) === null || _c === void 0 ? void 0 : _c.map(function (item) { return parseInt(item); })) !== null && _d !== void 0 ? _d : [];
    var newRgb = [];
    for (var i = 0; i < 3; i++) {
        var newNum = rgb1List[i] < rgb2List[i] ? rgb1List[i] + (coef * (rgb2List[i] - rgb1List[i])) : rgb1List[i] - (coef * (rgb1List[i] - rgb2List[i]));
        newRgb.push(Math.round(newNum));
    }
    return "rgb(".concat(newRgb[0], ", ").concat(newRgb[1], ", ").concat(newRgb[2], ")");
}
exports.midColor = midColor;
function tintify(rgb, tintFactor) {
    var _a, _b;
    var rgbList = (_b = (_a = rgb.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.map(function (item) { return parseInt(item); })) !== null && _b !== void 0 ? _b : [];
    var newRgb = [];
    for (var i = 0; i < 3; i++) {
        var newNum = rgbList[i] + ((255 - rgbList[i]) * tintFactor);
        newRgb.push(Math.round(newNum));
    }
    return "rgb(".concat(newRgb[0], ", ").concat(newRgb[1], ", ").concat(newRgb[2], ")");
}
exports.tintify = tintify;
function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var ua, ub, denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1)
    };
}
exports.lineIntersect = lineIntersect;
function lineLength(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
exports.lineLength = lineLength;
function getFourCorners(top, bottom, left, right, cx, cy, angle) {
    if (!angle && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        angle = 0;
    }
    var topLeft = [((left - cx) * Math.cos(angle * (Math.PI / 180)) - (top - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((left - cx) * Math.sin(angle * (Math.PI / 180)) + (top - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var topRight = [((right - cx) * Math.cos(angle * (Math.PI / 180)) - (top - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((right - cx) * Math.sin(angle * (Math.PI / 180)) + (top - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var bottomLeft = [((left - cx) * Math.cos(angle * (Math.PI / 180)) - (bottom - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((left - cx) * Math.sin(angle * (Math.PI / 180)) + (bottom - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    var bottomRight = [((right - cx) * Math.cos(angle * (Math.PI / 180)) - (bottom - cy) * Math.sin(angle * (Math.PI / 180))) + cx, ((right - cx) * Math.sin(angle * (Math.PI / 180)) + (bottom - cy) * Math.cos(angle * (Math.PI / 180))) + cy];
    return { topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight };
}
exports.getFourCorners = getFourCorners;
function getViewportDimensions() {
    var dpmm = document.getElementById('dpmm').offsetWidth; // returns the div's width in px, thereby telling us how many px equal 1mm for our particular screen
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var twoVMin = window.innerHeight < window.innerWidth ? window.innerHeight / 50 : window.innerWidth / 50;
    return {
        "cx": cx,
        "cy": cy,
        "dpmm": dpmm,
        "2vmin": twoVMin
    };
}
exports.getViewportDimensions = getViewportDimensions;
function makeID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
exports.makeID = makeID;
