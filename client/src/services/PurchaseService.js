// This module contains all the purchase services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const createPurchase = (data) => {
	return http.post(`/purchase`, data);
};

const getAllPurchase = () => {
	return http.get(`/purchase/purchase-list`);
};

const getOnePurchase = () => {
	return http.get(`/purchase`);
};

const deletePurchase = (id) => {
	return http.delete(`/purchase/purchase-list/${id}`);
};

const PurchaseService = {
	createPurchase,
	getAllPurchase,
	getOnePurchase,
	deletePurchase,
};

export default PurchaseService;
