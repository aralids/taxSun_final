class AncestorSection extends React.Component<
	{
		ancestors: string[];
		root: string;
		layer: number;
		onClickArray: any;
		plotEValue: boolean;
		ancestorRanks: string[];
	},
	{
		root: string;
		layer: number;
		rank: string;
		totalCount: number;
		unassignedCount: number;
		lines: string[];
		plotEValue: boolean;
		eThresholdHere: any;
	}
> {
	constructor(props) {
		super(props);
		this.state = {
			root: "",
			layer: -1,
			rank: "",
			totalCount: 0,
			unassignedCount: 0,
			lines: [],
			plotEValue: false,
			eThresholdHere: eThreshold,
		};
	}

	componentDidUpdate() {
		if (
			this.props.root !== this.state.root ||
			this.props.plotEValue !== this.state.plotEValue ||
			eThreshold !== this.state.eThresholdHere ||
			newDataLoaded
		) {
			newDataLoaded = false;
			this.getCounts();
		}
	}

	changeDiv(taxName) {
		$.ajax({
			url: "/fetchID",
			data: {
				taxName: taxName.replace(
					RegExp(rankPatternFull.map((item) => " " + item).join("|"), "g"),
					""
				),
			},
			type: "GET",
			success: function (response) {
				let taxID = response["taxID"];
				if (!allTaxaReduced[taxName]) {
					allTaxaReduced[taxName] = {};
				}
				allTaxaReduced[taxName]["taxID"] = taxID;
				originalAllTaxaReduced[taxName]["taxID"] = taxID;
			},
			error: function (response) {
				console.log("ERROR", response);
				document.getElementById("status")!.innerHTML = "close";
			},
		}).then(() => {
			this.setState(this.state);
		});
	}

	getCounts() {
		let totalCount: number = 0;
		let unassignedCount: number = 0;
		let rank: string = "";
		if (this.props.root.indexOf("&") > -1) {
			let groupedTaxa: string[] = this.props.root.split(" & ");
			for (let taxon of groupedTaxa) {
				totalCount += allTaxaReduced[taxon]["totalCount"];
			}
			unassignedCount = 0;
			rank = allTaxaReduced[groupedTaxa[0]]["rank"];
		} else {
			totalCount = allTaxaReduced[this.props.root]["totalCount"];
			unassignedCount = allTaxaReduced[this.props.root]["unassignedCount"];
			rank = allTaxaReduced[this.props.root]["rank"];
		}

		let lines: string[] = this.props.ancestors.map(
			(item) =>
				`${round((totalCount * 100) / allTaxaReduced[item]["totalCount"], 2)}%`
		);

		this.setState({
			totalCount: totalCount,
			unassignedCount: unassignedCount,
			root: this.props.root,
			layer: this.props.layer,
			lines: lines,
			rank: rank,
			plotEValue: this.props.plotEValue,
			eThresholdHere: eThreshold,
		});
	}

	render() {
		let rootNameNoRank = this.state.root.replace(
			RegExp(rankPatternFull.map((item) => " " + item).join("|"), "g"),
			""
		);

		let firstLine: any = (
			<legend key={"legend"} style={{ color: "#800080", fontWeight: "bold" }}>
				CURRENT LAYER
			</legend>
		);

		let nameLine: any = (
			<p key={"nameLine"} className="mp-zero">
				Taxon: <b>{rootNameNoRank}</b>
			</p>
		);

		let rankLine: any = (
			<p key={"rankLine"} className="mp-zero">
				Rank: <b>{this.state.rank}</b>
			</p>
		);

		let totalCountLine: any = (
			<p key={"totalCountLine"} className="mp-zero">
				Total count: <b>{this.state.totalCount}</b>
			</p>
		);

		let unassignedCountLine: any = (
			<p key={"unassignedCountLine"} className="mp-zero">
				Unspecified {rootNameNoRank}: <b>{this.state.unassignedCount}</b>
			</p>
		);

		let beforePreprocessing: number = allTaxa[this.state.root]
			? allTaxa[this.state.root]["unassignedCount"]
			: 0;
		let bPLine: any = (
			<p key={"bPLine"} className="mp-zero">
				(raw file: <b>{beforePreprocessing}</b>)
			</p>
		);

		let id: string = allTaxaReduced[this.state.root]
			? allTaxaReduced[this.state.root]["taxID"]
			: "1";
		let taxIDline: any;
		if (id) {
			taxIDline = (
				<div key={"taxIDline"} id="taxID-div" className="mp-zero-pb-not">
					<p className="mp-zero">
						taxID:{" "}
						<a
							style={{ display: "inline" }}
							target="_blank"
							href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${id}&lvl=3&lin=f&keep=1&srchmode=1&unlock`}
						>
							{id}
						</a>
					</p>
				</div>
			);
		} else {
			taxIDline = (
				<div key={"taxIDline"} id="taxID-div" className="mp-zero-pb-not">
					<p className="mp-zero">
						taxID:{" "}
						<button
							onClick={() => this.changeDiv(this.state.root)}
							id="fetch-id-button"
						>
							FETCH
						</button>
					</p>
				</div>
			);
		}

		let ps: any = [
			firstLine,
			nameLine,
			rankLine,
			totalCountLine,
			unassignedCountLine,
			bPLine,
			taxIDline,
		];

		if (this.props.root.indexOf("&") > -1) {
			bPLine = (
				<p key={"bPLine"} className="mp-zero-pb-not">
					(raw file: <b>{beforePreprocessing}</b>)
				</p>
			);

			ps = [
				firstLine,
				nameLine,
				rankLine,
				totalCountLine,
				unassignedCountLine,
				bPLine,
			];
		} else if (this.props.root === "root") {
			ps.pop();
		}

		for (let i = 0; i < this.props.ancestors.length; i++) {
			let ancNameNoRank = this.props.ancestors[i].replace(
				RegExp(rankPatternFull.map((item) => " " + item).join("|"), "g"),
				""
			);
			ps.push(
				<p
					key={`ps-${i}`}
					data-taxname={ancNameNoRank}
					data-taxrank={this.props.ancestorRanks[i]}
					className="mp-zero"
					style={{ cursor: "pointer", wordBreak: "break-all" }}
					onClick={this.props.onClickArray[i]}
				>
					{this.state.lines[i]} of{" "}
					<b
						data-taxname={ancNameNoRank}
						data-taxrank={this.props.ancestorRanks[i]}
					>
						{ancNameNoRank}
					</b>
				</p>
			);
		}

		return <fieldset>{ps}</fieldset>;
	}
}
