import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./style/css/main.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";

// components
import LoginComponent from "./components/login/LoginComponent";
import MainComponent from "./components/main/MainComponents";
import ProtectedRoutes from "./components/layout/ProtectedRouters";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<LoginComponent />} />
				<Route element={<ProtectedRoutes />}>
					<Route exact path="/pharmacy/*" element={<MainComponent />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
