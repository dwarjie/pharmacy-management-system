// this module is responsible for adding new medicines

const AddMedicine = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add Medicine</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="pb-5">
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="barCode">Bar Code:</label>
							<input
								type="text"
								className="form-control form-input"
								id="barCode"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="genericName">Generic Name:</label>
							<input
								type="text"
								className="form-control form-input"
								id="genericName"
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="medicineName">Medicine Name:</label>
							<input
								type="text"
								className="form-control form-input"
								id="medicineName"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="medicineDetails">Medicine Details:</label>
							<input
								type="text"
								className="form-control form-input"
								id="medicineDetails"
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="strength">Strength:</label>
							<input
								type="text"
								className="form-control form-input"
								id="strength"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="price">Price:</label>
							<input
								type="text"
								className="form-control form-input"
								id="price"
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="manufacturer">Manufacturer:</label>
							<select
								name="manufacturer"
								id="manufacturer"
								className="form-select form-input"
								required
							>
								<option value="Manufacturer_1" selected>
									Manufacturer 1
								</option>
								<option value="Manufacturer_2">Manufacturer 2</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="manufacturerPrice">Manufacturer Price:</label>
							<input
								type="number"
								className="form-control form-input"
								id="manufacturerPrice"
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="category">Category:</label>
							<select
								name="category"
								id="category"
								className="form-select form-input"
								required
							>
								<option value="cat_1" selected>
									Category 1
								</option>
								<option value="cat_2">Category 2</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="unit">Unit:</label>
							<select
								name="unit"
								id="unit"
								className="form-select form-input"
								required
							>
								<option value="ml" selected>
									ml
								</option>
								<option value="mg">mg</option>
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="status">Status:</label>
							<select
								name="status"
								id="status"
								className="form-select form-input"
								required
							>
								<option value="active" selected>
									Active
								</option>
								<option value="inactive">Inactive</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="type">Medicine Type:</label>
							<select
								name="type"
								id="type"
								className="form-select form-input"
								required
							>
								<option value="painKiller" selected>
									Pain Killer
								</option>
								<option value="suspension">Suspension</option>
							</select>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddMedicine;
