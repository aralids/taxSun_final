import * as React from "react";
import LeftSection from "./LeftSection.js";
import RightSection from "./RightSection.js";
import { lns, rks, txSet, rawTxSet } from "./predefinedObjects.js";

export const LeftSectionCtx = React.createContext({});
export const RightSectionCtx = React.createContext({});

const App = () => {
	const [rawData, setRawData] = React.useState({
		fileName: "homsa.tsv",
		lns: lns,
		rks: rks,
		txSet: txSet,
		rawTxSet: rawTxSet,
	});

	const tempFunc1 = () => {
		console.log("tempFunc1");
		return "Bacteria superkingdom";
	};

	const [layer, setLayer] = React.useState(tempFunc1());
	const [hover, setHover] = React.useState("");

	const handleIDClick = () => {
		console.log("handleIDClick");
	};
	const handlePlotClick = (key) => {
		setLayer(key);
	};
	const uplTSVHandleClick = () => {
		console.log("uplTSVHandleClick");
	};

	const relTxSet = {
		"root root": {
			id: undefined,
			ln: [],
			name: "root",
			rank: "root",
			rawCount: 22561,
			totCount: 408743,
			unaCount: 1201,
		},
		"Bacteria superkingdom": {
			id: 2,
			ln: [["root", "root"]],
			name: "Bacteria",
			rank: "superkingdom",
			rawCount: 13962,
			totCount: 48334,
			unaCount: 15616,
		},
		"Salmonella genus": {
			id: undefined,
			ln: [
				["root", "root"],
				["superkingdom", "Bacteria"],
				["phylum", "Pseudomonadota"],
				["class", "Gammaproteobacteria"],
				["order", "Enterobacterales"],
				["family", "Enterobacteriaceae"],
				["genus", "Salmonella"],
			],
			name: "Salmonella",
			rank: "genus",
			rawCount: 0,
			totCount: 314,
			unaCount: 0,
		},
	};

	return (
		<div>
			<LeftSectionCtx.Provider
				value={{
					bsc: relTxSet[layer],
					handleIDClick: handleIDClick,
					ancestors: [
						{
							ancName: "root",
							ancPerc: "11.83%",
							ancHandleClick: () => handlePlotClick("root root"),
						},
						{
							ancName: "Salmonella",
							ancPerc: "10.13%",
							ancHandleClick: () => handlePlotClick("Salmonella genus"),
						},
					],
					hovered: relTxSet[hover],
				}}
			>
				<LeftSection />
			</LeftSectionCtx.Provider>
			<RightSectionCtx.Provider
				value={{
					uplStatus: "",
					uplTSVHandleClick: uplTSVHandleClick,
				}}
			>
				<RightSection />
			</RightSectionCtx.Provider>
			<button
				onMouseOver={() => setHover("Salmonella genus")}
				onMouseOut={() => setHover("")}
				style={{ position: "fixed", top: "50%", left: "50%" }}
			>
				Salmonella
			</button>
		</div>
	);
};

export default App;
