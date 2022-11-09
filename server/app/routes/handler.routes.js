// This module container the routes for handlers
module.exports = (app) => {
	const handler = require("../controllers/handler.controller");
	var router = require("express").Router();

	router.post("/", handler.create);
	router.get("/handler-list", handler.findAll);
	router.put("/:id", handler.update);
	router.delete("/:id", handler.delete);

	app.use("/api/handler", router);
};
