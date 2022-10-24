// This module contains the discount controllers

const { response } = require("express");
const db = require("../models");
const Discount = db.discount;

// create a new Discount
exports.create = (req, res) => {
	const discount = {
		DiscountName: req.body.DiscountName,
		DiscountAmount: req.body.DiscountAmount,
		DiscountType: req.body.DiscountType,
	};

	Discount.create(discount)
		.then((data) => {
			res.send(data);
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
exports.update = (req, res) => {
	const id = req.params.id;

	Discount.update(req.body, { where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot update discount ${id}`,
				});
			}

			res.send({
				message: `Discount updated successfully.`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `some error occurred while updating the discount`,
			});
		});
};

// delete the discount
exports.delete = (req, res) => {
	const id = req.params.id;

	Discount.destroy({ where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot update discount ${id}`,
				});
			}

			res.send({
				message: `Discount updated successfully.`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `some error occurred while updating the discount`,
			});
		});
};
