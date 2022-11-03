// This module contains the route for medicine
// and for other needed models
module.exports = (app) => {
	const medicine = require("../controllers/medicine.controller");
	var router = require("express").Router();

	router.get("/medicine-list", medicine.findAll);
	router.get("/", medicine.getOtherModel);
	router.post("/", medicine.create);

	app.use("/api/medicine", router);
};
