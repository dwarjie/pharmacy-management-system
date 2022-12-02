//  This module will be the container for the main contents
import { Routes, Route } from "react-router-dom";
import ProtectedURL from "../layout/ProtectedURL";
import NotFound from "../layout/NotFound";

// components
import TopNavigation from "./navigation/TopNavigation";

// Patient Tab
import AddPatient from "./navigation/patient/AddPatient";
import UpdatePatient from "./navigation/patient/UpdatePatient";
import PatientList from "./navigation/patient/PatientList";

// Maintenance Tab
import Category from "./navigation/category/Category";
import UpdateCategory from "./navigation/category/UpdateCategory";
import AddSubCategory from "./navigation/category/AddSubCategory";
import UpdateSubCategory from "./navigation/category/UpdateSubCategory";

import AddType from "./navigation/type/AddType";

import Unit from "./navigation/unit/Unit";
import UpdateUnit from "./navigation/unit/UpdateUnit";

import AddMedicine from "./navigation/medicine/AddMedicine";
import MedicineList from "./navigation/medicine/MedicineList";
import UpdateMedicine from "./navigation/medicine/UpdateMedicine";

import Supplier from "./navigation/supplier/Supplier";
import UpdateSupplier from "./navigation/supplier/UpdateSupplier";

import VAT from "./navigation/vat/VAT";

import OR from "./navigation/OR/OR";

import Discount from "./navigation/discount/Discount";
import UpdateDiscount from "./navigation/discount/UpdateDiscount";

// Handler Tab
import AddHandler from "./navigation/handler/AddHandler";
import UpdateHandler from "./navigation/handler/UpdateHandler";
import HandlerList from "./navigation/handler/HandlerList";

// Sales Tab
import POS from "./navigation/pos/POS";
import ManagePOS from "./navigation/pos/ManagePOS";
import ViewSale from "./navigation/pos/ViewSale";
import PrintInvoice from "./navigation/print/PrintInvoice";

// Utilities Tab
import AddUser from "./navigation/user/AddUser";
import UserList from "./navigation/user/UserList";

const ContentContainer = (props) => {
	return (
		<div className="content-container h-100" id="content-container">
			<TopNavigation toggleSideNavigation={props.toggleSideNavigation} />

			<div className="container-fluid col-12 mt-3 pb-3 h-auto">
				<Routes>
					<Route element={<ProtectedURL role={"ROLES_MAINTENANCE"} />}>
						<Route path="/maintenance/patient" element={<AddPatient />} />
						<Route
							path="/maintenance/patient/:id"
							element={<UpdatePatient />}
						/>
						<Route
							path="/maintenance/patient/patient-list"
							element={<PatientList />}
						/>
						<Route path="/maintenance/category" element={<Category />} />
						<Route
							path="/maintenance/category/:id"
							element={<UpdateCategory />}
						/>
						<Route
							path="/maintenance/category/sub-category"
							element={<AddSubCategory />}
						/>
						<Route
							path="/maintenance/category/sub-category/:id"
							element={<UpdateSubCategory />}
						/>
						<Route path="/maintenance/type" element={<AddType />} />
						<Route path="/maintenance/unit" element={<Unit />} />
						<Route path="/maintenance/unit/:id" element={<UpdateUnit />} />
						<Route path="/maintenance/medicine" element={<AddMedicine />} />
						<Route
							path="/maintenance/medicine/medicine-list"
							element={<MedicineList />}
						/>
						<Route
							path="/maintenance/medicine/:id"
							element={<UpdateMedicine />}
						/>
						<Route path="/maintenance/supplier" element={<Supplier />} />
						<Route
							path="/maintenance/supplier/:id"
							element={<UpdateSupplier />}
						/>
						<Route path="/maintenance/discount" element={<Discount />} />
						<Route
							path="/maintenance/discount/:id"
							element={<UpdateDiscount />}
						/>
						<Route path="/maintenance/vat" element={<VAT />} />
						<Route path="/maintenance/or" element={<OR />} />
						<Route path="/maintenance/handler" element={<AddHandler />} />
						<Route
							path="/maintenance/handler/handler-list"
							element={<HandlerList />}
						/>
						<Route
							path="/maintenance/handler/:id"
							element={<UpdateHandler />}
						/>
					</Route>
					<Route element={<ProtectedURL role={"ROLES_UTILITIES"} />}>
						<Route path="/utilities/add-user" element={<AddUser />} />
						<Route path="/utilities/user-list" element={<UserList />} />
					</Route>
					<Route element={<ProtectedURL role={"ROLES_SALES"} />}>
						<Route path="/sales/pos" element={<POS />} />
						<Route path="/sales/pos/print" element={<PrintInvoice />} />
						<Route path="/sales/sales-list" element={<ManagePOS />} />
						<Route path="/sales/sales-list/:id" element={<ViewSale />} />
					</Route>
					<Route path="*" element={<NotFound content={"NO ACCESS"} />} />
				</Routes>
			</div>
			{/* for SALES */}
			{/* <div className="col-12 mt-0 px-3 min-height-85">
				<Routes>
					<Route element={<ProtectedURL role={"ROLES_SALES"} />}>
						<Route path="/sales/pos" element={<POS />} />
						<Route path="/sales/pos/print" element={<PrintInvoice />} />
						<Route path="/sales/sales-list" element={<ManagePOS />} />
						<Route path="/sales/sales-list/:id" element={<ViewSale />} />
					</Route>
				</Routes>
			</div> */}
		</div>
	);
};

export default ContentContainer;
