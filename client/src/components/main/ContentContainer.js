//  This module will be the container for the main contents

import TopNavigation from "./navigation/TopNavigation";

const ContentContainer = (props) => {
	return (
		<div className="content-container" id="content-container">
			<TopNavigation toggleSideNavigation={props.toggleSideNavigation} />
		</div>
	);
};

export default ContentContainer;
