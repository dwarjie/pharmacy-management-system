// This module will contain the Top Navigation
import {
	ExclamationTriangleFill,
	PersonCircle,
	BellFill,
} from "react-bootstrap-icons";

const TopNavigation = () => {
	return (
		<nav className="navbar navbar-dark bg-light w-auto">
			<div className="container-fluid">
				<button
					className="navbar-toggler bg-dark"
					data-bs-toggle="collapse"
					data-bs-target="#navbar-toggle-content"
					aria-controls="navbar-toggle-content"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="d-flex flex-row gap-3">
					<BellFill className="icon-size-sm" />
					<ExclamationTriangleFill className="icon-size-sm" />
					<PersonCircle className="icon-size-sm" />
				</div>
			</div>
		</nav>
	);
};

export default TopNavigation;
