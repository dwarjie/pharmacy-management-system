// this module will handle the authorization token
// it will save the token in the Browser local storage
// and will also get the token when needed

import http from "../http-common";

const getAllUser = () => {
	return http.get(`/auth`);
};

const registerUser = (data) => {
	return http.post(`/auth/signup`, data);
};

const loginUser = (data) => {
	return http.post(`/auth/signin`, data);
};

const updateUser = (id, data) => {
	return http.put(`/auth/${id}`, data);
};

const deleteUser = (userId) => {
	return http.delete(`/auth?userId=${userId}`);
};

const getUser = (id) => {
	return http.get(`/auth/${id}`);
};

const current_user = () => {
	return http.get(`/auth/current_user`);
};

// Local storage

const saveToken = (user) => {
	// check if token exists
	if (user === null) {
		return console.log("Error in saving user.");
	}

	// save token
	localStorage.setItem("user", JSON.stringify(user));
};

const logout = () => {
	localStorage.removeItem("user");
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

// get the token from the browser local storage
const getToken = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	if (user) {
		return { "x-access-token": user.accessToken, isAuthenticated: true };
	} else {
		return {};
	}
};

const AuthService = {
	getAllUser,
	registerUser,
	loginUser,
	updateUser,
	deleteUser,
	getUser,
	current_user,
	saveToken,
	logout,
	getCurrentUser,
	getToken,
};

export default AuthService;
