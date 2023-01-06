module.exports = (app) => {
	const invoice = require("../controllers/invoice.controller");
	var router = require("express").Router();

	router.post("/", invoice.create);
	router.get("/", invoice.findAll);
	router.get("/:id", invoice.findOne);
	router.put("/:id", invoice.update);
	router.delete("/:id", invoice.delete);
	router.post("/date-range", invoice.findAllByDate);

	app.use("/api/invoice", router);
};
