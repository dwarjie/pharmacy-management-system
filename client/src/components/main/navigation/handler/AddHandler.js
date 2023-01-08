// this component is responsible for adding new handlers
import Handler from "./Handler";

const AddHandler = () => {
	// initialize initial value for handler state
	const initialHandler = {
		id: null,
		Category: "",
		FirstName: "",
		LastName: "",
		Sex: "",
		City: "",
		ZIP: "",
		Address: "",
		Mobile: "",
		Email: "",
	};

	return <Handler title="Add Doctor/NCM" initialHandler={initialHandler} />;
};

export default AddHandler;
