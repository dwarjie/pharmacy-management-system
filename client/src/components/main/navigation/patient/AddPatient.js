// This component is responsible for adding patient information
import Patient from "./Patient";

const AddPatient = () => {
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
		<Patient
			title="Add Patient"
			initialPatient={initialPatient}
			initialDropDownValue={initialDropDownValue}
			isSenior={false}
		/>
	);
};

export default AddPatient;
