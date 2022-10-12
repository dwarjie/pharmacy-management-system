// This component is responsible for adding new medicine category

const AddCategory = () => {
	return (
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
	);
};

export default AddCategory;