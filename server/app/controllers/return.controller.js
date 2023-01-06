const { Op } = require("sequelize");
const db = require("../models");
const Return = db.return;

exports.create = (req, res) => {
	const adjustment = {
		Quantity: req.body.Quantity,
		DateCreated: req.body.DateCreated,
		Total: req.body.Total,
		Reason: req.body.Reason,
		medicineId: req.body.medicineId,
		userId: req.body.userId,
	};

	Return.create(adjustment)
		.then((data) => {
			res.send({
				message: "Created Successfully.",
				data,
			});
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error creating return.`,
			});
		});
};

exports.findAll = (req, res) => {
	Return.findAll({ include: ["user", ["medicine"]] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving return.`,
			});
		});
};

exports.findAllByDate = (req, res) => {
	const dateFrom = req.body.from;
	const dateTo = req.body.to;

	Return.findAll({
		where: { DateCreated: { [Op.between]: [dateFrom, dateTo] } },
		include: ["medicine", "user"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving return.`,
			});
		});
};
