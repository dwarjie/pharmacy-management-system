// This module contains the routes for discount
module.exports = (app) => {
	const discount = require("../controllers/discount.controller");
	var router = require("express").Router();

	router.post("/", discount.create);
	router.get("/", discount.findAll);
	router.put("/:id", discount.update);
	router.delete("/:id", discount.delete);

	app.use("/api/discount", router);
};
