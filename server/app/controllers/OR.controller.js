// This module contains the OR controllers

const { Sequelize } = require("../models");
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

// get the value of OR
exports.findOne = (req, res) => {
	const id = 1; // * only 1 because OR has only 1 row

	OR.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.send({
					message: `Cannot access OR`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieving OR`,
			});
		});
};

// update the value of OR
// testing for deploy
exports.update = (req, res) => {
	const id = 1; // * only 1 because OR has only 1 row

	OR.update(req.body, { where: { id: id } })
		.then((row) => {
			if (row == 1) {
				res.send({
					message: `Updated successfully.`,
				});
			} else {
				res.send({
					message: `Cannot update OR.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error updating OR.`,
			});
		});
};

exports.incrementOR = async (req, res) => {
	try {
		let result = await db.sequelize.query(
			`UPDATE ors SET CurrentOR = CurrentOR + 1 WHERE id = 1`,
			{
				type: Sequelize.UPDATE,
			}
		);
		res.send(result);
	} catch (err) {
		res.status(500).send({
			message: err.message || `Error incrementing OR number`,
		});
	}
};
