const db = require("../models");
const Invoice = db.invoice;

exports.create = (req, res) => {
	const invoice = {
		InvoiceNo: req.body.InvoiceNo,
		ORNumber: req.body.ORNumber,
		InvoiceDate: req.body.InvoiceDate,
		DueDate: req.body.DueDate,
		VAT: req.body.VAT,
		Total: req.body.Total,
		PaidAmount: req.body.PaidAmount,
		Remarks: req.body.Remarks,
		handlerId: req.body.handlerId,
		userId: req.body.userId,
		patientId: req.body.patientId,
	};

	Invoice.create(invoice)
		.then((data) => {
			res.send({
				message: `Created successfully`,
				data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error creating invoice`,
			});
		});
};

exports.findAll = (req, res) => {
	Invoice.findAll({ include: ["patient", "handler", "user"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error retrieving all invoice`,
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Invoice.findByPk(id, { include: ["patient", "handler", "user"] })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(400).send({
					message: `Cannot find invoice ${id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error fetching invoice ${id}`,
			});
		});
};
