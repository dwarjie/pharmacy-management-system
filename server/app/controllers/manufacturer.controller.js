// This module contains the manufacturer controller

const db = require("../models");
const Manufacturer = db.manufacturer;

// Create a new Manufacturer
exports.create = (req, res) => {
	// create a new Manufacturer
	const manufacturer = {
		ManufacturerName: req.body.ManufacturerName,
		Address: req.body.Address,
		Mobile: req.body.Mobile,
		Phone: req.body.Phone,
		Email: req.body.Email,
	};

	// save the manufacturer to the database
	Manufacturer.create(manufacturer)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Some error occurred while creating the Manufacturer`,
			});
		});
};

// Retrieve all Manufacturer
exports.findAll = (req, res) => {
	Manufacturer.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Some error occurred while retrieving manufacturer`,
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Manufacturer.findByPk(id)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Cannot find manufacturer ${id}`,
				});
			}

			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error fetching manufacturer ${id}`,
			});
		});
};

// Update a single manufacturer
exports.update = (req, res) => {
	const id = req.params.id;

	Manufacturer.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is not equals to 1
			if (row != 1) {
				res.send({
					message: `Cannot update manufacturer ${id}`,
				});
			}

			res.send({
				message: `Manufacturer was updated successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error updating category ${id}`,
			});
		});
};

// Delete a manufacturer
exports.delete = (req, res) => {
	const id = req.params.id;

	Manufacturer.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete manufacturer ${id}`,
				});
			}

			res.send({
				message: `Manufacturer was deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting manufacturer ${id}`,
			});
		});
};
