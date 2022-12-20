// this module contains the routes for purchase model
module.exports = (app) => {
	const purchase = require("../controllers/purchase.controller");
	var router = require("express").Router();

	router.post("/", purchase.create);
	router.get("/:id", purchase.findOne);
	router.get("/purchase-list", purchase.findAll);
	router.put("/:id", purchase.update);
	router.delete("/purchase-list/:id", purchase.delete);

	app.use("/api/purchase", router);
};
