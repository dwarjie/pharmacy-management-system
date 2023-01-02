import http from "../http-common";

const createInvoiceDetail = (data) => {
	return http.post("/invoice-detail", data);
};

const getAllInvoiceItems = (invoiceId) => {
	return http.get(`/invoice-detail?invoiceId=${invoiceId}`);
};

const InvoiceService = {
	createInvoiceDetail,
	getAllInvoiceItems,
};

export default InvoiceService;
