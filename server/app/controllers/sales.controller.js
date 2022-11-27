// This module contains the controllers for sales model
const db = require("../models");
const Sales = db.sales;

exports.create = (req, res) => {
	const sale = {
		OrderNo: req.body.OrderNo,
		ORNumber: req.body.ORNumber,
		OrderDate: req.body.OrderDate,
		CustomerName: req.body.CustomerName,
		Discount: req.body.Discount,
		VAT: req.body.VAT,
		Total: req.body.Total,
	};

	Sales.create(sale)
		.then((data) => {
			res.send({
				message: `Created successfully`,
				data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error creating sales`,
			});
		});
};
