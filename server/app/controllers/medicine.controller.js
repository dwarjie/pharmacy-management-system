// This module contains all the medicine controllers
const db = require("../models");
const Medicine = db.medicine;
const Category = db.category;
const { QueryTypes } = db.Sequelize;

exports.create = (req, res) => {
	const medicine = {
		ProductCode: req.body.ProductCode,
		ProductName: req.body.ProductName,
		ProductDetails: req.body.ProductDetails,
		GenericName: req.body.GenericName,
		ManufacturerPrice: req.body.ManufacturerPrice,
		SellingPrice: req.body.SellingPrice,
		Quantity: req.body.Quantity,
		Status: req.body.Status,
		manufacturerId: req.body.manufacturerId,
		unitId: req.body.unitId,
		subCategoryId: req.body.subCategoryId,
	};

	Medicine.create(medicine)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Some error occurred while creating medicine`,
			});
		});
};

exports.findAll = (req, res) => {
	Medicine.findAll({ include: ["subCategory", "manufacturer", "unit"] })
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

exports.update = (req, res) => {
	const id = req.params.id;

	Medicine.update(req.body, { where: { id: id } })
		.then((row) => {
			// check if affected row is not equals to 1
			if (row != 1) {
				res.send({
					message: `Cannot update ${id}`,
				});
			}

			res.send({
				message: `Medicine was updated successfully`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error updating medicine ${id}`,
			});
		});
};

// this function will get the
// category and subCategory
// manufacturer
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
				let manufacturer = [];
				let unit = [];

				manufacturer = await db.sequelize.query(`SELECT * FROM manufacturers`, {
					type: QueryTypes.SELECT,
				});

				unit = await db.sequelize.query(`SELECT * FROM units`, {
					type: QueryTypes.SELECT,
				});

				data.manufacturer = manufacturer;
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
