// This module is responsible for updating the discount
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isFormValid } from "../../../../helper/checkFormValid";
import DiscountService from "../../../../services/DiscountService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

const UpdateDiscount = () => {
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

	let navigate = useNavigate();
	let location = useLocation();

	const [discount, setDiscounts] = useState(initialDiscount);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [success, setSuccess] = useState(true);

	useEffect(() => {
		setDiscounts({
			id: location.state.discount.id,
			DiscountName: location.state.discount.DiscountName,
			DiscountAmount: location.state.discount.DiscountAmount,
			DiscountType: location.state.discount.DiscountType,
		});
	}, []);

	// update the discount
	const updateDiscount = (event) => {
		event.preventDefault();

		setFormErrors(validateForm(discount));
		if (!isFormValid(formErrors)) return;

		DiscountService.updateDiscount(discount.id, discount)
			.then((response) => {
				console.log(response.data);
				alert(response.data.message);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setSuccess(false);
			});
		checkSuccess();
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

	// handle input change event for forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setDiscounts({ ...discount, [name]: value });
	};

	// check if update is successful, is yes go back else stay
	const checkSuccess = () => {
		if (!success) {
			return;
		}

		navigate(-1);
	};

	return (
		<div className="col-12 h-auto">
			<div className="p-2">
				<h4>Add Discount</h4>
				<hr />
			</div>
			<div className="p-2">
				<form
					className="col-11 col-lg-10 pb-5 mx-auto"
					onSubmit={(event) => updateDiscount(event)}
				>
					<label className="required" htmlFor="DiscountName">
						Discount Name:
					</label>
					<input
						type="text"
						className="form-control form-input"
						id="DiscountName"
						name="DiscountName"
						value={discount.DiscountName}
						onChange={handleInputChange}
					/>
					<p className="text-error">{formErrors.DiscountName}</p>
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="DiscountAmount">
								Discount Amount:
							</label>
							<input
								type="number"
								className="form-control form-input"
								name="DiscountAmount"
								id="DiscountAmount"
								value={discount.DiscountAmount}
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
								value={discount.DiscountType}
								onChange={handleInputChange}
								required
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
						Update
					</button>
					<button
						type="button"
						className="btn btn-secondary simple-shadow me-3 mt-3"
						onClick={() => navigate(-1)}
					>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateDiscount;
