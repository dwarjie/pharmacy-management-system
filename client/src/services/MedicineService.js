// This module contains all the medicine services
// that axios needed to request to the http
import http from "../http-common";

const createMedicine = (data) => {
	return http.post("/medicine", data);
};

const updateMedicine = (id, data) => {
	return http.put(`/medicine/${id}`, data);
};

const getAllMedicine = () => {
	return http.get("/medicine/medicine-list");
};

const deleteMedicine = (id) => {
	return http.delete(`/medicine/medicine-list?medicineId=${id}`);
};

// get data from category, manufacturer, and unit
const getOtherModel = () => {
	return http.get("/medicine");
};

// POS module
const getByTitle = (title) => {
	return http.get(`/medicine/medicine-list?title=${title}`);
};

const MedicineService = {
	createMedicine,
	updateMedicine,
	deleteMedicine,
	getAllMedicine,
	getByTitle,
	getOtherModel,
};

export default MedicineService;
