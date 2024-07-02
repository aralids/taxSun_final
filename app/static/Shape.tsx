import * as React from "react";

const Shape = ({ d, fill, stroke, strokeWidth }) => {
	return (
		<path
			d={d}
			style={{ fill: fill, stroke: stroke, strokeWidth: strokeWidth }}
		></path>
	);
};

export default Shape;
