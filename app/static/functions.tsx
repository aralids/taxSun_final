import { round, calculateArcEndpoints } from "./helperFunctions";

const cropLns = (
	collapse,
	eValue,
	fullRankPat,
	layer,
	lns,
	name,
	rks,
	txSet,
	view
) => {
	// Get croppedLns and croppedRks.
	const rootTaxa = name.split(" & ");
	let croppedLns: string[][] = [];
	let croppedRks: string[][] = [];
	for (let i = 0; i < lns.length; i++) {
		if (rootTaxa.indexOf(lns[i][layer]) > -1) {
			croppedLns = croppedLns.concat([lns[i]]);
			croppedRks = croppedRks.concat([rks[i]]);
		}
	}

	// Get the ancestors, i.e. the taxa from "root" to the current root taxon.
	let ancLn: string[];
	let ancRk: string[];
	if (croppedLns[0]) {
		ancLn = croppedLns[0].slice(0, layer);
		ancRk = croppedRks[0].slice(0, layer);
	}

	// Crop lineages so they all start with the current root taxon.
	if (rootTaxa.length > 1) {
		croppedLns = croppedLns.map((item) => item.slice(layer - 1));
		croppedRks = croppedRks.map((item) => item.slice(layer - 1));
	} else {
		croppedLns = croppedLns.map((item) => item.slice(layer));
		croppedRks = croppedRks.map((item) => item.slice(layer));
	}

	// Filter lineages by e-value.
	// REMINDER: UPDATE TEXT FIELD!
	let goodIndObj = {};
	let totalCountObj = {};
	let unaCountObj = {};
	if (eValue < Infinity) {
		let res = filterByEValue(croppedLns, croppedRks, eValue, txSet);
		let minEValue = res["minEValue"];
		if (eValue < minEValue) {
			res = filterByEValue(croppedLns, croppedRks, minEValue, txSet);
		}
		croppedLns = res["croppedLns"];
		croppedRks = res["croppedRks"];
		goodIndObj = res["goodIndObj"];
		totalCountObj = res["totalCountObj"];
		unaCountObj = res["unaCountObj"];

		for (let key of Object.keys(totalCountObj)) {
			txSet[key]["totalCount"] = totalCountObj[key];
		}

		for (let key of Object.keys(unaCountObj)) {
			txSet[key]["unassignedCount"] = unaCountObj[key];
		}
	}

	// Get minimal rank pattern for this particular plot to prepare for alignment.
	let uniqRks: string[] = croppedRks.reduce((acc, val) => acc.concat(val), []);
	uniqRks = uniqRks.filter(
		(val, ind, self) => Boolean(val) && self.indexOf(val) === ind
	);
	let minRankPat: string[] = fullRankPat.filter(
		(item) => uniqRks.indexOf(item) > -1
	);

	// Mary taxa if necessary.
	let changedLns: Boolean[] = [];
	if (view.startsWith("marriedTaxa")) {
		let res = marryTaxa(croppedLns, croppedRks, txSet, view);
		croppedLns = res["croppedLns"];
		croppedRks = res["croppedRks"];
		changedLns = res["changedLns"];
	}

	// Fixes the problem with the root label of married plots.
	croppedLns = croppedLns.map((item) => {
		item.splice(0, 1, name);
		return item;
	});

	// Collapse lineages if necessary.
	if (collapse) {
		let arr: any = collapse(croppedLns, croppedRks);
		croppedLns = arr[0];
		croppedRks = arr[1];
	}
};

