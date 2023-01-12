import { useState } from "react";
import { createAuditTrail } from "../../helper/AuditTrailHelper";
import { isFormValid } from "../../helper/checkFormValid";
import { AlertPrompt } from "./AlertModal.layout";
import AlertInfoLayout from "./AlertInfo.layout";
import { useGlobalState } from "../../state";
import DiscountService from "../../services/DiscountService";

const ModalDiscount = (props) => {
	const { closeModal } = props;
	let [currentUser] = useGlobalState("currentUser");

	const initialDiscount = {
		id: null,
		DiscountName: "",
		DiscountAmount: 0,
		DiscountType: "%",
	};

	const initialFormErrors = {
		DiscountName: "",
		DiscountAmount: "",
	};

	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [newDiscount, setNewDiscount] = useState(initialDiscount);
	const [alertMessage, setAlertMessage] = useState("");

	// add new discount
	const createDiscount = async (event) => {
		event.preventDefault();

		await createAuditTrail("Clicked Add in discount.", "Click", currentUser.id);

		setFormErrors(validateForm(newDiscount));
		if (!isFormValid(formErrors)) return;

		// ask for confirmation
		if (!AlertPrompt()) return;

		let data = {
			DiscountName: newDiscount.DiscountName,
			DiscountAmount: newDiscount.DiscountAmount,
			DiscountType: newDiscount.DiscountType,
		};

		DiscountService.createDiscount(data)
			.then((response) => {
				console.log(response.data);
				createAuditTrail(
					`Added ${data.DiscountName} in discount`,
					"Create",
					currentUser.id
				);
				setAlertMessage(response.data.message);
				setNewDiscount(initialDiscount);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};

		if (!values.DiscountName) {
			errors.DiscountName = "Discount name is required!";
		}
		if (!values.DiscountAmount) {
			errors.DiscountAmount = "Discount amount is required!";
		} else if (parseFloat(values.DiscountAmount) <= 0) {
			errors.DiscountAmount = "Enter valid discount amount!";
		}

		return errors;
	};

	// handle input change events for forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewDiscount({ ...newDiscount, [name]: value });
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content simple-shadow rounded">
				<span className="close text-right m-0" onClick={() => closeModal()}>
					&times;
				</span>
				<div className="col-12 h-auto">
					<div className="p-2">
						<h4>Add Discount</h4>
						<hr />
					</div>
					<div className="">
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
								className="col-11 col-lg-10 pb-5 mx-auto"
								onSubmit={(event) => createDiscount(event)}
							>
								<label className="required" htmlFor="DiscountName">
									Discount Name:
								</label>
								<input
									type="text"
									className="form-control form-input"
									id="DiscountName"
									name="DiscountName"
									value={newDiscount.DiscountName}
									onChange={handleInputChange}
								/>
								<p className="text-error">{formErrors.DiscountName}</p>
								<div className="row mb-sm-3">
									<div className="col-sm-12 col-md">
										<label className="required" htmlFor="DiscountAmount">
											Discount Value:
										</label>
										<input
											type="number"
											className="form-control form-input"
											name="DiscountAmount"
											id="DiscountAmount"
											value={newDiscount.DiscountAmount}
											onChange={handleInputChange}
										/>
										<p className="text-error">{formErrors.DiscountAmount}</p>
									</div>
									<div className="col-sm-12 col-md">
										<label className="required" htmlFor="DiscountType">
											Discount Type:
										</label>
										<select
											name="DiscountType"
											id="DiscountType"
											className="form-select form-input"
											value={newDiscount.DiscountType}
											onChange={handleInputChange}
										>
											<option value="fixed">Fixed</option>
											<option value="%">%</option>
										</select>
									</div>
								</div>
								<button
									type="submit"
									className="btn btn-primary simple-shadow me-3 mt-3"
								>
									Add
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalDiscount;
