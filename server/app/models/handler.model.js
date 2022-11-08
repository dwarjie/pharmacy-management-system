// This module is responsible for creating handlers model table
/* 
CREATE TABLE `Handler` (
  `HandlerID` <type>,
  `Category` <type>,
  `FirstName` <type>,
  `MiddleName` <type>, ?
  `LastName` <type>,
  `Sex` <type>,
  `City` <type>,
  `ZIP` <type>,
  `Address` <type>,
  `Phone` <type>,
  `Mobile` <type>,
  `Email` <type>,
  PRIMARY KEY (`HandlerID`),
  KEY `Key` (`Category`, `FirstName`, `MiddleName`, `LastName`, `Sex`, `City`, `ZIP`, `Address`, `Phone`, `Mobile`, `Email`)
);
*/
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
	});

	return Handler;
};
