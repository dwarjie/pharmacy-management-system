// This module contains the vat controllers

const db = require("../models");
const VAT = db.vat;

// create a new vat
exports.create = (req, res) => {
	const vat = {
		VatName: req.body.VatName,
		VatAmount: req.body.VatAmount,
	};

	VAT.create(vat)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error occurred creating vat`,
			});
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
	const id = req.params.id;

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
				message: `VAT was deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting vat ${id}`,
			});
		});
};
