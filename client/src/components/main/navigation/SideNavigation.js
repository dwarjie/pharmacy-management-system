// This component containers the SideNavigation Bar
// Hidden by default in mobile and Tablet
import { Link } from "react-router-dom";
import { HouseFill, PeopleFill, Cart4, Receipt } from "react-bootstrap-icons";

const SideNavigation = () => {
	return (
		<nav
			className="collapse navbar navbar-expand d-flex flex-column align-item-start bg-light h-100 side-navigation"
			id="sideNavigation"
		>
			<div className="container-fluid flex-column gap-4 p-3">
				<h5 className="text-center">ActiveCare Home Health Solution Inc.</h5>
				<div className="d-flex flex-column gap-1 w-100">
					{/* DASHBOARD */}
					<Link to={"/dashboard"} className="btn btn-side-navigation">
						<span className="px-2">
							<HouseFill className="icon-size-sm" />
						</span>{" "}
						Dashboard
					</Link>

					{/* PATIENT */}
					<div className="dropdown">
						<button
							className="btn dropdown-toggle btn-side-navigation"
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
									to={"/pharmacy/patient/add-patient"}
									className="dropdown-item"
								>
									Add Patient
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/patient/patient-list"}
									className="dropdown-item"
								>
									Patient List
								</Link>
							</li>
						</ul>
					</div>

					{/* FILE MAINTENANCE*/}
					<div className="dropdown">
						<button
							className="btn dropdown-toggle btn-side-navigation"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span className="px-2">
								<PeopleFill className="icon-size-sm" />
							</span>{" "}
							File Maintenance
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link
									to={"/pharmacy/maintenance/category"}
									className="dropdown-item"
								>
									Category
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/maintenance/manufacturer"}
									className="dropdown-item"
								>
									Manufacturer
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/maintenance/vat"}
									className="dropdown-item"
								>
									VAT
								</Link>
							</li>
							<li>
								<Link to={"/pharmacy/maintenance/or"} className="dropdown-item">
									OR
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/maintenance/discount"}
									className="dropdown-item"
								>
									Discount
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/maintenance/type"}
									className="dropdown-item"
								>
									Type
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/maintenance/unit"}
									className="dropdown-item"
								>
									UOM
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/maintenance/add-medicine"}
									className="dropdown-item"
								>
									Add Medicine
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/medicine/medicine-list"}
									className="dropdown-item"
								>
									Medicine List
								</Link>
							</li>
						</ul>
					</div>

					{/* HANDLERS */}
					<div className="dropdown">
						<button
							className="btn dropdown-toggle btn-side-navigation"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span className="px-2">
								<HouseFill className="icon-size-sm" />
							</span>{" "}
							NCM/Doctors
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link
									to={"/pharmacy/handler/add-handler"}
									className="dropdown-item"
								>
									Add User
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/handler/handler-list"}
									className="dropdown-item"
								>
									Handler List
								</Link>
							</li>
						</ul>
					</div>

					{/* INVENTORY */}
					<div className="dropdown">
						<button
							className="btn dropdown-toggle btn-side-navigation"
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
									to={"pharmacy/inventory/purchase-order"}
									className="dropdown-item"
								>
									Purchase Order
								</Link>
							</li>
							<li>
								<Link
									to={"pharmacy/inventory/receive-purchase-order"}
									className="dropdown-item"
								>
									Receive Purchase Order
								</Link>
							</li>
							<li>
								<Link
									to={"pharmacy/inventory/back-order"}
									className="dropdown-item"
								>
									Back Order
								</Link>
							</li>
							<li>
								<Link
									to={"pharmacy/inventory/receive-back-order"}
									className="dropdown-item"
								>
									Receive Back Order
								</Link>
							</li>
							<li>
								<Link
									to={"pharmacy/inventory/stock-adjustment"}
									className="dropdown-item"
								>
									Stock Adjustment
								</Link>
							</li>
						</ul>
					</div>

					{/* SALES */}
					<div className="dropdown">
						<button
							className="btn dropdown-toggle btn-side-navigation"
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
								<Link to={"pharmacy/sales/pos"} className="dropdown-item">
									POS
								</Link>
							</li>
							<li>
								<Link to={"pharmacy/sales/credit"} className="dropdown-item">
									Credit
								</Link>
							</li>
							<li>
								<Link to={"pharmacy/sales/return"} className="dropdown-item">
									Return
								</Link>
							</li>
						</ul>
					</div>

					{/* REPORT */}
					<div className="dropdown">
						<button
							className="btn dropdown-toggle btn-side-navigation"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span className="px-2">
								<HouseFill className="icon-size-sm" />
							</span>{" "}
							Report
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link
									to={"pharmacy/report/stock-report"}
									className="dropdown-item"
								>
									Stock Report
								</Link>
							</li>
							<li>
								<Link
									to={"pharmacy/report/master-list"}
									className="dropdown-item"
								>
									Master List
								</Link>
							</li>
							<li>
								<Link
									to={"pharmacy/report/sales-report"}
									className="dropdown-item"
								>
									Sales Report
								</Link>
							</li>
							<li>
								<Link
									to={"pharmacy/report/purchase-report"}
									className="dropdown-item"
								>
									Purchase Report
								</Link>
							</li>
						</ul>
					</div>

					{/* UTILITIES */}
					<div className="dropdown">
						<button
							className="btn dropdown-toggle btn-side-navigation"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span className="px-2">
								<HouseFill className="icon-size-sm" />
							</span>{" "}
							Utilities
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link
									to={"/pharmacy/utilities/add-user"}
									className="dropdown-item"
								>
									Add User
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/utilities/user-list"}
									className="dropdown-item"
								>
									User List
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/utilities/backup"}
									className="dropdown-item"
								>
									Download Backup
								</Link>
							</li>
							<li>
								<Link
									to={"/pharmacy/utilities/restore"}
									className="dropdown-item"
								>
									Restose Database
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default SideNavigation;
