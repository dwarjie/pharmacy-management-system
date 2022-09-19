// This component containers the SideNavigation Bar
// Hidden by default in mobile and Tablet
import { Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";

const SideNavigation = () => {
	return (
		<nav
			className="collapse navbar navbar-expand d-flex flex-column align-item-start bg-light h-100 side-navigation"
			id="sideNavigation"
		>
			<div className="container-fluid flex-column gap-4 p-3">
				<h2 className="text-center">ActiveCare Home Health Solution Inc.</h2>
				<div className="d-flex flex-column gap-1 w-100">
					{/* DASHBOARD */}
					<Link to={"/dashboard"} className="btn btn-side-navigation">
						<span className="px-2">
							<HouseFill className="icon-size-sm" />
						</span>{" "}
						Dashboard
					</Link>
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
							Patient
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link to={"/patient/add-patient"} className="dropdown-item">
									Add Patient
								</Link>
							</li>
							<li>
								<Link to={"/patient/patient-list"} className="dropdown-item">
									Patient List
								</Link>
							</li>
						</ul>
					</div>
					{/* MANUFACTURER */}
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
							Manufacturer
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link
									to={"/manufacturer/add-manufacturer"}
									className="dropdown-item"
								>
									Add Manufacturer
								</Link>
							</li>
							<li>
								<Link
									to={"/manufacturer/manufacturer-list"}
									className="dropdown-item"
								>
									Manufacturer List
								</Link>
							</li>
						</ul>
					</div>

					{/* MEDICINE */}
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
							Medicine
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link to={"/medicine/add-category"} className="dropdown-item">
									Add Category
								</Link>
							</li>
							<li>
								<Link to={"/medicine/category-list"} className="dropdown-item">
									Category List
								</Link>
							</li>
							<li>
								<Link to={"/medicine/add-type"} className="dropdown-item">
									Add Type
								</Link>
							</li>
							<li>
								<Link to={"/medicine/type-list"} className="dropdown-item">
									Type List
								</Link>
							</li>
							<li>
								<Link to={"/medicine/add-unit"} className="dropdown-item">
									Add Unit
								</Link>
							</li>
							<li>
								<Link to={"/medicine/unit-list"} className="dropdown-item">
									Unit List
								</Link>
							</li>
							<li>
								<Link to={"/medicine/add-medicine"} className="dropdown-item">
									Add Medicine
								</Link>
							</li>
							<li>
								<Link to={"/medicine/medicine-list"} className="dropdown-item">
									Medicine List
								</Link>
							</li>
						</ul>
					</div>

					{/* PURCHASE */}
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
							Purchase
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link to={"/purchase/add-purchase"} className="dropdown-item">
									Add Purchase
								</Link>
							</li>
							<li>
								<Link to={"/purchase/purchase-list"} className="dropdown-item">
									Purchase List
								</Link>
							</li>
						</ul>
					</div>

					{/* INVOICE */}
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
							Invoice
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link to={"/invoice/add-invoice"} className="dropdown-item">
									Add Invoice
								</Link>
							</li>
							<li>
								<Link to={"/invoice/invoice-list"} className="dropdown-item">
									Invoice List
								</Link>
							</li>
						</ul>
					</div>

					{/* POS */}
					<Link to={"/pos"} className="btn btn-side-navigation">
						<span className="px-2">
							<HouseFill className="icon-size-sm" />
						</span>{" "}
						POS
					</Link>

					{/* STOCK */}
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
							Stock
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link to={"/stock/stock-report"} className="dropdown-item">
									Stock Report
								</Link>
							</li>
							<li>
								<Link
									to={"/stock/stock-report-batch"}
									className="dropdown-item"
								>
									Stock Report (Batch)
								</Link>
							</li>
							<li>
								<Link to={"/stock/stock-list"} className="dropdown-item">
									Stock List
								</Link>
							</li>
						</ul>
					</div>

					{/* REPORTS */}
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
							Reports
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link
									to={"/report/sales-report-category"}
									className="dropdown-item"
								>
									Sales Report (Category)
								</Link>
							</li>
							<li>
								<Link
									to={"/report/sales-report-product"}
									className="dropdown-item"
								>
									Sales Report (Product)
								</Link>
							</li>
							<li>
								<Link to={"/report/purchase-report"} className="dropdown-item">
									Purchase Report
								</Link>
							</li>
						</ul>
					</div>

					{/* SUPPLIER */}
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
							Supplier
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link to={"/supplier/add-supplier"} className="dropdown-item">
									Add Supplier
								</Link>
							</li>
							<li>
								<Link to={"/supplier/supplier-list"} className="dropdown-item">
									Supplier List
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
								<Link to={"/utilities/add-user"} className="dropdown-item">
									Add User
								</Link>
							</li>
							<li>
								<Link to={"/utilities/user-list"} className="dropdown-item">
									User List
								</Link>
							</li>
							<li>
								<Link to={"/utilities/backup"} className="dropdown-item">
									Download Backup
								</Link>
							</li>
							<li>
								<Link to={"/utilities/restore"} className="dropdown-item">
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
