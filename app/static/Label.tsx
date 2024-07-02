import * as React from "react";

const Label = ({
	content,
	display,
	fill,
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	margin,
	padding,
	position,
	transform,
	x,
	y,
}) => {
	return (
		<text
			style={{
				display: display,
				fill: fill,
				fontFamily: fontFamily,
				fontSize: fontSize,
				fontWeight: fontWeight,
				lineHeight: lineHeight,
				margin: margin,
				padding: padding,
				position: position,
			}}
			transform={transform}
			x={x}
			y={y}
		>
			{content}
		</text>
	);
};

export default Label;
