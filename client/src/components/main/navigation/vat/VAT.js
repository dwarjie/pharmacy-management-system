// This module is responsible for adding new VATS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import VatService from "../../../../services/VatService";
import { createAuditTrail } from "../../../../helper/AuditTrailHelper";

// icons
import { MdDelete } from "react-icons/md";
import { useGlobalState } from "../../../../state";

const VAT = () => {
	let [currentUser] = useGlobalState("currentUser");
	const initialVat = {
		id: null,
		VatName: "",
		VatAmount: 0,
	};

	const initialFormError = {
		VatAmount: "",
	};

	// const [vats, setVats] = useState([]);
	const [newVAT, setNewVAT] = useState(initialVat);
	const [formErrors, setFormErrors] = useState(initialFormError);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllVATs();
	}, []);

	// create a new VAT
	const updateVAT = (event) => {
		event.preventDefault();

		setFormErrors(validateForm(newVAT));
		if (!isFormValid(formErrors)) return;

		// ask for confirmation
		// if (!AlertPrompt()) return;

		let data = {
			VatName: newVAT.VatName,
			VatAmount: newVAT.VatAmount,
		};
		VatService.updateVAT(data)
			.then((response) => {
				console.log(response.data);
				createAuditTrail(`Added ${data.VatName} in VAT`, "Create", currentUser.id);
				refreshList();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};
		const regexDigit = /^\d+$/;
		if (!values.VatAmount) {
			errors.VatAmount = "VAT amount is required!";
			// if (!regexDigit.test(values.VatAmount)) {
			// 	errors.VatAmount = "Enter valid VAT amount!";
			// }
		}

		return errors;
	};

	// get all vats in the database
	const getAllVATs = () => {
		VatService.getAllVAT()
			.then((response) => {
				console.log(response.data);
				// setVats(response.data);
				setNewVAT({
					id: response.data.id,
					VatName: response.data.VatName,
					VatAmount: response.data.VatAmount,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const deleteVAT = (vat) => {
	// 	// ask for confirmation
	// 	if (!AlertPrompt()) return;

	// 	let data = {
	// 		id: vat.id,
	// 	};
	// 	VatService.deleteVAT(data)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			refreshList();
	// 			setAlertMessage(response.data.message);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// handle input change event for forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewVAT({ ...newVAT, [name]: value });
	};

	// refresh the page
	const refreshList = () => {
		// setVats([]);
		// setNewVAT(initialVat);
		getAllVATs();
	};

	return (
		<div>
			<div className="col-12 h-auto">
				<div className="p-2">
					<h4>Add VAT</h4>
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
						onSubmit={(event) => updateVAT(event)}
					>
						<div className="row mb-3">
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="VatName">
									VAT Name:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="VatName"
									id="VatName"
									disabled
									value={newVAT.VatName}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="VATAmount">
									Percentage:
								</label>
								<input
									type="number"
									min={1}
									className="form-control form-input"
									name="VatAmount"
									id="VatAmount"
									value={newVAT.VatAmount}
									onChange={handleInputChange}
								/>
								<p className="text-error">{formErrors.VatAmount}</p>
							</div>
						</div>
						<button className="btn btn-primary simple-shadow mt-3">
							Update
						</button>
					</form>
				</div>
			</div>
			{/* <div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
				<div className="p-3">
					<h4>VAT List</h4>
					<hr />
				</div>
				<div className="p-3">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Amount</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{vats &&
								vats.map((vat, index) => (
									<tr key={index}>
										<td>{vat.VatName}</td>
										<td>{vat.VatAmount}</td>
										<td>
											<span className="px-2">
												<MdDelete
													className="icon-size-sm cursor-pointer"
													onClick={() => deleteVAT(vat)}
												/>
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div> */}
		</div>
	);
};

export default VAT;
