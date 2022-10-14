// This module is responsible for the model of category table
module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define("category", {
		CategoryName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Category;
};
