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

const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
	// Save user into database
	User.create({
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		UserName: req.body.UserName,
		Password: bcrypt.hashSync(req.body.Password, 8),
	})
		.then((user) => {
			if (req.body.roles) {
				Role.findAll({
					where: {
						RoleName: {
							[Op.or]: req.body.roles,
						},
					},
				}).then((roles) => {
					user.setRoles(roles).then(() => {
						res.send({
							message: `Registered successfully.`,
						});
					});
				});
			}
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
				});
			}

			let token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400, // 24 hrs
			});

			let authorities = [];
			user.getRoles().then((roles) => {
				for (let i = 0; i < roles.length; i++) {
					authorities.push(`ROLES_${roles[i].RoleName.toUpperCase()}`);
				}
				res.send({
					id: user.id,
					UserName: user.UserName,
					roles: authorities,
					accessToken: token,
				});
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error signing user.`,
			});
		});
};
