// this module contains the routes for sales model
module.exports = (app) => {
	const roleGroup = require("../controllers/roleGroup.controller");
	var router = require("express").Router();

	router.post("/", roleGroup.create);
	router.get("/", roleGroup.findAll);
	router.put("/:id", roleGroup.update);
	router.delete("/:id", roleGroup.delete);

	app.use("/api/role-group", router);
};
