// this component is responsible for adding new user for the system
import { useState, useEffect } from "react";
import AuthService from "../../../../services/AuthService";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

const AddUser = () => {
	const initialUser = {
		FirstName: "",
		LastName: "",
		UserName: "",
		Password: "",
		roles: ["admin"],
	};

	const [user, setUser] = useState(initialUser);
	const [alertMessage, setAlertMessage] = useState("");

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};

	const registerUser = (event) => {
		event.preventDefault();

		if (!AlertPrompt()) return;

		AuthService.registerUser(user)
			.then((response) => {
				console.log(response.data);
				setAlertMessage(response.data.message);
				setUser(initialUser);
			})
			.catch((err) => {
				console.log(err);
			});
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
							<select
								name="role"
								id="role"
								className="form-select form-input"
								required
							>
								<option value="admin">Admin</option>
								<option value="clerk">Clerk</option>
							</select>
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
