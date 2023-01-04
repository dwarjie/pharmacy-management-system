const db = require("../models");
const Invoice = db.invoice;

exports.create = (req, res) => {
	const invoice = {
		InvoiceNo: req.body.InvoiceNo,
		ORNumber: req.body.ORNumber,
		InvoiceDate: req.body.InvoiceDate,
		DueDate: req.body.DueDate,
		VAT: req.body.VAT,
		GrossAmount: req.body.GrossAmount,
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

exports.update = (req, res) => {
	const id = req.params.id;

	Invoice.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is equals to 1
			if (row == 1) {
				res.send({
					message: `Updated successfully`,
				});
			} else {
				res.send({
					message: `Cannot update invoice`,
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
						message: `Error updating invoice.`,
					});
					break;
			}
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Invoice.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete invoice ${id}`,
				});
			}

			res.send({
				message: `Deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting invoice ${id}`,
			});
		});
};
