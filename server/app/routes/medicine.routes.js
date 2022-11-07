// This module contains the route for medicine
// and for other needed models
module.exports = (app) => {
	const medicine = require("../controllers/medicine.controller");
	const category = require("../controllers/category.controller");
	var router = require("express").Router();

	router.get("/medicine-list", medicine.findAll);
	router.get("/", medicine.getOtherModel);
	router.post("/", medicine.create);

	// retrieve category for updating medicine
	router.put("/:id", category.findOne);

	app.use("/api/medicine", router);
};
