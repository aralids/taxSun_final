import * as React from "react";
import { LeftSectionCtx } from "./App";

const BasicLayerInfo = () => {
	const stl = {
		display: "block",
		margin: 0,
	};

	const ctx = React.useContext(LeftSectionCtx);
	if (ctx["bsc"]["rawCount"] === 0) {
		return (
			<div>
				<p style={stl}>
					Taxon: <b>{ctx["bsc"]["name"]}</b>
				</p>
				<p style={stl}>
					Rank: <b>{ctx["bsc"]["rank"]}</b>
				</p>
				<p style={stl}>
					Total count: <b>{ctx["bsc"]["totCount"]}</b>
				</p>
				<p style={stl}>
					Unspec. count: <b>{ctx["bsc"]["unaCount"]}</b>
				</p>
			</div>
		);
	}

	return (
		<div>
			<p style={stl}>
				Taxon: <b>{ctx["bsc"]["name"]}</b>
			</p>
			<p style={stl}>
				Rank: <b>{ctx["bsc"]["rank"]}</b>
			</p>
			<p style={stl}>
				Total count: <b>{ctx["bsc"]["totCount"]}</b>
			</p>
			<p style={stl}>
				Unspec. count: <b>{ctx["bsc"]["unaCount"]}</b>
			</p>
			<p style={stl}>
				Raw file count: <b>{ctx["bsc"]["rawCount"]}</b>
			</p>
		</div>
	);
};

export default BasicLayerInfo;
