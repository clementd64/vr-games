import { useMemo } from "preact/hooks";

function range(start: number, end: number) {
	return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

const BOUNDARY = 2;

export function Pagination({
	page,
	total,
	onNavigate,
}: {
	page: number;
	total: number;
	onNavigate: (page: number) => void;
}) {
	if (total <= 1) return null;

	const pages = useMemo(() => {
		switch (true) {
			case total <= BOUNDARY * 2 + 1:
				return range(1, total);
			case page <= BOUNDARY:
				return range(1, BOUNDARY * 2 + 1);
			case page >= total - BOUNDARY:
				return range(total - BOUNDARY * 2, total);
			default:
				return range(page - BOUNDARY, page + BOUNDARY);
		}
	}, [page, total]);

	return (
		<div class="join">
			{page > 1 ? (
				<button
					type="button"
					class="join-item btn"
					onClick={() => onNavigate(page - 1)}
				>
					«
				</button>
			) : null}
			{pages.map((i) => (
				<button
					type="button"
					class={`join-item btn ${i === page ? "btn-active" : ""}`}
					onClick={() => onNavigate(i)}
				>
					{i}
				</button>
			))}
			{page < total ? (
				<button
					type="button"
					class="join-item btn"
					onClick={() => onNavigate(page + 1)}
				>
					»
				</button>
			) : null}
		</div>
	);
}
