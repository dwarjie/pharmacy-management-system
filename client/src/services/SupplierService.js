// This module contains all the Manufacturer services
// that axios needed to request to the http

import http from "../http-common";

const createSupplier = (data) => {
	return http.post("/supplier", data);
};

const getSupplier = () => {
	return http.get("/supplier");
};

const updateSupplier = (id, data) => {
	return http.put(`/supplier/${id}`, data);
};

const deleteSupplier = (id) => {
	return http.delete(`/supplier/${id}`);
};

const SupplierService = {
	createSupplier,
	getSupplier,
	updateSupplier,
	deleteSupplier,
};

export default SupplierService;
