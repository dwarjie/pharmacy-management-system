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
		Senior: 0,
		SeniorId: "",
		Note: "",
		handlerId: null,
	};

	return <Patient title="Add Patient" initialPatient={initialPatient} />;
};

export default AddPatient;
