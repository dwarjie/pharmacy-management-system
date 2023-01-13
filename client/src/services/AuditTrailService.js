import http from "../http-common";

const createAuditTrail = (data) => {
	return http.post("/audit-trail", data);
};

const getAllAuditTrail = () => {
	return http.get("/audit-trail");
};

const getAllByDate = (dateObj) => {
	return http.post(`/audit-trail/date-range`, dateObj);
};

const AuditTrailService = {
	createAuditTrail,
	getAllByDate,
	getAllAuditTrail,
};

export default AuditTrailService;
