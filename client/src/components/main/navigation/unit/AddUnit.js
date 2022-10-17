// This module is responsible for adding new medicine Unit

const AddUnit = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add Unit of Measure</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-10 pb-5">
					<label htmlFor="unit">Unit Name:</label>
					<input type="text" className="form-control" id="unit" />
				</form>
				<button className="btn btn-primary simple-shadow">Save</button>
			</div>
		</div>
	);
};

export default AddUnit;
