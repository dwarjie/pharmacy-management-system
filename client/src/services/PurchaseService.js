// This module contains all the purchase services
// needed in order to requirest to the HTTP server
import http from "../http-common";

const createPurchase = (data) => {
	return http.post(`/purchase`, data);
};

const getAllPurchase = () => {
	return http.get(`/purchase/purchase-list`);
};

const getAllRecieved = () => {
	return http.get(`/purchase/recieved-list`);
};

const getOnePurchase = (id) => {
	return http.get(`/purchase/print/${id}`);
};

const updateStatus = (id, status) => {
	return http.put(`/purchase/status/${id}`, status);
};

const updatePurchase = (id, data) => {
	return http.put(`/purchase/${id}`, data);
};

const deletePurchase = (id) => {
	return http.delete(`/purchase/purchase-list/${id}`);
};

const PurchaseService = {
	createPurchase,
	getAllRecieved,
	getAllPurchase,
	getOnePurchase,
	updatePurchase,
	updateStatus,
	deletePurchase,
};

export default PurchaseService;
