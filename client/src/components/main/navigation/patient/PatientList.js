// this is module is responsible for listing all the patients
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import PatientService from "../../../../services/PatientService";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PatientList = () => {
	let navigate = useNavigate();

	const [patients, setPatients] = useState([]);
	const [alertMessage, setAlertMessage] = useState("");

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

	// update patient
	const updatePatient = (patient) => {
		navigate(`/pharmacy/maintenance/patient/${patient.id}`, {
			state: {
				patient: patient,
			},
		});
	};

	// delete patient
	const deletePatient = (patient) => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		PatientService.deletePatient(patient.id)
			.then((response) => {
				console.log(response.data);
				getAllPatient(); // refresh the list
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="col-12 h-auto">
			<div className="p-2">
				<h4>Patient List</h4>
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
				{/* <form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="patient-search">Search:</label>
					<input type="text" className="form-control" id="patient-search" />
				</form> */}
				<PatientTable
					patientsData={patients}
					updatePatient={updatePatient}
					deletePatient={deletePatient}
				/>
			</div>
		</div>
	);
};

const PatientTable = (props) => {
	const { patientsData, updatePatient, deletePatient } = props;

	// This function will go through all patients data
	// then return it as a rows in the table
	const patientRows = patientsData.map((patient, index) => (
		<tr key={index}>
			<td>{index + 1}</td>
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
					<MdDelete
						className="icon-size-sm cursor-pointer"
						onClick={() => deletePatient(patient)}
					/>
				</span>
			</td>
		</tr>
	));

	return (
		<div className="table-responsive">
			<table className="table table-striped table-hover">
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>
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
		</div>
	);
};

export default PatientList;
