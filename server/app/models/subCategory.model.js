// This module is responsible for the model of subcategory
module.exports = (sequelize, Sequelize) => {
	const SubCategory = sequelize.define("sub_category", {
		SubCategoryName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		MarkUp: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		MarkUpUnit: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return SubCategory;
};
