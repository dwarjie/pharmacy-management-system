// This module is responsible for creating sales model table
module.exports = (sequelize, Sequelize) => {
	const Invoice = sequelize.define("invoice", {
		InvoiceNo: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		ORNumber: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		InvoiceDate: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		DueDate: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		VAT: {
			type: Sequelize.FLOAT,
			allowNull: true,
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

	return Invoice;
};
