import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./style/css/main.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";

// components
import LoginComponent from "./components/login/LoginComponent";
import MainComponent from "./components/main/MainComponents";
import AuthService from "./services/AuthService";

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

const ProtectedRoutes = () => {
	let auth = { token: false };
	return auth.token ? <Outlet /> : <Navigate to={`/`} />;
};

export default App;
