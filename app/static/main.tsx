import * as React from "react";
import * as ReactDOM from "react-dom/client";
var path = "C:/Users/PC/Desktop/krona/krona.tsv";
var allTaxa:object;
var taxonList:Taxon[] = [];
var lineagesNamesOnlyArray:string[][] = [];
const domContainer:any = document.querySelector('#plot-container');
var reactRoot = ReactDOM.createRoot(domContainer);
const domContainer2:any = document.querySelector('#labels');
var reactRoot2 = ReactDOM.createRoot(domContainer2);
var viewportDimensions = getViewportDimensions();


loadDataFromTSV(path);
$(document).ajaxStop(function() {
    var taxName:string;
    for (taxName of Object.keys(allTaxa)) {
        var newTaxon:Taxon = new Taxon(taxName);
        taxonList.push(newTaxon);
        lineagesNamesOnlyArray.push(newTaxon.lineage.map(item => item[1]));
    }
    lineagesNamesOnlyArray.sort();
    console.log("taxNames: ", lineagesNamesOnlyArray);
    // var fullPlot:Plot = new Plot();
    // var mycosphaerellalesPlot:Plot = new Plot("Bacteria", 0, true, viewportDimensions);
    // var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, true, viewportDimensions);
    // var mycosphaerellalesPlot:Plot = new Plot("Mycosphaerellales", 8, false, viewportDimensions);
    // var mycosphaerellalesPlot:Plot = new Plot("Eurotiomycetes", 6, false);
    var mycosphaerellalesPlot:Plot = new Plot("Leotiomycetes", 6, false);
    addEventListener("resize", (event) => {
        console.log("resize event");
        viewportDimensions = getViewportDimensions();
        mycosphaerellalesPlot.updateviewportDimensions(viewportDimensions);
        mycosphaerellalesPlot.calculateSVGPaths();
        mycosphaerellalesPlot.getTaxonLabelSpecifics();
        mycosphaerellalesPlot.getTaxonShapeSpecifics();
        mycosphaerellalesPlot.draw();
    });
})

