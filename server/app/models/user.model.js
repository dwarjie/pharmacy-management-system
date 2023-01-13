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
		Role: {
			type: Sequelize.STRING,
			allowNull: true,
			get() {
				const storedValue = this.getDataValue("Role");
				return storedValue.split(";");
			},
			set(val) {
				this.setDataValue("Role", val.join(";"));
			},
		},
		isLock: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
	});

	return User;
};
