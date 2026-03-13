import Fuse from "fuse.js";
import { useContext, useEffect, useMemo } from "preact/hooks";
import { data } from "../lib";
import { Params, setParams } from "../lib/params";
import { Filters } from "./filters";
import { Pagination } from "./pagination";

function humanFileSize(size: number) {
	const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	return `${Number((size / 1024 ** i).toFixed(2))} ${["B", "kB", "MB", "GB", "TB"][i]}`;
}

const PER_PAGE = 24;

export function GameList() {
	const params = useContext(Params);

	const index = useMemo(() => {
		return new Fuse(data.games, {
			keys: ["name"],
			threshold: 0.4,
			distance: 25,
		});
	}, []);

	const filtered = useMemo(() => {
		if (!params.search) {
			return data.games;
		}
		return index.search(params.search).map((result) => result.item);
	}, [params.search]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [params.page]);

	return (
		<Grid
			games={filtered.slice(
				(params.page - 1) * PER_PAGE,
				params.page * PER_PAGE,
			)}
			page={params.page}
			total={Math.ceil(filtered.length / PER_PAGE)}
		/>
	);
}

export function Grid({
	games,
	page,
	total,
}: {
	games: Game[];
	page: number;
	total: number;
}) {
	return (
		<div class="p-4 grid gap-4">
			<div class="grid gap-4 grid-cols-[1fr_auto] justify-items-center">
				<div class="w-9/10 lg:w-1/2">
					<Filters />
				</div>
				<button
					type="button"
					class="btn btn-square btn-neutral"
					onClick={() => setParams({ guide: "1" })}
				>
					<span class="icon-[mdi--information-outline]"></span>
				</button>
			</div>
			<div class="grid gap-4">
				<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					{games.map((game) => (
						<Card game={game} />
					))}
				</div>
			</div>
			<div class="m-auto">
				<Pagination
					page={page}
					total={total}
					onNavigate={(page) => setParams({ page })}
				/>
			</div>
		</div>
	);
}

function Card({ game }: { game: Game }) {
	return (
		<div class="card bg-base-300">
			<figure>
				{game.thumbnail ? (
					<img
						src={`thumbnails/${game.thumbnail}`}
						alt="thumbnail"
						class="rounded-box"
					/>
				) : null}
				{game.size > 0 ? (
					<span class="badge absolute top-1 right-1">
						{humanFileSize(game.size)}
					</span>
				) : null}
			</figure>
			<div class="card-body">
				<h2 class="card-title">{game.name}</h2>
				<p class="typo-release">{game.release}</p>
				{game.note ? <p class="typo-note">{game.note}</p> : null}
				<div class="card-actions justify-end">
					<button
						type="button"
						class="btn btn-primary"
						onClick={() => setParams({ game: game.id })}
					>
						<span class="icon-[mdi--download]"></span>
						Download
					</button>
				</div>
			</div>
		</div>
	);
}
