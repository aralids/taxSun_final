import * as React from "react";
import Upload from "./Upload.js";
import ViewingModes from "./ViewingModes.js";
import Download from "./Download.js";

const RightSectionCtx = () => {
	return React.useMemo(() => {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					left: "80vw",
					position: "fixed",
					top: "0",
					width: "18vw",
				}}
			>
				<Upload />
				<ViewingModes />
				<Download />
			</div>
		);
	}, []);
};
export default RightSectionCtx;
