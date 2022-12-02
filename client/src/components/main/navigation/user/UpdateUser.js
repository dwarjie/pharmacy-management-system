import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthService from "../../../../services/AuthService";
import User from "./User";

const UpdateUser = () => {
	let location = useLocation();
	const oldUser = location.state.user;

	const [role, setRole] = useState([]);

	useEffect(() => {
		getUser(oldUser.id);
	}, []);

	const initialUser = {
		id: oldUser.id,
		FirstName: oldUser.FirstName,
		LastName: oldUser.LastName,
		UserName: oldUser.UserName,
		Password: "",
		roles: [],
	};

	const getUser = (id) => {
		AuthService.getUser(id)
			.then((response) => {
				console.log(response.data);
				setRole(response.data.roles);
				initialUser.roles = response.data.roles;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const initialSelected = () => {
		return role.map((role) => {
			let roleName = role.replace(/^./, role[0].toUpperCase());
			return { label: roleName, value: role };
		});
	};

	return (
		<User
			title="Update User"
			mode="update"
			initialUser={initialUser}
			initialSelected={initialSelected()}
		/>
	);
};

export default UpdateUser;
