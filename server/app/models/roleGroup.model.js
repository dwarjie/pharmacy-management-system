module.exports = (sequelize, Sequelize) => {
	const RoleGroup = sequelize.define("role_group", {
		RoleName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		Role: {
			type: Sequelize.STRING,
			allowNull: false,
			get() {
				const storedValue = this.getDataValue("Role");
				return storedValue.split(";");
			},
			set(val) {
				this.setDataValue("Role", val.join(";"));
			},
		},
	});

	return RoleGroup;
};
