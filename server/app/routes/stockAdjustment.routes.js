module.exports = (app) => {
	const stockAdjustment = require("../controllers/stockAdjustment.controller");
	var router = require("express").Router();

	router.post("/", stockAdjustment.create);
	router.get("/", stockAdjustment.findAll);

	app.use("/api/stock-adjustment", router);
};
