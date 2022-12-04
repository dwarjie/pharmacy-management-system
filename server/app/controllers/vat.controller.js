// This module contains the vat controllers

const db = require("../models");
const VAT = db.vat;

// create a new vat
exports.create = (req, res) => {
	const vat = {
		VatName: req.body.VatName,
		VatAmount: req.body.VatAmount,
	};

	// check if vat already exists,
	// else create a new vat
	VAT.findOrCreate({
		where: { VatName: vat.VatName },
		defaults: { ...vat },
	})
		.then(([data, created]) => {
			console.log(created);
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
				message: err.message || `Error occurred creating vat`,
			});
		});
};

// Retrieve a single category
exports.findOne = (req, res) => {
	VAT.findByPk(1)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(400).send({
					message: `Cannot find vat`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error fetching vat ${id}`,
			});
		});
};

// Update a single category
exports.update = async (req, res) => {
	VAT.update(req.body, { where: { id: 1 } })
		.then((row) => {
			// check if affected row is equals to 1
			if (row == 1) {
				res.send({
					message: `Updated successfully`,
				});
			} else {
				res.send({
					message: `Cannot update category`,
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
						message: `Error updating category.`,
					});
					break;
			}
		});
};
// retrieve a vat
exports.findAll = (req, res) => {
	VAT.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving VAT",
			});
		});
};

// delete a vat
exports.delete = (req, res) => {
	const id = req.body.id;
	console.log(id);

	VAT.destroy({
		where: {
			id: id,
		},
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete vat ${id}`,
				});
			}

			res.send({
				message: `Deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting vat ${id}`,
			});
		});
};