function loadDataFromTSV(tsv_path) {
    $.ajax({
        type: "GET",
        url: "/load_tsv_data",
        data: {"tsv_path": tsv_path},
        success: function (response) {
            allTaxa = response["taxDict"];
            console.log("SUCCESS: ", allTaxa)
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
}

// 1 extra Talaromyces sect. Talaromyces

class Taxon {
    name:string;
    taxID:string;
    rank:string;
    lineage:string[][];
    unassignedCount:number;
    totalCount:number;

    constructor (name:string) {
        this.name = name;
        this.getData();
    }

    getData():void {
        this.taxID = allTaxa[this.name].taxID;
        this.rank = allTaxa[this.name].rank;
        this.lineage = allTaxa[this.name].lineageNames;
        this.totalCount = allTaxa[this.name].totalCount;
        this.unassignedCount = allTaxa[this.name].unassignedCount;
    }
}

class Plot {
    root:string;
    layer:number;
    viewportDimensions:object;
    lineages:string[][];
    structure:object = {};
    structureByTaxon:object = {};
    svgPaths:object = {};
    taxonLabelSpecifics:object = {};
    taxonShapeSpecifics:object = {};

    constructor (root:string = "", layer:number = -1, collapse:boolean = true) {
        this.root = root;
        this.layer = layer;
        this.viewportDimensions = viewportDimensions;
        this.getOnlyNecessaryLineages();
        if (collapse) {
            this.collapse();
        }
        this.assignDegrees();
        this.calculateSVGPaths();
        this.getTaxonLabelSpecifics();
        this.getTaxonShapeSpecifics();
        this.draw();
    }

    getOnlyNecessaryLineages():void {
        if (this.root === "" && this.layer === -1) {
            this.lineages = lineagesNamesOnlyArray;
            this.lineages = JSON.parse(JSON.stringify(this.lineages));
            this.lineages.map(item => item.indexOf("root") > -1 ? item : item.unshift("root"));
        } else {
            this.lineages = lineagesNamesOnlyArray.filter(item => item[this.layer] === this.root);
            this.lineages = this.lineages.map(item => item.slice(this.layer));
        }
    }

    assignDegrees():void {
        var lineageCounts:number[] = this.lineages.map(item => allTaxa[item[item.length - 1]]["unassignedCount"]);
        var lineageCountsSum:number = lineageCounts.reduce((accumulator, current) => {return accumulator + current;}, 0);
        var sectionStart:number = 0;
        var sectionEnd:number;
        var key:string;
        for (var i=0; i<this.lineages.length; i++) {
            sectionEnd = sectionStart + lineageCounts[i]*360 / lineageCountsSum;
            key = `${sectionStart}-${sectionEnd} deg`
            this.structure[key] = this.lineages[i];
            sectionStart = sectionEnd;
        }
    }

    collapse():void {
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(this.lineages));
        var layers = this.getLayers(lineagesCopy);

        for (let i=0; i<layers.length-1; i++) {
            for (let j=0; j<layers[i].length; j++) {
                if (layers[i].filter(item => item === layers[i][j]).length === 1 && Boolean(layers[i+1][j])) {
                    lineagesCopy[j].splice(i,1, "toBeDeleted");
                }
            }
        }
        for (let i=0; i<lineagesCopy.length; i++) {
            lineagesCopy[i] = lineagesCopy[i].filter(item => item !== "toBeDeleted");
        }
        this.lineages = lineagesCopy;
    }

    calculateSVGPaths():void {
        var cx = this.viewportDimensions["cx"];
        var cy = this.viewportDimensions["cy"];
        var dpmm = this.viewportDimensions["dpmm"];
        var structureByTaxon:object = {};
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(this.lineages));
        var layers:object = this.getLayers(lineagesCopy);
        var layersUnique:object = this.getLayers(lineagesCopy, true);
        var numberOfLayers = Object.keys(layers).length;
        var smallerDimension = Math.min(cx, cy);
        var layerWidthInPx:number = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 5);

        for (let i=1; i<Object.keys(layersUnique).length; i++) {
            for (let j=0; j<layersUnique[i].length; j++) {
                var key:string = layersUnique[i][j];
                var firstOccurrenceInLayer:number = layers[i].indexOf(key);
                var lastOccurrenceInLayer:number = layers[i].lastIndexOf(key);
                var structureSectionsArray:string[] = Object.keys(this.structure);
                var startDegrees:number = Number(structureSectionsArray[firstOccurrenceInLayer].slice(0,structureSectionsArray[firstOccurrenceInLayer].length-4).split("-")[0]);
                var potentialMidDegrees:number = Number(structureSectionsArray[firstOccurrenceInLayer].slice(0,structureSectionsArray[firstOccurrenceInLayer].length-4).split("-")[1]);
                var endDegrees:number = Number(structureSectionsArray[lastOccurrenceInLayer].slice(0,structureSectionsArray[lastOccurrenceInLayer].length-4).split("-")[1]);
                var verticalMin:number = i;
                var verticalMax:number;
                if (i != Object.keys(layersUnique).length-1) {
                        if (!Boolean(layers[i+1][firstOccurrenceInLayer])) {
                            verticalMax = Object.keys(layers).length;
                        } else {
                            verticalMax = i+1;
                        }
                } else {
                    verticalMax = i+1;
                }
                
                var breakingPoint:any = verticalMax === verticalMin + 1 || potentialMidDegrees === endDegrees ? null : potentialMidDegrees;
                key += `_-_${i}`;
                structureByTaxon[key] = {
                    "horizontalWidthInDeg": [startDegrees, endDegrees],
                    "verticalWidthInLayerIndices": [verticalMin, verticalMax],
                    "breakingPoint": breakingPoint
                }; 
            }
        }
        this.structureByTaxon = structureByTaxon;

        var firstLayer = (key) => {return this.structureByTaxon[key].verticalWidthInLayerIndices[0]};
        var lastLayer = (key) => {return this.structureByTaxon[key].verticalWidthInLayerIndices[1]};
        var startDeg = (key) => {return this.structureByTaxon[key].horizontalWidthInDeg[0]};
        var endDeg = (key) => {return this.structureByTaxon[key].horizontalWidthInDeg[1]};
        var breakingPt = (key) => {return this.structureByTaxon[key].breakingPoint};

        for (var key of Object.keys(this.structureByTaxon)) {
            var innerArcX1:number = firstLayer(key) * layerWidthInPx * cos(startDeg(key));
            innerArcX1 = round(innerArcX1) + cx;
            var innerArcY1:number = - firstLayer(key) * layerWidthInPx * sin(startDeg(key));
            innerArcY1 = round(innerArcY1) + cy;
            var innerArcX2:number = firstLayer(key) * layerWidthInPx * cos(endDeg(key));
            innerArcX2 = round(innerArcX2) + cx;
            var innerArcY2:number = - firstLayer(key) * layerWidthInPx * sin(endDeg(key));
            innerArcY2 = round(innerArcY2) + cy;
            var innerArc:string = `M ${innerArcX1},${innerArcY1} A ${round(firstLayer(key)*layerWidthInPx)},${round(firstLayer(key)*layerWidthInPx)} 0 0 1 ${innerArcX2},${innerArcY2}`;
            if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                var innerArc:string = `M ${innerArcX1},${innerArcY1} A ${round(firstLayer(key)*layerWidthInPx)},${round(firstLayer(key)*layerWidthInPx)} 0 1 1 ${innerArcX2},${innerArcY2}`;
            };

            var allMs:string[] = [innerArc];

            if (Boolean(breakingPt(key))) {
                var outerArcX1:number = lastLayer(key) * layerWidthInPx * cos(startDeg(key));
                outerArcX1 = round(outerArcX1) + cx;
                var outerArcY1:number = - lastLayer(key) * layerWidthInPx * sin(startDeg(key));
                outerArcY1 = round(outerArcY1) + cy;
                var outerArcX2:number = lastLayer(key) * layerWidthInPx * cos(breakingPt(key));
                outerArcX2 = round(outerArcX2) + cx;
                var outerArcY2:number = - lastLayer(key) * layerWidthInPx * sin(breakingPt(key));
                outerArcY2 = round(outerArcY2) + cy;
                var outerArc:string = `L ${outerArcX2},${outerArcY2} A ${round(lastLayer(key)*layerWidthInPx)},${round(lastLayer(key)*layerWidthInPx)} 0 0 0 ${outerArcX1},${outerArcY1}`;

                var midArcX1:number = (firstLayer(key)+1) * layerWidthInPx * cos(breakingPt(key));
                midArcX1 = round(midArcX1) + cx;
                var midArcY1:number = - (firstLayer(key)+1) * layerWidthInPx * sin(breakingPt(key));
                midArcY1 = round(midArcY1) + cy;
                var midArcX2:number = (firstLayer(key)+1) * layerWidthInPx * cos(endDeg(key));
                midArcX2 = round(midArcX2) + cx;
                var midArcY2:number = - (firstLayer(key)+1) * layerWidthInPx * sin(endDeg(key));
                midArcY2 = (Math.round(midArcY2 * 1000) / 1000) + cy;
                
                var midArc:string = `L ${midArcX2},${midArcY2} A ${round((firstLayer(key)+1)*layerWidthInPx)},${round((firstLayer(key)+1)*layerWidthInPx)} 0 0 0 ${midArcX1},${midArcY1}`;
                if (Math.abs(breakingPt(key) - startDeg(key)) >= 180) {
                    var midArc:string = `L ${midArcX2},${midArcY2} A ${round((firstLayer(key)+1)*layerWidthInPx)},${round((firstLayer(key)+1)*layerWidthInPx)} 0 1 0 ${midArcX1},${midArcY1}`;  
                };

                var lineInnerToMid = `L ${innerArcX2},${innerArcY2} ${midArcX2},${midArcY2}`;
                var lineOuterToMid = `L ${midArcX1},${midArcY1} ${outerArcX2},${outerArcY2}`;

                allMs.push(lineInnerToMid);
                allMs.push(midArc);
                allMs.push(lineOuterToMid);
                allMs.push(outerArc);
            } else {
                var outerArcX1:number = lastLayer(key) * layerWidthInPx * cos(startDeg(key));
                outerArcX1 = (Math.round(outerArcX1 * 1000) / 1000) + cx;
                var outerArcY1:number = - lastLayer(key) * layerWidthInPx * sin(startDeg(key));
                outerArcY1 = (Math.round(outerArcY1 * 1000) / 1000) + cy;
                var outerArcX2:number = lastLayer(key) * layerWidthInPx * cos(endDeg(key));
                outerArcX2 = (Math.round(outerArcX2 * 1000) / 1000) + cx;
                var outerArcY2:number = - lastLayer(key) * layerWidthInPx * sin(endDeg(key));
                outerArcY2 = (Math.round(outerArcY2 * 1000) / 1000) + cy;
                var outerArc:string = `L ${outerArcX2},${outerArcY2} A ${round(lastLayer(key)*layerWidthInPx)},${round(lastLayer(key)*layerWidthInPx)} 0 0 0 ${outerArcX1},${outerArcY1}`;
                if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                    var outerArc:string = `L ${outerArcX2},${outerArcY2} A ${round(lastLayer(key)*layerWidthInPx)},${round(lastLayer(key)*layerWidthInPx)} 0 1 0 ${outerArcX1},${outerArcY1}`;
                };

                var lineInnerToOuter = `L ${innerArcX2},${innerArcY2} ${outerArcX2},${outerArcY2}`
                allMs.push(lineInnerToOuter);
                allMs.push(outerArc);
            }

            var lineInnertoOuter = `L ${outerArcX1},${outerArcY1} ${innerArcX1},${innerArcY1}`;
            allMs.push(lineInnertoOuter);

            var d:string = allMs.join(" ");
            
            this.svgPaths[key] = d;
        };
    }

    getTaxonLabelSpecifics():void {
        var shapeCenters:object = {};
        var cx:number = this.viewportDimensions["cx"];
        var cy:number = this.viewportDimensions["cy"];
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(this.lineages));
        var layers:object = this.getLayers(lineagesCopy);
        var layerWidthInPx:number = Math.max((Math.min(cx, cy) - this.viewportDimensions["dpmm"] * 10) / Object.keys(layers).length , this.viewportDimensions["dpmm"] * 4);
        var firstLayer = (key) => {return this.structureByTaxon[key].verticalWidthInLayerIndices[0]};
        var lastLayer = (key) => {return this.structureByTaxon[key].verticalWidthInLayerIndices[1]};
        var startDeg = (key) => {return this.structureByTaxon[key].horizontalWidthInDeg[0]};
        var endDeg = (key) => {return this.structureByTaxon[key].horizontalWidthInDeg[1]};
        var breakingPt = (key) => {return this.structureByTaxon[key].breakingPoint};

        for (var key of Object.keys(this.structureByTaxon)) {
            let centerDegree, centerRadius;
            if (breakingPt(key) === null) {
                centerDegree = startDeg(key) + (endDeg(key) - startDeg(key))/2;
                centerRadius = firstLayer(key) + (lastLayer(key) - firstLayer(key)) / 2;
            } else {
                centerDegree = startDeg(key) + (endDeg(key) - startDeg(key))/2;
                centerRadius = firstLayer(key) + 0.5;
            }
            let centerX = centerRadius * layerWidthInPx * cos(centerDegree);
            centerX = round(centerX) + cx;
            let centerY = - centerRadius * layerWidthInPx * sin(centerDegree);
            centerY = round(centerY) + cy;
            let center = [centerX, centerY, centerDegree];
            shapeCenters[key] = center;
        };

        for (var key of Object.keys(this.structureByTaxon)) {
            let direction = breakingPt(key) === null && lastLayer(key) === Object.keys(layers).length ? "radial" : "circumferential";
            let twist, left, right, top, transform, transformOrigin;
            if (direction === "radial") {
                twist = shapeCenters[key][2] <= 180 ? - shapeCenters[key][2] : + shapeCenters[key][2];
                left = twist > 0 ? shapeCenters[key][0] : "unset";
                right = left === "unset" ? cx*2 - shapeCenters[key][0] : "unset";
                twist = left === "unset" ? 270 - twist : 360 - (270 - twist);
                top = shapeCenters[key][1] - 9;
                transform = `rotate(${twist}deg)`
                transformOrigin = left === "unset" ? "center right" : "center left";
            } else {
                twist = 270 - shapeCenters[key][2] < 0 ? shapeCenters[key][2] : shapeCenters[key][2] + 180;
                left = shapeCenters[key][0];
                right = "unset";

                top = shapeCenters[key][1] - 9;
                transform = `translate(-50%, 0) rotate(${twist}deg)`;
                transformOrigin = "center center";
            }
            

            this.taxonLabelSpecifics[key] = {
                "direction": direction,
                "left": left,
                "right": right,
                "top": top,
                "transform": transform,
                "transformOrigin": transformOrigin
            }
        };
    }

    getTaxonShapeSpecifics():void {
        // var colors:string[] = ["6CCFF6", "1B998B", "A1E887", "EA638C", "B33C86"];
        // var colors:string[] = ["1B998B", "A1E887", "1E96FC", "B33C86","003F91", ];
        var colors:string[] = ["1B998B", "A1E887", "1E96FC", "F21B3F", "B33C86","003F91", ];
        colors = colors.map(hexToRGB);
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(this.lineages));
        var layers:string[][] = this.getLayers(lineagesCopy);
        var layersUnique:string[][] = this.getLayers(lineagesCopy, true);
        var colorCalculationParameters:object = {};

        for (let i=0; i<layersUnique[1].length; i++) {
            var firstAncestor = layersUnique[1][i];
            if (firstAncestor) {   
                this.taxonShapeSpecifics[`${firstAncestor}_-_1`] = colors[i % colors.length];
            }
        }
        for (let i=2; i<layers.length; i++) {
            for (let j=0; j<layers[i].length; j++) {
                if (layers[i][j]) {
                    var firstAncestor = layers[1][j];
                    var ancestorColor = this.taxonShapeSpecifics[`${firstAncestor}_-_1`];
                    var nextColorIndex = (colors.indexOf(ancestorColor) + 1) % colors.length;
                    var nextColor = colors[nextColorIndex];
                    var selfStartingDegree = this.structureByTaxon[`${layers[i][j]}_-_${i}`].horizontalWidthInDeg[0];
                    var ancestorDegrees = this.structureByTaxon[`${layers[1][j]}_-_${1}`].horizontalWidthInDeg;
                    var coef:number = (selfStartingDegree - ancestorDegrees[0]) / (ancestorDegrees[1] - ancestorDegrees[0]);
                    var tintFactor:number = (i-1) / 10;
                    colorCalculationParameters[layers[i][j]] = [ancestorColor, nextColor, coef, tintFactor];
                    var hue = midColor(ancestorColor, nextColor, coef);
                    var tintifiedHue = tintify(hue, tintFactor);
                    this.taxonShapeSpecifics[`${layers[i][j]}_-_${i}`] = tintifiedHue;
                }
            }
        }
    }

    draw():void {
        // remove GoL;
        reactRoot.render(<PlotDrawing lineages={lineagesNamesOnlyArray}/>);
    }

    getLayers(lineagesCopy:string[][], unique:boolean=false):string[][] {
        var longestLineageLength:number = Math.max(...lineagesCopy.map(item => item.length));
        var layers:string[][] = [];
        for (let i=0; i<longestLineageLength; i++) {
            var layer:string[] = [];
            for (let j=0; j<lineagesCopy.length; j++) {
                layer.push(this.lineages[j][i]);
            }
            if (unique) {
                layer = layer.filter((value, index, self) => Boolean(value) && self.indexOf(value) === index);
            }
            layers.push(layer);
        }
        return layers;
    }

    updateviewportDimensions(newDimensions):void {
        this.viewportDimensions = newDimensions;
    }


}

