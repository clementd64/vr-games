import { useContext, useEffect, useRef } from "preact/hooks";
import { Params, setParams } from "../lib/params";
import { Commands } from "./commands";

export function Guide() {
	const params = useContext(Params);
	const modal = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (params.guide) {
			modal.current?.showModal();
		}
	}, [params.guide]);

	return (
		<dialog
			class="modal"
			onClose={() => setParams({ guide: undefined })}
			ref={modal}
		>
			<div class="modal-box prose lg:max-w-1/2 max-h-11/12">
				<h2>Guide</h2>
				<h3>Requirements</h3>
				<ul>
					<li>
						<a href="https://rclone.org/">Rclone</a>
					</li>
					<li>7zip</li>
					<li>
						adb (part of{" "}
						<a href="https://developer.android.com/tools/releases/platform-tools">
							Android platform-tools
						</a>
						)
					</li>
					<li>Developer Mode enabled</li>
				</ul>
				<p>Using Docker (Linux only)</p>
				<Commands
					commands={[
						"docker run --rm -it --device=/dev/bus/usb:/dev/bus/usb --init ghcr.io/clementd64/vr-games:latest",
					]}
				/>
				<p>Using Nix</p>
				<Commands
					commands={[
						"NIXPKGS_ALLOW_UNFREE=1 nix shell --impure nixpkgs#androidenv.androidPkgs.platform-tools nixpkgs#p7zip nixpkgs#rclone",
					]}
				/>

				<h3>Connect to devices</h3>
				<p>Plug your device into your computer using a USB cable.</p>
				<Commands commands={["adb devices"]} />
				<p>Autorize your computer inside your device</p>

				<h3>Install Games</h3>
				<p>See per games instruction</p>

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
