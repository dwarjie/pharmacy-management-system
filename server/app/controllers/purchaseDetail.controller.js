const db = require("../models");
const PurchaseDetail = db.purchaseDetail;

exports.create = (req, res) => {
	const order = {
		UnitPrice: req.body.UnitPrice,
		Quantity: req.body.Quantity,
		DiscountedPrice: req.body.DiscountedPrice,
		Total: req.body.Total,
		medicineId: req.body.medicineId,
		saleId: req.body.saleId,
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
