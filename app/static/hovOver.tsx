class DescendantSection extends React.Component<
	{ self: string; ancestor: string; layer: number; hovered: boolean },
	{
		rank: string;
		totalCount: number;
		unassignedCount: number;
		percentage: number;
		self: string;
		layer: number;
		hovered: boolean;
	}
> {
	constructor(props) {
		super(props);
		this.state = {
			self: "",
			layer: -1,
			rank: "",
			totalCount: 0,
			unassignedCount: 0,
			percentage: 0,
			hovered: false,
		};
	}

	componentDidMount(): void {
		document
			.getElementById("descendant-section")
			?.addEventListener("change", () => {
				let el: any = document.getElementById("descendant-section")!;
				let values: any[];
				let self: string;
				let layer: number;
				let ancestor: string;
				let hovered: boolean;

				if (el.value.length === 0) {
					self = "";
					layer = 0;
					ancestor = "";
					hovered = false;
				} else {
					values = el.value.split("*");
					self = values[0];
					layer = parseInt(values[1]);
					ancestor = values[2];
					hovered = true;
				}

				if (!(this.state.self === self)) {
					this.calculateParams(self, layer, ancestor, hovered);
				}
			});
	}

	calculateParams(self, layer, ancestor, hovered) {
		if (hovered) {
			let totalCount: number = 0;
			let unassignedCount: number = 0;
			let rank: string;

			if (self.indexOf("&") > -1) {
				let groupedTaxa: string[] = self.split(" & ");
				for (let taxon of groupedTaxa) {
					totalCount += allTaxaReduced[taxon]["totalCount"];
				}
				unassignedCount = 0;
				rank = allTaxaReduced[groupedTaxa[0]]["rank"];
			} else {
				totalCount = allTaxaReduced[self]["totalCount"];
				unassignedCount = allTaxaReduced[self]["unassignedCount"];
				rank = allTaxaReduced[self]["rank"];
			}

			let percentage: number =
				(totalCount * 100) / allTaxaReduced[ancestor]["totalCount"];

			this.setState({
				totalCount: totalCount,
				unassignedCount: unassignedCount,
				rank: rank,
				percentage: percentage,
				layer: layer,
				self: self,
				hovered: hovered,
			});
		} else {
			this.setState({
				totalCount: 0,
				unassignedCount: 0,
				rank: "",
				percentage: 0,
				self: "",
				layer: 0,
				hovered: hovered,
			});
		}
	}

	render() {
		let ps: any[] = [];

		if (this.state.hovered) {
			let selfNameNoRank: string = this.state.self.replace(
				RegExp(rankPatternFull.map((item) => " " + item).join("|"), "g"),
				""
			);

			let firstLine: any = (
				<legend
					key={"firstLine"}
					style={{ color: "#800080", fontWeight: "bold" }}
				>
					HOVERING OVER
				</legend>
			);

			let nameLine: any = (
				<p key={"nameLine"} className="mp-zero">
					Taxon: <b>{selfNameNoRank}</b>
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
					Unassigned {selfNameNoRank}: <b>{this.state.unassignedCount}</b>
				</p>
			);

			ps = [firstLine, nameLine, rankLine, totalCountLine, unassignedCountLine];

			return <fieldset id="hovering-over">{ps}</fieldset>;
		}

		return <div></div>;
	}
}
