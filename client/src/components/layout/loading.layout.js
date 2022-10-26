// this component is for showing loading
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoadingLayout = () => {
	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		console.log(location.state);
		// deleteVAT();
	}, []);

	return (
		<div className="container-fluid">
			<h1>Loading . . .</h1>
		</div>
	);
};

export default LoadingLayout;