function radians(degrees):number {
    degrees = 270 - degrees;
    var pi = Math.PI;
    return degrees * (pi/180);
}

// type TaxonShapeProps = {
//    d: string;
// }

//var TaxonShape = ({ d }: TaxonShapeProps) => <path d={d} />;

function getViewportDimensions():object {
    var dpmm:number = document.getElementById('dpmm')!.offsetWidth; // returns the div's width in px, thereby telling us how many px equal 1mm for our particular screen
    var cx:number = window.innerWidth / 2;
    var cy:number = window.innerHeight / 2;
    return {
        "cx": cx,
        "cy": cy,
        "dpmm": dpmm
    }
}

'use strict';

const e = React.createElement;

function TaxonShape(props) {
    return <path id={props.id} d={props.d} onMouseOver={() => hoverHandler(props.id)} onMouseOut={() => onMouseOutHandler(props.id)} onClick={props.onClick} style={{"stroke": "#800080", "strokeWidth": "0.2vmin", "fill": props.fillColor}}/>;
}
function TaxonLabel(props) {
    return <p id={`${props.taxon}-label`} onMouseOver={() => hoverHandler(props.taxon)} onMouseOut={() => onMouseOutHandler(props.taxon)} onClick={props.onClick} style={{"backgroundColor": "white", "margin": "0", "position": "absolute", "fontFamily": "calibri", "fontSize": "2vmin", "left": props.left, "right": props.right, "top": props.top, "transformOrigin": props.transformOrigin, "transform": props.transform, "border": "0.2vmin solid #800080"}}>{props.taxon.replace(/_-_\d+/, "")}</p>
}



