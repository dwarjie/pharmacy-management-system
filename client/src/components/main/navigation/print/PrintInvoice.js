// This component prints the invoice for the pos
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

import logo from "../../../../asset/logo.png";

const PrintInvoice = () => {
	let componentRef = useRef();
	let navigate = useNavigate();
	let location = useLocation();

	const [sale, setSale] = useState({});
	const [items, setItems] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		setSale(location.state.sale);
		setItems(location.state.orderList);
		setUser(location.state.user);
	}, []);

	const pageStyle = `
		@media all {
		.page-break {
			display: none;
		}
	}

	@media print {
		html, body {
			height: initial !important;
			overflow: initial !important;
			-webkit-print-color-adjust: exact;
		}
	}

	@media print {
		.page-break {
			margin-top: 1rem;
			display: block;
			page-break-before: auto;
		}
	}

  @page {
    size: 58mm 100mm;
  }`;
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Sales Receipt</h4>
				<hr />
			</div>
			<div className="p-3">
				<div className="container p-3">
					<div className="container">
						<ComponentToPrint
							ref={(element) => (componentRef = element)}
							sale={sale}
							items={items}
							user={user}
						/>
						<ReactToPrint
							trigger={() => (
								<button className="btn btn-primary mx-2">Print Receipt</button>
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
	);
};

// component to be printed
class ComponentToPrint extends React.Component {
	render() {
		// get the props
		const sale = this.props.sale;
		const items = this.props.items;
		const user = this.props.user;

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
						<td>{item.name}</td>
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
					<div className="d-flex flex-column align-items-center">
						<img src={logo} alt="" className="d-block col-12 mx-auto w-20" />
						<br />
						<h6>ActivCare Home Health Solution Inc.</h6>
						<h6>3 Santa Rosa St, Pasig, 1603 Metro Manila</h6>
					</div>
					<div className="col-xs-12 mt-3">
						<div className="invoice-title">
							<h3 className="pull-right">Order # {sale.OrderNo}</h3>
							<h6 className="pull-left">Official Receipt # {sale.ORNumber}</h6>
							<h6 className="pull-left">
								Cashier: {`${user.FirstName} ${user.LastName}`}
							</h6>
						</div>
						<hr />
					</div>
					<div className="row">
						<div className="col-xs-6 text-right">
							<p>
								<strong>Order Date:</strong>
								<br />
								{sale.OrderDate}
								<br />
							</p>
						</div>
						<div className="col-xs-6">
							<p>
								<strong>Customer Name:</strong>
								<br />
								{sale.CustomerName}
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
													<strong>Total</strong>
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
													<strong>Subtotal</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{sale.GrossAmount}
												</td>
											</tr>
											<tr>
												<td className="thick-line"></td>
												<td className="thick-line"></td>
												<td className="thick-line text-center">
													<strong>Discount</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{sale.Discount}
												</td>
											</tr>
											<tr>
												<td className="thick-line"></td>
												<td className="thick-line"></td>
												<td className="thick-line text-center">
													<strong>VAT</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{sale.VAT}
												</td>
											</tr>
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-center">
													<strong>Total</strong>
												</td>
												<td className="no-line text-right">
													&#8369;{sale.Total}
												</td>
											</tr>
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-center">
													<strong>Cash Tendered</strong>
												</td>
												<td className="no-line text-right">
													&#8369;{sale.CashTendered}
												</td>
											</tr>
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-center">
													<strong>Change</strong>
												</td>
												<td className="no-line text-right">
													&#8369;{sale.ChangeAmount}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex flex-column align-items-center">
					<p className="text-center">
						Thank you, please come again <br /> This serves as an OFFICIAL
						RECEIPT
					</p>
				</div>
			</div>
		);
	}
}
export default PrintInvoice;
