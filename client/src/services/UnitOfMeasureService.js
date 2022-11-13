// this module contains unit of measure service
// in order to send request to server

import http from "../http-common";

const createUnitOfMeasure = (data) => {
	return http.post(`/unit`, data);
};

const getUnitOfMeasure = () => {
	return http.get(`/unit`);
};

const updateUnitOfMeasure = (id, data) => {
	return http.put(`/unit/${id}`, data);
};

const deleteUnitOfMeasure = (unitId) => {
	return http.delete(`/unit?unitId=${unitId}`);
};

const UnitOfMeasureService = {
	createUnitOfMeasure,
	getUnitOfMeasure,
	updateUnitOfMeasure,
	deleteUnitOfMeasure,
};

export default UnitOfMeasureService;
