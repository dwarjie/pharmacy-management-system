// This module contains all the OR services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const createSale = (data) => {
	return http.post("/sale/pos", data);
};

const getAllSales = () => {
	return http.get("/sale/manage-sale");
};

const getAllByDate = (dateObj) => {
	return http.post(`/sale/date-range`, dateObj);
};

const getOneSale = (id) => {
	return http.get(`/sale/manage-sale/${id}`);
};

const SaleService = {
	createSale,
	getAllByDate,
	getAllSales,
	getOneSale,
};

export default SaleService;
