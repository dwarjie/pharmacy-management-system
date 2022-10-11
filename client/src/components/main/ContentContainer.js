//  This module will be the container for the main contents
import { Routes, Route } from "react-router-dom";

// components
import TopNavigation from "./navigation/TopNavigation";
// Patient Tab
import AddPatient from "./navigation/patient/AddPatient";
import PatientList from "./navigation/patient/PatientList";
// Medicine Tab
import AddCategory from "./navigation/category/AddCategory";
import CategoryList from "./navigation/category/CategoryList";
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

const ContentContainer = (props) => {
	return (
		<div className="content-container h-100" id="content-container">
			<TopNavigation toggleSideNavigation={props.toggleSideNavigation} />

			<div className="container-fluid col-12 col-md-10 mt-5 h-auto">
				<Routes>
					<Route path="/patient/add-patient" element={<AddPatient />} />
					<Route path="/patient/patient-list" element={<PatientList />} />
					<Route path="/medicine/add-category" element={<AddCategory />} />
					<Route path="/medicine/category-list" element={<CategoryList />} />
					<Route path="/medicine/add-type" element={<AddType />} />
					<Route path="/medicine/type-list" element={<TypeList />} />
					<Route path="/medicine/add-unit" element={<AddUnit />} />
					<Route path="/medicine/unit-list" element={<UnitList />} />
					<Route path="/medicine/add-medicine" element={<AddMedicine />} />
					<Route path="/medicine/medicine-list" element={<MedicineList />} />
					<Route
						path="/manufacturer/add-manufacturer"
						element={<AddManufacturer />}
					/>
					<Route
						path="/manufacturer/manufacturer-list"
						element={<ManufacturerList />}
					/>
					<Route path="/utilities/add-user" element={<AddUser />} />
					<Route path="/utilities/user-list" element={<UserList />} />
				</Routes>
			</div>
		</div>
	);
};

export default ContentContainer;