const calcSVGPath = (layerWidth, params, windowCx, windowCy) => {
	let SVGPath = "";
	const layerArr = params["layerArr"];
	const degArr = params["degArr"];
	const startDeg = degArr[0];
	const endDeg = degArr[degArr.length - 1];
	const innRad = round(layerArr[0] * layerWidth);

	// If calculating root taxon shape - circle.
	if (layerArr[0] === 0) {
		SVGPath = `M ${windowCx}, ${windowCy} m -${layerWidth}, 0 a ${layerWidth},${layerWidth} 0 1,0 ${
			layerWidth * 2
		},0 a ${layerWidth},${layerWidth} 0 1,0 -${layerWidth * 2},0`;
	} else {
		// If the shape to be drawn completes a full circle...
		if (round(endDeg - startDeg) === 360) {
			const innerArcPath = `M ${windowCx}, ${windowCy} m -${innRad}, 0 a ${innRad},${innRad} 0 1,0 ${
				innRad * 2
			},0 a ${innRad},${innRad} 0 1,0 -${innRad * 2},0`;
			SVGPath = innerArcPath;

			// ...and consists simply of two concentric circles.
			if (layerArr.length === 2) {
				let outerCirc = layerArr[1] * layerWidth;
				let midArcPath: string = `M ${windowCx}, ${windowCy} m -${outerCirc}, 0 a ${outerCirc},${outerCirc} 0 1,0 ${
					outerCirc * 2
				},0 a ${outerCirc},${outerCirc} 0 1,0 -${outerCirc * 2},0`;
				SVGPath = SVGPath + " " + midArcPath;
			}
			// ...and is of irregular shape.
			else {
				let midArc: object = {};
				for (let i = layerArr.length - 1; i >= 1; i--) {
					let curr = degArr[i];
					let prev = degArr[i - 1];
					let MorL = i === layerArr.length - 1 ? "M" : "L";
					midArc = calculateArcEndpoints(
						layerArr[i],
						layerWidth,
						prev,
						curr,
						windowCx,
						windowCy
					);
					let midArcPath: string = `${MorL} ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 0 0 ${midArc["x1"]},${midArc["y1"]}`;
					if (Math.abs(curr - prev) >= 180) {
						midArcPath = `${MorL} ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 1 0 ${midArc["x1"]},${midArc["y1"]}`;
					}
					SVGPath = SVGPath + " " + midArcPath;
				}
				let lineInnertoOuter = `L ${midArc["x1"]},${midArc["y1"]} ${windowCx},${
					windowCy + layerArr[layerArr.length - 1] * layerWidth
				}`;
				SVGPath = SVGPath + " " + lineInnertoOuter;
			}
		}
		// If the shape doesn't complete a full circle.
		else {
			let innerArc: object = calculateArcEndpoints(
				layerArr[0],
				layerWidth,
				startDeg,
				endDeg,
				windowCx,
				windowCy
			);
			let innerArcPath: string = `M ${innerArc["x1"]},${innerArc["y1"]} A ${innRad},${innRad} 0 0 1 ${innerArc["x2"]},${innerArc["y2"]}`;
			if (Math.abs(endDeg - startDeg) >= 180) {
				innerArcPath = `M ${innerArc["x1"]},${innerArc["y1"]} A ${innerArc["radius"]},${innerArc["radius"]} 0 1 1 ${innerArc["x2"]},${innerArc["y2"]}`;
			}

			SVGPath = innerArcPath;
			let midArc: object = {};
			for (let i = layerArr.length - 1; i >= 0; i--) {
				let curr = degArr[i];
				let prev = i === 0 ? startDeg : degArr[i - 1];
				midArc = calculateArcEndpoints(
					layerArr[i],
					layerWidth,
					prev,
					curr,
					windowCx,
					windowCy
				);
				let midArcPath: string = `L ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 0 0 ${midArc["x1"]},${midArc["y1"]}`;
				if (Math.abs(curr - prev) >= 180) {
					midArcPath = `L ${midArc["x2"]},${midArc["y2"]} A ${midArc["radius"]},${midArc["radius"]} 0 1 0 ${midArc["x1"]},${midArc["y1"]}`;
				}
				SVGPath = SVGPath + " " + midArcPath;
			}

			let lineInnertoOuter = `L ${midArc["x1"]},${midArc["y1"]} ${innerArc["x1"]},${innerArc["y1"]}`;
			SVGPath = SVGPath + " " + lineInnertoOuter;
		}
	}
	return SVGPath;
};

const calcLb = (layerCount, layerWidth, params, windowCx, windowCy) => {};

