// This function will check for duplicates before updating record
const db = require("../models");

exports.checkDuplicate = (tableName, columnName, value) => {
	// check if category already exists before updating
	let row = 0;

	row = db.sequelize.query(
		`SELECT COUNT(*) AS count FROM ${tableName} WHERE ${columnName} = "${value}"`
	);

	console.log("row: " + row);
	return row;
};
