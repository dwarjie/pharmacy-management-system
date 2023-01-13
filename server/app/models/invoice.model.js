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
		PaidDate: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		VAT: {
			type: Sequelize.FLOAT,
			allowNull: true,
		},
		GrossAmount: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		Total: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		PaidAmount: {
			type: Sequelize.FLOAT,
			allowNull: true,
		},
		Balance: {
			type: Sequelize.FLOAT,
			allowNull: true,
			defaultValue: 0,
		},
		Status: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "pending",
		},
		Remarks: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

	return Invoice;
};
