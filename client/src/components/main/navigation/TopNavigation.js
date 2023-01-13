// This module will contain the Top Navigation
import { useEffect, useState } from "react";
import {
	ExclamationTriangleFill,
	PersonCircle,
	BellFill,
} from "react-bootstrap-icons";
import { HiOutlineMenu } from "react-icons/hi";
import { CgLogOff } from "react-icons/cg";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { getCurrentTime } from "../../../helper/dateHelper";
import { createAuditTrail } from "../../../helper/AuditTrailHelper";
import { useGlobalState } from "../../../state";

const TopNavigation = (props) => {
	let [currentUser] = useGlobalState("currentUser");
	let navigate = useNavigate();
	const logOut = () => {
		createAuditTrail("Logged out successfully.", "Logged Out", currentUser.id);
		AuthService.logout();
		navigate(`/`);
	};

	const [currentTime, setCurrentTime] = useState(null);

	// get current time and auto update every second
	useEffect(() => {
		setInterval(() => setCurrentTime(getCurrentTime()), 1000);
	}, []);

	return (
		<nav className="navbar bg-light w-auto top-navigation simple-shadow">
			<div className="container-fluid align-items-center">
				<button
					className="btn-toggler"
					id="top-navbar-toggler"
					onClick={props.toggleSideNavigation}
				>
					<span className="burger">
						<HiOutlineMenu className="icon-size-lg" />
					</span>
				</button>
				<div>
					<p className="text-date">
						<strong>{currentTime}</strong>
					</p>
				</div>
				{/* <div>
						<h5 className="text-weight-medium text-time">{getCurrentDate()}</h5>
					</div> */}
				<div className="d-flex flex-row align-items-center gap-3">
					{/* <BellFill className="icon-size-md text-dark" /> */}
					{/* <ExclamationTriangleFill className="icon-size-md text-dark" /> */}
					<p className="m-0 current-user">{`${currentUser.FirstName} ${currentUser.LastName}`}</p>
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
