// This module contains the services for VAT
// in order to requirest to the server
import http from "../http-common";

const createVAT = (data) => {
	return http.post("/vat", data);
};

const getAllVAT = () => {
	return http.get("/vat");
};

const deleteVAT = (id) => {
	return http.delete(`/vat/${id}`);
};

const VatService = {
	createVAT,
	getAllVAT,
	deleteVAT,
};

export default VatService;
