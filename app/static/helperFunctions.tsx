function createPalette(colorOffset:number):string[] {
    let newColors:string[] = []
    for (let i=0; i<7; i++) {
        var r = Math.sin(0.3 * colorOffset + 4) * 55 + 200;
        var g = Math.sin(0.3 * colorOffset + 2) * 55 + 200;
        var b = Math.sin(0.3 * colorOffset) * 55 + 200;
        var newColor = `rgb(${round(r,0)}, ${round(g,0)}, ${round(b,0)})`;
        newColors.push(newColor);
        colorOffset += 3;
    }
    return newColors;
}

function round(number, decimal=3):number {
    return (Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal));
}

function radians(degrees):number {
    degrees = 270 - degrees;
    var pi = Math.PI;
    return degrees * (pi/180);
}

function cos(number):number {
    return Math.cos(radians(number));
}

function sin(number):number {
    return Math.sin(radians(number));
}

function handleMouseMove(event):void {
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
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    
    console.log("cursorX, cursorY: ", event.pageX, event.pageY);
}

function hexToRGB(hex):string {
    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return `rgb(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]})`;
}

function midColor(rgb1:string, rgb2:string, coef:number):string {
    var coef = coef / 2;
    var rgb1List:number[] = rgb1.match(/\d+/g)?.map(item => parseInt(item)) ?? [];
    var rgb2List:number[] = rgb2.match(/\d+/g)?.map(item => parseInt(item)) ?? [];
    var newRgb:number[] = [];
    for (let i = 0; i < 3; i++) {
        var newNum = rgb1List[i] < rgb2List[i] ? rgb1List[i] + (coef * (rgb2List[i] - rgb1List[i])) : rgb1List[i] - (coef * (rgb1List[i] - rgb2List[i]));
        newRgb.push(Math.round(newNum));
    }
    return `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
}

function tintify(rgb:string, tintFactor:number):string {
    var rgbList:number[] = rgb.match(/\d+/g)?.map(item => parseInt(item)) ?? [];
    var newRgb:number[] = [];
    for (let i = 0; i < 3; i++) {
        var newNum = rgbList[i] + ((255 - rgbList[i]) * tintFactor);
        newRgb.push(Math.round(newNum));
    }
    return `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
}

function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
    
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1)
    };
}

function lineLength(x1, y1,x2, y2) {
    return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}

function getFourCorners(top:number, bottom:number, left:number, right:number, cx:number, cy:number, angle:number):object {
    if (!angle && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        angle = 0;
    }
    var topLeft:number[] = [((left-cx)*Math.cos(angle* (Math.PI/180)) - (top-cy)*Math.sin(angle* (Math.PI/180))) + cx, ((left-cx)*Math.sin(angle* (Math.PI/180)) + (top-cy)*Math.cos(angle* (Math.PI/180))) + cy];
    var topRight:number[] = [((right-cx)*Math.cos(angle* (Math.PI/180)) - (top-cy)*Math.sin(angle* (Math.PI/180))) + cx, ((right-cx)*Math.sin(angle* (Math.PI/180)) + (top-cy)*Math.cos(angle* (Math.PI/180))) + cy];
    var bottomLeft:number[] = [((left-cx)*Math.cos(angle* (Math.PI/180)) - (bottom-cy)*Math.sin(angle* (Math.PI/180))) + cx, ((left-cx)*Math.sin(angle* (Math.PI/180)) + (bottom-cy)*Math.cos(angle* (Math.PI/180))) + cy];
    var bottomRight:number[] = [((right-cx)*Math.cos(angle* (Math.PI/180)) - (bottom-cy)*Math.sin(angle* (Math.PI/180))) + cx, ((right-cx)*Math.sin(angle* (Math.PI/180)) + (bottom-cy)*Math.cos(angle* (Math.PI/180))) + cy];
    return {topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight};
}

function getViewportDimensions():object {
    var dpmm:number = document.getElementById('dpmm')!.offsetWidth; // returns the div's width in px, thereby telling us how many px equal 1mm for our particular screen
    var cx:number = window.innerWidth / 2;
    var cy:number = window.innerHeight / 2;
    var twoVMin:number = window.innerHeight < window.innerWidth ? window.innerHeight / 50 : window.innerWidth / 50;
    console.log("2vmin: ", twoVMin);
    return {
        "cx": cx,
        "cy": cy,
        "dpmm": dpmm,
        "2vmin": twoVMin
    }
}

export {createPalette, radians, round, sin, cos, handleMouseMove, hexToRGB, midColor, tintify, lineIntersect, lineLength, getFourCorners, getViewportDimensions}