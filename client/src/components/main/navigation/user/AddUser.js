// this component is responsible for adding new user for the system

const AddUser = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add User</h4>
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
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								className="form-control form-input"
								id="email"
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								className="form-control form-input"
								id="password"
								required
							/>
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
							<label htmlFor="role">Role:</label>
							<select
								name="role"
								id="role"
								className="form-select form-input"
								required
							>
								<option value="admin" selected>
									admin
								</option>
								<option value="cashier">Cashier</option>
							</select>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddUser;
