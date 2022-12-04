// This module contains the services for VAT
// in order to requirest to the server
import http from "../http-common";

const createVAT = (data) => {
	return http.post("/vat", data);
};

const getAllVAT = () => {
	return http.get("/vat");
};

const updateVAT = (data) => {
	return http.put(`/vat`, data);
};

const VatService = {
	createVAT,
	getAllVAT,
	updateVAT,
};

export default VatService;
