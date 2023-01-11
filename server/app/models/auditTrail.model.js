// This module is responsible for the model of category table
module.exports = (sequelize, Sequelize) => {
	const AuditTrail = sequelize.define("audit_trail", {
		Summary: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Action: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		AuditDate: {
			type: Sequelize.DATE,
			allowNull: false,
		},
	});

	return AuditTrail;
};
