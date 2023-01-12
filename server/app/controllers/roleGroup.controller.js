const { Op } = require("sequelize");
const db = require("../models");
const RoleGroup = db.role;

exports.create = (req, res) => {
	let data = {
		RoleName: req.body.RoleName.replace(/\s+/g, " ").trim(),
		Role: req.body.Role,
	};

	RoleGroup.findOrCreate({
		where: { RoleName: data.RoleName },
		defaults: { ...data },
	})
		.then(([data, created]) => {
			if (created) {
				res.send({
					message: `Created successfully.`,
					data,
				});
			} else {
				res.send({
					message: `Record already exists.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the role group.",
			});
		});
};

exports.findAll = (req, res) => {
	RoleGroup.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving role groups.`,
			});
		});
};

exports.update = async (req, res) => {
	const id = req.params.id;

	let data = {
		RoleName: req.body.RoleName.replace(/\s+/g, " ").trim(),
		Role: req.body.Role,
	};

	RoleGroup.update(data, { where: { id: id } })
		.then((row) => {
			// check if affected row is equals to 1
			if (row == 1) {
				res.send({
					message: `Updated successfully`,
				});
			} else {
				res.send({
					message: `Cannot update role group`,
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
						message: `Error updating role group.`,
					});
					break;
			}
		});
};

exports.delete = (req, res) => {
	const id = req.query.id;

	RoleGroup.destroy({ where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete role group.`,
				});
			} else {
				res.send({
					message: `Deleted successfully.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting role group ${id}.`,
			});
		});
};