class PlotDrawing extends React.Component<{lineages:string[][]}, {root:string, layer:number, collapse:boolean, horizontalShift:number, verticalShift:number, croppedLineages:string[][], structureByDegrees:object, structureByTaxon: object, svgPaths:object, taxonLabels:object, taxonShapes:object, colors:string[]}> {
    constructor(props) {
        super(props);
        this.state = {
            root: "",
            layer: -1,
            collapse: false,
            horizontalShift: viewportDimensions["cx"],
            verticalShift: viewportDimensions["cy"],
            croppedLineages: [],
            structureByDegrees: {},
            structureByTaxon: {},
            svgPaths: {},
            taxonLabels: {},
            taxonShapes: {},
            colors: ["d27979", "c0d279", "79d29c", "799cd2", "c079d2"]
        }
    }

    componentDidMount() {
        this.cropLineages();
    }

    // Leave only relevant lineages and crop them if necessary.
    cropLineages():void {
        var croppedLineages;
        if (this.state.root === "" && this.state.layer === -1) { // if the full plot is requested
            croppedLineages = JSON.parse(JSON.stringify(this.props.lineages)); // make sure changing croppedLineages will not attempt to change this.props.lineages
            croppedLineages.map(item => item.indexOf("root") > -1 ? item : item.unshift("root")); // add "root" to the beginning of every lineage
        } else {
            croppedLineages = this.props.lineages.filter(item => item[this.state.layer] === this.state.root); // filter out all irrelevant lineages
            croppedLineages = croppedLineages.map(item => item.slice(this.state.layer)); // crop remaining lineages so they start with the root taxon
        }

        if (this.state.collapse) {
            croppedLineages = this.collapse(croppedLineages);
        }


        this.assignDegrees({"croppedLineages": croppedLineages});
    }

