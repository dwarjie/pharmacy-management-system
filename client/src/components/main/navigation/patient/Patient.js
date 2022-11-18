// This reusable component will be used for adding and updating patient information
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import PatientService from "../../../../services/PatientService";
import CheckBox from "../../../layout/CheckBox";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";
import parseDropdownValue from "../../../../helper/parseJSON";
import formatDate from "../../../../helper/formatDate";

const Patient = (props) => {
	let navigate = useNavigate();
	// get the value of the props
	const { title, mode, initialPatient, initialDropDownValue, isSenior } = props;

	const [newPatient, setNewPatient] = useState(initialPatient);
	const [handlers, sethandlers] = useState([]);
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDownValue);
	const [checked, setChecked] = useState(isSenior); // for the checkbox of PWD/Senior

	useEffect(() => {
		getAllHandler();
	}, []);

	const getAllHandler = () => {
		PatientService.getAllHandler()
			.then((response) => {
				console.log(response.data);
				sethandlers(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// create a new patient
	const createPatient = (event) => {
		event.preventDefault();
		// ask for confirmation
		if (!AlertPrompt()) return;

		PatientService.createPatient(newPatient)
			.then((response) => {
				console.log(response.data);
				refreshForm();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update the patient
	const updatePatient = (event) => {
		event.preventDefault();
		PatientService.updatePatient(newPatient.id, newPatient)
			.then((response) => {
				console.log(response.data);
				navigate(-1);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// handle change event for the forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewPatient({ ...newPatient, [name]: value });
	};

	const handleChecked = () => {
		setChecked(!checked);
		// ! set isSenior based on the checkbox value
		setNewPatient({ ...newPatient, isSenior: !checked, SeniorId: "" });
	};

	// refresh the forms
	const refreshForm = () => {
		setNewPatient(initialPatient);
		setActiveDropDownValue(initialDropDownValue);
		setChecked(isSenior);
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>{title}</h4>
				<hr />
			</div>
			<div className="p-3">
				<form
					className="col-12 col-lg-10 pb-5 mx-auto"
					onSubmit={(event) => {
						mode === "update" ? updatePatient(event) : createPatient(event);
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
								id="FirstName"
								value={newPatient.FirstName}
								onChange={handleInputChange}
								required
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
								id="LastName"
								value={newPatient.LastName}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Sex">
								Sex:
							</label>
							<select
								className="form-select form-input"
								name="Sex"
								id="Sex"
								value={newPatient.Sex}
								onChange={handleInputChange}
								required
							>
								<DropDownDefaultOption content={"Select Sex"} />
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="DateOfBirth">
								Date of Birth:
							</label>
							<input
								type="date"
								className="form-control form-input"
								name="DateOfBirth"
								id="DateOfBirth"
								value={formatDate(newPatient.DateOfBirth)}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Address">
								Address:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="Address"
								id="Address"
								value={newPatient.Address}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="city">City:</label>
							<input
								type="text"
								className="form-control form-input"
								name="City"
								id="City"
								value={newPatient.City}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="ZIP">ZIP:</label>
							<input
								type="text"
								className="form-control form-input"
								name="ZIP"
								id="ZIP"
								value={newPatient.ZIP}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Mobile">
								Mobile #:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="Mobile"
								id="Mobile"
								required
								value={newPatient.Mobile}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="EmergencyContact">
								Emergency Contact:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="EmergencyContact"
								id="EmergencyContact"
								required
								value={newPatient.EmergencyContact}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="handlerId">
								Reffered By:
							</label>
							<select
								name="handlerId"
								id="handlerId"
								className="form-select form-input"
								required
								value={activeDropDownValue.handlerId}
								onChange={(event) => {
									let data = parseDropdownValue(event);
									setActiveDropDownValue({
										...activeDropDownValue,
										handlerId: data.FirstName,
									});
									setNewPatient({ ...newPatient, handlerId: data.id });
								}}
							>
								<DropDownDefaultOption content={"Select handler"} />
								{handlers &&
									handlers.map((handler, index) => (
										<option
											className="dropdown-item"
											value={handler.FirstName}
											data-value={JSON.stringify(handler)}
											key={index}
										>
											{handler.FirstName}
										</option>
									))}
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="FirstVisit">
								First Visit:
							</label>
							<input
								type="date"
								className="form-control form-input"
								name="FirstVisit"
								id="FirstVisit"
								value={formatDate(newPatient.FirstVisit)}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md-6">
							<label htmlFor="Note">Medical Note:</label>
							<textarea
								className="form-control form-input"
								name="Note"
								id="Note"
								value={newPatient.Note}
								onChange={handleInputChange}
							></textarea>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="Status">Status: </label>
							<CheckBox
								label="PWD/Senior"
								inputName="Status"
								value={checked}
								onChange={handleChecked}
							/>
							<div className="col-sm-12 col-md">
								<label className={checked ? "required" : ""} htmlFor="SeniorId">
									Senior ID:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="SeniorId"
									id="SeniorId"
									value={newPatient.SeniorId}
									onChange={handleInputChange}
									disabled={!checked}
									required={checked}
								/>
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary simple-shadow mt-3 me-3"
					>
						{mode === "update" ? "Update" : "Save"}
					</button>
					{mode === "update" ? (
						<button
							type="button"
							className="btn btn-secondary simple-shadow me-3 mt-3"
							onClick={() => navigate(-1)}
						>
							Back
						</button>
					) : (
						""
					)}
				</form>
			</div>
		</div>
	);
};

export default Patient;
