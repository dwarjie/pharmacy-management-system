// This component containers the SideNavigation Bar
// Hidden by default in mobile and Tablet
import { Link } from "react-router-dom";
import { HouseFill, PeopleFill, Cart4, Receipt } from "react-bootstrap-icons";
import { AiFillMedicineBox, AiFillFile, AiFillSetting } from "react-icons/ai";
import { useGlobalState } from "../../../state";
import { createAuditTrail } from "../../../helper/AuditTrailHelper";
import { createContext, useContext } from "react";

// create context API
const NavigationContext = createContext();
const { Provider } = NavigationContext;

const SideNavigation = () => {
	let [currentUser] = useGlobalState("currentUser");
	const ROLES = {
		admin: "admin",
		maintenance: "maintenance",
		inventory: "inventory",
		sales: "sales",
		reports: "reports",
		utilities: "utilities",
		request: "request-form",
	};

	const contextValue = {
		currentUser,
	};

	// check if user has the role in order to use the module
	const checkRoles = (role) => {
		if (
			currentUser.roleGroup.Role.includes(role) ||
			currentUser.roleGroup.Role.includes(ROLES.admin)
		) {
			return true;
		}
		return false;
	};

	return (
		<nav
			className="collapse navbar navbar-expand d-flex flex-column align-item-start bg-dark h-100 side-navigation"
			id="sideNavigation"
		>
			<Provider value={contextValue}>
				<div className="container-fluid flex-column gap-4 p-3">
					<h5 className="text-center text-light">
						ActivCare Home Health Solution Inc.
					</h5>
					<div className="d-flex flex-column gap-1 w-100">
						{/* DASHBOARD */}
						<Link
							to={"/pharmacy/dashboard"}
							className="btn btn-side-navigation"
							onClick={() =>
								createAuditTrail(
									"Dashboard is clicked in navigation",
									"Click",
									currentUser.id
								)
							}
						>
							<span className="px-2">
								<HouseFill className="icon-size-sm" />
							</span>{" "}
							Dashboard
						</Link>

						{/* FILE MAINTENANCE*/}
						{checkRoles(ROLES.maintenance) ? <MaintenanceModule /> : ""}

						{/* HANDLERS */}
						{checkRoles(ROLES.maintenance) ? <HandlerModule /> : ""}

						{/* PATIENT */}
						{checkRoles(ROLES.maintenance) ? <PatientModule /> : ""}

						{/* INVENTORY */}
						{checkRoles(ROLES.inventory) ? <InventoryModule /> : ""}

						{/* SALES */}
						{checkRoles(ROLES.sales) ? <SalesModule /> : ""}

						{/* REPORT */}
						{checkRoles(ROLES.reports) ? <ReportsModule /> : ""}

						{/* UTILITIES */}
						{checkRoles(ROLES.utilities) ? <UtilitiesModule /> : ""}
						{/* <UtilitiesModule /> */}
					</div>
				</div>
			</Provider>
		</nav>
	);
};

