// This module container all the category services
// that axios needed in order to request to the HTTP
import http from "../http-common";

const getAllCategory = () => {
	return http.get("/category");
};

const CategoryService = {
	getAllCategory,
};

export default CategoryService;
