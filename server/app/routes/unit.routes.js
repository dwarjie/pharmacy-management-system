// This module contains the routes for the unit model
module.exports = (app) => {
	const unit = require("../controllers/unit.controller");
	var router = require("express").Router();

	// create new unit
	router.post("/", unit.create);
	// retrieve all unit
	router.get("/", unit.findAll);
	// retrieve a single unit
	router.get("/:id", unit.findOne);
	// update a single unit
	router.put("/:id", unit.update);
	// delete a single unit
	router.delete("/", unit.delete);

	app.use("/api/unit", router);
};
