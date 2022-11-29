// this module contains the routes for sales model
module.exports = (app) => {
	const sale = require("../controllers/sales.controller");
	var router = require("express").Router();

	router.post("/pos", sale.create);
	router.get("/manage-sale", sale.findAll);
	router.get("/manage-sale/:id", sale.findOne);

	app.use("/api/sale", router);
};
