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
	router.put("/medicine-list", medicine.delete);

	// retrieve category for updating medicine
	router.get("/:id", category.findOne);

	app.use("/api/medicine", router);
};
