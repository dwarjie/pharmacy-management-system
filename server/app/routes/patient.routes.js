// This module contains the routes for patient model
module.exports = (app) => {
	const patient = require("../controllers/patient.controller");
	var router = require("express").Router();

	router.get("/patient-list", patient.findAll);
	router.post("/", patient.create);
	router.put("/:id", patient.update);
	router.delete("/patient-list", patient.delete);

	app.use("/api/patient", router);
};
