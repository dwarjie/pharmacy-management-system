import Patient from "../main/navigation/patient/Patient";

const ModalPatient = (props) => {
	const { closePatientModal } = props;
	const initialPatient = {
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

	const initialDropDownValue = {
		handlerId: "",
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content simple-shadow rounded">
				<span
					className="close text-right m-0"
					onClick={() => closePatientModal()}
				>
					&times;
				</span>
				<Patient
					title="Add Patient"
					initialPatient={initialPatient}
					initialDropDownValue={initialDropDownValue}
					isSenior={false}
				/>
			</div>
		</div>
	);
};

export default ModalPatient;
