// This module contains all the medicine controllers
const db = require("../models");
const Medicine = db.medicine;

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

// this function will get the
// category and subCategory
// manufacturer
// and unit of measure in order to show in medicine
exports.getOtherModel = async (req, res) => {};
