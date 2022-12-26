const db = require("../models");
const StockAdjustment = db.stockAdjustment;

exports.create = (req, res) => {
	const adjustment = {
		Mode: req.body.Mode,
		Quantity: req.body.Quantity,
		Reason: req.body.Reason,
		medicineId: req.body.medicineId,
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
	StockAdjustment.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving stock adjustments.`,
			});
		});
};
