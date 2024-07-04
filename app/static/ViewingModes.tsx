import * as React from "react";
import Collapse from "./Collapse.js";
import EValue from "./EValue.js";
import Views from "./Views.js";

const ViewingModes = () => {
	return React.useMemo(() => {
		return (
			<fieldset
				style={{
					borderColor: "#800080",
					borderRadius: "5px",
					margin: "0",
					marginTop: "2vh",
					maxWidth: "18vw",
					padding: "1.5vh 1.5vw 1.5vh 1.5vw",
					wordBreak: "break-all",
				}}
			>
				<legend
					style={{
						color: "#800080",
						fontWeight: "bold",
						wordBreak: "keep-all",
					}}
				>
					VIEW
				</legend>
				<Collapse />
				<EValue />
				<Views />
			</fieldset>
		);
	}, []);
};

export default ViewingModes;
