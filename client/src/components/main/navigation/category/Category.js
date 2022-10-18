// This component is responsible for adding new medicine category
import { useState, useEffect } from "react";
import CategoryService from "../../../../services/CategoryService";

const Category = () => {
	const [categories, setCategories] = useState([]);
	const [currentCategory, setCurrentCategory] = useState(null);

	// once the page loaded, run this function
	useEffect(() => {
		getAllCategory();
	}, []);

	// get all the categories from the database
	const getAllCategory = () => {
		CategoryService.getAllCategory()
			.then((response) => {
				setCategories(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
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
						<label htmlFor="category">Category Name:</label>
						<input type="text" className="form-control" id="category" />
					</form>
					<button className="btn btn-primary simple-shadow">Save</button>
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
									<tr key={index}>
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
