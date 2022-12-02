// This module will contain the Top Navigation
import {
	ExclamationTriangleFill,
	PersonCircle,
	BellFill,
} from "react-bootstrap-icons";
import { HiOutlineMenu } from "react-icons/hi";
import { CgLogOff } from "react-icons/cg";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";

const TopNavigation = (props) => {
	let navigate = useNavigate();
	const logOut = () => {
		AuthService.logout();
		navigate(`/`);
	};

	return (
		<nav className="navbar bg-light w-auto top-navigation simple-shadow">
			<div className="container-fluid">
				<button
					className="btn-toggler"
					id="top-navbar-toggler"
					onClick={props.toggleSideNavigation}
				>
					<span className="burger">
						<HiOutlineMenu className="icon-size-lg" />
					</span>
				</button>
				<div className="d-flex flex-row gap-3">
					<BellFill className="icon-size-md text-dark" />
					<ExclamationTriangleFill className="icon-size-md text-dark" />
					<CgLogOff
						className="icon-size-md text-dark cursor-pointer"
						onClick={logOut}
					/>
				</div>
			</div>
		</nav>
	);
};

export default TopNavigation;
