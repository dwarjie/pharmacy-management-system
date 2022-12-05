// this module contains the routes for purchase model
module.exports = (app) => {
	const purchase = require("../controllers/purchase.controller");
	var router = require("express").Router();

	router.post("/", purchase.create);
	router.get("/", purchase.findOne);

	app.use("/api/purchase", router);
};
