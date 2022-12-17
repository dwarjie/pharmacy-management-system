// This module contains the service methods for PurchaseDetial model
import http from "../http-common";

const createPurchaseDetails = (data) => {
	return http.post("/purchase-detail", data);
};

const getPurchaseItems = (saleId) => {
	return http.get(`/sales-detail/manage-sale?saleId=${saleId}`);
};

const deletePurchaseItems = (id) => {
	return http.delete(`/purchase-detail/${id}`);
};

const PurchaseDetailService = {
	createPurchaseDetails,
	getPurchaseItems,
	deletePurchaseItems,
};

export default PurchaseDetailService;
