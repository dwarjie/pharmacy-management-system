// This module contains the routes for vat controllers
module.exports = (app) => {
	const vat = require("../controllers/vat.controller");
	var router = require("express").Router();

	router.post("/", vat.create);
	router.get("/", vat.findOne);
	router.put("/", vat.update);
	// router.get("/", vat.findAll);
	// router.put("/", vat.delete);

	app.use("/api/vat", router);
};
