// This component is responsible for updating Patient
import { useLocation } from "react-router-dom";
import Patient from "./Patient";

const UpdatePatient = () => {
	const location = useLocation();
	const oldPatient = location.state.patient;

	// initialize initial value for patient from patientlist
	const initialPatient = { ...oldPatient };

	const initialDropDownValue = {
		handlerId: oldPatient.handler.FirstName,
	};

	return (
		<Patient
			title="Update Patient"
			mode="update"
			initialPatient={initialPatient}
			initialDropDownValue={initialDropDownValue}
			isSenior={oldPatient.isSenior}
		/>
	);
};

export default UpdatePatient;
