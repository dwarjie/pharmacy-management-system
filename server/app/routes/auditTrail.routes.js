module.exports = (app) => {
	const auditTrail = require("../controllers/auditTrail.controller");
	var router = require("express").Router();

	// creates new tutorial
	router.post("/", auditTrail.create);
	router.get("/", auditTrail.findAll);

	app.use("/api/audit-trail", router);
};
