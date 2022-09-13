import { Routes, Route } from "react-router-dom";
import "./style/css/main.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";

// components
import LoginComponent from "./components/login/LoginComponent";
import MainComponent from "./components/main/MainComponents";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<LoginComponent />} />
			</Routes>
		</div>
	);
}

export default App;
