// this module is reponsible for listing all the users
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AuthService from "../../../../services/AuthService";

const UserList = () => {
	let navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllUsers();
	}, []);

	const getAllUsers = () => {
		AuthService.getAllUser()
			.then((response) => {
				console.log(response.data);
				setUsers(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteUser = (user) => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		AuthService.deleteUser(user.id)
			.then((response) => {
				console.log(response.data);
				getAllUsers(); // refresh the list
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateUser = (user) => {
		navigate(`/pharmacy/utilities/${user.id}`, {
			state: {
				user: user,
			},
		});
	};

	return (
		<div className="col-12 h-auto">
			<div className="p-2">
				<h4>User List</h4>
				<hr />
			</div>
			<div className="p-2">
				{/* <form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="user-search">Search:</label>
					<input type="text" className="form-control" id="user-search" />
				</form> */}
				<UserTable
					users={users}
					deleteUser={deleteUser}
					updateUser={updateUser}
				/>
			</div>
		</div>
	);
};

const UserTable = (props) => {
	const { users, updateUser, deleteUser } = props;

	// This function will go through all users data
	// then return it as a rows in the table
	const usersRows = users.map((user, index) => (
		<tr key={index}>
			<td>{index + 1}</td>
			<td>{`${user.FirstName} ${user.LastName}`}</td>
			<td>{user.UserName}</td>
			<td>
				<span className="px-2">
					<FaEdit
						className="icon-size-sm cursor-pointer"
						onClick={() => updateUser(user)}
					/>
				</span>
				<span className="px-2">
					<MdDelete
						className="icon-size-sm cursor-pointer"
						onClick={() => deleteUser(user)}
					/>
				</span>
			</td>
		</tr>
	));

	return (
		<div className="table-responsive">
			<table className="table table-striped table-hover">
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Username</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>{usersRows}</tbody>
			</table>
		</div>
	);
};

export default UserList;
