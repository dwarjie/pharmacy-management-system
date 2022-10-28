// This module contains all the medicine services
// that axios needed to request to the http
import http from "../http-common";

const createMedicine = (data) => {
	return http.post("/medicine", data);
};

// get data from category, manufacturer, and unit
const getOtherModel = () => {
	return http.get("/medicine");
};

const MedicineService = {
	createMedicine,
	getOtherModel,
};

export default MedicineService;
