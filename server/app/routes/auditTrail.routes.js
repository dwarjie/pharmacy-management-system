module.exports = (app) => {
	const auditTrail = require("../controllers/auditTrail.controller");
	var router = require("express").Router();

	// creates new tutorial
	router.post("/", auditTrail.create);
	router.get("/", auditTrail.findAll);
	router.post("/date-range", auditTrail.findAllByDate);

	app.use("/api/audit-trail", router);
};
