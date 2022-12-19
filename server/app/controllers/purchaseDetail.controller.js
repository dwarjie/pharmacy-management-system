const db = require("../models");
const PurchaseDetail = db.purchaseDetail;

exports.create = (req, res) => {
	const order = {
		Quantity: req.body.Quantity,
		Total: req.body.Total,
		ReceivedDate: req.body.ReceivedDate,
		medicineId: req.body.medicineId,
		purchaseId: req.body.purchaseId,
	};

	PurchaseDetail.create(order)
		.then((data) => {
			res.send({
				message: "Created successfully.",
				data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error creating purchase data",
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	PurchaseDetail.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is equals to 1
			if (row == 1) {
				res.send({
					message: `Updated successfully`,
				});
			} else {
				res.send({
					message: `Cannot update category`,
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
						message: `Error updating category.`,
					});
					break;
			}
		});
};

exports.findAll = (req, res) => {
	PurchaseDetail.findAll({ include: ["purchase", "medicine"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieving purchase details`,
			});
		});
};

exports.findAllOrder = (req, res) => {
	const id = req.params.id;

	PurchaseDetail.findAll({
		where: { purchaseId: id },
		include: ["purchase", "medicine"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error retrieving purchase items`,
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	PurchaseDetail.destroy({
		where: { purchaseId: id },
	})
		.then((row) => {
			if (row <= 0) {
				res.send({
					message: `Cannot delete purchase item ${id}`,
				});
			} else {
				res.send({
					message: `Deleted successfully`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting purchase item ${id}`,
			});
		});
};

exports.deleteItem = (req, res) => {
	const id = req.params.id;

	PurchaseDetail.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete purchase item ${id}`,
				});
			} else {
				res.send({
					message: `Deleted successfully`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting purchase item ${id}`,
			});
		});
};
