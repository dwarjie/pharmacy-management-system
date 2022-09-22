//  This component is responsible for adding patient information

const AddPatient = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add Patient</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="pb-5">
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="firstName">First Name:</label>
							<input
								type="text"
								className="form-control form-input"
								id="firstName"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="lastName">Last Name:</label>
							<input
								type="text"
								className="form-control form-input"
								id="lastName"
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="middleName">Middle Name:</label>
							<input
								type="text"
								className="form-control form-input"
								id="middleName"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="sex">Sex:</label>
							<select
								name="sex"
								id="sex"
								className="form-select form-input"
								required
							>
								<option value="male" selected>
									Male
								</option>
								<option value="female">Female</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="dateOfBirth">Date of Birth:</label>
							<input
								type="date"
								name="dateOfBirth"
								id="dateOfBirth"
								className="form-control form-input"
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="address">Address:</label>
							<input
								type="text"
								className="form-control form-input"
								id="Address"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="city">City:</label>
							<input
								type="text"
								className="form-control form-input"
								id="city"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="state">State:</label>
							<input
								type="text"
								id="state"
								className="form-control form-input"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="zip">ZIP:</label>
							<input
								type="text"
								id="zip"
								className="form-control form-input"
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="reffered">Reffered By:</label>
							<select
								name="reffered"
								id="reffered"
								className="form-select form-input"
								required
							>
								<option value="doctor1" selected>
									Doctor 1
								</option>
								<option value="doctor2">Doctor 2</option>
								<option value="ncm1">NCM 1</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="firstVisit">First Visit:</label>
							<input
								type="date"
								name="firstVisit"
								className="form-control form-input"
								id="firstVisit"
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md-6">
							<label htmlFor="medicalNote">Medical Note:</label>
							<textarea
								name="medicalNote"
								id="medicalNote"
								className="form-control form-input"
							></textarea>
						</div>
					</div>
				</form>
				<button className="btn btn-primary simple-shadow">Save</button>
			</div>
		</div>
	);
};

export default AddPatient;
