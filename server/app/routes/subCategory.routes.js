// This module contains the route for sub category
module.exports = (app) => {
	const subCategory = require("../controllers/subCategory.controller");
	var router = require("express").Router();

	// create new sub category
	router.post("/", subCategory.create);
	// update sub category
	router.put("/:id", subCategory.update);
	// delete sub category
	router.delete("/", subCategory.delete);

	app.use("/api/sub-category", router);
};
