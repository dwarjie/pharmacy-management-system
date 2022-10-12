// This module is responsible for showing the list of the category

const CategoryList = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Category List</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="category-search">Search:</label>
					<input type="text" className="form-control" id="category-search" />
				</form>
			</div>
		</div>
	);
};

export default CategoryList;