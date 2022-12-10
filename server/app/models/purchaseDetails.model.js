module.exports = (sequelize, Sequelize) => {
	const PurchaseDetails = sequelize.define("purchase_detail", {
		Quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		Total: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		RecieveDate: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		Status: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "pending",
		},
	});

	return PurchaseDetails;
};
