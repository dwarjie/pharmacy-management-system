module.exports = (sequelize, Sequelize) => {
	const StockAdjustment = sequelize.define("stock_adjustment", {
		Mode: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		DateCreated: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		Quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		Reason: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

	return StockAdjustment;
};
