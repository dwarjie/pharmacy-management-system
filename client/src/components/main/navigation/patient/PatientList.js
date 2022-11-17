// this is module is responsible for listing all the patients
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientService from "../../../../services/PatientService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PatientList = () => {
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		getAllPatient();
	}, []);

	const getAllPatient = () => {
		PatientService.getAllPatient()
			.then((response) => {
				console.log(response.data);
				setPatients(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Patient List</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="patient-search">Search:</label>
					<input type="text" className="form-control" id="patient-search" />
				</form>
				<PatientTable patientsData={patients} />
			</div>
		</div>
	);
};

const PatientTable = (props) => {
	let navigate = useNavigate();
	const { patientsData } = props;

	// update patient
	const updatePatient = (patient) => {
		navigate(`/pharmacy/maintenance/patient/${patient.id}`, {
			state: {
				patient: patient,
			},
		});
	};

	// This function will go through all patients data
	// then return it as a rows in the table
	const patientRows = patientsData.map((patient, index) => (
		<tr key={index}>
			<td>{`${patient.FirstName} ${patient.LastName}`}</td>
			<td>{patient.Sex}</td>
			<td>{patient.Address}</td>
			<td>{patient.Mobile}</td>
			<td>{patient.handler.FirstName}</td>
			<td>
				<span className="px-2">
					<FaEdit
						className="icon-size-sm cursor-pointer"
						onClick={() => updatePatient(patient)}
					/>
				</span>
				<span className="px-2">
					<MdDelete className="icon-size-sm cursor-pointer" />
				</span>
			</td>
		</tr>
	));

	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Sex</th>
					<th scope="col">Address</th>
					<th scope="col">Contact #</th>
					<th scope="col">Reffered by</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>{patientRows}</tbody>
		</table>
	);
};

export default PatientList;