    // Assign each cropped lineage a start and end degree.
    assignDegrees(newState:object):void {
        var croppedLineagesCopy:string[] = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var unassignedCounts:number[] = croppedLineagesCopy.map(item => allTaxa[item[item.length - 1]]["unassignedCount"]); // get unassigned count of every cropped lineage from the global object allTaxa
        var totalUnassignedCounts:number = unassignedCounts.reduce((accumulator, current) => {return accumulator + current;}, 0); // sum up
        var lineageStartDeg:number = 0;
        var lineageEndDeg:number;
        var key:string;
        var structure:object = {};
        for (var taxonIndex=0; taxonIndex < newState["croppedLineages"].length; taxonIndex++) { 
            lineageEndDeg = lineageStartDeg + unassignedCounts[taxonIndex]*360 / totalUnassignedCounts; 
            if (lineageStartDeg === 0 && lineageEndDeg === 360) {
                lineageEndDeg = 359.75;
            };
            key = `${lineageStartDeg}-${lineageEndDeg} deg`; // name section
            structure[key] = newState["croppedLineages"][taxonIndex]; // assign
            lineageStartDeg = lineageEndDeg;
        }
        newState["structureByDegrees"] = structure;
        this.getStructureByTaxon(newState);
    }

    // If collapse=true, remove taxa that only come up in the lineage of one other taxon and have no unassigned counts of their own.
    collapse(croppedLineages:string[][]):string[][] {
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(croppedLineages));
        var layers = getLayers(lineagesCopy);

