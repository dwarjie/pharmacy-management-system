// This module contains all the OR services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const getCurrentOR = () => {
	return http.get("/or");
};

const updateCurrentOR = (data) => {
	return http.put("/or", data);
};

const incrementOR = () => {
	return http.put("/or/increment");
};

const ORService = {
	getCurrentOR,
	updateCurrentOR,
	incrementOR,
};

export default ORService;
