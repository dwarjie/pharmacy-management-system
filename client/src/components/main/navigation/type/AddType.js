// This module is responsible for adding medicine types

const AddType = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add Type</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-10 pb-5">
					<label htmlFor="type">Type Name:</label>
					<input type="text" className="form-control" id="type" />
				</form>
				<button className="btn btn-primary simple-shadow">Save</button>
			</div>
		</div>
	);
};

export default AddType;
