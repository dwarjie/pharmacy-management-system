// This module contains all the OR services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const createSale = (data) => {
	return http.post("/sale/pos", data);
};

const SaleService = {
	createSale,
};

export default SaleService;
