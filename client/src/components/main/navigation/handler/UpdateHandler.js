// This module is responsible for updating handlers
import { useLocation } from "react-router-dom";
import Handler from "./Handler";

const UpdateHandler = () => {
	const location = useLocation();
	const oldHandler = location.state.handler;
	// initialize initial value for handlers from handler list
	const initialHandler = {
		id: oldHandler.id,
		Category: oldHandler.Category,
		FirstName: oldHandler.FirstName,
		LastName: oldHandler.LastName,
		Sex: oldHandler.Sex,
		City: oldHandler.City,
		ZIP: oldHandler.ZIP,
		Address: oldHandler.Address,
		Mobile: oldHandler.Mobile,
		Email: oldHandler.Email,
		CreditLimit: oldHandler.CreditLimit,
		Balance: oldHandler.Balance,
		OnHold: oldHandler.OnHold,
	};

	return (
		<Handler
			title="Update NCM/Doctor"
			initialHandler={initialHandler}
			mode="update"
		/>
	);
};

export default UpdateHandler;
