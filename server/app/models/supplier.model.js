// This module is responsible for the model of manufacturer table
module.exports = (sequelize, Sequelize) => {
	const Supplier = sequelize.define("supplier", {
		SupplierName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		Address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Mobile: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Phone: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Email: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: true,
		},
	});

	return Supplier;
};
