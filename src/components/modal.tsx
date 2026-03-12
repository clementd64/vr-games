import type { ComponentChildren } from "preact";

export function Modal({ children }: { children: ComponentChildren }) {
	return (
		<dialog class="modal">
			<div class="modal-box">
				<form method="dialog">
					<button
						type="button"
						class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>
				</form>
				{children}
			</div>
			<form method="dialog" class="modal-backdrop">
				<button type="button">close</button>
			</form>
		</dialog>
	);
}
