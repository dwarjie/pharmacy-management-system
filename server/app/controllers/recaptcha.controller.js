const axios = require("axios");
const SECRET_KEY = "6Lcx0s8jAAAAALqSUeaYdJRFs-ABM_8wBhDqzzv1";
exports.verifyRecaptcha = async (req, res) => {
	const token = req.body.token;

	try {
		await axios.post(
			`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`
		);

		if (res.status(200)) {
			res.send({
				success: true,
			});
		} else {
			res.send("Nope!");
		}
	} catch (err) {
		res.send({
			message: err.message,
		});
	}
};
