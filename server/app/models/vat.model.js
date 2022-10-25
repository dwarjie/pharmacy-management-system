// this module contains is resposible for model vat table
module.exports = (sequelize, Sequelize) => {
	const VAT = sequelize.define("vat", {
		VatName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		VatAmount: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
	});

	return VAT;
};
