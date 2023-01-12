import { useState } from "react";
import { createAuditTrail } from "../../helper/AuditTrailHelper";
import { isFormValid } from "../../helper/checkFormValid";
import { AlertPrompt } from "./AlertModal.layout";
import AlertInfoLayout from "./AlertInfo.layout";
import SubCategoryService from "../../services/SubCategoryService";
import { useGlobalState } from "../../state";

const ModalSubCategory = (props) => {
	const { closeSubCategoryModal, currentCategory } = props;
	let [currentUser] = useGlobalState("currentUser");

	const initialSubCategory = {
		SubCategoryName: "",
		MarkUp: "",
		MarkUpUnit: "%",
		categoryId: currentCategory.id,
	};

	const initialFormErrors = {
		SubCategoryName: "",
		MarkUp: "",
	};

	const [subCategory, setSubCategory] = useState(initialSubCategory);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [alertMessage, setAlertMessage] = useState("");

	// create a new SubCategory
	const createSubCategory = async (event) => {
		event.preventDefault();

		await createAuditTrail(
			`Clicked add in ${currentCategory.CategoryName} sub-category.`,
			"Click",
			currentUser.id
		);

		setFormErrors(validateForm(subCategory));
		if (!isFormValid(formErrors)) return;

		// ask for confirmation
		if (!AlertPrompt()) return;

		SubCategoryService.createSubCategory(subCategory)
			.then((response) => {
				console.log(response.data);
				createAuditTrail(
					`Added in ${currentCategory.CategoryName} sub-category.`,
					"Create",
					currentUser.id
				);
				setSubCategory(initialSubCategory);
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
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

	// handle the on change event for the form
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSubCategory({ ...subCategory, [name]: value });
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content simple-shadow rounded">
				<span
					className="close text-right m-0"
					onClick={() => closeSubCategoryModal()}
				>
					&times;
				</span>
				<div className="p-2">
					<h4>{`Add ${currentCategory.CategoryName} Sub-Category`}</h4>
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
					<form
						className="col-12 col-lg-10 pb-5 mx-auto"
						onSubmit={(event) => createSubCategory(event)}
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
						<button
							type="submit"
							className="btn btn-primary simple-shadow mt-3 me-3"
						>
							Add
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ModalSubCategory;
