// This reusable component will be used for adding and updating patient information
import { useState, useEffect } from "react";
import CheckBox from "../../../layout/CheckBox";

const Patient = (props) => {
	// get the value of the props
	const { title, mode, initialPatient } = props;

	const [newPatient, setNewPatient] = useState(initialPatient);
	const [checked, setChecked] = useState(false); // for the checkbox of PWD/Senior

	// handle change event for the forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewPatient({ ...newPatient, [name]: value });
	};

	const handleChecked = () => {
		setChecked(!checked);
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>{title}</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-lg-10 pb-5 mx-auto">
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="FirstName">First Name:</label>
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
							<label htmlFor="LastName">Last Name:</label>
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
							<label htmlFor="Sex">Sex:</label>
							<select
								className="form-select form-input"
								name="Sex"
								id="Sex"
								value={newPatient.Sex}
								onChange={handleInputChange}
								required
							>
								<option value="male" selected>
									Male
								</option>
								<option value="female">Female</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="DateOfBirth">Date of Birth:</label>
							<input
								type="date"
								className="form-control form-input"
								name="DateOfBirth"
								id="DateOfBirth"
								value={newPatient.DateOfBirth}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="Address">Address:</label>
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
							<label htmlFor="Mobile">Mobile #:</label>
							<input
								type="text"
								className="form-control form-input"
								name="Mobile"
								id="Mobile"
								value={newPatient.Mobile}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="EmergencyContact">Emergency Contact:</label>
							<input
								type="text"
								className="form-control form-input"
								name="EmergencyContact"
								id="EmergencyContact"
								value={newPatient.EmergencyContact}
								onChange={handleInputChange}
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
							<label htmlFor="FirstVisit">First Visit:</label>
							<input
								type="date"
								className="form-control form-input"
								name="FirstVisit"
								id="FirstVisit"
								value={newPatient.FirstVisit}
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
								<label htmlFor="SeniorId">Senior ID:</label>
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
				</form>
				<button className="btn btn-primary simple-shadow">
					{mode === "update" ? "Update" : "Save"}
				</button>
			</div>
		</div>
	);
};

export default Patient;
