// This module contains all the sub category services
// that axios needed in order to request to the HTTP
import http from "../http-common";

const createSubCategory = (data) => {
	return http.post("/sub-category", data);
};

const SubCategoryService = {
	createSubCategory,
};

export default SubCategoryService;
