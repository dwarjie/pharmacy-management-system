// This module contains all the medicine services
// that axios needed to request to the http
import http from "../http-common";

const createMedicine = (data) => {
	return http.post("/medicine", data);
};

const MedicineService = {
	createMedicine,
};

export default MedicineService;
