// This module contains the handlers controller
const db = require("../models");
const Handler = db.handler;

// Create new handler
exports.create = (req, res) => {
	const handler = {
		Category: req.body.Category,
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Sex: req.body.Sex,
		City: req.body.City,
		ZIP: req.body.ZIP,
		Address: req.body.Address,
		Mobile: req.body.Mobile,
		Email: req.body.Email,
	};

	Handler.create(handler)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Some error occurred while creating handler`,
			});
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

	Handler.update(req.body, { where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot update handler ${id}`,
				});
			}

			res.send({
				message: `Handler successfully updated`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error updating handler ${id}`,
			});
		});
};

// delete handler
exports.delete = (req, res) => {
	const id = req.params.id;

	Handler.destroy({ where: { id: id } })
		.then((row) => {
			if (row !== 1) {
				res.send({
					message: `Cannot delet handler ${id}`,
				});
			}

			res.send({
				message: `Handler successfully deleted`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting handler ${id}`,
			});
		});
};
