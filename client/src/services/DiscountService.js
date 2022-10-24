// This module contains all the discount services
// in order to request to the server
import http from "../http-common";

const getAllDiscount = () => {
	return http.get("/discount");
};

const createDiscount = (data) => {
	return http.post("/discount", data);
};

const updateDiscount = (id, data) => {
	return http.put(`/discount/${id}`, data);
};

const deleteDiscount = (id) => {
	return http.delete(`/discount/${id}`);
};

const DiscountService = {
	getAllDiscount,
	createDiscount,
	updateDiscount,
	deleteDiscount,
};

export default DiscountService;
