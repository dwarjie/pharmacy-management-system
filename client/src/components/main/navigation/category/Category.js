// This component is responsible for adding new medicine category
import { useState, useEffect, isValidElement } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import CategoryService from "../../../../services/CategoryService";

// Icons
import { FaEdit } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";

const Category = () => {
	// initial state for a category when creating new category
	const initialCategory = {
		id: null,
		CategoryName: "",
		subCategory: [],
	};

	const initialFormError = {
		CategoryName: "",
	};
	let navigate = useNavigate();

	const [category, setCategory] = useState(initialCategory);
	const [formErrors, setFormErrors] = useState(initialFormError);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [alertMessage, setAlertMessage] = useState("");

	// once the page loaded, run this function
	useEffect(() => {
		getAllCategory();
	}, []);

	// get all the categories from the database
	const getAllCategory = () => {
		CategoryService.getAllCategory()
			.then((response) => {
				setCategories(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// create a new category
	const createCategory = (event) => {
		event.preventDefault();

		setFormErrors(validateForm(category));
		if (!isFormValid(formErrors)) return;

		// confirm the user if they want to proceed
		if (!AlertPrompt()) return;

		let data = {
			CategoryName: category.CategoryName,
		};

		// call the service in order to send the data to database
		CategoryService.createCategory(data)
			.then((response) => {
				console.log(response.data);
				setAlertMessage(response.data.message);
				refreshList();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};

		if (!values.CategoryName.trim()) {
			errors.CategoryName = "Category name is required!";
		}

		return errors;
	};

	const setActiveCategory = (category) => {
		setCategory(category);
		navigate(`/pharmacy/maintenance/category/${category.id}`, {
			state: {
				category: category,
			},
		});
	};

	// this function will set the active subcategory to show at the table list
	const setActiveSubCategory = (subCategory) => {
		setSubCategories(subCategory);
	};

	const addSubCategory = (category) => {
		navigate(`/pharmacy/maintenance/category/sub-category`, {
			state: {
				category: category,
			},
		});
	};

	// handle the input change event for the form
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCategory({ ...category, [name]: value });
	};

	// refresh the page into initial state
	const refreshList = () => {
		setCategories([]);
		getAllCategory();
		setCategory(initialCategory);
	};

	return (
		<div>
			<div className="col-12 h-auto">
				<div className="p-2">
					<h4>Add Category</h4>
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
						onSubmit={(event) => createCategory(event)}
					>
						<label className="required" htmlFor="CategoryName">
							Category Name:
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="CategoryName"
							name="CategoryName"
							value={category.CategoryName}
							onChange={handleInputChange}
						/>
						<p className="text-error">{formErrors.CategoryName}</p>
						<button
							className="btn btn-primary simple-shadow mt-3 me-3"
							type="submit"
						>
							Add
						</button>
					</form>
				</div>
			</div>
			<div className="w-100 d-flex flex-column flex-lg-row justify-content-between gap-1">
				<CategoryList
					categories={categories}
					setActiveCategory={setActiveCategory}
					addSubCategory={addSubCategory}
					setActiveSubCategory={setActiveSubCategory}
				/>
				<SubCategoryList subCategories={subCategories} />
			</div>
		</div>
	);
};

const CategoryList = (props) => {
	const {
		categories,
		setActiveCategory,
		addSubCategory,
		setActiveSubCategory,
	} = props;

	return (
		<div className="col-12 col-lg-6 h-auto mt-3">
			<div className="p-2">
				<h4>Category List</h4>
				<hr />
			</div>
			<div className="p-2">
				{/* <form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="manufacturer-search">Search:</label>
					<input
						type="text"
						className="form-control form-input"
						id="manufacturer-search"
					/>
				</form> */}
				<table className="table table-hover table-striped">
					<thead className="table-dark">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{categories &&
							categories.map((category, index) => (
								<tr
									key={index}
									className="cursor-pointer"
									onClick={() => setActiveSubCategory(category.subCategory)}
								>
									<td>{category.CategoryName}</td>
									<td>
										<span className="px-2">
											<FaEdit
												className="icon-size-sm cursor-pointer"
												onClick={() => setActiveCategory(category, index)}
											/>
										</span>
										<span className="px-2">
											<MdOutlineAddBox
												className="icon-size-sm cursor-pointer"
												onClick={() => addSubCategory(category)}
											/>
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const SubCategoryList = (props) => {
	const { subCategories } = props;

	return (
		<div className="col-12 col-lg-6 h-auto mt-3">
			<div className="p-2">
				<h4>Sub Category</h4>
				<hr />
			</div>
			<div className="p-2">
				<table className="table table-striped">
					<thead className="table-dark">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Markup</th>
							<th scope="col">Unit</th>
						</tr>
					</thead>
					<tbody>
						{subCategories &&
							subCategories.map((sub, index) => (
								<tr key={index}>
									<td>{sub.SubCategoryName}</td>
									<td>{sub.MarkUp}</td>
									<td>{sub.MarkUpUnit}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Category;
