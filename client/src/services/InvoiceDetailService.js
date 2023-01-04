import http from "../http-common";

const createInvoiceDetail = (data) => {
	return http.post("/invoice-detail", data);
};

const getAllInvoiceItems = (invoiceId) => {
	return http.get(`/invoice-detail?invoiceId=${invoiceId}`);
};

const updateItem = (id, data) => {
	return http.put(`/invoice-detail/${id}`, data);
};

const deleteItem = (id) => {
	return http.delete(`/invoice-detail/${id}`);
};

const deleteAllInvoiceItems = (invoiceId) => {
	return http.delete(`/invoice-detail/invoice-item/${invoiceId}`);
};

const InvoiceDetailService = {
	createInvoiceDetail,
	getAllInvoiceItems,
	updateItem,
	deleteItem,
	deleteAllInvoiceItems,
};

export default InvoiceDetailService;
