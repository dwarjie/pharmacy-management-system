//  This module will be the container for the main contents
import { Routes, Route } from "react-router-dom";

// components
import TopNavigation from "./navigation/TopNavigation";
import AddPatient from "./navigation/patient/AddPatient";
import AddCategory from "./navigation/category/AddCategory";
import CategoryList from "./navigation/category/CategoryList";
import AddType from "./navigation/type/AddType";
import TypeList from "./navigation/type/TypeList";
import AddUnit from "./navigation/unit/AddUnit";
import UnitList from "./navigation/unit/UnitList";

const ContentContainer = (props) => {
	return (
		<div className="content-container h-100" id="content-container">
			<TopNavigation toggleSideNavigation={props.toggleSideNavigation} />

			<div className="container-fluid col-12 col-md-10 mt-5 h-auto">
				<Routes>
					<Route path="/patient/add-patient" element={<AddPatient />} />
					<Route path="/medicine/add-category" element={<AddCategory />} />
					<Route path="/medicine/category-list" element={<CategoryList />} />
					<Route path="/medicine/add-type" element={<AddType />} />
					<Route path="/medicine/type-list" element={<TypeList />} />
					<Route path="/medicine/add-unit" element={<AddUnit />} />
					<Route path="/medicine/unit-list" element={<UnitList />} />
				</Routes>
			</div>
		</div>
	);
};

export default ContentContainer;
