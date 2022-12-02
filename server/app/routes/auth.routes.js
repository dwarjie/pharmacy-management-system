module.exports = (app) => {
	const { verifySignUp } = require("../middleware");
	const controller = require("../controllers/auth.controller");
	var router = require("express").Router();

	router.post(
		"/signup",
		[verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
		controller.signup
	);

	router.post("/signin", controller.signin);
	router.get("/current_user", controller.currentUser);

	app.use("/api/auth/", router);
};
