// this module is responsible for model of discount table
module.exports = (sequelize, Sequelize) => {
	const Discount = sequelize.define("discount", {
		DiscountName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		DiscountAmount: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		DiscountType: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Discount;
};
