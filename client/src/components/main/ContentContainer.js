//  This module will be the container for the main contents
import { Routes, Route } from "react-router-dom";

// components
import TopNavigation from "./navigation/TopNavigation";
import AddPatient from "./navigation/patient/AddPatient";
import AddCategory from "./navigation/category/AddCategory";

const ContentContainer = (props) => {
	return (
		<div className="content-container" id="content-container">
			<TopNavigation toggleSideNavigation={props.toggleSideNavigation} />

			<div className="container-fluid mt-5">
				<Routes>
					<Route path="/patient/add-patient" element={<AddPatient />} />
					<Route path="/medicine/add-category" element={<AddCategory />} />
				</Routes>
			</div>
		</div>
	);
};

export default ContentContainer;
