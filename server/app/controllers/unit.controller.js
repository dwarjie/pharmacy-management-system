// This module contains the unit controllers

const db = require("../models");
const Unit = db.unit;
const duplicate = require("../util/CheckDuplicate");

// Create a new unit
exports.create = (req, res) => {
	// create a new unit
	const unit = {
		UnitName: req.body.UnitName.replace(/\s+/g, " ").trim(),
	};

	// check if unit already
	// else create a new unit
	Unit.findOrCreate({
		where: { ...unit },
		defaults: { ...unit },
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
exports.update = async (req, res) => {
	const id = req.params.id;

	const unit = {
		UnitName: req.body.UnitName.replace(/\s+/g, " ").trim(),
	};

	Unit.update(unit, { where: { id: id } })
		.then((row) => {
			// check if affected row is not equals to 1
			if (row == 1) {
				res.send({
					message: `Updated successfully.`,
				});
			} else {
				res.send({
					message: `Cannot update unit.`,
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
						message: `Error updating unit of measure.`,
					});
					break;
			}
		});
	// let row = 0;

	// // check if unit already exists before updating
	// try {
	// 	row = await duplicate.checkDuplicate(
	// 		"units",
	// 		"UnitName",
	// 		req.body.UnitName
	// 	);
	// } catch (err) {
	// 	console.log(err);
	// }

	// // if row == 0, unit does not exists yet
	// if (row[0][0].count == 0) {
	// 	Unit.update(req.body, { where: { id: id } })
	// 		.then((row) => {
	// 			// check if affected row is not equals to 1
	// 			if (row == 1) {
	// 				res.send({
	// 					message: `Updated successfully.`,
	// 				});
	// 			} else {
	// 				res.send({
	// 					message: `Cannot update unit.`,
	// 				});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			res.status(500).send({
	// 				message: `Error updating unit ${id}`,
	// 			});
	// 		});
	// } else {
	// 	res.send({
	// 		message: `Record already exists.`,
	// 	});
	// }
};

// Delete a unit
exports.delete = (req, res) => {
	const id = req.query.unitId;

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
				message: `Deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting unit ${id}`,
			});
		});
};
