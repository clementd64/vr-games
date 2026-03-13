interface Data {
	url: string;
	password: string;
	games: Game[];
}

interface Game {
	id: string;
	name: string;
	release: string;
	package: string;
	version: number;
	lastUpdated: string;
	size: number;
	downloads: number;
	rating: number;
	ratingCount: number;
	note?: string;
	thumbnail?: string;
}

interface Params {
	page: number;
	search?: string;
	game?: string;
	guide?: string;
}
