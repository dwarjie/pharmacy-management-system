// This module contains the handler service
// in order to request to the HTTP server
import http from "../http-common";

const createHandler = (data) => {
	return http.post("/handler", data);
};

const getAllHandler = () => {
	return http.get("/handler/handler-list");
};

const updateHandler = (id, data) => {
	return http.put(`/handler/${id}`, data);
};

const deleteHandler = (id) => {
	return http.delete(`/handler/handler-list?handlerId=${id}`);
};

const increaseBalance = (id, data) => {
	return http.put(`/handler/add-balance/${id}`, data);
};

const decreaseBalance = (id, data) => {
	return http.put(`/handler/subtract-balance/${id}`, data);
};

const HandlerService = {
	createHandler,
	getAllHandler,
	updateHandler,
	deleteHandler,
	increaseBalance,
	decreaseBalance
};

export default HandlerService;
