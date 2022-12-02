// this component is responsible for adding new user for the system
import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AuthService from "../../../../services/AuthService";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import { useNavigate, useParams } from "react-router-dom";

const User = (props) => {
	let navigate = useNavigate();
	const { id } = useParams();
	const { title, mode, initialUser, initialSelected } = props;

	const [user, setUser] = useState(initialUser);
	const [alertMessage, setAlertMessage] = useState("");
	const [selected, setSelected] = useState(initialSelected);

	useEffect(() => {
		setSelected(initialSelected);
		console.log(initialSelected);
	}, [initialSelected]);

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

	const updateUser = (event) => {
		event.preventDefault();

		if (checkRoles()) {
			console.log(id);
			AuthService.updateUser(id, user)
				.then((response) => {
					console.log(response.data);
					setAlertMessage(response.data.message);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setAlertMessage("Choose user role/s");
		}
	};

	const updateMode = () => {
		if (mode === "update") return true;

		return false;
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>{title}</h4>
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
					onSubmit={(event) => {
						mode === "update" ? updateUser(event) : registerUser(event);
					}}
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
						<div className="col-sm-12 col-md-6">
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
						{updateMode() ? (
							""
						) : (
							<div className="col-sm-12 col-md">
								<label
									className={mode === "update" ? "" : "required"}
									htmlFor="Password"
								>
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
						)}
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
						{updateMode() ? (
							""
						) : (
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
							</div>
						)}
					</div>
					<button
						className="btn btn-primary simple-shadow mt-3 me-3"
						type="submit"
					>
						{updateMode() ? "Update" : "Save"}
					</button>
					{updateMode() ? (
						<button
							className="btn btn-secondary simple-shadow mt-3 me-3"
							type="submit"
							onClick={() => navigate(-1)}
						>
							Cancel
						</button>
					) : (
						""
					)}
				</form>
			</div>
		</div>
	);
};

export default User;
