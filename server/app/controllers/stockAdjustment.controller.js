const { Op } = require("sequelize");
const db = require("../models");
const StockAdjustment = db.stockAdjustment;

exports.create = (req, res) => {
	const adjustment = {
		Mode: req.body.Mode,
		Quantity: req.body.Quantity,
		DateCreated: req.body.DateCreated,
		Reason: req.body.Reason,
		medicineId: req.body.medicineId,
		userId: req.body.userId,
	};

	StockAdjustment.create(adjustment)
		.then((data) => {
			res.send({
				message: "Adjusted Successfully.",
				data,
			});
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error creating stock adjustment.`,
			});
		});
};

exports.findAll = (req, res) => {
	StockAdjustment.findAll({ include: ["user"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving stock adjustments.`,
			});
		});
};

exports.findAllByDate = (req, res) => {
	const dateFrom = req.body.from;
	const dateTo = req.body.to;

	StockAdjustment.findAll({
		where: { DateCreated: { [Op.between]: [dateFrom, dateTo] } },
		include: ["medicine", "user"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving stock adjustments.`,
			});
		});
};
