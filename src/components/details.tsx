import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "preact/hooks";
import { data } from "../lib";
import { Params, setParams } from "../lib/params";

export function GameDetail() {
	const params = useContext(Params);
	const modal = useRef<HTMLDialogElement>(null);
	const [gameId, setGameId] = useState<string>(params.game);

	useEffect(() => {
		// Keep previous game rendered for transition
		if (params.game) {
			setGameId(params.game);
		}
		// Only open modal if id is updated
		if (params.game === gameId) {
			modal.current?.showModal();
		}
	}, [params.game, gameId]);

	const game = useMemo(() => {
		return data.games.find((game) => game.id === gameId);
	}, [gameId]);

	// Don't render if no game is loaded
	if (!game) {
		return null;
	}

	return (
		<dialog class="modal" onClose={() => setParams({ game: "" })} ref={modal}>
			<div class="modal-box lg:max-w-1/2">
				<form method="dialog">
					<button
						type="submit"
						class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>
				</form>

				{game.thumbnail ? (
					<img
						src={`thumbnails/${game.thumbnail}`}
						alt="thumbnail"
						class="rounded-box m-auto"
					/>
				) : null}

				<div class="card-body">
					<h2 class="text-xl">{game.name}</h2>
					<p class="typo-release">{game.release}</p>
					{game.note ? <p class="typo-note">{game.note}</p> : null}
					<Commands
						commands={[
							`rclone --progress copy --http-url ${data.url} :http:/${game.id}/ ./`,
							`7z x ${game.id}.7z.001 -p${data.password} -r "*.apk" "*.obb"`,
						]}
					/>
				</div>
			</div>
			<form method="dialog" class="modal-backdrop">
				<button type="submit">close</button>
			</form>
		</dialog>
	);
}

function Commands({ commands }: { commands: string[] }) {
	const [copied, setCopied] = useState(false);

	const copy = useCallback(() => {
		navigator.clipboard.writeText(commands.join("\n"));
		setCopied(true);
		setTimeout(() => setCopied(false), 5000);
	}, [setCopied, commands]);

	return (
		<div class="relative">
			<div class="mockup-code w-full">
				{commands.map((command) => (
					<pre data-prefix="$">
						<code>{command}</code>
					</pre>
				))}
			</div>
			<div
				class="tooltip tooltip-left tooltip-accent absolute right-2 top-2"
				data-tip={copied ? "copied" : "copy"}
			>
				<button
					type="button"
					class="btn btn-square btn-sm btn-neutral"
					onClick={copy}
				>
					<span
						class={
							copied
								? "icon-[mdi--clipboard-check-outline]"
								: "icon-[mdi--clipboard-outline]"
						}
					></span>
				</button>
			</div>
		</div>
	);
}
