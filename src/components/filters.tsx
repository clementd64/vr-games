import { goto } from "../lib/params";

export function Filters({ search }: { search: string }) {
	return (
		<input
			type="text"
			placeholder="Search"
			class="input w-full"
			value={search}
			onInput={(e) => goto({ search: e.currentTarget.value, page: 1 })}
		/>
	);
}
