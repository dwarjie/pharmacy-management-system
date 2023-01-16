// This module contains the handlers controller
const db = require("../models");
const Handler = db.handler;
const { Sequelize } = require("../models");
const { QueryTypes } = db.Sequelize;
const Op = db.Sequelize.Op;

// Create new handler
exports.create = (req, res) => {
	const handler = {
		Category: req.body.Category,
		FirstName: req.body.FirstName.replace(/\s+/g, " ").trim(),
		LastName: req.body.LastName.replace(/\s+/g, " ").trim(),
		Sex: req.body.Sex,
		City: req.body.City.replace(/\s+/g, " ").trim(),
		ZIP: req.body.ZIP.replace(/\s+/g, " ").trim(),
		Address: req.body.Address.replace(/\s+/g, " ").trim(),
		Mobile: req.body.Mobile.replace(/\s+/g, " ").trim(),
		Email: req.body.Email,
		CreditLimit: req.body.CreditLimit,
		Balance: req.body.Balance,
		OnHold: req.body.OnHold,
	};

	// check if handler already exists
	// else create new handler
	Handler.findOrCreate({
		where: { FirstName: handler.FirstName, LastName: handler.LastName },
		defaults: { ...handler },
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
			switch (err.name) {
				case "SequelizeUniqueConstraintError":
					res.send({
						message: `Record already exists.`,
					});
					break;
				default:
					res.status(500).send({
						message: `Error creating handler.`,
					});
					break;
			}
		});
};

// Retrieve all handlers
exports.findAll = (req, res) => {
	Handler.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Some error occurred while retrieving handlers`,
			});
		});
};

// update handler
exports.update = (req, res) => {
	const id = req.params.id;

	const handler = {
		Category: req.body.Category,
		FirstName: req.body.FirstName.replace(/\s+/g, " ").trim(),
		LastName: req.body.LastName.replace(/\s+/g, " ").trim(),
		Sex: req.body.Sex,
		City: req.body.City.replace(/\s+/g, " ").trim(),
		ZIP: req.body.ZIP.replace(/\s+/g, " ").trim(),
		Address: req.body.Address.replace(/\s+/g, " ").trim(),
		Mobile: req.body.Mobile.replace(/\s+/g, " ").trim(),
		Email: req.body.Email,
		CreditLimit: req.body.CreditLimit,
		Balance: req.body.Balance,
		OnHold: req.body.OnHold,
	};

	Handler.update(handler, { where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot update handler ${id}`,
				});
			}

			res.send({
				message: `Updated successfully.`,
				data: row,
			});
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
						message: `Error updating handler.`,
					});
					break;
			}
		});
};

// delete handler
exports.delete = (req, res) => {
	const id = req.query.handlerId;

	Handler.destroy({ where: { id: id } })
		.then((row) => {
			if (row !== 1) {
				res.send({
					message: `Cannot delete handler ${id}`,
				});
			}

			res.send({
				message: `Deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting handler ${id}`,
			});
		});
};

// increment product on stock quantity
exports.increaseBalance = async (req, res) => {
	const amount = req.body.amount;
	const id = req.params.id;

	try {
		let result = await db.sequelize.query(
			`UPDATE handlers SET Balance = Balance + ${amount} WHERE id = ${id}`,
			{
				type: Sequelize.UPDATE,
			}
		);
		res.send(result);
	} catch (err) {
		res.status(500).send({
			message: err.message || `Error incrementing balance.`,
		});
	}
};

// increment product on stock quantity
exports.decreaseBalance = async (req, res) => {
	const amount = req.body.amount;
	const id = req.params.id;

	try {
		let result = await db.sequelize.query(
			`UPDATE handlers SET Balance = Balance - ${amount} WHERE id = ${id}`,
			{
				type: Sequelize.UPDATE,
			}
		);
		res.send(result);
	} catch (err) {
		res.status(500).send({
			message: err.message || `Error decrementing balance.`,
		});
	}
};