// This module contains the controller for sales detail model
const db = require("../models");
const SalesDetail = db.salesDetail;

exports.create = (req, res) => {
	const product = {
		UnitPrice: req.body.UnitPrice,
		Quantity: req.body.Quantity,
		DiscountedPrice: req.body.DiscountedPrice,
		Total: req.body.Total,
		medicineId: req.body.medicineId,
		saleId: req.body.saleId,
	};

	SalesDetail.create(product)
		.then((data) => {
			res.send({
				message: "Created successfully.",
				data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error creating sales data",
			});
		});
};

exports.findAll = (req, res) => {
	SalesDetail.findAll({ include: ["sales", "medicine"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieving sales details`,
			});
		});
};

exports.findSaleItems = (req, res) => {
	const saleId = req.query.saleId;

	SalesDetail.findAll({
		include: ["medicine"],
		where: { saleId: saleId },
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error retrieving sales details`,
			});
		});
};
