function humanFileSize(size: number) {
	const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	return `${Number((size / 1024 ** i).toFixed(2))} ${["B", "kB", "MB", "GB", "TB"][i]}`;
}

export function Grid({ games }: { games: Game[] }) {
	return (
		<div class="p-4 grid gap-4">
			<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				{games.map((game) => (
					<Card game={game} />
				))}
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
				<p class="text-base-content/50">{game.release}</p>
				{game.note ? (
					<p class="text-base-content/70 whitespace-pre-line truncate">
						{game.note}
					</p>
				) : null}
				<div class="card-actions justify-end">
					<button type="button" class="btn btn-primary">
						Download
					</button>
				</div>
			</div>
		</div>
	);
}
