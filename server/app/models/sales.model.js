// This module is responsible for creating sales model table
module.exports = (sequelize, Sequelize) => {
	const Sales = sequelize.define("sales", {
		OrderNo: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		ORNumber: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		OrderDate: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		CustomerName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Discount: {
			type: Sequelize.FLOAT,
			allowNull: true,
		},
		VAT: {
			type: Sequelize.FLOAT,
			allowNull: true,
		},
		Total: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
	});

	return Sales;
};
