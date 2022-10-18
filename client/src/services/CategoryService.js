// This module container all the category services
// that axios needed in order to request to the HTTP
import http from "../http-common";

const getAllCategory = () => {
	return http.get("/category");
};

const createCategory = (data) => {
	return http.post("/category", data);
};

const updateCategory = (data) => {
	return http.put(`/category`, data);
};

const CategoryService = {
	getAllCategory,
	createCategory,
	updateCategory,
};

export default CategoryService;
