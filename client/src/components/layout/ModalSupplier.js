// this module is responsible for adding new manufacturer
import { useState } from "react";
import { createAuditTrail } from "../../helper/AuditTrailHelper";
import { isFormValid } from "../../helper/checkFormValid";
import { AlertPrompt } from "./AlertModal.layout";
import AlertInfoLayout from "./AlertInfo.layout";
import { useGlobalState } from "../../state";
import SupplierService from "../../services/SupplierService";

const ModalSupplier = (props) => {
	const { closeSupplierModal } = props;
	let [currentUser] = useGlobalState("currentUser");

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

	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [newSupplier, setNewSupplier] = useState(initialSupplier);
	const [alertMessage, setAlertMessage] = useState("");

	// create a new Supplier
	const createSupplier = async (event) => {
		event.preventDefault();

		await createAuditTrail(
			`Clicked add in Add Supplier.`,
			"Click",
			currentUser.id
		);

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
				setNewSupplier(initialSupplier);
				createAuditTrail(
					`Added ${data.SupplierName} in Supplier`,
					"Create",
					currentUser.id
				);
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

	// handle the on change event for the forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewSupplier({ ...newSupplier, [name]: value });
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content simple-shadow rounded">
				<span
					className="close text-right m-0"
					onClick={() => closeSupplierModal()}
				>
					&times;
				</span>
				{alertMessage ? (
					<AlertInfoLayout
						content={alertMessage}
						onClick={(value) => setAlertMessage(value)}
					/>
				) : (
					""
				)}
				<div className="p-2">
					<h4>Add Supplier</h4>
					<hr />
				</div>
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
	);
};

export default ModalSupplier;
