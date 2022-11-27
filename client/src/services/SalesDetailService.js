// This module contains the service methods for SalesDetail model
import http from "../http-common";

const createSalesDetails = (data) => {
	return http.post("/sales-detail", data);
};

const SalesDetailService = {
	createSalesDetails,
};

export default SalesDetailService;
