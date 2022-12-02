module.exports = (app) => {
	const { verifySignUp } = require("../middleware");
	const controller = require("../controllers/auth.controller");
	var router = require("express").Router();

	router.post(
		"/signup",
		[verifySignUp.checkDuplicateUsername],
		controller.signup
	);

	router.post("/signin", controller.signin);
	router.get("/", controller.findAll);
	router.get("/:id", controller.findOne);
	router.put("/:id", controller.update);
	router.delete("/", controller.delete);

	app.use("/api/auth/", router);
};
