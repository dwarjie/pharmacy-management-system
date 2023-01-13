// this component is responsible for adding new user for the system
import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";
import AuthService from "../../../../services/AuthService";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import RoleGroupService from "../../../../services/RoleGroupService";
import PatientService from "../../../../services/PatientService";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";
import { useNavigate, useParams } from "react-router-dom";
import parseDropdownValue from "../../../../helper/parseJSON";
import ModalHandler from "../../../layout/ModalHandler";

const User = (props) => {
	let navigate = useNavigate();
	const { id } = useParams();
	const { title, mode, initialUser, initialActiveDropdownValue } = props;

	const initialFormErrors = {
		FirstName: "",
		LastName: "",
		UserName: "",
		Password: "",
		ConfirmPassword: "",
	};

	const [user, setUser] = useState(initialUser);
	const [roleList, setRoleList] = useState([]);
	const [handlers, setHandlers] = useState([]);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [alertMessage, setAlertMessage] = useState("");
	const [selected, setSelected] = useState([]);
	const [activeDropdownValue, setActiveDropdownValue] = useState(
		initialActiveDropdownValue
	);
	const [addDoctor, setAddDoctor] = useState(false);

	// modal state
	const [handlerModal, setHandlerModal] = useState(false);

	useEffect(() => {
		getAllInformation();
	}, []);

	useEffect(() => {
		if (updateMode()) return;

		if (addDoctor === true) {
			setUser((prevState) => ({
				...prevState,
				roleGroupId: 2,
			}));
		}
		if (addDoctor === false) {
			setUser(initialUser);
			setActiveDropdownValue((prevState) => ({
				...prevState,
				handler: "",
			}));
		}
	}, [addDoctor]);

	useEffect(() => {
		let userRoles = selected.map((role) => {
			return role.value;
		});
		setUser((prevState) => ({ ...prevState, Role: userRoles }));
	}, [selected]);

	const getAllInformation = async () => {
		await getAllRoleGroup();
		await getAllHandler();
	};

	const getAllHandler = async () => {
		await PatientService.getAllHandler()
			.then((response) => {
				console.log(response.data);
				setHandlers(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAllRoleGroup = async () => {
		await RoleGroupService.getAllRoleGroup()
			.then((response) => {
				console.log(response.data);
				setRoleList(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
		if (user.roleGroupId === null) return false;

		return true;
	};

	const registerUser = (event) => {
		event.preventDefault();

		setFormErrors(validateForm(user));
		if (!isFormValid(formErrors)) return;

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

	const validateForm = (values) => {
		const errors = {};
		const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$%^&]).*$/;

		if (!values.FirstName.trim()) {
			errors.FirstName = "First name is required!";
		}
		if (!values.LastName.trim()) {
			errors.LastName = "Last name is required!";
		}
		if (!values.UserName.trim()) {
			errors.UserName = "Username is required!";
		}
		if (!values.Password.trim()) {
			errors.Password = "Password is required!";
		} else if (values.Password.trim().length < 6) {
			errors.Password = "Password must be at least 6 characters";
		} else if (
			values.Password.trim() &&
			!regexPassword.test(values.Password.trim())
		) {
			errors.Password =
				"Password should contain uppercase, lowercase, number, and special character!";
		}
		if (!values.ConfirmPassword.trim()) {
			errors.ConfirmPassword = "Confirm password is required!";
		} else if (
			values.ConfirmPassword.trim() &&
			values.ConfirmPassword.trim() !== values.Password.trim()
		) {
			errors.ConfirmPassword = "Should match password!";
		}
		if (values.roleGroupId === null) {
			errors.roleGroupId = "Please select user role group!";
		}

		return errors;
	};

	const updateMode = () => {
		if (mode === "update") return true;

		return false;
	};

	const closeHandlerModal = () => {
		setHandlerModal(false);
		getAllHandler();
	};

	const handlerDoctorButton = () => {
		setAddDoctor(!addDoctor);
	};

	return (
		<>
			{handlerModal ? (
				<ModalHandler closeHandlerModal={closeHandlerModal} />
			) : (
				""
			)}
			<div className="col-12 h-auto">
				<div className="p-2">
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
				<div className="p-2">
					{updateMode() ? (
						""
					) : (
						<button
							className="btn btn-secondary mb-3"
							onClick={() => handlerDoctorButton()}
						>
							Doctor/NCM
						</button>
					)}
					<form
						className="col-11 col-lg-10 pb-5 mx-auto"
						onSubmit={(event) => {
							mode === "update" ? updateUser(event) : registerUser(event);
						}}
					>
						{addDoctor ? (
							<div className="col-sm-12 col-md-6 mb-sm-3">
								<label htmlFor="">Select Doctor</label>
								<select
									name="handlerId"
									id="handlerId"
									className="form-select form-input"
									value={activeDropdownValue.handler}
									onChange={(event) => {
										if (event.target.value === "new-value") {
											return setHandlerModal(true);
										}

										let data = parseDropdownValue(event);
										setActiveDropdownValue((prevState) => ({
											...prevState,
											handler: `${data.FirstName} ${data.LastName}`,
										}));
										setUser((prevState) => ({
											...prevState,
											FirstName: data.FirstName,
											LastName: data.LastName,
										}));
									}}
								>
									<DropDownDefaultOption content={"Select NCM/Doctor"} />
									{handlers &&
										handlers.map((handler, index) => (
											<option
												className="dropdown-item"
												value={`${handler.FirstName} ${handler.LastName}`}
												data-value={JSON.stringify(handler)}
												key={index}
											>
												{`${handler.FirstName} ${handler.LastName}`}
											</option>
										))}
									<option value={"new-value"}>{"<...>"}</option>
								</select>
							</div>
						) : (
							""
						)}
						<div className="row mb-sm-3">
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="FirstName">
									First Name:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="FirstName"
									value={user.FirstName}
									onChange={handleInputChange}
								/>
								<p className="text-error">{formErrors.FirstName}</p>
							</div>
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="LastName">
									Last Name:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="LastName"
									value={user.LastName}
									onChange={handleInputChange}
								/>
								<p className="text-error">{formErrors.LastName}</p>
							</div>
						</div>
						<div className="row mb-sm-3">
							<div className="col-sm-12 col-md-6">
								<label className="required" htmlFor="UserName">
									Username:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="UserName"
									value={user.UserName}
									onChange={handleInputChange}
								/>
								<p className="text-error">{formErrors.UserName}</p>
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
										value={user.Password}
										onChange={handleInputChange}
									/>
									<p className="text-error">{formErrors.Password}</p>
								</div>
							)}
						</div>
						<div className="row mb-sm-3">
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
							{addDoctor ? (
								""
							) : (
								<div className="col-sm-12 col-md-6">
									<label className="required" htmlFor="role">
										Role:
									</label>
									<select
										name="roleId"
										className="form-select form-input"
										value={activeDropdownValue.role}
										onChange={(event) => {
											let data = parseDropdownValue(event);
											setActiveDropdownValue((prevState) => ({
												...prevState,
												role: data.RoleName,
											}));
											setUser((prevState) => ({
												...prevState,
												roleGroupId: data.id,
											}));
										}}
									>
										<DropDownDefaultOption content={"Select Role Group"} />
										{roleList &&
											roleList.map((role, index) => (
												<option
													className="dropdown-item"
													value={role.RoleName}
													data-value={JSON.stringify(role)}
													key={index}
												>
													{role.RoleName}
												</option>
											))}
									</select>
									<p className="text-error">{formErrors.roleGroupId}</p>
								</div>
							)}
							{updateMode() ? (
								""
							) : (
								<div className="col-sm-12 col-md-6">
									<label
										className={mode === "update" ? "" : "required"}
										htmlFor="Password"
									>
										Confirm Password:
									</label>
									<input
										type="password"
										className="form-control form-input"
										name="ConfirmPassword"
										value={user.ConfirmPassword}
										onChange={handleInputChange}
									/>
									<p className="text-error">{formErrors.ConfirmPassword}</p>
								</div>
							)}
						</div>
						{updateMode() ? (
							<div className="col-sm-12 col-md d-flex flex-row justify-content-start gap-2">
								<input
									type="checkbox"
									className="form-check-input"
									name="isLock"
									checked={user.isLock}
									onChange={(event) =>
										setUser((prevState) => ({
											...prevState,
											isLock: event.target.checked,
										}))
									}
								/>
								<label htmlFor="">Lock:</label>
							</div>
						) : (
							""
						)}
						<button
							className="btn btn-primary simple-shadow mt-3 me-3"
							type="submit"
						>
							{updateMode() ? "Update" : "Save"}
						</button>
						{updateMode() ? (
							<button
								type="button"
								className="btn btn-secondary simple-shadow mt-3 me-3"
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
		</>
	);
};

export default User;
