// This module contains the discount controllers

const db = require("../models");
const Discount = db.discount;
const duplicate = require("../util/CheckDuplicate");

// create a new Discount
exports.create = (req, res) => {
	const discount = {
		DiscountName: req.body.DiscountName.replace(/\s+/g, " ").trim(),
		DiscountAmount: req.body.DiscountAmount,
		DiscountType: req.body.DiscountType,
	};

	// check if discount already exists
	// else create a new Discount
	Discount.findOrCreate({
		where: { DiscountName: discount.DiscountName },
		defaults: { ...discount },
	})
		.then(([data, created]) => {
			if (created) {
				res.send({
					message: `Created successfully.`,
					data,
				});
			} else {
				res.send({
					message: `Record already exists.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the discount.",
			});
		});
};

// retrieve all discount
exports.findAll = (req, res) => {
	Discount.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Some error occurred while retrieving the discounts`,
			});
		});
};

// update the discount
exports.update = async (req, res) => {
	const id = req.params.id;

	const discount = {
		DiscountName: req.body.DiscountName.replace(/\s+/g, " ").trim(),
		DiscountAmount: req.body.DiscountAmount,
		DiscountType: req.body.DiscountType,
	};

	Discount.update(discount, { where: { id: id } })
		.then((row) => {
			if (row == 1) {
				res.send({
					message: `Updated successfully.`,
				});
			} else {
				res.send({
					message: `Cannot update discount`,
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
						message: `Error updating discount.`,
					});
					break;
			}
		});

	// let row = 0;

	// // check if record already exists before updating
	// try {
	// 	row = await duplicate.checkDuplicate(
	// 		"discounts",
	// 		"DiscountName",
	// 		req.body.DiscountName
	// 	);
	// } catch (err) {
	// 	console.log(err);
	// }

	// // if row == 0, discount does not exists yet
	// if (row[0][0].count == 0) {
	// 	Discount.update(req.body, { where: { id: id } })
	// 		.then((row) => {
	// 			if (row == 1) {
	// 				res.send({
	// 					message: `Updated successfully.`,
	// 				});
	// 			} else {
	// 				res.send({
	// 					message: `Cannot update discount`,
	// 				});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			res.status(500).send({
	// 				message: `Error updating discount`,
	// 			});
	// 		});
	// } else {
	// 	res.send({
	// 		message: `Record already exists.`,
	// 	});
	// }
};

// delete the discount
exports.delete = (req, res) => {
	const id = req.query.discountId;

	Discount.destroy({ where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete discount ${id}`,
				});
			}

			res.send({
				message: `Deleted successfully.`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `some error occurred while deleting discount`,
			});
		});
};
