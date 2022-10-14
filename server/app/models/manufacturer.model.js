// This module is responsible for the model of manufacturer table
module.exports = (sequelize, Sequelize) => {
	const Manufacturer = sequelize.define("manufacturer", {
		ManufacturerName: {
			type: Sequelize.STRING,
			allowNull: false,
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
		},
	});

	return Manufacturer;
};
