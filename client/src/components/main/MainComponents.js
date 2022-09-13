import React from "react";

// components
import TopNavigation from "./navigation/TopNavigation";
import SideNavigation from "./navigation/SideNavigation";

const MainComponent = () => {
	return (
		<div>
			<TopNavigation />
			<SideNavigation />
		</div>
	);
};

export default MainComponent;
