// this module container the controller for the type model

const db = require("../models");
const Type = db.type;

// Create a new type
exports.create = (req, res) => {
	// create a new type
	const type = {
		TypeName: req.body.TypeName,
	};

	// save the type in the database
	Type.create(type)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the type.",
			});
		});
};

//  Retrieve all type
exports.findAll = (req, res) => {
	Type.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while getting all type.",
			});
		});
};

// Retrieve a single type
exports.findOne = (req, res) => {
	const id = req.params.id;

	Type.findByPk(id)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Cannot find type ${id}`,
				});
			}

			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error fetching type ${id}`,
			});
		});
};

// Update a single type
exports.update = (req, res) => {
	const id = req.params.id;

	Type.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is not equals to 1
			if (row != 1) {
				res.send({
					message: `Cannot update type ${id}`,
				});
			}

			res.send({
				message: `type was updated successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error updating type ${id}`,
			});
		});
};

// Delete a type
exports.delete = (req, res) => {
	const id = req.params.id;

	Unit.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete type ${id}`,
				});
			}

			res.send({
				message: `Type was deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting type ${id}`,
			});
		});
};
