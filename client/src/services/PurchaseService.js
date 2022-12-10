// This module contains all the purchase services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const createPurchase = (data) => {
	return http.post(`/purchase`, data);
};

const getOnePurchase = () => {
	return http.get(`/purchase`);
};

const PurchaseService = {
	createPurchase,
	getOnePurchase,
};

export default PurchaseService;
