// This component have the protected routes
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalState } from "../../state";

const ProtectedURL = ({ role }) => {
	let user = useGlobalState("currentUser");

	const checkRole = () => {
		// console.log(user);
		if (user[0].roleGroup.Role.length === 0) return false;

		if (user[0].roleGroup.Role.includes(role)) {
			return true;
		} else {
			return false;
		}
	};

	return checkRole() ? <Outlet /> : <Navigate to={`/`} />;
};

export default ProtectedURL;