const filterByEValue = (croppedLns, croppedRks, eValue, txSet) => {
	let allEValues: any = [];
	let newCroppedLns = JSON.parse(JSON.stringify(croppedLns));
	let newCroppedRks = JSON.parse(JSON.stringify(croppedRks));
	let goodIndObj = {};
	let unaCountObj = {};
	let totalCountObj = {};

	for (let i = croppedLns.length - 1; i >= 0; i--) {
		let ln = croppedLns[i];
		let lstTx = ln[ln.length - 1];
		let oldUnaCount = txSet[lstTx]["unassignedCount"];

		// For every cropped lineage, store the /"eValues"/ indices of its occurrences with permissible e-value.
		// The array where we store these indices is called goodInds.
		let goodInds: number[] = [];
		let newEValues = txSet[lstTx]["eValues"].filter((item, ind) => {
			if (item <= eValue) {
				goodInds = goodInds.concat([ind]);
			}
			return item <= eValue;
		});

		goodIndObj[lstTx] = goodInds;

		// Update the unassignedCount of every relevant unspecified taxon except "root".
		let newUnaCount = newEValues.length;
		if (lstTx !== "root") {
			unaCountObj[lstTx] = newUnaCount;
		}

		// Update the totalCount of every taxon except unspecified "root".
		let diff = oldUnaCount - newUnaCount;
		for (let tx of ln) {
			if (!(tx === lstTx && lstTx === "root")) {
				totalCountObj[tx] = txSet[tx]["totalCount"] - diff;
			}
		}

		// If some unspecified taxon has 0 occurrences with permissible e-values,
		// remove it from the list.
		if (newUnaCount === 0) {
			newCroppedLns.splice(i, 1);
			newCroppedRks.splice(i, 1);
		}

		allEValues = allEValues.concat(txSet[lstTx]["eValues"]);
	}

	let minEValue = Math.min.apply(Math, allEValues);
	return {
		croppedLns: newCroppedLns,
		croppedRks: newCroppedRks,
		goodIndObj: goodIndObj,
		minEValue: minEValue,
		totalCountObj: totalCountObj,
		unaCountObj: unaCountObj,
	};
};

