import React from "react";

// components
import SideNavigation from "./navigation/SideNavigation";
import ContentContainer from "./ContentContainer";

const MainComponent = () => {
	// add event listener when the toggler is clicked
	const toggleSideNavigation = () => {
		// this function will be for showing and hiding the side navigation
		let sideNavigation = document.querySelector("#sideNavigation");
		let contentContainer = document.querySelector("#content-container");

		sideNavigation.classList.toggle("active-nav");
		contentContainer.classList.toggle("active-content-container");
	};

	return (
		<div>
			<SideNavigation />
			<ContentContainer toggleSideNavigation={toggleSideNavigation} />
		</div>
	);
};

export default MainComponent;
