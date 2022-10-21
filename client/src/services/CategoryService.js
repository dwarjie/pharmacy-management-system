// This module container all the category services
// that axios needed in order to request to the HTTP
import http from "../http-common";

const getAllCategory = () => {
	return http.get("/category");
};

const createCategory = (data) => {
	return http.post("/category", data);
};

const updateCategory = (id, data) => {
	return http.put(`/category/${id}`, data);
};

const deleteCategory = (id) => {
	return http.delete(`/category/${id}`);
};

const CategoryService = {
	getAllCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};

export default CategoryService;
