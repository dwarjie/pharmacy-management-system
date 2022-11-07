// This module contains all the medicine services
// that axios needed to request to the http
import http from "../http-common";

const createMedicine = (data) => {
	return http.post("/medicine", data);
};

const getAllMedicine = () => {
	return http.get("/medicine/medicine-list");
};

const deleteMedicine = (data) => {
	return http.put("/medicine/medicine-list", data);
};

// get data from category, manufacturer, and unit
const getOtherModel = () => {
	return http.get("/medicine");
};

const MedicineService = {
	createMedicine,
	deleteMedicine,
	getAllMedicine,
	getOtherModel,
};

export default MedicineService;
