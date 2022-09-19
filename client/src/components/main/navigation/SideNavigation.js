// This component containers the SideNavigation Bar
// Hidden by default in mobile and Tablet
import { Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";

const SideNavigation = () => {
	return (
		<nav
			className="collapse navbar navbar-expand d-flex flex-column align-item-start bg-light h-100 side-navigation"
			id="sideNavigation"
		>
			<div className="container-fluid flex-column gap-4 p-3">
				<h2 className="text-center">ActiveCare Home Health Solution Inc.</h2>
				<div className="d-flex flex-column gap-1 w-100">
					<Link to={"/dashboard"} className="btn btn-side-navigation">
						<span className="px-2">
							<HouseFill className="icon-size-sm" />
						</span>{" "}
						Dashboard
					</Link>
					<div class="dropdown">
						<button
							class="btn dropdown-toggle btn-side-navigation"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span className="px-2">
								<HouseFill className="icon-size-sm" />
							</span>{" "}
							Patient
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<a class="dropdown-item" href="#">
									Action
								</a>
							</li>
							<li>
								<a class="dropdown-item" href="#">
									Another action
								</a>
							</li>
							<li>
								<a class="dropdown-item" href="#">
									Something else here
								</a>
							</li>
						</ul>
					</div>
					<div class="dropdown">
						<button
							class="btn dropdown-toggle btn-side-navigation"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span className="px-2">
								<HouseFill className="icon-size-sm" />
							</span>{" "}
							Patient
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<a class="dropdown-item" href="#">
									Action
								</a>
							</li>
							<li>
								<a class="dropdown-item" href="#">
									Another action
								</a>
							</li>
							<li>
								<a class="dropdown-item" href="#">
									Something else here
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default SideNavigation;
