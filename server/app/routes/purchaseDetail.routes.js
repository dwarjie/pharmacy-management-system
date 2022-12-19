// This module contains the routes for purchaseDetails model
module.exports = (app) => {
	const purchaseDetails = require("../controllers/purchaseDetail.controller");
	var router = require("express").Router();

	router.post("/", purchaseDetails.create);
	router.get("/:id", purchaseDetails.findAllOrder);
	router.put("/:id", purchaseDetails.update);
	router.put("/upsert-item/:id", purchaseDetails.updateOrCreate);
	router.delete("/:id", purchaseDetails.delete);
	router.delete("/delete-item/:id", purchaseDetails.deleteItem);

	app.use("/api/purchase-detail", router);
};
