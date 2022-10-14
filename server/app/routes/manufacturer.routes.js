// this module container all the routes for manufacturer model
module.exports = (app) => {
	const manufacturer = require("../controllers/manufacturer.controller");
	var router = require("express").Router();

	// Create a new manufacturer
	router.post("/", manufacturer.create);
	// Retrieve all manufacturer
	router.get("/", manufacturer.findAll);
	// Retrieve a single manufacturer
	router.get("/:id", manufacturer.findOne);
	// update a single manufacturer
	router.put("/:id", manufacturer.update);
	// delete a single manufacturer
	router.delete("/:id", manufacturer.delete);

	app.use("/api/manufacturer", router);
};
