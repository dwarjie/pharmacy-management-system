// This module contains the controller for patient model

const db = require("../models");
const Patient = db.patient;

// Create a new Patient
exports.create = (req, res) => {
	const patient = {
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Sex: req.body.Sex,
		DateOfBirth: req.body.DateOfBirth,
		City: req.body.City,
		ZIP: req.body.ZIP,
		Address: req.body.Address,
		FirstVisit: req.body.FirstVisit,
		Mobile: req.body.Mobile,
		EmergencyContact: req.body.EmergencyContact,
		Senior: req.body.Senior,
		SeniorId: req.body.SeniorId,
		Note: req.body.Note,
		handlerId: req.body.handlerId,
	};

	// !check if patient already exists
	// !else create new Patient
	Patient.findOrCreate({
		where: { FirstName: patient.FirstName, LastName: patient.LastName },
		defaults: { ...patient },
	})
		.then(([data, created]) => {
			if (created) {
				res.send({
					message: `Created successfully.`,
					data,
				});
			} else {
				res.send({
					message: `Record already exists.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error creating patient`,
			});
		});
};

// get all patient records
exports.findAll = (req, res) => {
	Patient.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			message: err.message || `Error retrieving patients.`;
		});
};

// update patient
exports.update = (req, res) => {
	const id = req.params.id;

	Patient.update(req.body, { where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot update patient ${id}.`,
				});
			} else {
				res.send({
					message: `Updated successfully.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error updating patient ${id}.`,
			});
		});
};

// delete patient
exports.delete = (req, res) => {
	const id = req.query.patientId;

	Patient.destroy({ where: { id: id } })
		.then((row) => {
			if (row != 1) {
				res.send({
					message: `Cannot delete patient ${id}.`,
				});
			} else {
				res.send({
					message: `Deleted successfully.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Error deleting patient ${id}.`,
			});
		});
};
