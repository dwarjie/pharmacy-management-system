// This module is responsible for updating the Category
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryService from "../../../../services/CategoryService";

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
	const [success, setSucess] = useState(true);

	useEffect(() => {
		setNewCategory({
			id: oldCategory.id,
			CategoryName: oldCategory.CategoryName,
		});
	}, []);

	// update the current category
	const updateCategory = () => {
		console.log(newCategory);
		CategoryService.updateCategory(newCategory.id, newCategory)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
				setSucess(false);
			});
		checkSucess();
	};

	// check if update is successful,
	// if it is, go back to the category page, else stay
	const checkSucess = () => {
		if (!success) {
			// stay
			return;
		}

		navigate("/pharmacy/maintenance/category");
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
					<form className="col-10 pb-5">
						<label htmlFor="CategoryName">Category Name:</label>
						<input
							type="text"
							className="form-control"
							id="CategoryName"
							name="CategoryName"
							value={newCategory.CategoryName}
							onChange={handleInputChange}
						/>
					</form>
					<button
						className="btn btn-primary simple-shadow me-3"
						onClick={updateCategory}
					>
						Update
					</button>
					<button
						className="btn btn-secondary simple-shadow"
						onClick={cancelUpdate}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateCategory;
