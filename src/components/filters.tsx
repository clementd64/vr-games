import { useContext } from "preact/hooks";
import { Params, setParams } from "../lib/params";

export function Filters() {
	const params = useContext(Params);

	return (
		<label class="input w-full">
			<span class="icon-[mdi--search]"></span>
			<input
				type="text"
				placeholder="Search"
				class="grow"
				value={params.search}
				onInput={(e) => setParams({ search: e.currentTarget.value, page: 1 })}
			/>
		</label>
	);
}
