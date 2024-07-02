import * as React from "react";
import UploadTSV from "./UploadTSV.js";

const Upload = () => {
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
				}}
			>
				<legend style={{ color: "#800080", fontWeight: "bold" }}>
					UPLOAD YOUR DATA
				</legend>
				<UploadTSV />
			</fieldset>
		);
	}, []);
};

export default Upload;
