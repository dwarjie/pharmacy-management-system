// this module is responsible for adding new NCM/Doctors

const AddHandler = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add Handler</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="pb-5">
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="firstName">First Name:</label>
							<input
								type="text"
								id="firstName"
								className="form-control form-input"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="middleName">Middle Name:</label>
							<input
								type="text"
								id="middleName"
								className="form-control form-input"
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="lastName">Last Name:</label>
							<input
								type="text"
								id="lastName"
								className="form-control form-input"
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
								<option value="nurse case manager" selected>
									NCM
								</option>
								<option value="doctor">Doctor</option>
							</select>
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
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="city">City:</label>
							<input
								type="text"
								id="city"
								className="form-control form-input"
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="state">State:</label>
							<input
								type="text"
								id="state"
								className="form-control form-input"
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="zip">ZIP:</label>
							<input type="text" id="zip" className="form-control form-input" />
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="address">Address:</label>
							<input
								type="text"
								id="address"
								className="form-control form-input"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								id="email"
								className="form-control form-input"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="phone">Phone:</label>
							<input
								type="text"
								id="phone"
								className="form-control form-input"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="mobile">Mobile:</label>
							<input
								type="text"
								id="mobile"
								className="form-control form-input"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddHandler;
