// this module is responsible for Updating SubCategory
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubCategoryService from "../../../../services/SubCategoryService";

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

	useEffect(() => {
		setSubCategory({
			id: oldCategory.id,
			SubCategoryName: oldCategory.SubCategoryName,
			MarkUp: oldCategory.MarkUp,
			MarkUpUnit: oldCategory.MarkUpUnit,
		});
	}, []);

	const [subCategory, setSubCategory] = useState(initialSubCategory);
	const [success, setSuccess] = useState(true);

	// update the subCategory
	const updateSubCategory = () => {
		SubCategoryService.updateSubCategory(subCategory.id, subCategory)
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

	// delete the subCategory
	const deleteSubCategory = () => {
		SubCategoryService.deleteCategory(subCategory.id)
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
				<form className="col-10 pb-5">
					<label htmlFor="SubCategoryName">Sub-Category Name:</label>
					<input
						type="text"
						className="form-control form-input"
						id="SubCategoryName"
						name="SubCategoryName"
						value={subCategory.SubCategoryName}
						onChange={handleInputChange}
						required
					/>
					<div className="row mt-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="MarkUp">Markup:</label>
							<input
								type="number"
								className="form-control form-input"
								name="MarkUp"
								id="MarkUp"
								value={subCategory.MarkUp}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="MarkUpUnit">Unit:</label>
							<select
								name="MarkUpUnit"
								id="MarkUpUnit"
								className="form-select form-input"
								required
								value={subCategory.MarkUpUnit}
								onChange={handleInputChange}
							>
								<option value="amount">Amount</option>
								<option value="%">%</option>
							</select>
						</div>
					</div>
				</form>
				<button
					className="btn btn-primary simple-shadow me-3"
					onClick={updateSubCategory}
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
					className="btn btn-danger simple-shadow"
					onClick={deleteSubCategory}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default UpdateSubCategory;
