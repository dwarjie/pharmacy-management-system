// This module is responsible for adding discount
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import DiscountService from "../../../../services/DiscountService";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Discount = () => {
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

	const [discounts, setDiscounts] = useState([]);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [newDiscount, setNewDiscount] = useState(initialDiscount);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllDiscount();
	}, []);

	// add new discount
	const createDiscount = (event) => {
		event.preventDefault();

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
				refreshList();
				setAlertMessage(response.data.message);
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

	// delete the discount
	const deleteDiscount = (discount) => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		DiscountService.deleteDiscount(discount.id)
			.then((response) => {
				console.log(response.data);
				refreshList();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// get all discount in the database
	const getAllDiscount = () => {
		DiscountService.getAllDiscount()
			.then((response) => {
				setDiscounts(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update the discount
	const updateDiscount = (discount) => {
		navigate(`/pharmacy/maintenance/discount/${discount.id}`, {
			state: {
				discount: discount,
			},
		});
	};

	// handle input change events for forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewDiscount({ ...newDiscount, [name]: value });
	};

	// refresh page list
	const refreshList = () => {
		setDiscounts([]);
		setNewDiscount(initialDiscount);
		getAllDiscount();
	};

	return (
		<div>
			<div className="col-12 h-auto">
				<div className="p-2">
					<h4>Add Discount</h4>
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
			<div className="col-12 h-auto mt-3">
				<div className="p-2">
					<h4>Discount List</h4>
					<hr />
				</div>
				<div className="p-2 table-responsive">
					<table className="table table-striped table-hover">
						<thead className="table-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Amount</th>
								<th scope="col">Unit</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{discounts &&
								discounts.map((discount, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{discount.DiscountName}</td>
										<td>{discount.DiscountAmount}</td>
										<td>{discount.DiscountType}</td>
										<td>
											<span className="px-2">
												<FaEdit
													className="icon-size-sm cursor-pointer"
													onClick={() => updateDiscount(discount)}
												/>
											</span>
											<span className="px-2">
												<MdDelete
													className="icon-size-sm cursor-pointer"
													onClick={() => deleteDiscount(discount)}
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

export default Discount;
