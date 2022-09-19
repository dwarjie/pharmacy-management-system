// This component containers the SideNavigation Bar
// Hidden by default in mobile and Tablet

const SideNavigation = () => {
	return (
		<nav
			className="collapse navbar navbar-expand d-flex flex-column align-item-start bg-light h-100 side-navigation"
			id="sideNavigation"
		>
			<div className="container-fluid pt-3">
				<h2 className="text-center">ActiveCare Home Health Solution Inc.</h2>
			</div>
		</nav>
	);
};

export default SideNavigation;
