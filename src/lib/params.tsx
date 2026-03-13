import { type ComponentChildren, createContext } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

export const Params = createContext<Params>(null);

export function ParamsProvider({ children }: { children: ComponentChildren }) {
	const [params, setParams] = useState(getParams());

	const hashChange = useCallback(() => {
		setParams(getParams());
	}, [setParams]);

	useEffect(() => {
		window.addEventListener("hashchange", hashChange);
		return () => window.removeEventListener("hashchange", hashChange);
	}, [hashChange]);

	return <Params.Provider value={params}>{children}</Params.Provider>;
}

function getParams() {
	const params = new URLSearchParams(window.location.hash.slice(1));
	return {
		page: Number(params.get("page") ?? "1"),
		search: params.get("search") ?? undefined,
		game: params.get("game") ?? undefined,
		guide: params.get("guide") ?? undefined,
	} satisfies Params;
}

export function setParams(params: Partial<Params>) {
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
