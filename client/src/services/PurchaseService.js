// This module contains all the purchase services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const createPurchase = (data) => {
	return http.post(`/purchase`, data);
};

const getOnePurchase = () => {
	return http.get(`/purchase`);
};
// const createSale = (data) => {
// 	return http.post("/sale/pos", data);
// };

// const getAllSales = () => {
// 	return http.get("/sale/manage-sale");
// };

// const getOneSale = (id) => {
// 	return http.get(`/sale/manage-sale/${id}`);
// };

const PurchaseService = {
	createPurchase,
	getOnePurchase,
};

export default PurchaseService;
