import http from "../http-common";

const createReturn = (data) => {
	return http.post("/returns", data);
};

const getAllReturn = () => {
	return http.get("/returns");
};

const getAllByDate = (dateObj) => {
	return http.post(`/returns/date-range`, dateObj);
};

const ReturnService = {
	createReturn,
	getAllReturn,
	getAllByDate,
};

export default ReturnService;
