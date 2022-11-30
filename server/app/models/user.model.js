// This model is responsible for creating User model table
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		FirstName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		LastName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		UserName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		Password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return User;
};
