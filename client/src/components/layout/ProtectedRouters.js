// This component have the protected routes
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalState } from "../../state";

const ProtectedRoutes = () => {
	let [auth] = useGlobalState("auth");
	return auth ? <Outlet /> : <Navigate to={`/`} />;
};

export default ProtectedRoutes;
