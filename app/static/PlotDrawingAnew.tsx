import { useState } from "react";

const App = ({ lineages, ranks, taxSet, origTaxSet }) => {
	const [currState, setCurrState] = useState({
		root: "Bacteria",
		layer: 1,
		alteration: "allEqual",
		collapse: false,
		eValue: Infinity,
		lineages: lineages,
		ranks: ranks,
	});
};
