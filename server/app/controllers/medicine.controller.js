// This module contains all the medicine controllers
const db = require("../models");
const Medicine = db.medicine;
const Category = db.category;
const duplicate = require("../util/CheckDuplicate");
const { QueryTypes } = db.Sequelize;

exports.create = (req, res) => {
	const medicine = {
		ProductCode: req.body.ProductCode,
		ProductName: req.body.ProductName,
		ProductDetails: req.body.ProductDetails,
		GenericName: req.body.GenericName,
		SupplierPrice: req.body.SupplierPrice,
		SellingPrice: req.body.SellingPrice,
		Quantity: req.body.Quantity,
		ReorderPoint: req.body.ReorderPoint,
		SafetyStock: req.body.SafetyStock,
		Status: req.body.Status,
		supplierId: req.body.supplierId,
		unitId: req.body.unitId,
		subCategoryId: req.body.subCategoryId,
	};

	// check if product already exists,
	// else create new product
	Medicine.findOrCreate({
		where: {
			ProductName: req.body.ProductName,
		},
		defaults: { ...medicine },
	})
		.then(([data, created]) => {
			if (created) {
				res.send({
					message: `Created successfully.`,
					data,
				});
			} else {
				res.send({
					message: `Product already exists.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Some error occurred while creating medicine`,
			});
		});
};

exports.findAll = (req, res) => {
	Medicine.findAll({ include: ["subCategory", "supplier", "unit"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Some error occurred while retrieving Medicines`,
			});
		});
};

exports.update = async (req, res) => {
	const id = req.params.id;
	let row = 0;

	// ! check if medicine already exists
	try {
		row = await duplicate.checkDuplicate(
			"medicines",
			"ProductName",
			req.body.ProductName
		);
	} catch (err) {
		console.log(err);
	}

	// if row == 0, category does not exist yet
	if (row[0][0].count === 0) {
		Medicine.update(req.body, { where: { id: id } })
			.then((row) => {
				// check if affected row is not equals to 1
				if (row != 1) {
					res.send({
						message: `Cannot update medicine`,
					});
				}

				res.send({
					message: `Updated successfully`,
				});
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || `Error updating medicine ${id}`,
				});
			});
	} else {
		res.send({
			message: `Record already exists.`,
		});
	}
};

// delete a medicine
exports.delete = (req, res) => {
	const id = req.query.medicineId;

	Medicine.destroy({
		where: {
			id: id,
		},
	})
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete medicine ${id}`,
				});
			}

			res.send({
				message: `Deleted successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error deleting medicine ${id}`,
			});
		});
};

// this function will get the
// category and subCategory
// supplier
// and unit of measure in order to show in medicine
exports.getOtherModel = async (req, res) => {
	Category.findAll({ include: ["subCategory"] })
		.then((data) => {
			let info = {}; // the data will be stored here

			info = {
				category: data,
			};

			return info;
		})
		.then(async (data) => {
			try {
				let supplier = [];
				let unit = [];

				supplier = await db.sequelize.query(`SELECT * FROM suppliers`, {
					type: QueryTypes.SELECT,
				});

				unit = await db.sequelize.query(`SELECT * FROM units`, {
					type: QueryTypes.SELECT,
				});

				data.supplier = supplier;
				data.unit = unit;

				return res.status(200).json(data);
			} catch (err) {
				console.log(err);
			}
		})
		.catch((err) => {
			return res.status(500).send({
				message: err.message || `Some error occurred while processing data`,
			});
		});
};
