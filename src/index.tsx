import Fuse from "fuse.js/basic";
import { render } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import data from "../data.json" with { type: "json" };
import { Filters } from "./components/filters";
import { Grid } from "./components/grid";
import { Pagination } from "./components/pagination";
import { getParams } from "./lib/params";

const PER_PAGE = 24;

const index = new Fuse(data.games, {
	keys: ["name"],
	threshold: 0.4,
	distance: 25,
});

function App() {
	const [params, setParams] = useState(getParams());

	const hashChange = useCallback(() => {
		setParams(getParams());
	}, [setParams]);

	useEffect(() => {
		window.addEventListener("hashchange", hashChange);
		return () => window.removeEventListener("hashchange", hashChange);
	}, [hashChange]);

	const filtered = useMemo(() => {
		if (params.search === "") {
			return data.games;
		}
		return index.search(params.search).map((result) => result.item);
	}, [params.search]);

	return (
		<div class="p-4 grid gap-4">
			<div class="m-auto w-9/10 lg:w-1/2">
				<Filters search={params.search} />
			</div>
			<Grid
				games={filtered.slice(
					(params.page - 1) * PER_PAGE,
					params.page * PER_PAGE,
				)}
			/>
			<div class="m-auto">
				<Pagination
					page={params.page}
					total={Math.ceil(filtered.length / PER_PAGE)}
				/>
			</div>
		</div>
	);
}

render(<App />, document.querySelector("#app"));
