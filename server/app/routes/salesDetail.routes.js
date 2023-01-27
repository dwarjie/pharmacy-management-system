// This module contains the routes for SalesDetail model
module.exports = (app) => {
	const salesDetail = require("../controllers/salesDetail.controller");
	var router = require("express").Router();

	router.post("/", salesDetail.create);
	router.get("/manage-sale", salesDetail.findSaleItems);
	router.get("/best-seller", salesDetail.findBestSellingProd);

	app.use("/api/sales-detail", router);
};
