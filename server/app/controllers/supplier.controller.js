// This module contains the supplier controller

const db = require("../models");
const Supplier = db.supplier;

// Create a new Supplier
exports.create = (req, res) => {
	// create a new Supplier
	const supplier = {
		SupplierName: req.body.SupplierName.replace(/\s+/g, " ").trim(),
		Address: req.body.Address.replace(/\s+/g, " ").trim(),
		Mobile: req.body.Mobile,
		Phone: req.body.Phone,
		Email: req.body.Email.replace(/\s+/g, " ").trim(),
	};

	// !check if supplier already exists
	// !if not, create a new supplier
	Supplier.findOrCreate({
		where: { SupplierName: supplier.SupplierName },
		defaults: { ...supplier },
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
						message: `Supplier email already exist.`,
					});
					break;
				default:
					res.status(500).send({
						message: `Error creating supplier.`,
					});
					break;
			}
		});
};

// Retrieve all Supplier
exports.findAll = (req, res) => {
	Supplier.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Some error occurred while retrieving supplier`,
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Supplier.findByPk(id)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Cannot find supplier ${id}`,
				});
			}

			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error fetching supplier ${id}`,
			});
		});
};

// Update a single supplier
exports.update = (req, res) => {
	const id = req.params.id;

	const supplier = {
		SupplierName: req.body.SupplierName.replace(/\s+/g, " ").trim(),
		Address: req.body.Address.replace(/\s+/g, " ").trim(),
		Mobile: req.body.Mobile,
		Phone: req.body.Phone,
		Email: req.body.Email.replace(/\s+/g, " ").trim(),
	};

	Supplier.update(supplier, { where: { id: id } })
		.then((row) => {
			// check if affected row is not equals to 1
			if (row != 1) {
				res.send({
					message: `Cannot update supplier ${id}`,
				});
			}

			res.send({
				message: `Updated successfully`,
			});
		})
		.catch((err) => {
			switch (err.name) {
				case "SequelizeUniqueConstraintError":
					res.send({
						message: `Record already exist.`,
					});
					break;
				default:
					res.status(500).send({
						message: `Error updating supplier.`,
					});
					break;
			}
		});
};

// Delete a supplier
exports.delete = (req, res) => {
	const id = req.query.supplierId;

	Supplier.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete supplier ${id}`,
				});
			}

			res.send({
				message: `Deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting supplier ${id}`,
			});
		});
};
