// This module is responsible for updating the Category
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createAuditTrail } from "../../../../helper/AuditTrailHelper";
import { isFormValid } from "../../../../helper/checkFormValid";
import CategoryService from "../../../../services/CategoryService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { useGlobalState } from "../../../../state";

const UpdateCategory = () => {
	let [currentUser] = useGlobalState("currentUser");
	const initialCategory = {
		id: null,
		CategoryName: "",
		subCategory: [],
	};

	const initialFormError = {
		CategoryName: "",
	};

	// initial state for the category
	let location = useLocation();
	let navigate = useNavigate();
	let oldCategory = location.state.category;

	const [newCategory, setNewCategory] = useState(initialCategory);
	const [formErrors, setFormErrors] = useState(initialFormError);
	const [success, setSuccess] = useState(true);

	useEffect(() => {
		setNewCategory({
			id: oldCategory.id,
			CategoryName: oldCategory.CategoryName,
			subCategory: oldCategory.subCategory,
		});
	}, []);

	// update the current category
	const updateCategory = async (event) => {
		event.preventDefault();

		await createAuditTrail(
			"Clicked update in category.",
			"Click",
			currentUser.id
		);

		setFormErrors(validateForm(newCategory));
		if (!isFormValid(formErrors)) return;

		CategoryService.updateCategory(newCategory.id, newCategory)
			.then((response) => {
				console.log(response.data);
				alert(response.data.message);
				createAuditTrail(
					`Updated ${oldCategory.CategoryName} in category`,
					"Edit",
					currentUser.id
				);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setSuccess(false);
			});
		checkSucess();
	};

	const validateForm = (values) => {
		const errors = {};

		if (!values.CategoryName.trim()) {
			errors.CategoryName = "Category name is required!";
		}

		return errors;
	};

	// delete the category
	const deleteCategory = async () => {
		await createAuditTrail(
			"Clicked delete in category.",
			"Click",
			currentUser.id
		);

		if (newCategory.subCategory.length !== 0)
			return alert("Category has sub-categories."); // don't delete if is has sub category
		// ask for confirmation
		if (!AlertPrompt()) return;

		CategoryService.deleteCategory(newCategory.id)
			.then((response) => {
				console.log(response.data);
				createAuditTrail(
					`Deleted ${oldCategory.CategoryName} in category.`,
					"Delete",
					currentUser.id
				);
				navigate("/pharmacy/maintenance/category");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// check if update is successful,
	// if it is, go back to the category page, else stay
	const checkSucess = () => {
		if (!success) {
			// stay
			return;
		}

		navigate(-1);
	};

	// handle the input change event for the form
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewCategory({ ...newCategory, [name]: value });
	};

	// cancel the update
	const cancelUpdate = () => {
		setNewCategory("");
		navigate("/pharmacy/maintenance/category");
	};

	return (
		<div>
			{/* <div className="alert alert-success" role="alert">
				Update successfully!
			</div> */}
			<div className="col-12 h-auto">
				<div className="p-2">
					<h4>Update Category</h4>
					<hr />
				</div>
				<div className="p-2">
					<form
						className="col-11 col-lg-10 pb-5 mx-auto"
						onSubmit={(event) => updateCategory(event)}
					>
						<label className="required" htmlFor="CategoryName">
							Category Name:
						</label>
						<input
							type="text"
							className="form-control"
							id="CategoryName"
							name="CategoryName"
							value={newCategory.CategoryName}
							onChange={handleInputChange}
						/>
						<p className="text-error">{formErrors.CategoryName}</p>
						<button
							type="submit"
							className="btn btn-primary simple-shadow me-3 mt-3"
						>
							Update
						</button>
						<button
							type="button"
							className="btn btn-secondary simple-shadow me-3 mt-3"
							onClick={cancelUpdate}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-danger simple-shadow mt-3"
							onClick={deleteCategory}
						>
							Delete
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateCategory;
