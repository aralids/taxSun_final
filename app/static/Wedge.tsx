import * as React from "react";
import Shape from "./Shape.js";
import Label from "./Label.js";
import LabelFrame from "./LabelFrame.js";
//import { calcSVGPath } from "./functions.js";

const Wedge = ({
	shD,
	shFill,
	shStrokeWidth,
	lbContent,
	lbDisplay,
	lbFontSize,
	lbFontWeight,
	lbTransform,
	lbX,
	lbY,
	lbfDisplay,
	lbfTransform,
	lbfWidth,
	lbfX,
	lbfY,
}) => {
	const immut = {
		shStroke: "#800080",
		lbFill: "#800080",
		lbFontFamily: "calibri",
		lbLineHeight: "2vmin",
		lbMargin: "0px",
		lbPadding: "0px",
		lbPosition: "absolute",
		lbfFill: "#ffffff",
		lbfHeight: "3vmin",
		lbfPosition: "absolute",
		lbfStroke: "#800080",
		lbfStrokeWidth: "0.2vmin",
	};

	//const d = calcSVGPath(layerWidth, params, windowCx, windowCy);
	return (
		<g>
			<Shape
				d={shD}
				fill={shFill}
				stroke={immut["shStroke"]}
				strokeWidth={shStrokeWidth}
			/>
			<LabelFrame
				display={lbfDisplay}
				fill={immut["lbfFill"]}
				height={immut["lbfHeight"]}
				position={immut["lbfPosition"]}
				stroke={immut["lbfStroke"]}
				strokeWidth={immut["lbfStrokeWidth"]}
				transform={lbfTransform}
				width={lbfWidth}
				x={lbfX}
				y={lbfY}
			/>
			<Label
				content={lbContent}
				display={lbDisplay}
				fill={immut["lbFill"]}
				fontFamily={immut["lbFontFamily"]}
				fontSize={lbFontSize}
				fontWeight={lbFontWeight}
				lineHeight={immut["lbLineHeight"]}
				margin={immut["lbMargin"]}
				padding={immut["lbPadding"]}
				position={immut["lbPosition"]}
				transform={lbTransform}
				x={lbX}
				y={lbY}
			/>
		</g>
	);
};

export default React.memo(Wedge);