        for (let i=0; i<layers.length-1; i++) {
            for (let j=0; j<layers[i].length; j++) {
                if (layers[i].filter(item => item === layers[i][j]).length === 1 && Boolean(layers[i+1][j])) {
                    lineagesCopy[j].splice(i,1, "toBeDeleted");
                }
            }
        }
        for (let i=0; i<lineagesCopy.length; i++) {
            lineagesCopy[i] = lineagesCopy[i].filter(item => item !== "toBeDeleted");
        }
        return lineagesCopy;
    }

    getStructureByTaxon(newState:object):void {
        var structureByTaxon:object = {};
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var layers:string[][] = getLayers(lineagesCopy);
        var layersUnique:string[][] = getLayers(lineagesCopy, true);
        
        console.log("at getStructureByTaxon(): ", layersUnique);

        for (let i=1; i<layersUnique.length; i++) {
            for (let j=0; j<layersUnique[i].length; j++) {
                var key:string = layersUnique[i][j];
                var firstOccurrenceInLayer:number = layers[i].indexOf(key);
                var lastOccurrenceInLayer:number = layers[i].lastIndexOf(key);
                var structureSectionsArray:string[] = Object.keys(newState["structureByDegrees"]);
                var startDegrees:number = Number(structureSectionsArray[firstOccurrenceInLayer].slice(0,structureSectionsArray[firstOccurrenceInLayer].length-4).split("-")[0]);
                var potentialMidDegrees:number = Number(structureSectionsArray[firstOccurrenceInLayer].slice(0,structureSectionsArray[firstOccurrenceInLayer].length-4).split("-")[1]);
                var endDegrees:number = Number(structureSectionsArray[lastOccurrenceInLayer].slice(0,structureSectionsArray[lastOccurrenceInLayer].length-4).split("-")[1]);
                var verticalMin:number = i;
                var verticalMax:number;
                if (i != Object.keys(layersUnique).length-1) {
                        if (!Boolean(layers[i+1][firstOccurrenceInLayer])) {
                            verticalMax = Object.keys(layers).length;
                        } else {
                            verticalMax = i+1;
                        }
                } else {
                    verticalMax = i+1;
                }
                
                var breakingPoint:any = verticalMax === verticalMin + 1 || potentialMidDegrees === endDegrees ? null : potentialMidDegrees;
                key += `_-_${i}`;
                structureByTaxon[key] = {
                    "horizontalWidthInDeg": [startDegrees, endDegrees],
                    "verticalWidthInLayerIndices": [verticalMin, verticalMax],
                    "breakingPoint": breakingPoint
                }; 
            }
        }
        newState["structureByTaxon"] = structureByTaxon;
        this.calculateSVGPaths(newState);
    }

    calculateArcEndpoints(layer:number, layerWidthInPx:number, deg1:number, deg2:number):object {
        var radius:number = layer * layerWidthInPx; // in px
        var x1:number = round(radius * cos(deg1) + this.state.horizontalShift);
        var y1:number = round(- radius * sin(deg1) + this.state.verticalShift);
        var x2:number = round(radius * cos(deg2) + this.state.horizontalShift);
        var y2:number = round(- radius * sin(deg2) + this.state.verticalShift);
    
        return {x1: x1, y1: y1, x2: x2, y2: y2, radius:round(radius)};
    }

    calculateSVGPaths(newState:object):void {
        var dpmm = viewportDimensions["dpmm"];
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var layers:string[][] = getLayers(lineagesCopy);
        var numberOfLayers = Object.keys(layers).length;
        var smallerDimension = Math.min(this.state.horizontalShift, this.state.verticalShift);
        var layerWidth:number = Math.max((smallerDimension - dpmm * 10) / numberOfLayers, dpmm * 5);
        var svgPaths:object = {};

        var firstLayer = (key) => {return newState["structureByTaxon"][key].verticalWidthInLayerIndices[0]};
        var lastLayer = (key) => {return newState["structureByTaxon"][key].verticalWidthInLayerIndices[1]};
        var startDeg = (key) => {return newState["structureByTaxon"][key].horizontalWidthInDeg[0]};
        var endDeg = (key) => {return newState["structureByTaxon"][key].horizontalWidthInDeg[1]};
        var breakingPt = (key) => {return newState["structureByTaxon"][key].breakingPoint};
        

        for (var key of Object.keys(newState["structureByTaxon"])) {
            var innerArc:object = this.calculateArcEndpoints(firstLayer(key), layerWidth, startDeg(key), endDeg(key));
            var innerArcPath:string = `M ${innerArc["x1"]},${innerArc["y1"]} A ${round(firstLayer(key)*layerWidth)},${round(firstLayer(key)*layerWidth)} 0 0 1 ${innerArc["x2"]},${innerArc["y2"]}`;
            if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                var innerArcPath:string = `M ${innerArc["x1"]},${innerArc["y1"]} A ${innerArc["radius"]},${innerArc["radius"]} 0 1 1 ${innerArc["x2"]},${innerArc["y2"]}`;
            };

            var subpaths:string[] = [innerArcPath];

            if (Boolean(breakingPt(key))) {
                var outerArc:object = this.calculateArcEndpoints(lastLayer(key), layerWidth, startDeg(key), breakingPt(key));
                var outerArcPath:string = `L ${outerArc["x2"]},${outerArc["y2"]} A ${outerArc["radius"]},${outerArc["radius"]} 0 0 0 ${outerArc["x1"]},${outerArc["y1"]}`;

                var midArc:object = this.calculateArcEndpoints((firstLayer(key)+1), layerWidth, breakingPt(key), endDeg(key));
                var midArcPath:string = `L ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 0 0 ${midArc["x1"]},${midArc["y1"]}`;
                if (Math.abs(endDeg(key) - breakingPt(key)) >= 180) {
                    var midArcPath:string = `L ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 1 0 ${midArc["x1"]},${midArc["y1"]}`;  
                };
                console.log("key, midArcPath: ", key, midArcPath);

                var lineInnerToMid = `L ${innerArc["x2"]},${innerArc["y2"]} ${midArc["x2"]},${midArc["y2"]}`;
                var lineOuterToMid = `L ${midArc["x1"]},${midArc["y1"]} ${outerArc["x2"]},${outerArc["y2"]}`;

                subpaths.push(lineInnerToMid);
                subpaths.push(midArcPath);
                subpaths.push(lineOuterToMid);
                subpaths.push(outerArcPath);
            } else {
                var outerArc:object = this.calculateArcEndpoints(lastLayer(key), layerWidth, startDeg(key), endDeg(key));
                var outerArcPath:string = `L ${outerArc["x2"]},${outerArc["y2"]} A ${outerArc["radius"]},${outerArc["radius"]} 0 0 0 ${outerArc["x1"]},${outerArc["y1"]}`;
                if (Math.abs(endDeg(key) - startDeg(key)) >= 180) {
                    var outerArcPath:string = `L ${outerArc["x2"]},${outerArc["y2"]} A ${outerArc["radius"]},${outerArc["radius"]} 0 1 0 ${outerArc["x1"]},${outerArc["y1"]}`;
                };

                var lineInnerToOuter = `L ${innerArc["x2"]},${innerArc["y2"]} ${outerArc["x2"]},${outerArc["y2"]}`
                subpaths.push(lineInnerToOuter);
                subpaths.push(outerArcPath);
            }

            var lineInnertoOuter = `L ${outerArc["x1"]},${outerArc["y1"]} ${innerArc["x1"]},${innerArc["y1"]}`;
            subpaths.push(lineInnertoOuter);

            var d:string = subpaths.join(" ");
            
            svgPaths[key] = d;
        };
        newState["svgPaths"] = svgPaths;
        this.calculateTaxonLabels(newState);
    }

    calculateTaxonLabels(newState:object):void {
        var shapeCenters:object = {};
        var cx:number = this.state.horizontalShift;
        var cy:number = this.state.verticalShift;;
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var layers:object = getLayers(lineagesCopy);
        var layerWidthInPx:number = Math.max((Math.min(cx, cy) - viewportDimensions["dpmm"] * 10) / Object.keys(layers).length , viewportDimensions["dpmm"] * 4);
        var firstLayer = (key) => {return newState["structureByTaxon"][key].verticalWidthInLayerIndices[0]};
        var lastLayer = (key) => {return newState["structureByTaxon"][key].verticalWidthInLayerIndices[1]};
        var startDeg = (key) => {return newState["structureByTaxon"][key].horizontalWidthInDeg[0]};
        var endDeg = (key) => {return newState["structureByTaxon"][key].horizontalWidthInDeg[1]};
        var breakingPt = (key) => {return newState["structureByTaxon"][key].breakingPoint};
        var taxonLabels:object = {};
        console.log("at calculateTaxonLabels(): ", taxonLabels);

        for (var key of Object.keys(newState["structureByTaxon"])) {
            let centerDegree, centerRadius;
            if (breakingPt(key) === null) {
                centerDegree = startDeg(key) + (endDeg(key) - startDeg(key))/2;
                centerRadius = firstLayer(key) + (lastLayer(key) - firstLayer(key)) / 2;
            } else {
                centerDegree = startDeg(key) + (endDeg(key) - startDeg(key))/2;
                centerRadius = firstLayer(key) + 0.5;
            }
            let centerX = centerRadius * layerWidthInPx * cos(centerDegree);
            centerX = round(centerX) + cx;
            let centerY = - centerRadius * layerWidthInPx * sin(centerDegree);
            centerY = round(centerY) + cy;
            let center = [centerX, centerY, centerDegree];
            shapeCenters[key] = center;
        };

        for (var key of Object.keys(newState["structureByTaxon"])) {
            let direction = breakingPt(key) === null && lastLayer(key) === Object.keys(layers).length ? "radial" : "circumferential";
            let twist, left, right, top, transform, transformOrigin;
            if (direction === "radial") {
                twist = shapeCenters[key][2] <= 180 ? - shapeCenters[key][2] : + shapeCenters[key][2];
                left = twist > 0 ? shapeCenters[key][0] : "unset";
                right = left === "unset" ? cx*2 - shapeCenters[key][0] : "unset";
                twist = left === "unset" ? 270 - twist : 360 - (270 - twist);
                top = shapeCenters[key][1] - 9;
                transform = `rotate(${twist}deg)`
                transformOrigin = left === "unset" ? "center right" : "center left";
            } else {
                twist = 270 - shapeCenters[key][2] < 0 ? shapeCenters[key][2] : shapeCenters[key][2] + 180;
                left = shapeCenters[key][0];
                right = "unset";

                top = shapeCenters[key][1] - 9;
                transform = `translate(-50%, 0) rotate(${twist}deg)`;
                transformOrigin = "center center";
            }
            

            taxonLabels[key] = {
                "direction": direction,
                "left": left,
                "right": right,
                "top": top,
                "transform": transform,
                "transformOrigin": transformOrigin
            }
        };
        console.log("at calculateTaxonLabels() 2: ", taxonLabels);
        newState["taxonLabels"] = taxonLabels;
        this.getTaxonShapes(newState);
    }

    getTaxonShapes(newState:object):void {
        // var colors:string[] = ["6CCFF6", "1B998B", "A1E887", "EA638C", "B33C86"];
        // var colors:string[] = ["1B998B", "A1E887", "1E96FC", "B33C86","003F91", ];
        var colors = this.state.colors.map(hexToRGB);
        var lineagesCopy:string[][] = JSON.parse(JSON.stringify(newState["croppedLineages"]));
        var layers:string[][] = getLayers(lineagesCopy);
        var layersUnique:string[][] = getLayers(lineagesCopy, true);
        var colorCalculationParameters:object = {};
        var taxonShapes:object = {};
        console.log("colors: ", colors);

        for (let i=0; i<layersUnique[1].length; i++) {
            var firstAncestor = layersUnique[1][i];
            if (firstAncestor) {   
                taxonShapes[`${firstAncestor}_-_1`] = colors[i % colors.length];
            }
        }
        for (let i=2; i<layers.length; i++) {
            for (let j=0; j<layers[i].length; j++) {
                if (layers[i][j]) {
                    var firstAncestor = layers[1][j];
                    var ancestorColor = taxonShapes[`${firstAncestor}_-_1`];
                    var nextColorIndex = (colors.indexOf(ancestorColor) + 1) % colors.length;
                    var nextColor = colors[nextColorIndex];
                    var selfStartingDegree = newState["structureByTaxon"][`${layers[i][j]}_-_${i}`].horizontalWidthInDeg[0];
                    var ancestorDegrees = newState["structureByTaxon"][`${layers[1][j]}_-_${1}`].horizontalWidthInDeg;
                    var coef:number = (selfStartingDegree - ancestorDegrees[0]) / (ancestorDegrees[1] - ancestorDegrees[0]);
                    var tintFactor:number = (i-1) / 10;
                    colorCalculationParameters[layers[i][j]] = [ancestorColor, nextColor, coef, tintFactor];
                    var hue = midColor(ancestorColor, nextColor, coef);
                    var tintifiedHue = tintify(hue, tintFactor);
                    taxonShapes[`${layers[i][j]}_-_${i}`] = tintifiedHue;
                }
            }
        }
        newState["taxonShapes"] = taxonShapes;
        this.setState(newState, () => console.log("taxonShapes: ", this.state));
    }

    handleClick(shapeId):void {
        console.log("shapeId: ", shapeId);
        var taxon:string = shapeId.match(/.+?(?=_)/)[0];
        var currLayer:number = parseInt(shapeId.match(/\d+/)[0]);
        
        console.log("Clicked! ", taxon, currLayer + this.state.layer);
        this.setState({"root": taxon, "layer": currLayer + Math.max(0, this.state.layer)}, () => this.cropLineages());
        
    }


    render() {
        var shapes:any = [];
        var labels:any = [];
        for (let item of Object.keys(this.state.svgPaths)) {
            shapes.push(<TaxonShape id={item} onClick={() => this.handleClick(item)} d={this.state.svgPaths[item]} strokeWidth={viewportDimensions["dpmm"] * 0.265} fillColor={this.state.taxonShapes[item]}/>);
        }
        for (let item of Object.keys(this.state.taxonShapes)) {
            labels.push(<TaxonLabel taxon={item} transform={this.state.taxonLabels[item]["transform"]} left={this.state.taxonLabels[item]["left"]} right={this.state.taxonLabels[item]["right"]} top={this.state.taxonLabels[item]["top"]} transformOrigin={this.state.taxonLabels[item]["transformOrigin"]} onClick={() => {this.handleClick(item)}}/>)
        }
        return [<svg style={{"height": "100%", "width": "100%", "margin": "0", "padding": "0", "boxSizing": "border-box", "border": "none"}} id="shapes">{shapes}</svg>,<div id="labels">{labels}</div>]
    }
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

