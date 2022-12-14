// This module contains all the medicine controllers

const { Sequelize } = require("../models");
const db = require("../models");
const Medicine = db.medicine;
const Category = db.category;
const duplicate = require("../util/CheckDuplicate");
const { QueryTypes } = db.Sequelize;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	const medicine = {
		ProductCode: req.body.ProductCode.replace(/\s+/g, " ").trim(),
		ProductName: req.body.ProductName.replace(/\s+/g, " ").trim(),
		ProductDetails: req.body.ProductDetails.replace(/\s+/g, " ").trim(),
		GenericName: req.body.GenericName.replace(/\s+/g, " ").trim(),
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
			ProductName: medicine.ProductName,
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
			switch (err.name) {
				case "SequelizeUniqueConstraintError":
					res.send({
						message: `Record already exists.`,
					});
					break;
				default:
					res.status(500).send({
						message: err.message || `Error creating medicine.`,
					});
					break;
			}
		});
};

exports.findAll = (req, res) => {
	const title = req.query.title;
	const condition = title ? { ProductName: { [Op.like]: `%${title}%` } } : null;

	Medicine.findAll({
		include: ["subCategory", "supplier", "unit"],
		where: condition,
	})
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

exports.findProductCode = (req, res) => {
	const code = req.query.code;

	Medicine.findOne({
		include: ["subCategory", "supplier", "unit"],
		where: { ProductCode: code },
	})
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

	const medicine = {
		ProductCode: req.body.ProductCode.replace(/\s+/g, " ").trim(),
		ProductName: req.body.ProductName.replace(/\s+/g, " ").trim(),
		ProductDetails: req.body.ProductDetails.replace(/\s+/g, " ").trim(),
		GenericName: req.body.GenericName.replace(/\s+/g, " ").trim(),
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

	Medicine.update(medicine, { where: { id: id } })
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
			switch (err.name) {
				case "SequelizeUniqueConstraintError":
					res.send({
						message: `Record already exists.`,
					});
					break;
				default:
					res.status(500).send({
						message: `Error updating medicine.`,
					});
					break;
			}
		});

	// let row = 0;

	// // ! check if medicine already exists
	// try {
	// 	row = await duplicate.checkDuplicate(
	// 		"medicines",
	// 		"ProductName",
	// 		req.body.ProductName
	// 	);
	// } catch (err) {
	// 	console.log(err);
	// }

	// // if row == 0, category does not exist yet
	// if (row[0][0].count === 0) {
	// 	Medicine.update(req.body, { where: { id: id } })
	// 		.then((row) => {
	// 			// check if affected row is not equals to 1
	// 			if (row != 1) {
	// 				res.send({
	// 					message: `Cannot update medicine`,
	// 				});
	// 			}

	// 			res.send({
	// 				message: `Updated successfully`,
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			res.status(500).send({
	// 				message: err.message || `Error updating medicine ${id}`,
	// 			});
	// 		});
	// } else {
	// 	res.send({
	// 		message: `Record already exists.`,
	// 	});
	// }
};

// increment product on stock quantity
exports.increaseStockQuantity = async (req, res) => {
	const receivedQuantity = req.body.Quantity;
	const id = req.params.id;

	try {
		let result = await db.sequelize.query(
			`UPDATE medicines SET Quantity = Quantity + ${receivedQuantity} WHERE id = ${id}`,
			{
				type: Sequelize.UPDATE,
			}
		);
		res.send(result);
	} catch (err) {
		res.status(500).send({
			message: err.message || `Error incrementing product stock`,
		});
	}
};

// increment product on stock quantity
exports.decreaseStockQuantity = async (req, res) => {
	const receivedQuantity = req.body.Quantity;
	const id = req.params.id;

	try {
		let result = await db.sequelize.query(
			`UPDATE medicines SET Quantity = Quantity - ${receivedQuantity} WHERE id = ${id}`,
			{
				type: Sequelize.UPDATE,
			}
		);
		res.send(result);
	} catch (err) {
		res.status(500).send({
			message: err.message || `Error incrementing product stock`,
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

// get the products by title
exports.findByTitle = (req, res) => {
	const title = req.query.title;
	Medicine.findAll({
		where: title ? { title: { [Op.like]: `%${title}%` } } : null,
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Cannot retrieve products`,
			});
		});
};

// get the products by title and by supplier

exports.findByTitleSupplier = (req, res) => {
	let title = req.query.title;
	let supplierId = req.query.supplierId;

	Medicine.findAll({
		include: ["subCategory", "supplier", "unit"],
		where: {
			ProductName: { [Op.startsWith]: `${title}%` },
			supplierId: supplierId,
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Cannot retrieve products`,
			});
		});
};

exports.countAllProducts = (req, res) => {
	Medicine.findAndCountAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send({
				message: err.message || `Error counting all products`,
			});
		});
};
