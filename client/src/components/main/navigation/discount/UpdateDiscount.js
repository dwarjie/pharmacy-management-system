// This module is responsible for updating the discount
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DiscountService from "../../../../services/DiscountService";

const UpdateDiscount = () => {
	const initialDiscount = {
		id: null,
		DiscountName: "",
		DiscountAmount: 0,
		DiscountType: "%",
	};
	let navigate = useNavigate();
	let location = useLocation();

	const [discount, setDiscounts] = useState(initialDiscount);
	const [success, setSuccess] = useState(true);

	useEffect(() => {
		console.log(location.state);
		setDiscounts({
			id: location.state.discount.id,
			DiscountName: location.state.discount.DiscountName,
			DiscountAmount: location.state.discount.DiscountAmount,
			DiscountType: location.state.discount.DiscountType,
		});
	}, []);

	// update the discount
	const updateDiscount = () => {
		DiscountService.updateDiscount(discount.id, discount)
			.then((response) => {
				console.log(response.data);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setSuccess(false);
			});
		checkSuccess();
	};

	// delete the discount
	const deleteDiscount = () => {
		DiscountService.deleteDiscount(discount.id)
			.then((response) => {
				console.log(response.data);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setSuccess(false);
			});
		checkSuccess();
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
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add Discount</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-10 pb-5">
					<label htmlFor="DiscountName">Discount Name:</label>
					<input
						type="text"
						className="form-control form-input"
						id="DiscountName"
						name="DiscountName"
						value={discount.DiscountName}
						onChange={handleInputChange}
						required
					/>
					<div className="row mt-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="DiscountAmount">Discount Amount:</label>
							<input
								type="number"
								className="form-control form-input"
								name="DiscountAmount"
								id="DiscountAmount"
								value={discount.DiscountAmount}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="DiscountType">Discount Type:</label>
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
				</form>
				<button
					className="btn btn-primary simple-shadow me-3"
					onClick={updateDiscount}
				>
					Update
				</button>
				<button
					className="btn btn-secondary simple-shadow me-3"
					onClick={() => navigate(-1)}
				>
					Cancel
				</button>
				<button
					className="btn btn-danger simple-shadow me-3"
					onClick={deleteDiscount}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default UpdateDiscount;
