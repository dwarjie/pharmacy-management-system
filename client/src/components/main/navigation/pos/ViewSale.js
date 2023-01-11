// This component views the specific sale of the POS
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { formatDate } from "../../../../helper/dateHelper";
import SaleService from "../../../../services/SaleService";
import SalesDetailService from "../../../../services/SalesDetailService";

import logo from "../../../../asset/logo.png";
import Loader from "../../../layout/Loader";

const ViewSale = () => {
	let navigate = useNavigate();
	let componentRef = useRef();
	const { id } = useParams();

	const [sale, setSale] = useState({});
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getSale(id);
	}, [id]);

	const getSale = (id) => {
		SaleService.getOneSale(id)
			.then((response) => {
				console.log(response.data);
				setSale(response.data);
				getSaleItems(id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getSaleItems = (id) => {
		SalesDetailService.getSaleItems(id)
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
						<h4>View Sale</h4>
						<hr />
					</div>
					<div className="p-3">
						<div className="container p-3">
							<div className="container">
								<ComponentToPrint
									ref={(element) => (componentRef = element)}
									sale={sale}
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
		const sale = this.props.sale;
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
								Cashier: {`${sale.user.FirstName} ${sale.user.LastName}`}
							</h6>
						</div>
						<hr />
					</div>
					<div className="row">
						<div className="col-xs-6 text-right">
							<p>
								<strong>Order Date:</strong>
								<br />
								{formatDate(sale.OrderDate)}
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
												<td className="thick-line text-right">
													<strong>Subtotal</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{sale.GrossAmount}
												</td>
											</tr>
											<tr>
												<td className="thick-line"></td>
												<td className="thick-line"></td>
												<td className="thick-line text-right">
													<strong>Discount</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{sale.Discount}
												</td>
											</tr>
											<tr>
												<td className="thick-line"></td>
												<td className="thick-line"></td>
												<td className="thick-line text-right">
													<strong>VAT</strong>
												</td>
												<td className="thick-line text-right">
													&#8369;{sale.VAT}
												</td>
											</tr>
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-right">
													<strong>Total</strong>
												</td>
												<td className="no-line text-right">
													&#8369;{sale.Total}
												</td>
											</tr>
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-right">
													<strong>Cash Tendered</strong>
												</td>
												<td className="no-line text-right">
													&#8369;{parseFloat(sale.CashTendered).toFixed(2)}
												</td>
											</tr>
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-right">
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

export default ViewSale;
