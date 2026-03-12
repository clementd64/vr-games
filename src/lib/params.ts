export function getParams() {
	const params = new URLSearchParams(window.location.hash.slice(1));
	return {
		page: Number(params.get("page") ?? "1"),
		search: params.get("search") ?? "",
	} satisfies Params;
}

export function goto(params: Partial<Params>) {
	const hash = new URLSearchParams(window.location.hash.slice(1));

	for (const [key, value] of Object.entries(params)) {
		if (value === undefined) {
			hash.delete(key);
			continue;
		}
		hash.set(key, String(value));
	}

	window.location.hash = hash.toString();
}
