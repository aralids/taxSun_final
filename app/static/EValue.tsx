import * as React from "react";
import { RightSectionCtx } from "./App";

const EValue = () => {
	const ctx = React.useContext(RightSectionCtx);
	const signature = JSON.stringify(ctx["eValueApplied"]);
	return React.useMemo(() => {
		console.log("Evalue render");
		return (
			<div style={{ display: "flex", alignItems: "start" }}>
				<input
					type="checkbox"
					name="eValueApplied"
					style={{ accentColor: "#800080" }}
					onChange={ctx["eValueAppliedHandleChange"]}
					checked={ctx["eValueApplied"]}
				/>
				<div>
					<label htmlFor="eValueApplied" style={{ padding: "0 0 0 0.5vw" }}>
						Filter by e-value:
					</label>
					<input
						type="text"
						style={{ height: "2vh", maxWidth: "3vw", marginLeft: "0.5vw" }}
						onKeyDown={ctx["eValueHandleKeyDown"]}
						ref={ctx["eValueRef"]}
					/>
				</div>
			</div>
		);
	}, [signature]);
};

export default EValue;
