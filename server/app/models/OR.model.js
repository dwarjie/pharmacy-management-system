// This module is responsible for creating OR model table
module.exports = (sequelize, Sequelize) => {
	const OR = sequelize.define("OR", {
		StartOR: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		MaxOR: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		CurrentOR: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});

	return OR;
};
