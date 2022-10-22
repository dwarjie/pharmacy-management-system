// This module contains all the sub category services
// that axios needed in order to request to the HTTP
import http from "../http-common";

const createSubCategory = (data) => {
	return http.post("/sub-category", data);
};

const updateSubCategory = (id, data) => {
	return http.put(`/sub-category/${id}`, data);
};

const deleteCategory = (id) => {
	return http.delete(`/sub-category/${id}`);
};

const SubCategoryService = {
	createSubCategory,
	updateSubCategory,
	deleteCategory,
};

export default SubCategoryService;
