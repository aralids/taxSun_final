import * as React from "react";
import { RightSectionCtx } from "./App";

const Collapse = () => {
	const ctx = React.useContext(RightSectionCtx);
	const signature = JSON.stringify(ctx["coll"]);
	return React.useMemo(() => {
		console.log("Collapse render");
		return (
			<div style={{ display: "flex", alignItems: "start" }}>
				<input
					type="checkbox"
					name="collapse"
					style={{ accentColor: "#800080" }}
					onChange={ctx["collHandleChange"]}
					checked={ctx["coll"]}
				/>
				<label htmlFor="collapse" style={{ padding: "0 0 0 0.5vw" }}>
					Collapse
				</label>
			</div>
		);
	}, [signature]);
};

export default Collapse;
