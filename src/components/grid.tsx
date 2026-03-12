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
			</figure>
			<div class="card-body">
				<h2 class="card-title">{game.name}</h2>
				<p class="text-base-content/50">{game.release}</p>
				<p class="text-base-content/70">{game.note}</p>
				<div class="card-actions justify-end">
					<button type="button" class="btn btn-primary">
						Download
					</button>
				</div>
			</div>
		</div>
	);
}
