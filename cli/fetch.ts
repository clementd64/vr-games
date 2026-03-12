import { basename } from "node:path";
import { $, Glob } from "bun";

const config = await fetch("https://vrpirates.wiki/downloads/vrp-public.json")
	.then((res) => res.json())
	.then((data) => ({
		url: data.baseUri,
		password: atob(data.password),
	}));

await $`rclone copy --http-url ${config.url} :http:/meta.7z ./cache/`;
await $`7z x cache/meta.7z -ocache -p${config.password} -y`;

const notes = new Map<string, string>();
for await (const file of new Glob("cache/.meta/notes/*.txt").scan({
	dot: true,
	onlyFiles: true,
})) {
	notes.set(basename(file, ".txt"), (await Bun.file(file).text()).trim());
}

const thumbnails = new Set<string>();
for await (const file of new Glob("cache/.meta/thumbnails/*.jpg").scan({
	dot: true,
	onlyFiles: true,
})) {
	thumbnails.add(basename(file, ".jpg"));
}

const games = (await Bun.file("cache/VRP-GameList.txt").text())
	.trim()
	.split("\n")
	.slice(1)
	.map((v) => v.split(";"))
	.map((v) => ({
		id: new Bun.CryptoHasher("md5").update(`${v[1]}\n`).digest("hex"),
		name: v[0],
		release: v[1],
		package: v[2],
		version: Number(v[3]),
		lastUpdated: new Date(v[4]),
		size: Number(v[5]) * 1024 ** 2,
		downloads: Number(v[6]),
		rating: Number(v[7]),
		ratingCount: Number(v[8]),
		note: notes.get(v[1]),
		thumbnail: thumbnails.has(v[2]) ? `${v[2]}.jpg` : undefined,
	}));

Bun.write(
	"data.json",
	JSON.stringify({
		url: config.url,
		password: config.password,
		games,
	}),
);

await $`rm -rf public/thumbnails`;
await $`mkdir -p public`;
await $`mv cache/.meta/thumbnails public/thumbnails`;
