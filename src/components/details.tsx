import { useContext, useEffect, useMemo, useRef, useState } from "preact/hooks";
import { data } from "../lib";
import { Params, setParams } from "../lib/params";
import { Commands } from "./commands";

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
			<div class="modal-box prose lg:max-w-1/2 max-h-11/12">
				{game.thumbnail ? (
					<img
						src={`thumbnails/${game.thumbnail}`}
						alt="thumbnail"
						class="rounded-box m-auto"
					/>
				) : null}

				<h2>{game.name}</h2>
				<p class="typo-release">{game.release}</p>
				{game.note ? <p class="typo-note">{game.note}</p> : null}

				<h3>Download</h3>
				<Commands
					commands={[
						`rclone --progress copy --http-url ${data.url} :http:/${game.id}/ ./`,
						`7z x ${game.id}.7z.001 -p${data.password} -r "*.apk" "*.obb"`,
					]}
				/>

				<h3>Install</h3>
				<Commands
					commands={[
						`adb install "${game.release}/${game.package}.apk"`,
						`test -d "${game.release}/${game.package}" && adb push "${game.release}/${game.package}/." "/sdcard/Android/obb/${game.package}/"`,
					]}
				/>

				<form method="dialog">
					<button
						type="submit"
						class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						<span class="icon-[mdi--close]"></span>
					</button>
				</form>
			</div>
			<form method="dialog" class="modal-backdrop">
				<button type="submit">close</button>
			</form>
		</dialog>
	);
}
