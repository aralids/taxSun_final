import * as React from "react";
import BasicLayerInfo from "./BasicLayerInfo.js";
import IDInfo from "./IDInfo.js";
import Shortcuts from "./Shortcuts.js";
import { LeftSectionCtx } from "./App";

const LayerInfo = () => {
	const ctx = React.useContext(LeftSectionCtx);
	const signature = JSON.stringify(ctx["bsc"]);

	return React.useMemo(() => {
		console.log("LayerInfo render");
		return (
			<fieldset
				style={{
					borderColor: "#800080",
					borderRadius: "5px",
					margin: "0",
					marginTop: "2vh",
					maxWidth: "18vw",
					padding: "1.5vh 1.5vw 1.5vh 1.5vw",
				}}
			>
				<legend style={{ color: "#800080", fontWeight: "bold" }}>
					CURRENT LAYER
				</legend>
				<BasicLayerInfo />
				<IDInfo />
				<Shortcuts />
			</fieldset>
		);
	}, [signature]);
};

export default LayerInfo;
