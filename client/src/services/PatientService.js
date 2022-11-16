// This module contains all the services for patient model
// in order to request to the HTTP server
import http from "../http-common";

const createPatient = (data) => {
	return http.post("/patient", data);
};

const getAllPatient = () => {
	return http.get("/patient/patient-list");
};

const updatePatient = (id, data) => {
	return http.put(`/patient/${id}`, data);
};

const deletePatient = (patientId) => {
	return http.delete(`/patient?patientId=${patientId}`);
};

// * get all the handlers for adding patient dropdown
const getAllHandler = () => {
	return http.get(`/patient`);
};

const PatientService = {
	createPatient,
	getAllPatient,
	updatePatient,
	deletePatient,
	getAllHandler,
};

export default PatientService;
