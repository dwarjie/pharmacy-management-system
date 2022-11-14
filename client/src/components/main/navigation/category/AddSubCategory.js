// This module is responsible for adding sub category
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SubCategoryService from "../../../../services/SubCategoryService";
import CategoryService from "../../../../services/CategoryService";

// icons
import { FaEdit } from "react-icons/fa";

const AddSubCategory = () => {
	let location = useLocation();
	let navigate = useNavigate();

	const initialSubCategory = {
		id: null,
		SubCategoryName: "",
		MarkUp: 0,
		MarkUpUnit: "%",
		categoryId: location.state.category.id,
	};

	const [subCategory, setSubCategory] = useState(initialSubCategory);
	const [subCategories, setSubCategories] = useState([]);

	useEffect(() => {
		getSubCategory();
	}, []);

	// get all the sub categories
	const getSubCategory = () => {
		CategoryService.getSubCategory(subCategory.categoryId)
			.then((response) => {
				setSubCategories(response.data.subCategory);
				console.log(response.data.subCategory);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// create a new SubCategory
	const createSubCategory = () => {
		SubCategoryService.createSubCategory(subCategory)
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// edit a sub category
	const editSubCategory = (subCategory) => {
		navigate(`/pharmacy/maintenance/category/sub-category/${subCategory.id}`, {
			state: {
				subCategory: subCategory,
			},
		});
	};

	// handle the on change event for the form
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSubCategory({ ...subCategory, [name]: value });
	};

	// refresh the sub category list
	const refreshList = () => {
		setSubCategory(initialSubCategory);
		getSubCategory();
	};

	return (
		<div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<h4>Add Sub Category</h4>
					<hr />
				</div>
				<div className="p-3">
					<form className="col-12 col-lg-10 pb-5 mx-auto">
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
						onClick={createSubCategory}
					>
						Add
					</button>
					<button
						className="btn btn-secondary simple-shadow"
						onClick={() => navigate(-1)}
					>
						Cancel
					</button>
				</div>
			</div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
				<div className="p-3">
					<h4>Sub-Category List</h4>
					<hr />
				</div>
				<div className="p-3">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Markup</th>
								<th scope="col">Unit</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{subCategories &&
								subCategories.map((subCategory, index) => (
									<tr key={index}>
										<td>{subCategory.SubCategoryName}</td>
										<td>{subCategory.MarkUp}</td>
										<td>{subCategory.MarkUpUnit}</td>
										<td>
											<span className="px-2">
												<FaEdit
													className="icon-size-sm cursor-pointer"
													onClick={() => editSubCategory(subCategory)}
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

export default AddSubCategory;
