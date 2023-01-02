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

const InvoiceService = {
	createInvoice,
	getAllInvoice,
	getOneInvoice,
};

export default InvoiceService;
