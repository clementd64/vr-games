import { render } from "preact";
import { GameDetail } from "./components/details";
import { GameList } from "./components/list";
import { ParamsProvider } from "./lib/params";

function App() {
	return (
		<ParamsProvider>
			<GameList />
			<GameDetail />
		</ParamsProvider>
	);
}

render(<App />, document.querySelector("#app"));
