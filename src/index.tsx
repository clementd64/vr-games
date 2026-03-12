import { render } from "preact";
import { GameList } from "./components/list";
import { ParamsProvider } from "./lib/params";

function App() {
	return (
		<ParamsProvider>
			<GameList />
		</ParamsProvider>
	);
}

render(<App />, document.querySelector("#app"));
