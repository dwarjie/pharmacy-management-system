// this component is responsible for adding new user for the system
import { useState, useEffect } from "react";
import User from "./User";

const AddUser = () => {
	const initialUser = {
		id: null,
		FirstName: "",
		LastName: "",
		UserName: "",
		Password: "",
		ConfirmPassword: "",
		Role: [],
		roleGroupId: null,
	};

	const initialActiveDropdownValue = {
		role: "",
		handler: "",
	};

	return (
		<User
			title="Add User"
			initialUser={initialUser}
			initialSelected={[]}
			initialActiveDropdownValue={initialActiveDropdownValue}
		/>
	);
};

export default AddUser;
