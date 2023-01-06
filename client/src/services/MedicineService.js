// This module contains all the medicine services
// that axios needed to request to the http
import http from "../http-common";

const createMedicine = (data) => {
	return http.post("/medicine", data);
};

const updateMedicine = (id, data) => {
	return http.put(`/medicine/${id}`, data);
};

const updateMedicineStock = (id, data) => {
	return http.put(`/medicine/add-stock/${id}`, data);
};

const updateDecreaseMedicineStock = (id, data) => {
	return http.put(`/medicine/subtract-stock/${id}`, data);
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

// P.O Moduel
const getByTitleAndSupplier = (title, supplierId) => {
	return http.get(`/medicine/purchase-order`, {
		params: {
			title: title,
			supplierId: supplierId,
		},
	});
};

const getByCode = (code) => {
	return http.get(`/medicine/pos?code=${code}`);
};

const countMedicine = () => {
	return http.get("/medicine/count-all");
};

const MedicineService = {
	createMedicine,
	updateMedicine,
	updateMedicineStock,
	updateDecreaseMedicineStock,
	deleteMedicine,
	getAllMedicine,
	getByTitle,
	getByCode,
	getOtherModel,
	getByTitleAndSupplier,
	countMedicine,
};

export default MedicineService;
