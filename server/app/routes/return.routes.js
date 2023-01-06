module.exports = (app) => {
	const returnInfo = require("../controllers/return.controller");
	var router = require("express").Router();

	router.post("/", returnInfo.create);
	router.post("/date-range", returnInfo.findAllByDate);
	router.get("/", returnInfo.findAll);

	app.use("/api/returns", router);
};
