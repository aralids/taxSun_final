import * as React from "react";
import LeftSection from "./LeftSection.js";
import RightSection from "./RightSection.js";
import { lns, taxSet, rawTaxSet } from "./predefinedObjects.js";

export const LeftSectionCtx = React.createContext({});
export const RightSectionCtx = React.createContext({});

const App = () => {
	const [stt, setStt] = React.useState({
		lyr: "Bacteria superkingdom",
		relLns: lns,
		relTaxSet: taxSet,
		ancestors: [
			{
				ancName: "root",
				ancPerc: "11.83%",
				ancHandleClick: () => shortcutsHandleClick("root root"),
			},
		],

		lns: lns,
		taxSet: taxSet,
		rawTaxSet: rawTaxSet,

		tsvLastTry: "",
		tsvLoadStatus: "",
		tsvName: "default",

		faaLastTry: "",
		faaLoadStatus: "",
		faaName: "",
		faaObj: {},

		collapse: true,
		eValue: Infinity,
		eValueApplied: false,
		view: "allEqual",

		fetchedIDs: {},
	});
	const [ctxMenuVis, setCtxMenuVis] = React.useState(false);
	const [hover, setHover] = React.useState("");
	const sttRef = React.useRef(stt);
	sttRef.current = stt;

	const IDInfoHandleClick = () => {
		console.log("IDInfoHandleClick");
	};

	const shortcutsHandleClick = (key) => {
		console.log("shortcutsHandleClick");
	};

	const uplTsvHandleChange = () => {
		console.log("uplTsvHandleChange");
		console.log("tsvRef.current: ", tsvRef);
	};

	const uplFaaHandleChange = () => {
		console.log("uplFaaHandleChange");
		console.log("faaRef.current: ", faaRef);
	};

	const collHandleChange = () => {
		setStt({ ...sttRef.current, collapse: !sttRef.current["collapse"] });
		console.log("collHandleChange");
	};

	const eValueAppliedHandleChange = () => {
		setStt({
			...sttRef.current,
			eValueApplied: !sttRef.current["eValueApplied"],
		});
		console.log("eValueAppliedHandleChange");
	};

	const eValueHandleKeyDown = (event) => {
		if (event.key === "Enter") {
			if (sttRef.current["eValueApplied"]) {
				setStt({ ...sttRef.current, eValue: eValueRef.current.value });
			} else {
				setStt({ ...sttRef.current, eValue: eValueRef.current.value });
			}
			console.log("eValueHandleKeyDown: ", eValueRef.current.value);
		}
	};

	const viewHandleChange = () => {
		console.log("viewHandleChange", radioRef.current);
	};

	const dldOnClick = () => {
		console.log("dldOnClick");
	};

	const tsvRef = React.useRef();
	const faaRef = React.useRef();
	const eValueRef = React.useRef({ value: 0 });
	const radioRef = React.useRef({ value: 0 });

	return (
		<div>
			<LeftSectionCtx.Provider
				value={{
					...stt["relTaxSet"][stt["lyr"]],
					rawCount: stt["rawTaxSet"][stt["lyr"]]
						? stt["rawTaxSet"][stt["lyr"]]["unaCount"]
						: 0,
					id: stt["rawTaxSet"][stt["lyr"]]
						? stt["rawTaxSet"][stt["lyr"]]["taxID"]
						: stt["fetchedIDs"][stt["lyr"]] ?? undefined,
					IDInfoHandleClick: IDInfoHandleClick,
					ancestors: stt["ancestors"],
					hovered: stt["relTaxSet"][hover],
				}}
			>
				<LeftSection />
			</LeftSectionCtx.Provider>

			<RightSectionCtx.Provider
				value={{
					tsvLastTry: stt.tsvLastTry,
					tsvLoadStatus: stt.tsvLoadStatus,
					uplTsvHandleChange: uplTsvHandleChange,
					tsvFormRef: tsvRef,

					faaLastTry: stt.faaLastTry,
					faaLoadStatus: stt.faaLoadStatus,
					uplFaaHandleChange: uplFaaHandleChange,
					faaFormRef: faaRef,

					coll: stt["collapse"],
					collHandleChange: collHandleChange,

					eValueApplied: stt["eValueApplied"],
					eValueAppliedHandleChange: eValueAppliedHandleChange,
					eValueHandleKeyDown: eValueHandleKeyDown,
					eValueRef: eValueRef,

					radioRef: radioRef,
					viewHandleChange: viewHandleChange,

					dldOnClick: dldOnClick,
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
