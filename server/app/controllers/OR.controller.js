// This module contains the OR controllers

const db = require("../models");
const OR = db.or;

// create the OR
// !provide the value for the OR, this will be called immediately after database
// !has been created
exports.create = (newValue) => {
	return OR.create({
		StartOR: newValue.StartOR,
		MaxOR: newValue.MaxOR,
		CurrentOR: newValue.CurrentOR,
	})
		.then((data) => {
			console.log(`OR created successfully.`);
			return data;
		})
		.catch((err) => {
			console.log(`OR: ${err}`);
		});
};
