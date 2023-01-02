module.exports = (sequelize, Sequelize) => {
	const InvoiceDetails = sequelize.define("invoice_detail", {
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
		Status: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "pending",
		},
	});

	return InvoiceDetails;
};
