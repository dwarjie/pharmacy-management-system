module.exports = (app) => {
	const invoice = require("../controllers/invoice.controller");
	var router = require("express").Router();

	router.post("/", invoice.create);
	router.get("/", invoice.findAll);
	router.get("/:id", invoice.findOne);

	app.use("/api/invoice", router);
};
