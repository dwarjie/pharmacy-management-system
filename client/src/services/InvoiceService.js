import http from "../http-common";

const createInvoice = (data) => {
	return http.post("/invoice", data);
};

const getAllInvoice = () => {
	return http.get("/invoice");
};

const getAllPaidInvoice = () => {
	return http.get("/invoice/manage-paid");
};

const getAllPendingInvoice = () => {
	return http.get("/invoice/manage-pending/list");
};

const getOneInvoice = (id) => {
	return http.get(`/invoice/${id}`);
};

const updateInvoice = (id, data) => {
	return http.put(`/invoice/${id}`, data);
};

const deleteInvoice = (id) => {
	return http.delete(`/invoice/${id}`);
};

const getAllByDate = (dateObj) => {
	return http.post(`/invoice/date-range`, dateObj);
};

const InvoiceService = {
	createInvoice,
	getAllInvoice,
	getOneInvoice,
	updateInvoice,
	deleteInvoice,
	getAllByDate,
	getAllPaidInvoice,
	getAllPendingInvoice,
};

export default InvoiceService;
