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
	};

	return (
		<User title="Add User" initialUser={initialUser} initialSelected={[]} />
	);
};

export default AddUser;
