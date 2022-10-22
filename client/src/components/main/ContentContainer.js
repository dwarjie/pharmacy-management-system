//  This module will be the container for the main contents
import { Routes, Route } from "react-router-dom";

// components
import TopNavigation from "./navigation/TopNavigation";
// Patient Tab
import AddPatient from "./navigation/patient/AddPatient";
import PatientList from "./navigation/patient/PatientList";
// Medicine Tab
import Category from "./navigation/category/Category";
import UpdateCategory from "./navigation/category/UpdateCategory";
import AddSubCategory from "./navigation/category/AddSubCategory";
import AddType from "./navigation/type/AddType";
import TypeList from "./navigation/type/TypeList";
import AddUnit from "./navigation/unit/AddUnit";
import UnitList from "./navigation/unit/UnitList";
import AddMedicine from "./navigation/medicine/AddMedicine";
import MedicineList from "./navigation/medicine/MedicineList";
// Manufacturer Tab
import AddManufacturer from "./navigation/manufacturer/AddManufacturer";
import ManufacturerList from "./navigation/manufacturer/ManufacturerList";
// Utilities Tab
import AddUser from "./navigation/user/AddUser";
import UserList from "./navigation/user/UserList";
// Handler Tab
import AddHandler from "./navigation/handler/AddHandler";
import HandlerList from "./navigation/handler/HandlerList";

// layout
import LoadingLayout from "../layout/loading.layout";

const ContentContainer = (props) => {
	return (
		<div className="content-container h-100" id="content-container">
			<TopNavigation toggleSideNavigation={props.toggleSideNavigation} />

			<div className="container-fluid col-12 col-md-10 mt-5 pb-3 h-auto">
				<Routes>
					<Route path="/patient/add-patient" element={<AddPatient />} />
					<Route path="/patient/patient-list" element={<PatientList />} />
					<Route path="/maintenance/category" element={<Category />} />
					<Route
						path="/maintenance/category/:id"
						element={<UpdateCategory />}
					/>
					<Route
						path="/maintenance/category/sub-category"
						element={<AddSubCategory />}
					/>
					<Route path="/maintenance/type" element={<AddType />} />
					<Route path="/maintenance/unit" element={<AddUnit />} />
					<Route path="/maintenance/add-medicine" element={<AddMedicine />} />
					<Route path="/medicine/medicine-list" element={<MedicineList />} />
					<Route
						path="/maintenance/manufacturer"
						element={<AddManufacturer />}
					/>
					<Route path="/handler/add-handler" element={<AddHandler />} />
					<Route path="/handler/handler-list" element={<HandlerList />} />
					<Route path="/utilities/add-user" element={<AddUser />} />
					<Route path="/utilities/user-list" element={<UserList />} />
				</Routes>
			</div>
		</div>
	);
};

export default ContentContainer;
