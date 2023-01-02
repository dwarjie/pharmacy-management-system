const db = require("../models");
const InvoiceDetail = db.invoiceDetail;

exports.create = (req, res) => {
	const product = {
		UnitPrice: req.body.UnitPrice,
		Quantity: req.body.Quantity,
		Total: req.body.Total,
		medicineId: req.body.medicineId,
		invoiceId: req.body.invoiceId,
	};

	InvoiceDetail.create(product)
		.then((data) => {
			res.send({
				message: "Created successfully.",
				data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error creating invoice data",
			});
		});
};

exports.findInvoiceItems = (req, res) => {
	const invoiceId = req.query.invoiceId;

	InvoiceDetail.findAll({
		include: ["medicine"],
		where: { invoiceId: invoiceId },
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error retrieving invoice details`,
			});
		});
};
