// This module contains the routes for OR model
module.exports = (app) => {
	const OR = require("../controllers/OR.controller");
	var router = require("express").Router();

	router.put("/", OR.update);
	router.get("/", OR.findOne);

	app.use("/api/or", router);
};
