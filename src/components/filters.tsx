import { useContext } from "preact/hooks";
import { Params, setParams } from "../lib/params";

export function Filters() {
	const params = useContext(Params);

	return (
		<input
			type="text"
			placeholder="Search"
			class="input w-full"
			value={params.search}
			onInput={(e) => setParams({ search: e.currentTarget.value, page: 1 })}
		/>
	);
}
