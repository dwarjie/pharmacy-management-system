// This module contains the route for medicine
// and for other needed models
module.exports = (app) => {
	const medicine = require("../controllers/medicine.controller");
	const category = require("../controllers/category.controller");
	var router = require("express").Router();

	router.post("/", medicine.create);
	router.put("/:id", medicine.update);
	router.get("/medicine-list", medicine.findAll);
	router.get("/", medicine.getOtherModel);
	router.delete("/medicine-list", medicine.delete);

	// retrieve medicine using product code
	router.get("/pos", medicine.findProductCode);
	// retrieve medicine for Purchase Order
	router.get("/purchase-order", medicine.findByTitleSupplier);
	// retrieve category for updating medicine
	router.get("/:id", category.findOne);

	app.use("/api/medicine", router);
};
