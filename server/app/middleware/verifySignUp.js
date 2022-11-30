// This middleware wil verify if username is duplicate or not
// check if role exists

const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// check for duplicate username
const checkDuplicateUsername = (req, res, next) => {
	// Username
	User.findOne({
		where: {
			UserName: req.body.UserName,
		},
	}).then((user) => {
		if (user) {
			res.send({
				message: `Username already exists.`,
			});
			return;
		}

		next();
	});
};

// check if role exists
const checkRolesExisted = (req, res, next) => {
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLES.includes(req.body.roles[i])) {
				res.send({
					message: `Role does not exist = ${req.body.roles[i]}`,
				});
				return;
			}
		}
	}

	next();
};

const verifySignUp = {
	checkDuplicateUsername: checkDuplicateUsername,
	checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
