// This component is responsible for adding new medicine category
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../../services/CategoryService";

const Category = () => {
	// initial state for a category when creating new category
	const initialCategory = {
		id: null,
		CategoryName: "",
	};
	let navigate = useNavigate();

	const [category, setCategory] = useState(initialCategory);
	const [categories, setCategories] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(-1);

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
	const createCategory = () => {
		let data = {
			CategoryName: category.CategoryName,
		};

		// call the service in order to send the data to database
		CategoryService.createCategory(data)
			.then((response) => {
				setCategory({
					id: response.data.id,
					CategoryName: response.data.CategoryName,
				});
				refreshList();
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const setActiveCategory = (category, index) => {
		setCurrentIndex(index);
		setCategory(category.CategoryName);
		navigate(`/pharmacy/maintenance/category/${category.id}`, {
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
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<h4>Add Category</h4>
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
							value={category.CategoryName}
							onChange={handleInputChange}
						/>
					</form>
					<button
						className="btn btn-primary simple-shadow me-3"
						onClick={createCategory}
					>
						Save
					</button>
					<button
						className="btn btn-secondary simple-shadow"
						onClick={refreshList}
					>
						Cancel
					</button>
				</div>
			</div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
				<div className="p-3">
					<h4>Category List</h4>
					<hr />
				</div>
				<div className="p-3">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
							</tr>
						</thead>
						<tbody>
							{categories &&
								categories.map((category, index) => (
									<tr
										key={index}
										className={
											"cursor-pointer " +
											(index === currentIndex ? "table-active" : "")
										}
										onClick={() => setActiveCategory(category, index)}
									>
										<td>{category.CategoryName}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Category;
