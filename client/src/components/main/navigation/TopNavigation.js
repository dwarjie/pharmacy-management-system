// This module will contain the Top Navigation
import {
	ExclamationTriangleFill,
	PersonCircle,
	BellFill,
} from "react-bootstrap-icons";

const TopNavigation = (props) => {
	return (
		<nav className="navbar bg-light w-auto top-navigation simple-shadow">
			<div className="container-fluid">
				<button id="top-navbar-toggler" onClick={props.toggleSideNavigation}>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="d-flex flex-row gap-3">
					<BellFill className="icon-size-md" />
					<ExclamationTriangleFill className="icon-size-md" />
					<PersonCircle className="icon-size-md" />
				</div>
			</div>
		</nav>
	);
};

export default TopNavigation;
