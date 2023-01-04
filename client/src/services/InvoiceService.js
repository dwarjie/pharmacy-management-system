import http from "../http-common";

const createInvoice = (data) => {
	return http.post("/invoice", data);
};

const getAllInvoice = () => {
	return http.get("/invoice");
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

const InvoiceService = {
	createInvoice,
	getAllInvoice,
	getOneInvoice,
	updateInvoice,
	deleteInvoice,
};

export default InvoiceService;
