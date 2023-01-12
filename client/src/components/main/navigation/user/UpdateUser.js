import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthService from "../../../../services/AuthService";
import User from "./User";

const UpdateUser = () => {
	let location = useLocation();
	const oldUser = location.state.user;

	const [roles, setRoles] = useState([]);

	useEffect(() => {
		getUser(oldUser.id);
	}, []);

	const initialUser = {
		id: oldUser.id,
		FirstName: oldUser.FirstName,
		LastName: oldUser.LastName,
		UserName: oldUser.UserName,
		Password: "",
		Role: [],
		roleGroupId: oldUser.roleGroup.id,
	};

	const initialActiveDropdownValue = {
		role: oldUser.roleGroup.RoleName,
	};

	const getUser = (id) => {
		AuthService.getUser(id)
			.then((response) => {
				console.log(response.data);
				let role = response.data.roles;
				setRoles(role);
				initialUser.Role = role;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const initialSelected = () => {
		if (roles === []) return [];

		return roles.map((role) => {
			let roleName = role.replace(/^./, role[0].toUpperCase());
			return { label: roleName, value: role };
		});
	};

	return (
		<User
			title="Update User"
			mode="update"
			initialUser={initialUser}
			initialActiveDropdownValue={initialActiveDropdownValue}
			// initialSelected={initialSelected()}
		/>
	);
};

export default UpdateUser;
