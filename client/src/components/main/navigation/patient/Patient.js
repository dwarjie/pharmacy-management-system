// This reusable component will be used for adding and updating patient information
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import PatientService from "../../../../services/PatientService";
import CheckBox from "../../../layout/CheckBox";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";
import parseDropdownValue from "../../../../helper/parseJSON";
import { formatDate } from "../../../../helper/dateHelper";

const Patient = (props) => {
	let navigate = useNavigate();
	// get the value of the props
	const { title, mode, initialPatient, initialDropDownValue, isSenior } = props;

	const initialFormErrors = {
		id: null,
		FirstName: "",
		LastName: "",
		Sex: "",
		DateOfBirth: "",
		City: "",
		ZIP: "",
		Address: "",
		FirstVisit: "",
		Mobile: "",
		EmergencyContact: "",
		isSenior: false,
		SeniorId: "",
		Note: "",
		handlerId: null,
	};

	const [newPatient, setNewPatient] = useState(initialPatient);
	const [handlers, sethandlers] = useState([]);
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDownValue);
	const [checked, setChecked] = useState(isSenior); // for the checkbox of PWD/Senior
	const [alertMessage, setAlertMessage] = useState("");
	const [formErrors, setFormErrors] = useState(initialFormErrors);

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

		setFormErrors(validateForm(newPatient));
		if (!isFormValid(formErrors)) return;

		// ask for confirmation
		if (!AlertPrompt()) return;

		PatientService.createPatient(newPatient)
			.then((response) => {
				console.log(response.data);
				setAlertMessage(response.data.message);
				if (response.data.data) {
					refreshForm();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};
		const regex = /^[0-9]{11}$/;
		if (!values.FirstName.trim()) {
			errors.FirstName = "First name is required!";
		}
		if (!values.LastName.trim()) {
			errors.LastName = "Last name is required!";
		}
		if (!values.Sex) {
			errors.Sex = "Please select patient's sex";
		}
		if (!values.Address.trim()) {
			errors.Address = "Address is required!";
		}
		if (!values.DateOfBirth) {
			errors.DateOfBirth = "Date of Birth is required!";
		}
		if (!values.Mobile.trim()) {
			errors.Mobile = "Mobile # is required!";
		} else if (!regex.test(values.Mobile.trim())) {
			errors.Mobile = "Please enter a valid mobile number!";
		}
		if (!regex.test(values.EmergencyContact.trim())) {
			errors.EmergencyContact = "Please enter a valid emergency number!";
		}
		if (!values.handlerId || values.handlerId === null) {
			errors.handlerId = "Please select a Doctor/NCM";
		}
		if (!values.FirstVisit) {
			errors.FirstVisit = "Please select patient's sex";
		}
		if (values.isSenior) {
			if (!values.SeniorId.trim()) {
				errors.SeniorId = "Senior ID is required!";
			}
		}

		return errors;
	};

	// update the patient
	const updatePatient = (event) => {
		event.preventDefault();

		setFormErrors(validateForm(newPatient));
		if (!isFormValid(formErrors)) return;

		PatientService.updatePatient(newPatient.id, newPatient)
			.then((response) => {
				console.log(response.data);
				if (response.data.data) {
					alert(response.data.message);
					navigate(-1);
				}
				setAlertMessage(response.data.message);
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
				<form
					className="col-12 col-lg-10 pb-5 mx-auto"
					onSubmit={(event) => {
						mode === "update" ? updatePatient(event) : createPatient(event);
					}}
				>
					<div className="row mb-sm-3">
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
								id="LastName"
								value={newPatient.LastName}
								onChange={handleInputChange}
							/>
							<p className="text-error">{formErrors.LastName}</p>
						</div>
					</div>
					<div className="row mb-sm-3">
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
							>
								<DropDownDefaultOption content={"Select Sex"} />
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
							<p className="text-error">{formErrors.Sex}</p>
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
							/>
							<p className="text-error">{formErrors.DateOfBirth}</p>
						</div>
					</div>
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md-9">
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
							/>
							<p className="text-error">{formErrors.Address}</p>
						</div>
						{/* <div className="col-sm-12 col-md">
							<label htmlFor="city">City:</label>
							<input
								type="text"
								className="form-control form-input"
								name="City"
								id="City"
								value={newPatient.City}
								onChange={handleInputChange}
							/>
						</div> */}
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
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Mobile">
								Mobile #:
							</label>
							<input
								type="text"
								// pattern="[0-9]+"
								// minLength={11}
								// maxLength={11}
								className="form-control form-input"
								name="Mobile"
								id="Mobile"
								value={newPatient.Mobile}
								onChange={handleInputChange}
							/>
							<p className="text-error">{formErrors.Mobile}</p>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="EmergencyContact">Emergency Contact:</label>
							<input
								type="text"
								// pattern="[0-9]+"
								// minLength={11}
								// maxLength={11}
								className="form-control form-input"
								name="EmergencyContact"
								id="EmergencyContact"
								value={newPatient.EmergencyContact}
								onChange={handleInputChange}
							/>
							<p className="text-error">{formErrors.EmergencyContact}</p>
						</div>
					</div>
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="handlerId">
								Referred By:
							</label>
							<select
								name="handlerId"
								id="handlerId"
								className="form-select form-input"
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
								<DropDownDefaultOption content={"Select NCM/Doctor"} />
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
							<p className="text-error">{formErrors.handlerId}</p>
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
							/>
							<p className="text-error">{formErrors.FirstVisit}</p>
						</div>
					</div>
					<div className="row mb-sm-3">
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
								/>
								<p className="text-error">
									{newPatient.isSenior ? formErrors.SeniorId : ""}
								</p>
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
