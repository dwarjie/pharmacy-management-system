// this module will handle the authorization token
// it will save the token in the Browser local storage
// and will also get the token when needed

import http from "../http-common";

const registerUser = (data) => {
	return http.post(`/auth/signup`, data);
};

const loginUser = (data) => {
	return http.post(`/auth/signin`, data);
};

const saveToken = (user) => {
	// check if token exists
	if (user === null) {
		return console.log("Error in saving token.");
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
	registerUser,
	loginUser,
	saveToken,
	logout,
	getCurrentUser,
	getToken,
};

export default AuthService;
