// This module contains the category controllers

const db = require("../models");
const { QueryTypes } = db.Sequelize;
const Category = db.category;

// Create a new category
exports.create = (req, res) => {
	// create a new category
	const category = {
		CategoryName: req.body.CategoryName,
	};

	// check if category already exists,
	// else create a new category
	Category.findOrCreate({
		where: { ...category },
		defaults: { ...category },
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
					err.message || "Some error occurred while creating the category.",
			});
		});
};

//  Retrieve all categories
exports.findAll = (req, res) => {
	Category.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while getting all categories.",
			});
		});
};

// Retrieve a single category
exports.findOne = (req, res) => {
	const id = req.query.categoryId;

	Category.findByPk(id, { include: ["subCategory"] })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(400).send({
					message: `Cannot find category ${id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error fetching category ${id}`,
			});
		});
};

// Update a single category
exports.update = async (req, res) => {
	const id = req.params.id;
	let row = 0;

	// check if category already exists before updating
	try {
		row = await db.sequelize.query(
			`SELECT COUNT(*) AS count FROM categories WHERE CategoryName = "${req.body.CategoryName}"`
		);
	} catch (err) {
		console.log(err);
	}

	// if row is !== 0, category does not exist yet
	if (row[0][0].count == 0) {
		Category.update(req.body, { where: { id: id } })
			.then((row) => {
				// check if affected row is not equals to 1
				if (row == 1) {
					res.send({
						message: `Updated successfully`,
					});
				} else {
					res.send({
						message: `Cannot update category ${id}`,
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: `Error updating category ${id}`,
				});
			});
	} else {
		res.send({
			message: `Category already exists`,
		});
	}
};

// Delete a category
exports.delete = (req, res) => {
	const id = req.params.id;

	Category.destroy({
		where: { id: id },
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete category ${id}`,
				});
			}

			res.send({
				message: `Category was deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting category ${id}`,
			});
		});
};