const PatientModule = () => {
	const { currentUser } = useContext(NavigationContext);
	return (
		<div className="dropdown">
			<button
				className="btn dropdown-toggle btn-side-navigation text-light"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span className="px-2">
					<PeopleFill className="icon-size-sm" />
				</span>{" "}
				Patient
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li>
					<Link
						to={"/pharmacy/maintenance/patient"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Add patient is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Add Patient
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/maintenance/patient/patient-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Patient List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Patient List
					</Link>
				</li>
			</ul>
		</div>
	);
};

const MaintenanceModule = () => {
	const { currentUser } = useContext(NavigationContext);
	return (
		<div className="dropdown">
			<button
				className="btn dropdown-toggle btn-side-navigation text-light"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span className="px-2">
					<AiFillMedicineBox className="icon-size-sm" />
				</span>{" "}
				File Maintenance
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li>
					<Link
						to={"/pharmacy/maintenance/category"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Category is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Category
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/maintenance/supplier"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Supplier is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Supplier
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/maintenance/vat"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"VAT is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						VAT
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/maintenance/or"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"OR is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						OR
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/maintenance/discount"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Discount is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Discount
					</Link>
				</li>
				{/* <li>
								<Link
									to={"/pharmacy/maintenance/type"}
									className="dropdown-item"
								>
									Type
								</Link>
							</li> */}
				<li>
					<Link
						to={"/pharmacy/maintenance/unit"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Unit of Measure is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Unit of Measure
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/maintenance/medicine"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Add Product is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Add Product
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/maintenance/medicine/medicine-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Product List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Product List
					</Link>
				</li>
			</ul>
		</div>
	);
};

const HandlerModule = () => {
	const { currentUser } = useContext(NavigationContext);
	return (
		<div className="dropdown">
			<button
				className="btn dropdown-toggle btn-side-navigation text-light"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span className="px-2">
					<PeopleFill className="icon-size-sm" />
				</span>{" "}
				NCM/Doctors
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li>
					<Link
						to={"/pharmacy/maintenance/handler"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Add NCM/Doctor is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Add NCM/Doctor
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/maintenance/handler/handler-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"NCM/Doctors List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						NCM/Doctors List
					</Link>
				</li>
			</ul>
		</div>
	);
};

const InventoryModule = () => {
	const { currentUser } = useContext(NavigationContext);
	return (
		<div className="dropdown">
			<button
				className="btn dropdown-toggle btn-side-navigation text-light"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span className="px-2">
					<Cart4 className="icon-size-sm" />
				</span>{" "}
				Inventory
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li>
					<Link
						to={"/pharmacy/inventory/order-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Purchase Order List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Purchase Order List
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/inventory/purchase-order"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Purchase Order is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Purchase Order
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/inventory/purchase-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Manage PO is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Manage PO
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/inventory/delivery-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Delivery List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Delivery List
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/inventory/stock-adjustment"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Stock Adjustment is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Stock Adjustment
					</Link>
				</li>
			</ul>
		</div>
	);
};

const SalesModule = () => {
	const { currentUser } = useContext(NavigationContext);
	return (
		<div className="dropdown">
			<button
				className="btn dropdown-toggle btn-side-navigation text-light"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span className="px-2">
					<Receipt className="icon-size-sm" />
				</span>{" "}
				Sales
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li>
					<Link
						to={"/pharmacy/sales/pos"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"POS is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						POS
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/sales/charge-to-account"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Charge to Account is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Charge to Account
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/sales/charge-to-account-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Charge to Accounts List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Charge to Accounts List
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/sales/return"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Return List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Return
					</Link>
				</li>
			</ul>
		</div>
	);
};

const ReportsModule = () => {
	const { currentUser } = useContext(NavigationContext);
	return (
		<div className="dropdown">
			<button
				className="btn dropdown-toggle btn-side-navigation text-light"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span className="px-2">
					<AiFillFile className="icon-size-sm" />
				</span>{" "}
				Report
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li>
					<Link
						to={"/pharmacy/report/sales-report"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Sales List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Sales List
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/report/invoice-report"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Invoice Report is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Invoice Report
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/report/master-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Master List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Master List
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/report/supplier-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Supplier List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Supplier List
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/report/inventory-valuation"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Inventory Valuation is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Inventory Valuation
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/report/stock-adjustment-history"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Stock Adjustment History is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Stock Adjustment History
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/report/return-history"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Return History is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Return History
					</Link>
				</li>
			</ul>
		</div>
	);
};

const UtilitiesModule = () => {
	const { currentUser } = useContext(NavigationContext);
	return (
		<div className="dropdown">
			<button
				className="btn dropdown-toggle btn-side-navigation text-light"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<span className="px-2">
					<AiFillSetting className="icon-size-sm" />
				</span>{" "}
				Utilities
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li>
					<Link
						to={"/pharmacy/utilities/add-role"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Role Group is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Role Group
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/utilities/add-user"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Add User is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Add User
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/utilities/user-list"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"User List is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						User List
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/dashboard"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Backup is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Download Backup
					</Link>
				</li>
				<li>
					<Link
						to={"/pharmacy/dashboard"}
						className="dropdown-item"
						onClick={() =>
							createAuditTrail(
								"Restore Backup is clicked in navigation",
								"Click",
								currentUser.id
							)
						}
					>
						Restore Database
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default SideNavigation;
