const { Op } = require("sequelize");
const db = require("../models");
const Purchase = db.purchase;

exports.create = (req, res) => {
	const purchase = {
		POCode: req.body.POCode,
		OrderDate: req.body.OrderDate,
		ItemQty: req.body.ItemQty,
		ReceivedQty: req.body.ReceivedQty,
		Total: req.body.Total,
		supplierId: req.body.supplierId,
	};

	Purchase.create(purchase)
		.then((data) => {
			res.send({
				message: `Created successfully`,
				data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error creating purchase`,
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Purchase.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is equals to 1
			if (row == 1) {
				res.send({
					message: `Updated successfully`,
				});
			} else {
				res.send({
					message: `Cannot update purchase`,
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
						message: `Error updating purchase.`,
					});
					break;
			}
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Purchase.findByPk(id, {
		include: ["supplier"],
	})
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(400).send({
					message: `Cannot find purchase.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error fetching purchase ${id}`,
			});
		});
};

exports.updateStatus = (req, res) => {
	const id = req.params.id;

	Purchase.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is equals to 1
			if (row == 1) {
				res.send({
					message: `Updated successfully`,
				});
			} else {
				res.send({
					message: `Cannot update purchase`,
				});
			}
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error updating purchase`,
			});
		});
};

exports.findAll = (req, res) => {
	Purchase.findAll({
		where: { Status: "pending" },
		include: ["supplier"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error fetching purchases`,
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Purchase.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete purchase ${id}`,
				});
			}

			res.send({
				message: `Deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting purchase ${id}`,
			});
		});
};

exports.findAllDeliver = (req, res) => {
	Purchase.findAll({
		where: { Status: { [Op.or]: ["settled", "received"] } },
		include: ["supplier"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error fetching purchases`,
			});
		});
};
