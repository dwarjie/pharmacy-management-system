// this module container all the routes for supplier model
module.exports = (app) => {
	const supplier = require("../controllers/supplier.controller");
	var router = require("express").Router();

	// Create a new supplier
	router.post("/", supplier.create);
	// Retrieve all supplier
	router.get("/", supplier.findAll);
	// Retrieve a single supplier
	router.get("/:id", supplier.findOne);
	// update a single supplier
	router.put("/:id", supplier.update);
	// delete a single supplier
	router.delete("/:id", supplier.delete);

	app.use("/api/supplier", router);
};
