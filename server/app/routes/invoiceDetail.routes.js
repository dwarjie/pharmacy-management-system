// This module contains the routes for SalesDetail model
module.exports = (app) => {
	const invoiceDetail = require("../controllers/invoiceDetail.controller");
	var router = require("express").Router();

	router.post("/", invoiceDetail.create);
	router.get("/", invoiceDetail.findInvoiceItems);
	router.put("/:id", invoiceDetail.update);
	router.delete("/:id", invoiceDetail.deleteItem);
	router.delete("/invoice-item/:id", invoiceDetail.deleteInvoiceItem);

	app.use("/api/invoice-detail", router);
};
