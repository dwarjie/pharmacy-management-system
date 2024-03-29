// This module is responsible for creating handlers model table
module.exports = (sequelize, Sequelize) => {
	const Handler = sequelize.define("handler", {
		Category: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		FirstName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		LastName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Sex: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		City: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		ZIP: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Mobile: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Email: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		CreditLimit: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		Balance: {
			type: Sequelize.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		OnHold: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
	});

	return Handler;
};
