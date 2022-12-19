// This module contains the service methods for PurchaseDetial model
import http from "../http-common";

const createPurchaseDetails = (data) => {
	return http.post("/purchase-detail", data);
};

const getOrderList = (id) => {
	return http.get(`/purchase-detail/${id}`);
};

const updateItem = (id, data) => {
	return http.put(`/purchase-detail/${id}`, data);
};

const deletePurchaseItems = (id) => {
	return http.delete(`/purchase-detail/${id}`);
};

const PurchaseDetailService = {
	createPurchaseDetails,
	getOrderList,
	updateItem,
	deletePurchaseItems,
};

export default PurchaseDetailService;
