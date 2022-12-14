// This module is responsible for medicine model table
module.exports = (sequelize, Sequelize) => {
	const Medicine = sequelize.define("medicine", {
		ProductCode: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		ProductName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		ProductDetails: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		GenericName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		SupplierPrice: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		SellingPrice: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		Quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		ReorderPoint: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		SafetyStock: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		Status: {
			type: Sequelize.INTEGER, // 0 - inactive, 1 - active
		},
	});

	return Medicine;
};
