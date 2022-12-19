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

const upsertItems = (id, data) => {
	return http.put(`/purchase-detail/upsert-item/${id}`, data);
};

const deleteItem = (id) => {
	return http.delete(`/purchase-detail/delete-item/${id}`);
};

const deletePurchaseItems = (id) => {
	return http.delete(`/purchase-detail/${id}`);
};

const PurchaseDetailService = {
	createPurchaseDetails,
	getOrderList,
	updateItem,
	upsertItems,
	deletePurchaseItems,
	deleteItem,
};

export default PurchaseDetailService;
