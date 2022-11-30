// This will be the model for roles in order to provide access-rights
module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define("role", {
		RoleName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Role;
};
