// this component is responsible for adding new user for the system
import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AuthService from "../../../../services/AuthService";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";

const AddUser = () => {
	const initialUser = {
		FirstName: "",
		LastName: "",
		UserName: "",
		Password: "",
		roles: [],
	};

	const [user, setUser] = useState(initialUser);
	const [alertMessage, setAlertMessage] = useState("");
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		let userRoles = selected.map((role) => {
			return role.value;
		});
		setUser((prevState) => ({ ...prevState, roles: userRoles }));
	}, [selected]);

	const options = [
		{ label: "Maintenance", value: "maintenance" },
		{ label: "Inventory", value: "inventory" },
		{ label: "Sales", value: "sales" },
		{ label: "Reports", value: "reports" },
		{ label: "Utilities", value: "utilities" },
	];

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};

	const checkRoles = () => {
		if (user.roles.length === 0) return false;

		return true;
	};

	const registerUser = (event) => {
		event.preventDefault();

		if (!AlertPrompt()) return;

		if (checkRoles()) {
			AuthService.registerUser(user)
				.then((response) => {
					console.log(response.data);
					setAlertMessage(response.data.message);
					setUser(initialUser);
					setSelected([]);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setAlertMessage("Choose user role/s");
		}
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add User</h4>
				<hr />
			</div>
			{alertMessage ? (
				<AlertInfoLayout
					content={alertMessage}
					onClick={(value) => setAlertMessage(value)}
				/>
			) : (
				""
			)}
			<div className="p-3">
				<form
					className="col-11 col-lg-10 pb-5 mx-auto"
					onSubmit={(event) => registerUser(event)}
				>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="FirstName">
								First Name:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="FirstName"
								required
								value={user.FirstName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="LastName">
								Last Name:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="LastName"
								required
								value={user.LastName}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="UserName">
								Username:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="UserName"
								required
								value={user.UserName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Password">
								Password:
							</label>
							<input
								type="password"
								className="form-control form-input"
								name="Password"
								required
								value={user.Password}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row mb-3">
						{/* <div className="col-sm-12 col-md">
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
						</div> */}
						<div className="col-sm-12 col-md-6">
							<label className="required" htmlFor="role">
								Role:
							</label>
							<MultiSelect
								options={options}
								value={selected}
								onChange={setSelected}
								labelledBy="Select Role/s"
							/>
							{/* <select
								name="role"
								id="role"
								className="form-select form-input"
								required
							>
								<option value="admin">Admin</option>
								<option value="clerk">Clerk</option>
							</select> */}
						</div>
					</div>
					<button
						className="btn btn-primary simple-shadow mt-3 me-3"
						type="submit"
					>
						Add
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddUser;
