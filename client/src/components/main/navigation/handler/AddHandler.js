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

	// set onClick function for button to trigger
	const createHandler = (data) => {
		console.log(data);
	};

	return (
		<Handler
			title="Add Handlers"
			initialHandler={initialHandler}
			createHandler={createHandler}
		/>
	);
};

export default AddHandler;
