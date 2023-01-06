module.exports = (sequelize, Sequelize) => {
	const Return = sequelize.define("return", {
		Quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		DateCreated: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		Total: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		Reason: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Return;
};
