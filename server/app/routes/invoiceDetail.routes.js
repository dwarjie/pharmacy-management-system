// This module contains the routes for SalesDetail model
module.exports = (app) => {
	const invoiceDetail = require("../controllers/invoiceDetail.controller");
	var router = require("express").Router();

	router.post("/", invoiceDetail.create);
	router.get("/", invoiceDetail.findInvoiceItems);

	app.use("/api/invoice-detail", router);
};
