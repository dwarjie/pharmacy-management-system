// This module contains the controller for sub category

const db = require("../models");
const SubCategory = db.subCategory;

// Creating a new SubCategory
exports.create = (req, res) => {
	const subCategory = {
		SubCategoryName: req.body.SubCategoryName,
		MarkUp: req.body.MarkUp,
		MarkUpUnit: req.body.MarkUpUnit,
		categoryId: req.body.categoryId,
	};

	SubCategory.create(subCategory)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error in creating sub category`,
			});
		});
};

// Update a SubCategory
exports.update = (req, res) => {
	const id = req.params.id;

	SubCategory.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is not equals to 1
			if (row != 1) {
				res.send({
					message: `Cannot update subcategory ${id}`,
				});
			}

			res.send({
				message: `Subcategory was updated successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error updating subcategory ${id} `,
			});
		});
};

// Delete a SubCategory
exports.delete = (req, res) => {
	const id = req.params.id;

	SubCategory.destroy({ where: { id: id } }).then((row) => {
		if (row != 1) {
			res.send({
				message: `Cannot delete subcategory ${id}`,
			});
		}

		res.send({
			message: `SubCategory was deleted successfully`,
		});
	});
};
