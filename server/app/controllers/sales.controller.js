// This module contains the controllers for sales model
const db = require("../models");
const { Op } = require("sequelize");
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
		GrossAmount: req.body.GrossAmount,
		CashTendered: req.body.CashTendered,
		ChangeAmount: req.body.ChangeAmount,
		userId: req.body.userId,
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

exports.findAll = (req, res) => {
	Sales.findAll({ include: ["user"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error retrieving all sales`,
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Sales.findByPk(id, { include: ["user"] })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(400).send({
					message: `Cannot find sales ${id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error fetching sales ${id}`,
			});
		});
};

exports.findAllByDate = (req, res) => {
	const dateFrom = req.body.from;
	const dateTo = req.body.to;

	Sales.findAll({
		include: ["user"],
		where: { OrderDate: { [Op.between]: [dateFrom, dateTo] } },
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving sales record.`,
			});
		});
};
