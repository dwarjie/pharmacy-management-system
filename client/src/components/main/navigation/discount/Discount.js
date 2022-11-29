// This module is responsible for adding discount
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
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

	let navigate = useNavigate();

	const [discounts, setDiscounts] = useState([]);
	const [newDiscount, setNewDiscount] = useState(initialDiscount);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllDiscount();
	}, []);

	// add new discount
	const createDiscount = (event) => {
		event.preventDefault();
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
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
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
				<div className="p-3">
					<form
						className="col-12 col-lg-10 pb-5 mx-auto"
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
							required
						/>
						<div className="row mt-3">
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="DiscountAmount">
									Discount Amount:
								</label>
								<input
									type="number"
									min={1}
									className="form-control form-input"
									name="DiscountAmount"
									id="DiscountAmount"
									value={newDiscount.DiscountAmount}
									onChange={handleInputChange}
									required
								/>
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
							Add
						</button>
					</form>
				</div>
			</div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
				<div className="p-3">
					<h4>Discount List</h4>
					<hr />
				</div>
				<div className="p-3">
					<table className="table">
						<thead>
							<tr>
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
