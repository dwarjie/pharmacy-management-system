// this module contains the routes for category model
module.exports = (app) => {
	const category = require("../controllers/category.controller");

	var router = require("express").Router();

	// creates new tutorial
	router.post("/", category.create);
	// retrieves category
	router.get("/", category.findAll);
	// retrieve one category
	router.post("/sub-category", category.findOne);
	// update category
	router.put("/:id", category.update);
	// delete category
	router.delete("/:id", category.delete);

	app.use("/api/category", router);
};
