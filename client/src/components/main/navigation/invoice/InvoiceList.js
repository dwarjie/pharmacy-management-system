// This component will show the list of all invoice orders
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../../../helper/dateHelper";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import InvoiceService from "../../../../services/InvoiceService";

const InvoiceList = () => {
	const navigate = useNavigate();
	const [invoices, setInvoices] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllInvoice();
	}, []);

	const getAllInvoice = async () => {
		InvoiceService.getAllInvoice()
			.then((response) => {
				console.log(response.data);
				setInvoices(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Invoices List</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="medicine-search">Search:</label>
					<input type="text" className="form-control" id="medicine-search" />
				</form>
				<table className="table table-striped table-hover">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Invoice #</th>
							<th scope="col">Order Date</th>
							<th scope="col">Due Date</th>
							<th scope="col">Requested</th>
							<th scope="col">Patient</th>
							<th scope="col">Status</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{invoices &&
							invoices.map((invoice, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{invoice.InvoiceNo}</td>
									<td>{formatDate(invoice.OrderDate)}</td>
									<td>{formatDate(invoice.DueDate)}</td>
									<td>{invoice.handler.FirstName}</td>
									<td>{invoice.patient.FirstName}</td>
									<td>
										<span className="badge text-bg-warning">
											{invoice.Status}
										</span>
									</td>
									<td>
										<span className="px-2">
											<FaEdit className="icon-size-sm cursor-pointer" />
										</span>
										<span className="px-2">
											<MdDelete className="icon-size-sm cursor-pointer" />
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default InvoiceList;
