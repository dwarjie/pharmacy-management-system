// This component prints the invoice for the pos
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { formatDate } from "../../../../helper/dateHelper";
import InvoiceDetailService from "../../../../services/InvoiceDetailService";
import InvoiceService from "../../../../services/InvoiceService";
import Loader from "../../../layout/Loader";

const PrintChargeToAccount = () => {
	const { id } = useParams();
	let componentRef = useRef();
	let navigate = useNavigate();

	const [invoice, setInvoice] = useState({});
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getInvoice(id);
		getOrderList(id);
	}, []);

	const getInvoice = async (id) => {
		await InvoiceService.getOneInvoice(id)
			.then((response) => {
				console.log(response.data);
				setInvoice(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getOrderList = async (id) => {
		InvoiceDetailService.getAllInvoiceItems(id)
			.then((response) => {
				console.log(response.data);
				setItems(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<div className="col-12 h-auto border border-dark rounded simple-shadow">
					<div className="p-3">
						<h4>Invoice Receipt</h4>
						<hr />
					</div>
					<div className="p-3">
						<div className="container p-3">
							<div className="container">
								<ComponentToPrint
									ref={(element) => (componentRef = element)}
									invoice={invoice}
									items={items}
								/>
								<ReactToPrint
									trigger={() => (
										<button className="btn btn-primary mx-2">
											Print Receipt
										</button>
									)}
									content={() => componentRef}
								/>
								<button
									className="btn btn-secondary mx-2"
									onClick={() => navigate(-1)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

// component to be printed
class ComponentToPrint extends React.Component {
	render() {
		// get the props
		const invoice = this.props.invoice;
		const items = this.props.items;

		const getPageMargins = () => {
			const marginTop = "50px";
			const marginRight = "25px";
			const marginBottom = "50px";
			const marginLeft = "25px";
			return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
		};

		const renderItems = () => {
			return (
				items &&
				items.map((item, index) => (
					<tr key={index}>
						<td>{item.medicine.ProductName}</td>
						<td className="text-center">{item.UnitPrice}</td>
						<td className="text-center">{item.Quantity}</td>
						<td className="text-right">{item.Total}</td>
					</tr>
				))
			);
		};

		return (
			<div className="container" style={{ color: "black" }}>
				<style>{getPageMargins()}</style>
				<div className="row">
					<div className="col-xs-6 col-md-12 d-flex flex-column align-items-start">
						<p>
							<strong>Patient Information:</strong>
							<br />
							{`${invoice.patient.FirstName} ${invoice.patient.LastName}`}
							<br />
							{`${invoice.patient.Address}`}
							<br />
							{`${invoice.patient.Mobile}`}
						</p>
					</div>
					<div className="col-xs-6 col-md-12 d-flex flex-column align-items-end">
						<p>
							<strong>Requested By:</strong>
							<br />
							{`${invoice.handler.FirstName} ${invoice.handler.LastName}`}
							<br />
							{`${invoice.handler.Address}`}
							<br />
							{`${invoice.handler.Mobile}`}
						</p>
					</div>
					<div className="col-xs-12 mt-3">
						<div className="invoice-title">
							<h3 className="pull-right">Invoice # {invoice.InvoiceNo}</h3>
							<h6 className="pull-left">OR # {invoice.ORNumber}</h6>
						</div>
						<hr />
					</div>
					<div className="row">
						<div className="col-xs-6 d-flex flex-row justify-content-between">
							<p>
								<strong>Order Date:</strong>
								<br />
								{formatDate(invoice.InvoiceDate)}
								<br />
							</p>
							<p>
								<strong>Due Date:</strong>
								<br />
								{formatDate(invoice.DueDate)}
								<br />
							</p>
							<p>
								<strong>Prepared By:</strong>
								<br />
								{`${invoice.user.FirstName} ${invoice.user.LastName}`}
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-body">
								<div className="table-responsive">
									<table className="table table-condensed">
										<thead>
											<tr>
												<td>
													<strong>Item</strong>
												</td>
												<td className="text-center">
													<strong>Price</strong>
												</td>
												<td className="text-center">
													<strong>Quantity</strong>
												</td>
												<td className="text-right">
													<strong>Totals</strong>
												</td>
											</tr>
										</thead>
										<tbody>
											{/* <!-- foreach ($order->lineItems as $line) or some such thing here --> */}
											{renderItems()}
											<tr>
												<td className="thick-line"></td>
												<td className="thick-line"></td>
												<td className="thick-line text-center">
													<strong>VAT</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{invoice.VAT}
												</td>
											</tr>
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-center">
													<strong>Total</strong>
												</td>
												<td className="no-line text-right">
													&#8369;{invoice.Total}
												</td>
											</tr>
											<tr>
												<td className="thick-line"></td>
												<td className="thick-line"></td>
												<td className="thick-line text-center">
													<strong>Paid Amount</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{invoice.PaidAmount}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default PrintChargeToAccount;
