// This module contains all the Manufacturer services
// that axios needed to request to the http

import http from "../http-common";

const createManufacturer = (data) => {
	return http.post("/manufacturer", data);
};

const getManufacturer = () => {
	return http.get("/manufacturer");
};

const updateManufacturer = (id, data) => {
	return http.put(`/manufacturer/${id}`, data);
};

const deleteManufacturer = (id) => {
	return http.delete(`/manufacturer/${id}`);
};

const ManufacturerService = {
	createManufacturer,
	getManufacturer,
	updateManufacturer,
	deleteManufacturer,
};

export default ManufacturerService;