function round(number, decimal=3):number {
    return (Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal));
}

function cos(number):number {
    return Math.cos(radians(number));
}

function sin(number):number {
    return Math.sin(radians(number));
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

function hoverHandler(id:string):void {
    console.log("id: ", id);
    if (id.indexOf("-label") > -1) {
        var label = id;
        var shape = id.replace("-label", "");
    } else {
        var shape = id;
        var label = id + "-label";
    }
    document.getElementById(shape)!.style.strokeWidth = "0.4vmin";
    document.getElementById(label)!.style.fontWeight = "bold";
    document.getElementById(label)!.style.zIndex = "1000";
    document.getElementById(label)!.style.border = "0.4vmin solid #800080";
}

function onMouseOutHandler(id:string):void {
    console.log("id: ", id);
    if (id.indexOf("-label") > -1) {
        var label = id;
        var shape = id.replace("-label", "");
    } else {
        var shape = id;
        var label = id + "-label";
    }
    document.getElementById(shape)!.style.strokeWidth = "0.2vmin";
    document.getElementById(label)!.style.fontWeight = "normal";
    document.getElementById(label)!.style.zIndex = "unset";
    document.getElementById(label)!.style.border = "0.2vmin solid #800080";
}

// Returns a set of arrays, where each array contains all elements that will be on the same level in the plot.
function getLayers(lineagesCopy:string[][], unique:boolean=false):string[][] {
    var longestLineageLength:number = Math.max(...lineagesCopy.map(item => item.length)); // get the length of the longest lineage, i.e. how many layers the plot will have
    var layers:string[][] = [];
    for (let i=0; i<longestLineageLength; i++) {
        var layer:string[] = [];
        for (let j=0; j<lineagesCopy.length; j++) {
            layer.push(lineagesCopy[j][i]);
        }
        if (unique) { 
            layer = layer.filter((value, index, self) => Boolean(value) && self.indexOf(value) === index);
        }
        layers.push(layer);
    }
    return layers;
}

