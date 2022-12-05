module.exports = (sequelize, Sequelize) => {
	const PurchaseOrder = sequelize.define("purchase", {
		POCode: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		ItemQty: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		Total: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		OrderDate: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		Status: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "pending",
		},
	});

	return PurchaseOrder;
};
