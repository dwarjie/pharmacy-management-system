// This module contains the category controllers
const db = require("../models");
const { QueryTypes } = db.Sequelize;
const Category = db.category;
const duplicate = require("../util/CheckDuplicate");

// Create a new category
exports.create = (req, res) => {
	// create a new category
	const category = {
		CategoryName: req.body.CategoryName.replace(/\s+/g, " ").trim(),
	};

	// check if category already exists,
	// else create a new category
	Category.findOrCreate({
		where: { CategoryName: category.CategoryName },
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
	Category.findAll({ include: ["subCategory"] })
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

	let data = {
		CategoryName: req.body.CategoryName.replace(/\s+/g, " ").trim(),
	};

	Category.update(data, { where: { id: id } })
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

	// let row = 0;

	// // check if category already exists before updating
	// try {
	// 	row = await duplicate.checkDuplicate(
	// 		"categories",
	// 		"CategoryName",
	// 		req.body.CategoryName
	// 	);
	// } catch (err) {
	// 	console.log(err);
	// }

	// if row is == 0, category does not exist yet
	// if (row[0][0].count == 0) {
	// 	Category.update(req.body, { where: { id: id } })
	// 		.then((row) => {
	// 			// check if affected row is equals to 1
	// 			if (row == 1) {
	// 				res.send({
	// 					message: `Updated successfully`,
	// 				});
	// 			} else {
	// 				res.send({
	// 					message: `Cannot update category`,
	// 				});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			res.status(500).send({
	// 				message: `Error updating category ${id}`,
	// 			});
	// 		});
	// } else {
	// 	res.send({
	// 		message: `Record already exists`,
	// 	});
	// }
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
