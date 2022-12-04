// This module contains the controller for sub category

const db = require("../models");
const SubCategory = db.subCategory;
const duplicate = require("../util/CheckDuplicate");

// Creating a new SubCategory
exports.create = (req, res) => {
	const subCategory = {
		SubCategoryName: req.body.SubCategoryName.replace(/\s+/g, " ").trim(),
		MarkUp: req.body.MarkUp,
		MarkUpUnit: req.body.MarkUpUnit,
		categoryId: req.body.categoryId,
	};

	// check if category already exists
	// else create new category
	SubCategory.findOrCreate({
		where: { SubCategoryName: subCategory.SubCategoryName },
		defaults: { ...subCategory },
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
				message: `Error in creating sub category`,
			});
		});
};

// Update a SubCategory
exports.update = async (req, res) => {
	const id = req.params.id;

	const subCategory = {
		SubCategoryName: req.body.SubCategoryName.replace(/\s+/g, " ").trim(),
		MarkUp: req.body.MarkUp,
		MarkUpUnit: req.body.MarkUpUnit,
		categoryId: req.body.categoryId,
	};

	SubCategory.update(subCategory, { where: { id: id } })
		.then((row) => {
			// check if affected row is not equals to 1
			if (row == 1) {
				res.send({
					message: `Updated successfully.`,
				});
			} else {
				res.send({
					message: `Updated successfully.`,
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
						message: `Error updating sub-category.`,
					});
					break;
			}
		});

	// let row = 0;

	// // check if category already exists before updating
	// try {
	// 	row = await duplicate.checkDuplicate(
	// 		"sub_categories",
	// 		"SubCategoryName",
	// 		req.body.SubCategoryName
	// 	);
	// } catch (err) {
	// 	console.log(err);
	// }

	// // ! If row == 0, category does not exist yet
	// if (row[0][0].count === 0) {
	// 	SubCategory.update(req.body, { where: { id: id } })
	// 		.then((row) => {
	// 			// check if affected row is not equals to 1
	// 			if (row == 1) {
	// 				res.send({
	// 					message: `Updated successfully.`,
	// 				});
	// 			} else {
	// 				res.send({
	// 					message: `Updated successfully.`,
	// 				});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			res.status(500).send({
	// 				message: `Error updating subcategory ${id} `,
	// 			});
	// 		});
	// } else {
	// 	res.send({
	// 		message: `Record already exists.`,
	// 	});
	// }
};

// Delete a SubCategory
exports.delete = (req, res) => {
	const id = req.query.subCategoryId;

	SubCategory.destroy({ where: { id: id } }).then((row) => {
		if (row != 1) {
			res.send({
				message: `Cannot delete subcategory ${id}`,
			});
		}

		res.send({
			message: `Deleted successfully`,
		});
	});
};
