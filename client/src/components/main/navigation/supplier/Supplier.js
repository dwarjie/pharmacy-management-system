// this module is responsible for adding new manufacturer
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";
import REGEX from "../../../../helper/regexHelper";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import SupplierService from "../../../../services/SupplierService";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Supplier = () => {
	const initialSupplier = {
		id: null,
		SupplierName: "",
		ContactPerson: "",
		Address: "",
		Mobile: "",
		Email: "",
	};

	const initialFormErrors = {
		SupplierName: "",
		ContactPerson: "",
		Address: "",
		Mobile: "",
		Email: "",
	};

	let navigate = useNavigate();

	const [suppliers, setSuppliers] = useState([]);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [newSupplier, setNewSupplier] = useState(initialSupplier);
	const [alertMessage, setAlertMessage] = useState("");

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

		setFormErrors(validateForm(newSupplier));
		if (!isFormValid(formErrors)) return;

		// ask for confirmation
		if (!AlertPrompt()) return;

		let data = {
			SupplierName: newSupplier.SupplierName,
			ContactPerson: newSupplier.ContactPerson,
			Address: newSupplier.Address,
			Mobile: newSupplier.Mobile,
			Email: newSupplier.Email,
		};

		SupplierService.createSupplier(data)
			.then((response) => {
				console.log(response.data);
				refreshList();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};
		const regexNumber = /^[0-9]{11}$/;
		const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (!values.SupplierName.trim()) {
			errors.SupplierName = "Supplier name is required!";
		}
		if (!values.ContactPerson.trim()) {
			errors.ContactPerson = "Contact person is required!";
		}
		if (!values.Mobile) {
			errors.Mobile = "Mobile # is required!";
		} else if (!regexNumber.test(values.Mobile)) {
			errors.Mobile = "Please enter valid mobile number!";
		}
		if (!values.Address.trim()) {
			errors.Address = "Address is required!";
		}
		if (values.Email.trim() && !regexEmail.test(values.Email.trim())) {
			errors.Email = "Please enter valid email address!";
		}

		return errors;
	};

	// delete the supplier
	const deleteSupplier = (supplier) => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		SupplierService.deleteSupplier(supplier.id)
			.then((response) => {
				console.log(response.data);
				refreshList();
				setAlertMessage(response.data.message);
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
			<div className="col-12 h-auto">
				<div className="p-2">
					<h4>Add Supplier</h4>
					<hr />
				</div>
				{alertMessage ? (
					<AlertInfoLayout
						content={alertMessage}
						onClick={(value) => setAlertMessage(value)}
					/>
				) : (
					""
				)}
				<div className="p-2">
					<form
						className="col-12 col-lg-10 pb-5 mx-auto"
						onSubmit={(event) => createSupplier(event)}
					>
						<div className="row mb-sm-3">
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
								/>
								<p className="text-error">{formErrors.SupplierName}</p>
							</div>
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="SupplierName">
									Contact Person:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="ContactPerson"
									id="ContactPerson"
									value={newSupplier.ContactPerson}
									onChange={handleInputChange}
								/>
								<p className="text-error">{formErrors.ContactPerson}</p>
							</div>
						</div>
						<div className="row mb-sm-3">
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="Mobile">
									Contact #:
								</label>
								<input
									type="text"
									// pattern="[0-9]+"
									// minLength={11}
									// maxLength={11}
									className="form-control form-input"
									name="Mobile"
									id="Mobile"
									value={newSupplier.Mobile}
									onChange={handleInputChange}
								/>
								<p className="text-error">{formErrors.Mobile}</p>
							</div>
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
								/>
								<p className="text-error">{formErrors.Address}</p>
							</div>
							<div className="col-sm-12 col-md">
								<label htmlFor="Email">Email:</label>
								<input
									type="text"
									className="form-control form-input"
									name="Email"
									id="Email"
									value={newSupplier.Email}
									onChange={handleInputChange}
								/>
								<p className="text-error">{formErrors.Email}</p>
							</div>
						</div>
						<button className="btn btn-primary simple-shadow mt-3">Add</button>
					</form>
				</div>
			</div>
			<div className="col-12 h-auto mt-3">
				<div className="p-2">
					<h4>Supplier List</h4>
					<hr />
				</div>
				<div className="p-2">
					{/* <form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
						<label htmlFor="supplier-search">Search:</label>
						<input
							type="text"
							className="form-control form-input"
							id="supplier-search"
						/>
					</form> */}
					<div className="table-responsive">
						<table className="table table-striped table-hover">
							<thead className="table-dark">
								<tr>
									<th>#</th>
									<th scope="col">Supplier Name</th>
									<th scope="col">Contact Person</th>
									<th scope="col">Mobile</th>
									<th scope="col">Address</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{suppliers &&
									suppliers.map((supplier, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{supplier.SupplierName}</td>
											<td>{supplier.ContactPerson}</td>
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
		</div>
	);
};

export default Supplier;
