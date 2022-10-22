// This module is responsible for adding sub category
import { useLocation } from "react-router-dom";
import { useState } from "react";

const AddSubCategory = () => {
	const initialSubCategory = {
		id: null,
		SubCategoryName: "",
		MarkUp: 0,
		categoryId: null,
	};

	let location = useLocation();
	const [subCategory, setSubCategory] = useState(initialSubCategory);
	const [markUpUnit, setMarkUpUnit] = useState("%");

	return (
		<div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<h4>{location.state.category.CategoryName}</h4>
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
						/>
						<div className="row mt-3">
							<div className="col-sm-12 col-md">
								<label htmlFor="MarkUp">Markup:</label>
								<input
									type="text"
									className="form-control form-input"
									id="MarkUp"
									required
								/>
							</div>
							<div className="col-sm-12 col-md">
								<label htmlFor="markUpUnit">Unit:</label>
								<select
									name="markUpUnit"
									id="markUpUnit"
									className="form-select form-input"
									required
									defaultValue={markUpUnit}
								>
									<option value="amount">Amount</option>
									<option value="%">%</option>
								</select>
							</div>
						</div>
					</form>
					<button className="btn btn-primary simple-shadow me-3">Add</button>
					<button className="btn btn-secondary simple-shadow">Cancel</button>
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
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AddSubCategory;
