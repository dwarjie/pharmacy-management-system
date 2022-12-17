// This module contains the routes for purchaseDetails model
module.exports = (app) => {
	const purchaseDetails = require("../controllers/purchaseDetail.controller");
	var router = require("express").Router();

	router.post("/", purchaseDetails.create);
	router.delete("/:id", purchaseDetails.delete);

	app.use("/api/purchase-detail", router);
};
