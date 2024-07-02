import * as React from "react";
import { RightSectionCtx } from "./App";

const UploadTSV = () => {
	const ctx = React.useContext(RightSectionCtx);
	const signature = ctx["uplStatus"];
	return React.useMemo(() => {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<input id="file-input" type="file" style={{ display: "none" }} />
				<label
					onClick={ctx["uplTSVHandleClick"]}
					htmlFor="file-input"
					style={{
						border: "1px solid grey",
						borderRadius: "3px",
						backgroundColor: "#F0F0F0",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontFamily: "Arial",
						fontSize: "1.8vh",
						padding: "1px 6px 1px 6px",
						margin: "0",
						width: "100%",
					}}
				>
					<span
						id="status"
						className="material-symbols-outlined"
						style={{ display: "inline" }}
					>
						upload
					</span>
					.tsv
				</label>
				<span
					id="status"
					className="material-symbols-outlined"
					style={{ display: "inline" }}
				>
					{ctx["uplStatus"]}
				</span>
			</div>
		);
	}, [signature]);
};

export default UploadTSV;
