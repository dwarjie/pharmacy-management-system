// This module contains all the OR services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const createSale = (data) => {
	return http.post("/sale/pos", data);
};

const getAllSales = () => {
	return http.get("/sale/manage-sale");
};

const getOneSale = (id) => {
	return http.get(`/sale/manage-sale/${id}`);
};

const SaleService = {
	createSale,
	getAllSales,
	getOneSale,
};

export default SaleService;
