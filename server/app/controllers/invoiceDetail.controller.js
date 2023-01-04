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

exports.update = (req, res) => {
	const id = req.params.id;

	InvoiceDetail.update(req.body, { where: { id: id } })
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
			res.status(500).send({
				message: err.message || `Error updating invoice.`,
			});
		});
};

exports.deleteInvoiceItem = (req, res) => {
	const id = req.params.id;

	InvoiceDetail.destroy({
		where: { invoiceId: id },
	})
		.then((row) => {
			if (row <= 0) {
				res.send({
					message: `Cannot delete invoice item ${id}`,
				});
			} else {
				res.send({
					message: `Deleted successfully`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting invoice item ${id}`,
			});
		});
};

exports.deleteItem = (req, res) => {
	const id = req.params.id;

	InvoiceDetail.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete item ${id}`,
				});
			} else {
				res.send({
					message: `Deleted successfully`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting item ${id}`,
			});
		});
};
