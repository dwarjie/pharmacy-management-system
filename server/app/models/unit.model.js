// Thid module is responsible for models of Unit table
module.exports = (sequelize, Sequelize) => {
	const Unit = sequelize.define("unit", {
		UnitName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
	});

	return Unit;
};
