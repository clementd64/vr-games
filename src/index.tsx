import { render } from "preact";
import { GameDetail } from "./components/details";
import { Guide } from "./components/guide";
import { GameList } from "./components/list";
import { ParamsProvider } from "./lib/params";

function App() {
	return (
		<ParamsProvider>
			<GameList />
			<GameDetail />
			<Guide />
		</ParamsProvider>
	);
}

render(<App />, document.querySelector("#app"));
