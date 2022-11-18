// This module is responsible for updating the Category
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryService from "../../../../services/CategoryService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

const UpdateCategory = () => {
	const initialCategory = {
		id: null,
		CategoryName: "",
	};
	// initial state for the category
	let location = useLocation();
	let navigate = useNavigate();
	let oldCategory = location.state.category;

	const [newCategory, setNewCategory] = useState(initialCategory);
	const [success, setSuccess] = useState(true);

	useEffect(() => {
		setNewCategory({
			id: oldCategory.id,
			CategoryName: oldCategory.CategoryName,
		});
	}, []);

	// update the current category
	const updateCategory = (event) => {
		event.preventDefault();

		CategoryService.updateCategory(newCategory.id, newCategory)
			.then((response) => {
				console.log(response.data);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setSuccess(false);
			});
		checkSucess();
	};

	// delete the category
	const deleteCategory = () => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		CategoryService.deleteCategory(newCategory.id)
			.then((response) => {
				console.log(response.data);
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
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<h4>Update Category</h4>
					<hr />
				</div>
				<div className="p-3">
					<form
						className="col-10 pb-5"
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
							required
						/>
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
