import { useCallback, useState } from "preact/hooks";

export function Commands({ commands }: { commands: string[] }) {
	const [copied, setCopied] = useState(false);

	const copy = useCallback(() => {
		navigator.clipboard.writeText(commands.join("\n"));
		setCopied(true);
		setTimeout(() => setCopied(false), 5000);
	}, [setCopied, commands]);

	return (
		<div class="not-prose relative">
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
