const db = require("../models");
const { QueryTypes, Op } = db.Sequelize;
const AuditTrail = db.auditTrail;

exports.create = (req, res) => {
	let data = {
		Summary: req.body.Summary,
		Action: req.body.Action,
		AuditDate: req.body.AuditDate,
		userId: req.body.userId,
	};

	AuditTrail.create(data)
		.then((data) => {
			res.send({
				message: "Created successfully.",
				data,
			});
		})
		.catch((err) => {
			res.send({
				message: err.message || "Error creating audit trail.",
			});
		});
};

exports.findAll = (req, res) => {
	AuditTrail.findAll({ include: ["user"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || "Error fetching audit trails.",
			});
		});
};

exports.findAllByDate = (req, res) => {
	const dateFrom = req.body.from;
	const dateTo = req.body.to;

	AuditTrail.findAll({
		where: {
			AuditDate: { [Op.between]: [dateFrom, dateTo] },
		},
		include: ["user"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error retrieving audit trails.`,
			});
		});
};
