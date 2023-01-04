module.exports = (app) => {
	const recaptcha = require("../controllers/recaptcha.controller");
	var router = require("express").Router();

	router.post("/", recaptcha.verifyRecaptcha);

	app.use("/api/recaptcha", router);
};
