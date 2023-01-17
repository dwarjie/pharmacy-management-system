import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, getCurrentDate } from "../../../../helper/dateHelper";
import SaleService from "../../../../services/SaleService";
import Loader from "../../../layout/Loader";
import { createAuditTrail } from "../../../../helper/AuditTrailHelper";
import { useGlobalState } from "../../../../state";
import InvoiceService from "../../../../services/InvoiceService";

const InvoiceList = () => {
	let [currentUser] = useGlobalState("currentUser");
	let navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		getAllInvoice();
	}, []);

	const getAllInvoice = async () => {
		InvoiceService.getAllInvoice().then((response) => {
			console.log(response.data);
			setInvoices(response.data);
			setLoading(false);
		});
	};

	const navigateSale = (sale) => {
		createAuditTrail(
			`Clicked ${sale.InvoiceNo} in return.`,
			"Click",
			currentUser.id
		);

		navigate(`/pharmacy/sales/return/${sale.id}`, {
			state: {
				sale: sale,
				type: "invoice",
				orderNo: sale.InvoiceNo,
			},
		});
	};

	const renderItems = () => {
		return (
			invoices &&
			invoices.map((sale, index) => (
				<tr
					key={index}
					className="cursor-pointer"
					onClick={() => navigateSale(sale)}
				>
					<td>{index + 1}</td>
					<td>{sale.InvoiceNo}</td>
					<td>{formatDate(sale.InvoiceDate)}</td>
					<td>{formatDate(sale.DueDate)}</td>
					<td>{`${sale.handler.FirstName} ${sale.handler.LastName}`}</td>
					<td>{`${sale.patient.FirstName} ${sale.patient.LastName}`}</td>
					<td>
						<span
							className={`badge text-bg-${
								sale.Status === "paid" ? "success" : "warning"
							}`}
						>
							{sale.Status}
						</span>
					</td>
				</tr>
			))
		);
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<div className="col-12 h-auto">
					<div className="p-2">
						<h4>Charge to Account List</h4>
						<hr />
					</div>
					<div className="table-responsive">
						<table className="table table-striped table-hover">
							<thead className="table-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Reference #</th>
									<th scope="col">Order Date</th>
									<th scope="col">Due Date</th>
									<th scope="col">Requested</th>
									<th scope="col">Patient</th>
									<th scope="col">Status</th>
								</tr>
							</thead>
							<tbody>{renderItems()}</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default InvoiceList;
