// This component prints the invoice for the pos
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { formatDate } from "../../../../helper/dateHelper";
import InvoiceDetailService from "../../../../services/InvoiceDetailService";
import InvoiceService from "../../../../services/InvoiceService";
import Loader from "../../../layout/Loader";

import logo from "../../../../asset/logo.png";

const PrintChargeToAccount = () => {
	const { id } = useParams();
	let componentRef = useRef();
	let navigate = useNavigate();

	const [invoice, setInvoice] = useState({});
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getInformation();
	}, []);

	const getInformation = async () => {
		await getInvoice(id);
		await getOrderList(id);
	};

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
		await InvoiceDetailService.getAllInvoiceItems(id)
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
									Close
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
						<td className="text-right">{parseFloat(item.Total).toFixed(2)}</td>
					</tr>
				))
			);
		};

		const checkBalance = () => {
			let result = parseFloat(invoice.Total) - parseFloat(invoice.PaidAmount);

			return result.toFixed(2);
		};

		return (
			<div className="container" style={{ color: "black" }}>
				<style>{getPageMargins()}</style>
				<div className="row">
					<div className="d-flex flex-column align-items-center">
						<img src={logo} alt="" className="d-block col-12 mx-auto w-20" />
						<br />
						<h6>ActivCare Home Health Solution Inc.</h6>
						<h6>3 Santa Rosa St, Pasig, 1603 Metro Manila</h6>
					</div>
					<div className="col-xs-6 col-md-12 d-flex flex-column align-items-end mt-3">
						<p>
							<strong>Order Date:</strong>
							<br />
							{formatDate(invoice.InvoiceDate)}
							<br />
						</p>
						{invoice.Status === "paid" ? (
							<p>
								<strong>Paid Date:</strong>
								<br />
								{formatDate(invoice.PaidDate)}
								<br />
							</p>
						) : (
							<p>
								<strong>Due Date:</strong>
								<br />
								{formatDate(invoice.DueDate)}
								<br />
							</p>
						)}
					</div>
					<div className="col-xs-6 col-md-12 d-flex flex-row justify-content-between mt-5">
						<p className="text-left text-information">
							<strong>Patient Information:</strong>
							<br />
							{`${invoice.patient.FirstName} ${invoice.patient.LastName}`}
							<br />
							{`${invoice.patient.Address}`}
							<br />
							{`${invoice.patient.Mobile}`}
						</p>
						<p className="text-left text-information">
							<strong>Requested By:</strong>
							<br />
							{`${invoice.handler.FirstName} ${invoice.handler.LastName}`}
							<br />
							{`${invoice.handler.Address}`}
							<br />
							{`${invoice.handler.Mobile}`}
						</p>
					</div>
					{invoice.Status === "paid" ? (
						<div className="col-xs-12 mt-3">
							<div className="invoice-title">
								<h3 className="pull-right">Invoice # {invoice.InvoiceNo}</h3>
								<h6 className="pull-left">OR # {invoice.ORNumber}</h6>
							</div>
							<hr />
						</div>
					) : (
						""
					)}
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
													<strong>Sub-Total</strong>
												</td>
											</tr>
										</thead>
										<tbody>
											{/* <!-- foreach ($order->lineItems as $line) or some such thing here --> */}
											{renderItems()}
											<tr>
												<td className="thick-line"></td>
												<td className="thick-line"></td>
												<td className="thick-line text-right">
													<strong>VATable:</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{parseFloat(invoice.VAT).toFixed(2)}
												</td>
											</tr>
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-right">
													<strong>Total Due: </strong>
												</td>
												<td className="no-line text-right">
													&#8369;{parseFloat(invoice.Total).toFixed(2)}
												</td>
											</tr>
											{invoice.PaidAmount > 0 ? (
												<tr>
													<td className="thick-line"></td>
													<td className="thick-line"></td>
													<td className="thick-line text-right">
														<strong>Paid Amount:</strong>
													</td>
													<td className="thick-line text-right">
														&#8369;{parseFloat(invoice.PaidAmount).toFixed(2)}
													</td>
												</tr>
											) : (
												""
											)}
											{invoice.PaidAmount > 0 ? (
												<tr>
													<td className="thick-line"></td>
													<td className="thick-line"></td>
													<td className="thick-line text-right">
														<strong>Balance:</strong>
													</td>
													<td className="thick-line text-right">
														&#8369;{parseFloat(checkBalance()).toFixed(2)}
													</td>
												</tr>
											) : (
												""
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<p>
						<strong>Prepared By:</strong>
						<br />
						{`${invoice.user.FirstName} ${invoice.user.LastName}`}
					</p>
					<div className="row mt-6">
						<div className="col-xs-6 d-flex flex-row justify-content-center gap-6">
							<p className="w-30">
								<hr className="w-100" />
								<strong>Company Signature</strong>
							</p>
							<p className="w-30">
								<hr className="w-100" />
								<strong>Client's Signature</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default PrintChargeToAccount;
