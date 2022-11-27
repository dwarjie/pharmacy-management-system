// This module is responsible for creating SalesDetails model table
module.exports = (sequelize, Sequelize) => {
	const SalesDetail = sequelize.define("sales_detail", {
		UnitPrice: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		Quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		Total: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
	});

	return SalesDetail;
};
