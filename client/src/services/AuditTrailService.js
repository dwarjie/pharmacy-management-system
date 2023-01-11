import http from "../http-common";

const createAuditTrail = (data) => {
	return http.post("/audit-trail", data);
};

const getAllAuditTrail = () => {
	return http.get("/audit-trail");
};

const AuditTrailService = {
	createAuditTrail,
	getAllAuditTrail,
};

export default AuditTrailService;
