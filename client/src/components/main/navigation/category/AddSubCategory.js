// This module is responsible for adding sub category
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";
import { createAuditTrail } from "../../../../helper/AuditTrailHelper";
import { useGlobalState } from "../../../../state";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import SubCategoryService from "../../../../services/SubCategoryService";
import CategoryService from "../../../../services/CategoryService";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AddSubCategory = () => {
	let [currentUser] = useGlobalState("currentUser");
	let location = useLocation();
	let navigate = useNavigate();
	let categoryName = location.state.category.CategoryName;

	const initialSubCategory = {
		id: null,
		SubCategoryName: "",
		MarkUp: "",
		MarkUpUnit: "%",
		categoryId: location.state.category.id,
	};

	const initialFormErrors = {
		SubCategoryName: "",
		MarkUp: "",
	};

	const [subCategory, setSubCategory] = useState(initialSubCategory);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [subCategories, setSubCategories] = useState([]);
	const [alertMessage, setAlertMessage] = useState("");

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
	const createSubCategory = async (event) => {
		event.preventDefault();

		await createAuditTrail(
			`Clicked add in ${categoryName} sub-category.`,
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
					`Added in ${categoryName} sub-category.`,
					"Create",
					currentUser.id
				);
				refreshList();
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

	// delete the subCategory
	const deleteSubCategory = async (subCategory) => {
		await createAuditTrail(
			`Clicked delete in ${categoryName} sub-category.`,
			"Click",
			currentUser.id
		);
		// ask for confirmation
		if (!AlertPrompt()) return;

		SubCategoryService.deleteCategory(subCategory.id)
			.then((response) => {
				console.log(response.data);
				createAuditTrail(
					`Deleted ${subCategory.SubCategoryName} in ${categoryName} sub-category.`,
					"Delete",
					currentUser.id
				);
				refreshList();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// edit a sub category
	const editSubCategory = (subCategory) => {
		createAuditTrail(
			`Clicked edit in ${categoryName} sub-category.`,
			"Click",
			currentUser.id
		);
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
					<h4>{categoryName} Sub-Category</h4>
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
						<button
							type="button"
							className="btn btn-secondary simple-shadow mt-3"
							onClick={() => navigate(-1)}
						>
							Cancel
						</button>
					</form>
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
											<span className="px-2">
												<MdDelete
													className="icon-size-sm cursor-pointer"
													onClick={() => deleteSubCategory(subCategory)}
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
