// This module contains the routes for the type model
module.exports = (app) => {
	const type = require("../controllers/type.controller");
	var router = require("express").Router();

	// create new type
	router.post("/", type.create);
	// retrieve all type
	router.get("/", type.findAll);
	// retrieve a single type
	router.get("/:id", type.findOne);
	// update a single type
	router.put("/:id", type.update);
	// delete a single type
	router.delete("/:id", type.delete);

	app.use("/api/type", router);
};
