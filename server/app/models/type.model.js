// This module is responsible for model of Type table
module.exports = (sequelize, Sequelize) => {
	const Type = sequelize.define("type", {
		TypeName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Type;
};
