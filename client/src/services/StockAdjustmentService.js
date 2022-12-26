import http from "../http-common";

const createStockAdjustment = (data) => {
	return http.post("/stock-adjustment", data);
};

const getAllStockAdjustments = () => {
	return http.get("/stock-adjustment");
};

const StockAdjustmentService = {
	createStockAdjustment,
	getAllStockAdjustments,
};

export default StockAdjustmentService;
