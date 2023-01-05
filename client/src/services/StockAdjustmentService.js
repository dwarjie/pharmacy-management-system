import http from "../http-common";

const createStockAdjustment = (data) => {
	return http.post("/stock-adjustment", data);
};

const getAllStockAdjustments = () => {
	return http.get("/stock-adjustment");
};

const getAllByDate = (dateObj) => {
	return http.post(`/stock-adjustment/date-range`, dateObj);
};

const StockAdjustmentService = {
	createStockAdjustment,
	getAllStockAdjustments,
	getAllByDate,
};

export default StockAdjustmentService;
