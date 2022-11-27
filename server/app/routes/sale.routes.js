// this module contains the routes for sales model
module.exports = (app) => {
	const sale = require("../controllers/sales.controller");
	var router = require("express").Router();

	router.post("/pos", sale.create);

	app.use("/api/sale", router);
};
