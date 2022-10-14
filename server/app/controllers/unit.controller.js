// This module contains the unit controllers

const db = require("../models");
const Unit = db.unit;

// Create a new unit
exports.create = (req, res) => {
	// create a new unit
	const unit = {
		UnitName: req.body.UnitName,
	};

	// save the unit in the database
	Unit.create(unit)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the unit.",
			});
		});
};

//  Retrieve all unit
exports.findAll = (req, res) => {
	Unit.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while getting all unit.",
			});
		});
};

// Retrieve a single unit
exports.findOne = (req, res) => {
	const id = req.params.id;

	Unit.findByPk(id)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Cannot find unit ${id}`,
				});
			}

			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error fetching unit ${id}`,
			});
		});
};

// Update a single unit
exports.update = (req, res) => {
	const id = req.params.id;

	Unit.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is not equals to 1
			if (row != 1) {
				res.send({
					message: `Cannot update unit ${id}`,
				});
			}

			res.send({
				message: `Unit was updated successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error updating unit ${id}`,
			});
		});
};

// Delete a unit
exports.delete = (req, res) => {
	const id = req.params.id;

	Unit.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete unit ${id}`,
				});
			}

			res.send({
				message: `Unit was deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting unit ${id}`,
			});
		});
};
