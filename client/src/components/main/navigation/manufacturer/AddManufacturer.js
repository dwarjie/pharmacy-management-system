// this module is responsible for adding new manufacturer

const AddManufacturer = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add Manufacturer</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-10 pb-5">
					<label htmlFor="manufacturer">Manufacturer Name:</label>
					<input type="text" className="form-control" id="manufacturer" />
				</form>
				<button className="btn btn-primary simple-shadow">Save</button>
			</div>
		</div>
	);
};

export default AddManufacturer;
