// this module is responsible for Updating SubCategory
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isFormValid } from "../../../../helper/checkFormValid";
import SubCategoryService from "../../../../services/SubCategoryService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

const UpdateSubCategory = () => {
	let location = useLocation();
	let navigate = useNavigate();
	const oldCategory = location.state.subCategory;

	const initialSubCategory = {
		id: null,
		SubCategoryName: "",
		MarkUp: 0,
		MarkUpUnit: "%",
	};

	const initialFormErrors = {
		SubCategoryName: "",
		MarkUp: "",
	};

	useEffect(() => {
		setSubCategory({
			id: oldCategory.id,
			SubCategoryName: oldCategory.SubCategoryName,
			MarkUp: oldCategory.MarkUp,
			MarkUpUnit: oldCategory.MarkUpUnit,
		});
	}, []);

	const [subCategory, setSubCategory] = useState(initialSubCategory);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [success, setSuccess] = useState(true);

	// update the subCategory
	const updateSubCategory = (event) => {
		event.preventDefault();

		setFormErrors(validateForm(subCategory));
		if (!isFormValid(formErrors)) return;

		SubCategoryService.updateSubCategory(subCategory.id, subCategory)
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

		if (!values.SubCategoryName) {
			errors.SubCategoryName = "Sub category name is required!";
		}
		if (!values.MarkUp) {
			errors.MarkUp = "Mark up is required!";
		}

		return errors;
	};

	// handle the on change event in forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSubCategory({ ...subCategory, [name]: value });
	};

	// check if the update is successfull
	// if yes, go back or else stay
	const checkSuccess = () => {
		if (!success) {
			return;
		}

		navigate(-1);
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>{oldCategory.SubCategoryName}</h4>
				<hr />
			</div>
			<div className="p-3">
				<form
					className="col-12 col-lg-10 pb-5 mx-auto"
					onSubmit={(event) => updateSubCategory(event)}
				>
					<label className="required" htmlFor="SubCategoryName">
						Sub-Category Name:
					</label>
					<input
						type="text"
						className="form-control form-input"
						id="SubCategoryName"
						name="SubCategoryName"
						value={subCategory.SubCategoryName}
						onChange={handleInputChange}
					/>
					<p className="text-error">{formErrors.SubCategoryName}</p>
					<div className="row mt-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="MarkUpUnit">
								Unit:
							</label>
							<select
								name="MarkUpUnit"
								id="MarkUpUnit"
								className="form-select form-input"
								value={subCategory.MarkUpUnit}
								onChange={handleInputChange}
								required
							>
								<option value="amount">Amount</option>
								<option value="%">%</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="MarkUp">
								Markup:
							</label>
							<input
								type="number"
								min={1}
								className="form-control form-input"
								name="MarkUp"
								id="MarkUp"
								value={subCategory.MarkUp}
								onChange={handleInputChange}
							/>
							<p className="text-error">{formErrors.MarkUp}</p>
						</div>
					</div>
					<button className="btn btn-primary simple-shadow me-3 mt-3">
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
				{/* <button
					className="btn btn-danger simple-shadow"
					onClick={deleteSubCategory}
				>
					Delete
				</button> */}
			</div>
		</div>
	);
};

export default UpdateSubCategory;
