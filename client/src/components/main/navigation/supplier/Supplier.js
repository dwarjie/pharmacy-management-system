// this module is responsible for adding new manufacturer
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SupplierService from "../../../../services/SupplierService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Supplier = () => {
	const initialSupplier = {
		id: null,
		SupplierName: "",
		Address: "",
		Mobile: "",
		Phone: "",
		Email: "",
	};
	let navigate = useNavigate();

	const [suppliers, setSuppliers] = useState([]);
	const [newSupplier, setNewSupplier] = useState(initialSupplier);

	// once the page is loaded, run this
	useEffect(() => {
		getAllSuppliers();
	}, []);

	// get all the supplier in the database
	const getAllSuppliers = () => {
		SupplierService.getSupplier()
			.then((response) => {
				setSuppliers(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// create a new Supplier
	const createSupplier = (event) => {
		event.preventDefault();
		// ask for confirmation
		if (!AlertPrompt()) return;

		let data = {
			SupplierName: newSupplier.SupplierName,
			Address: newSupplier.Address,
			Mobile: newSupplier.Mobile,
			Phone: newSupplier.Phone,
			Email: newSupplier.Email,
		};

		SupplierService.createSupplier(data)
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// delete the supplier
	const deleteSupplier = (supplier) => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		SupplierService.deleteSupplier(supplier.id)
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update supplier
	const updateSupplier = (supplier) => {
		navigate(`/pharmacy/maintenance/supplier/${supplier.id}`, {
			state: {
				supplier: supplier,
			},
		});
	};

	// handle the on change event for the forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewSupplier({ ...newSupplier, [name]: value });
	};

	// refresh the list
	const refreshList = () => {
		setNewSupplier(initialSupplier);
		setSuppliers([]);
		getAllSuppliers();
	};

	return (
		<div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<h4>Add Supplier</h4>
					<hr />
				</div>
				<div className="p-3">
					<form
						className="col-12 col-lg-10 pb-5 mx-auto"
						onSubmit={(event) => createSupplier(event)}
					>
						<div className="row mb-3">
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="SupplierName">
									Supplier Name:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="SupplierName"
									id="SupplierName"
									value={newSupplier.SupplierName}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="Mobile">
									Mobile #:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="Mobile"
									id="Mobile"
									value={newSupplier.Mobile}
									onChange={handleInputChange}
									required
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="Address">
									Address:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="Address"
									id="Address"
									value={newSupplier.Address}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="col-sm-12 col-md">
								<label htmlFor="Phone">Phone #:</label>
								<input
									type="text"
									className="form-control form-input"
									name="Phone"
									id="Phone"
									value={newSupplier.Phone}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="Email">
									Email:
								</label>
								<input
									type="email"
									className="form-control form-input"
									name="Email"
									id="Email"
									value={newSupplier.Email}
									onChange={handleInputChange}
									required
								/>
							</div>
						</div>
						<button className="btn btn-primary simple-shadow mt-3">Add</button>
					</form>
				</div>
			</div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
				<div className="p-3">
					<h4>Supplier List</h4>
					<hr />
				</div>
				<div className="p-3">
					<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
						<label htmlFor="supplier-search">Search:</label>
						<input
							type="text"
							className="form-control form-input"
							id="supplier-search"
						/>
					</form>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Mobile</th>
								<th scope="col">Address</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{suppliers &&
								suppliers.map((supplier, index) => (
									<tr key={index}>
										<td>{supplier.SupplierName}</td>
										<td>{supplier.Mobile}</td>
										<td>{supplier.Address}</td>
										<td>
											<span className="px-2">
												<FaEdit
													className="icon-size-sm cursor-pointer"
													onClick={() => updateSupplier(supplier)}
												/>
											</span>
											<span className="px-2">
												<MdDelete
													className="icon-size-sm cursor-pointer"
													onClick={() => deleteSupplier(supplier)}
												/>
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Supplier;
