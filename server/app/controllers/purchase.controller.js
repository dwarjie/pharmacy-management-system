const db = require("../models");
const Purchase = db.purchase;

exports.create = (req, res) => {
	const purchase = {
		POCode: req.body.POCode,
		OrderDate: req.body.OrderDate,
		ItemQty: req.body.ItemQty,
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

exports.findOne = (req, res) => {
	const id = req.params.id;

	Purchase.findByPk(id)
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

exports.findAll = (req, res) => {
	Purchase.findAll({
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
