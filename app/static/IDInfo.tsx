import * as React from "react";
import { LeftSectionCtx } from "./App";

const IDInfo = () => {
	const ctx = React.useContext(LeftSectionCtx);
	const stl = {
		display: "block",
		margin: "2vh 0 2vh 0",
	};

	if (ctx["bsc"]["name"] === "root") {
		return <></>;
	} else if (!ctx["bsc"]["id"]) {
		return (
			<div style={stl}>
				<p style={{ display: "inline" }}>NCBI ID: </p>
				<button style={{ display: "inline" }} onClick={ctx["handleIDClick"]}>
					FETCH
				</button>
			</div>
		);
	}
	return (
		<div style={stl}>
			<p style={{ display: "inline" }}>NCBI ID: </p>
			<a
				style={{ display: "inline" }}
				target="_blank"
				href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${ctx["bsc"]["id"]}&lvl=3&lin=f&keep=1&srchmode=1&unlock`}
			>
				{ctx["bsc"]["id"]}
			</a>
		</div>
	);
};

export default IDInfo;
