import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import Loader from "../../../layout/Loader";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import RoleGroupService from "../../../../services/RoleGroupService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";

import { FaEdit } from "react-icons/fa";

const Role = () => {
	const initialRole = {
		id: null,
		RoleName: "",
		Role: [],
	};

	const initialSelected = [];

	const initialFormErrors = {
		RoleName: "",
		Role: [],
	};

	const options = [
		{ label: "Maintenance", value: "maintenance" },
		{ label: "Inventory", value: "inventory" },
		{ label: "Sales", value: "sales" },
		{ label: "Reports", value: "reports" },
		{ label: "Utilities", value: "utilities" },
		{ label: "Request Form", value: "request-form" },
	];

	const [role, setRole] = useState(initialRole);
	const [roleList, setRoleList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [selected, setSelected] = useState(initialSelected);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllInformation();
	}, []);

	useEffect(() => {
		let userRoles = selected.map((role) => {
			return role.value;
		});
		setRole((prevState) => ({ ...prevState, Role: userRoles }));
	}, [selected]);

	const getAllInformation = async () => {
		await getAllRoleGroup();
	};

	const getAllRoleGroup = async () => {
		RoleGroupService.getAllRoleGroup()
			.then((response) => {
				console.log(response.data);
				setRoleList(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const createRoleGroup = async (event) => {
		event.preventDefault();

		setFormErrors(validateForm(role));
		if (isFormValid(formErrors)) {
			setLoading(true);
			if (!AlertPrompt()) return;

			RoleGroupService.createRoleGroup(role)
				.then((response) => {
					console.log(response.data);
					setAlertMessage(response.data.message);
					setRole(initialRole);
					getAllInformation();
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const validateForm = (values) => {
		const errors = {};

		if (!values.RoleName.trim()) {
			errors.RoleName = "Role name is required!";
		}
		if (values.Role.length === 0) {
			errors.Role = "Select Role/s!";
		}

		return errors;
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<>
					<div className="h-auto d-flex flex-column justify-content-between gap-1">
						<div className="p-2">
							<h4>Role Group</h4>
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
						<form
							className="col-11 col-lg-10 pb-5 mx-auto"
							onSubmit={(event) => createRoleGroup(event)}
						>
							<div className="col-12 col-lg-6 mb-sm-3 mx-auto">
								<div className="col-sm-12 col-md">
									<label className="required" htmlFor="FirstName">
										Role Group Name:
									</label>
									<input
										type="text"
										className="form-control form-input"
										name="RoleName"
										value={role.RoleName}
										onChange={(event) =>
											setRole((prevState) => ({
												...prevState,
												RoleName: event.target.value,
											}))
										}
									/>
									<p className="text-error">{formErrors.RoleName}</p>
								</div>
								<div className="col-sm-12 col-md">
									<label className="required" htmlFor="role">
										Role/s:
									</label>
									<MultiSelect
										options={options}
										value={selected}
										onChange={setSelected}
										labelledBy="Select Role/s"
									/>
									<p className="text-error">{formErrors.Role}</p>
								</div>
								<button className="btn btn-primary mt-3" type="submit">
									Save
								</button>
							</div>
						</form>
					</div>
					<div>
						<RoleList roleList={roleList} />
					</div>
				</>
			)}
		</>
	);
};

const RoleList = ({ roleList }) => {
	return (
		<div className="col-12 h-auto mt-3">
			<div className="p-2">
				<h4>Roles List</h4>
				<hr />
			</div>
			<div className="p-2 table-responsive">
				<table className="table table-hover table-striped">
					<thead className="table-dark">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Role/s</th>
						</tr>
					</thead>
					<tbody>
						{roleList &&
							roleList.map((role, index) => (
								<tr key={index} className="cursor-pointer">
									<td>{role.RoleName}</td>
									<td>{role.Role.toString()}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Role;
