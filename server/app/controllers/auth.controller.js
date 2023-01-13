// This module contains the authentication controllers
/*
 *find username of the request in database, if it exists
 *compare password with password in database using bcrypt, if it is correct
 *generate a token using jsonwebtoken
 *return user information & access Token
 */

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const RoleGroup = db.role;

const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// exports.signup = (req, res) => {
// 	// Save user into database
// 	User.create({
// 		FirstName: req.body.FirstName,
// 		LastName: req.body.LastName,
// 		UserName: req.body.UserName,
// 		Password: bcrypt.hashSync(req.body.Password, 8),
// 	})
// 		.then((user) => {
// 			if (req.body.roles) {
// 				Role.findAll({
// 					where: {
// 						RoleName: {
// 							[Op.or]: req.body.roles,
// 						},
// 					},
// 				}).then((roles) => {
// 					user.setRoles(roles).then(() => {
// 						res.send({
// 							message: `Registered successfully.`,
// 						});
// 					});
// 				});
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || `Error creating user.`,
// 			});
// 		});
// };

exports.signup = (req, res) => {
	// Save user into database
	User.create({
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		UserName: req.body.UserName,
		Password: bcrypt.hashSync(req.body.Password, 8),
		Role: req.body.Role,
		roleGroupId: req.body.roleGroupId,
	})
		.then((data) => {
			res.send({
				message: `Created successfully.`,
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error creating user.`,
			});
		});
};

exports.signin = (req, res) => {
	User.findOne({
		where: {
			UserName: req.body.UserName,
		},
	})
		.then((user) => {
			// user do not exist
			if (!user) {
				return res.send({
					message: `User not found.`,
				});
			}

			// check if inputed password is correct
			let passwordIsValid = bcrypt.compareSync(
				req.body.Password,
				user.Password
			);

			if (!passwordIsValid) {
				return res.send({
					accessToken: null,
					message: `Invalid password.`,
					userId: user.id,
					invalid: true,
				});
			}

			let token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400, // 24 hrs
			});

			console.log(user);
			if (user.roleGroupId) {
				RoleGroup.findByPk(user.roleGroupId).then((data) => {
					let roles = user.getDataValue("Role").split(";");
					res.send({
						id: user.id,
						FirstName: user.FirstName,
						LastName: user.LastName,
						UserName: user.UserName,
						roles: roles,
						roleGroup: data,
						accessToken: token,
						locked: user.isLock,
					});
				});
			}
			// let authorities = [];
			// user.getRoles().then((roles) => {
			// 	for (let i = 0; i < roles.length; i++) {
			// 		authorities.push(`ROLES_${roles[i].RoleName.toUpperCase()}`);
			// 	}

			// 	res.send({
			// 		id: user.id,
			// 		FirstName: user.FirstName,
			// 		LastName: user.LastName,
			// 		UserName: user.UserName,
			// 		roles: authorities,
			// 		accessToken: token,
			// 	});
			// });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error signing user.`,
			});
		});
};

exports.findAll = (req, res) => {
	User.findAll({ include: ["roleGroup"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving user`,
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	// Find the tutorial using id
	User.findOne({
		where: {
			id: id,
		},
	})
		.then((user) => {
			if (user) {
				let roles = user.getDataValue("Role").split(";");
				res.send({
					id: user.id,
					FirstName: user.FirstName,
					LastName: user.LastName,
					UserName: user.UserName,
					roles: roles,
				});
			} else {
				res.status(400).send({
					message: `Cannot find user.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error retrieving user.",
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	// let data = {
	// 	FirstName: req.body.FirstName,
	// 	LastName: req.body.LastName,
	// 	UserName: req.body.UserName,
	// 	Role: req.body.Role,
	// 	roleGroupId: req.body.roleGroupId,
	// 	isLock: req.body.isLock,
	// };

	User.update(req.body, { where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot update user ${id}.`,
				});
			} else {
				res.send({
					message: `Updated successfully.`,
				});
			}
		})
		.catch((err) => {
			switch (err.name) {
				case "SequelizeUniqueConstraintError":
					res.send({
						message: `Record already exists.`,
					});
					break;
				default:
					res.status(500).send({
						message: err.message || `Error updating user.`,
					});
					break;
			}
		});
};

exports.delete = (req, res) => {
	const id = req.query.userId;

	User.destroy({ where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete user.`,
				});
			} else {
				res.send({
					message: `Deleted successfully.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting user ${id}.`,
			});
		});
};
