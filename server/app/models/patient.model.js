// This module is responsible for creating patient model table
/*
CREATE TABLE `Patient` (
  `PatientID` <type>,
  `FirstName` <type>,
  `MiddleName` <type>,
  `LastName` <type>,
  `Sex` <type>,
  `DateOfBirth` <type>,
  `HandlersID` <type>,
  `City` <type>,
  `ZIP` <type>,
  `Address` <type>,
  `FirstVisit` <type>, ?
  `LastVisit` <type>, ?
  `Phone` <type>, ?
  `Mobile` <type>,
  `Email` <type>, ?
  `EmergencyContact` <type>,
  `Remarks` <type>,
  PRIMARY KEY (`PatientID`),
  KEY `Key` (`FirstName`, `MiddleName`, `LastName`, `Sex`, `DateOfBirth`, `HandlersID`, `City`, `State`, `ZIP`, `Address`, `FirstVisit`, `LastVisit`, `Phone`, `Mobile`, `Email`, `EmergencyContact`, `Remarks`)
);
*/
module.exports = (sequelize, Sequelize) => {
	const Patient = sequelize.define("patient", {
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
		DateOfBirth: {
			type: Sequelize.DATE,
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
		FirstVisit: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		Mobile: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		EmergencyContact: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Senior: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
		SeniorId: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Note: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

	return Patient;
};
