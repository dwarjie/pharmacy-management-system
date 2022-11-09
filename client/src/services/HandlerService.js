// This module contains the handler service
// in order to request to the HTTP server
import http from "../http-common";

const createHandler = (data) => {
	return http.post("/handler", data);
};

const getAllHandler = () => {
	return http.get("/handler-list");
};

const updateHandler = (id, data) => {
	return http.put(`/handler/${id}`, data);
};

const HandlerService = {
	createHandler,
	getAllHandler,
	updateHandler,
};

export default HandlerService;
