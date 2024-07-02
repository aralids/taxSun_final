import * as React from "react";

const LabelFrame = ({
	display,
	fill,
	height,
	position,
	stroke,
	strokeWidth,
	transform,
	width,
	x,
	y,
}) => {
	return (
		<rect
			fill={fill}
			height={height}
			stroke={stroke}
			style={{ display: display, position: position, strokeWidth: strokeWidth }}
			transform={transform}
			width={width}
			x={x}
			y={y}
		></rect>
	);
};

export default LabelFrame;
