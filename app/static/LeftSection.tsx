import * as React from "react";
import HoverInfo from "./HoverInfo.js";
import LayerInfo from "./LayerInfo.js";

const LeftSection = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				left: "2vw",
				position: "fixed",
				top: "0",
				width: "18vw",
			}}
		>
			<LayerInfo />
			<HoverInfo />
		</div>
	);
};

export default LeftSection;
