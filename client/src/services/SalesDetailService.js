// This module contains the service methods for SalesDetail model
import http from "../http-common";

const createSalesDetails = (data) => {
	return http.post("/sales-detail", data);
};

const getSaleItems = (saleId) => {
	return http.get(`/sales-detail/manage-sale?saleId=${saleId}`);
};

const getBestSellingProducts = () => {
	return http.get(`/sales-detail/best-seller`);
};

const SalesDetailService = {
	createSalesDetails,
	getSaleItems,
	getBestSellingProducts,
};

export default SalesDetailService;
