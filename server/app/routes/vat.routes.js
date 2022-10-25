// This module contains the routes for vat controllers
module.exports = (app) => {
	const vat = require("../controllers/vat.controller");
	var router = require("express").Router();

	router.post("/", vat.create);
	router.get("/", vat.findAll);
	router.delete("/:id", vat.delete);

	app.use("/api/vat", router);
};