const marryTaxa = (croppedLns, croppedRks, txSet, view = "marriedTaxaI") => {
	// Set threshold for marrying. Currently fixed at 2%.
	const threshold = 0.02;

	// Get the sum of unassigned counts.
	let sumCount = 0;
	for (const ln of croppedLns) {
		sumCount += txSet[ln[ln.length - 1]]["unassignedCount"];
	}

	// Find all lineages that make up <2% of the whole.
	// Crop them so that they end in the most specific taxon >= 2 %.
	// Put them in an array called reducibleLineages.
	let redLns: any = [];
	for (const ln of croppedLns) {
		// If the last wedge of the current lineage is too thin...
		if (txSet[ln[ln.length - 1]]["totalCount"] / sumCount < threshold) {
			const lnInd = croppedLns.indexOf(ln);
			let lastWayTooThinLayer = ln.length - 1;

			// ...find its furthest parent that is also too thin.
			for (let i = ln.length - 2; i >= 0; i--) {
				if (txSet[ln[i]]["totalCount"] / sumCount >= threshold) {
					lastWayTooThinLayer = i + 1;
					break;
				}
			}

			const partLn: string[] = ln.slice(0, lastWayTooThinLayer);
			redLns = redLns.concat([[lnInd, partLn]]);
		}
	}

	// Viewing mode "Married taxa I" puts all wedges with the same ancestry
	// (the same partialLineage) under the same property name in the object reductionGroups.
	// Their common name is composed by concatenating the names of the first less-than-2%
	// taxa in each lineage.
	let redGrps = {};
	if (view === "marriedTaxaI") {
		for (const item of redLns) {
			const grp = item[1].join("");
			if (!redGrps[grp]) {
				redGrps[grp] = {};
				redGrps[grp]["spliceAt"] = item[1].length;
				redGrps[grp]["inds"] = [item[0]];
				redGrps[grp]["commonName"] = croppedLns[item[0]][item[1].length];
			} else {
				redGrps[grp]["inds"] = redGrps[grp]["inds"].concat([item[0]]);
				const taxa: string = redGrps[grp]["commonName"].split(" & ");
				if (taxa.indexOf(croppedLns[item[0]][item[1].length]) === -1) {
					redGrps[grp]["commonName"] += ` & ${
						croppedLns[item[0]][item[1].length]
					}`;
				}
			}
		}
	}

	// Viewing mode "Married taxa II" puts wedges with the same ancestry together
	// until the combined wedge reaches the threshold. If there are more with the
	// same ancestry, they will be combined into another wedge.
	else {
		// Put all wedges with the same ancestry under the same property name in reducibleLineages.
		for (const item of redLns) {
			const grp = item[1].join("");
			if (!redGrps[grp]) {
				redGrps[grp] = {};
				redGrps[grp]["spliceAt"] = item[1].length;
				redGrps[grp]["inds"] = [item[0]];
			} else {
				redGrps[grp]["inds"] = redGrps[grp]["inds"].concat([item[0]]);
			}
		}

		// Sort indices of reduction groups by size in ascending order,
		// group some of them together if they are in the same subgroup.
		for (const grp of Object.keys(redGrps)) {
			const spliceAt: number = redGrps[grp]["spliceAt"];
			redGrps[grp]["inds"].sort(
				(ind1, ind2) =>
					txSet[croppedLns[ind1][spliceAt]]["totalCount"] -
					txSet[croppedLns[ind2][spliceAt]]["totalCount"]
			);

			// In each reduction group, replace lineage indices with the names of the first too-small taxa.
			// The resulting array is called renameables.
			// For each unique item in renameables, create a key in temporaryObject.
			// The key will contain a list of all indices of lineages whose first too-small taxa have the same name.
			const renameables: string[] = redGrps[grp]["inds"].map(
				(item) => croppedLns[item][spliceAt]
			);
			const tempObj: object = {};
			for (let i = 0; i < renameables.length; i++) {
				const renameable: string = renameables[i];
				if (!tempObj[renameable]) {
					tempObj[renameable] = [redGrps[grp]["inds"][i]];
				} else {
					tempObj[renameable] = tempObj[renameable].concat([
						redGrps[grp]["inds"][i],
					]);
				}
			}

			// Use temporaryObject to create permanentObject, in which every key is a lineage index,
			// every value is the name of its first too-small taxon.
			// Add permanentObject to the reduction group as its "reference".
			// minimalIndexArrat contains all indices in the group ordered by size of the wedge.
			const permObj: object = {};
			for (const key of Object.keys(tempObj)) {
				permObj[tempObj[key][0]] = tempObj[key];
			}
			redGrps[grp]["references"] = permObj;
			redGrps[grp]["minIndArr"] = Object.keys(permObj).sort((ind1, ind2) => {
				return (
					txSet[croppedLns[ind1][spliceAt]]["totalCount"] -
					txSet[croppedLns[ind2][spliceAt]]["totalCount"]
				);
			});
		}

		for (const grp of Object.keys(redGrps)) {
			const minIndArr: number[] = redGrps[grp]["minIndArr"].map((item) =>
				parseInt(item)
			);
			let indStart = 0;
			let indEnd = minIndArr.length - 1;
			let addNext = "indStart";
			let sum = 0;
			let newIndGrp: number[] = [];
			let newGrps: any = [];
			const iters: number =
				minIndArr.length % 2 === 0
					? minIndArr.length / 2
					: Math.floor(minIndArr.length / 2) + 1;
			const spliceAt: number = redGrps[grp]["spliceAt"];

			// To create a single wedge from a group (multiple wedges might be needed),
			// combine a the smallest wedge with the biggest and remove them from the group.
			// Continue building up the same wedge the same way until the threshold is reached.
			// Then start a new wedge if needed.
			// newIndexGroup holds the indices of the current wedge.
			// newGroups holds every newIndexGroup for this reduction group.
			while (
				(minIndArr.length % 2 === 0 &&
					indStart <= iters &&
					minIndArr.length - 1 - indEnd < iters) ||
				(minIndArr.length % 2 === 1 &&
					indStart !== iters &&
					minIndArr.length - 1 - indEnd < iters)
			) {
				if (addNext === "indStart") {
					const newInd = minIndArr[indStart];
					newIndGrp = newIndGrp.concat([newInd]);
					const totalCount = txSet[croppedLns[newInd][spliceAt]]["totalCount"];
					const additive = totalCount / sumCount;
					sum += additive;
					addNext = "indEnd";
					indStart++;
				} else {
					const newInd = minIndArr[indEnd];
					newIndGrp = newIndGrp.concat([newInd]);
					const totalCount = txSet[croppedLns[newInd][spliceAt]]["totalCount"];
					const additive = totalCount / sumCount;
					sum += additive;
					addNext = "indStart";
					indEnd--;
				}

				if (sum >= threshold) {
					newGrps.push(newIndGrp);
					newIndGrp = [];
					sum = 0;
				}
			}

			// Add the last newIndexGroup to its newGroups array, unless it's empty.
			if (newIndGrp.length !== 0) {
				if (newGrps.length === 0) {
					newGrps = [[]];
				}
				let lastGroup: number[] = newGrps[newGrps.length - 1];
				lastGroup.splice(lastGroup.length, 0, ...newIndGrp);
			}

			// Replace each index in each newIndexGroup with the name
			// of the first too-small taxon in the lineage with this index.
			// Each element in the array reductionGroups[group]["newGroups"]
			// is an array of names which will form a single wedge.
			newGrps = newGrps.map((item) =>
				item.map((item1) => redGrps[grp]["references"][item1])
			);
			newGrps = newGrps.map((item) =>
				item.reduce((acc, value) => acc.concat(value), [])
			);
			redGrps[grp]["newGrps"] = newGrps;
		}

		// Reconfigure reductionGroups where each key holds the information for a single wedge.
		// The name of the wedge is calculated here.
		let newRedGrps = {};
		for (const grp of Object.keys(redGrps)) {
			const oldGrp = redGrps[grp];
			for (let i = 0; i < oldGrp["newGrps"].length; i++) {
				newRedGrps[`${grp}-${i}`] = {};
				const newGrp = newRedGrps[`${grp}-${i}`];
				newGrp["spliceAt"] = oldGrp["spliceAt"];
				newGrp["inds"] = oldGrp["newGrps"][i];
				const names: string[] = oldGrp["newGrps"][i]
					.map((item) => croppedLns[item][oldGrp["spliceAt"]])
					.filter((v, i, a) => a.indexOf(v) === i);
				newGrp["commonName"] = names.join(" & ");
			}
		}
		redGrps = newRedGrps;
	}

	// Crop lineages and ranks to start with common ancestry and end with the married name.
	const changedLns: any[] = new Array(croppedLns.length).fill(false);
	for (const grp of Object.keys(redGrps).filter(
		(item) => redGrps[item]["inds"].length > 1
	)) {
		for (const ind of redGrps[grp]["inds"]) {
			croppedLns[ind].splice(
				redGrps[grp]["spliceAt"],
				croppedLns[ind].length - redGrps[grp]["spliceAt"],
				redGrps[grp]["commonName"]
			);
			croppedRks[ind].splice(redGrps[grp]["spliceAt"] + 1);
			changedLns.splice(ind, 1, true);
		}
	}

	// Remove duplicates from the married lineages.
	for (let i = croppedLns.length - 1; i >= 0; i--) {
		const croppedLnsCopy = croppedLns.map((item) => JSON.stringify(item));
		const ln: string = croppedLnsCopy[i];
		const lstInd = i;
		const fstInd = croppedLnsCopy.indexOf(ln);
		if (fstInd !== lstInd) {
			croppedLns.splice(lstInd, 1);
			croppedRks.splice(lstInd, 1);
			changedLns.splice(lstInd, 1);
		}
	}

	return {
		croppedLns: croppedLns,
		croppedRks: croppedRks,
		changedLns: changedLns,
	};
};

export { calcSVGPath };
