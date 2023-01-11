import AuditTrailService from "../services/AuditTrailService";
import { getCurrentDate } from "./dateHelper";
import { useGlobalState } from "../state";

const createAuditTrail = (summary, action, userId) => {
	let data = {
		Summary: summary,
		Action: action,
		AuditDate: getCurrentDate(),
		userId: userId,
	};

	AuditTrailService.createAuditTrail(data)
		.then((response) => {
			console.log(response.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export { createAuditTrail };
