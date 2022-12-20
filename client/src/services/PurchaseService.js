// This module contains all the purchase services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const createPurchase = (data) => {
	return http.post(`/purchase`, data);
};

const getAllPurchase = () => {
	return http.get(`/purchase/purchase-list`);
};

const getOnePurchase = (id) => {
	return http.get(`/purchase/${id}`);
};

const updatePurchase = (id, data) => {
	return http.put(`/purchase/${id}`, data);
};

const deletePurchase = (id) => {
	return http.delete(`/purchase/purchase-list/${id}`);
};

const PurchaseService = {
	createPurchase,
	getAllPurchase,
	getOnePurchase,
	updatePurchase,
	deletePurchase,
};

export default PurchaseService;
