// this module contains the routes for purchase model
module.exports = (app) => {
	const purchase = require("../controllers/purchase.controller");
	var router = require("express").Router();

	router.post("/", purchase.create);
	router.get("/print/:id", purchase.findOne);
	router.get("/purchase-list", purchase.findAll);
	router.get("/recieved-list", purchase.findAllDeliver);
	router.put("/:id", purchase.update);
	router.put("/status/:id", purchase.updateStatus);
	router.delete("/purchase-list/:id", purchase.delete);

	app.use("/api/purchase", router);
};
