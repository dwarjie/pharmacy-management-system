// This component prints the invoice for the pos
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../../helper/dateHelper";
import Loader from "../../../layout/Loader";
import ReactToPrint from "react-to-print";
import PurchaseService from "../../../../services/PurchaseService";
import PurchaseDetailService from "../../../../services/PurchaseDetailService";

import logo from "../../../../asset/logo.png";

const PrintPO = () => {
	const { id } = useParams();
	let componentRef = useRef();
	let navigate = useNavigate();

	const [purchase, setPurchase] = useState({});
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPurchase(id);
		getOrderList(id);
	}, []);

	const getPurchase = async (id) => {
		await PurchaseService.getOnePurchase(id)
			.then((response) => {
				console.log(response.data);
				setPurchase(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getOrderList = async (id) => {
		await PurchaseDetailService.getOrderList(id)
			.then((response) => {
				console.log(response.data);
				setItems(response.data);
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
						<h4>PO Receipt</h4>
						<hr />
					</div>
					<div className="p-3">
						<div className="container p-3">
							<div className="container">
								<ComponentToPrint
									ref={(element) => (componentRef = element)}
									purchase={purchase}
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
									className="btn btn-secondary"
									onClick={() => navigate(`/pharmacy/inventory/purchase-list`)}
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
		const purchase = this.props.purchase;
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
						<td className="text-center">{item.Quantity}</td>
						<td className="text-center">
							{parseFloat(item.medicine.SupplierPrice).toFixed(2)}
						</td>
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
							<h3 className="pull-right">PO Code: {purchase.POCode}</h3>
						</div>
						<hr />
					</div>
					<div className="row">
						<div className="col-xs-6 text-left">
							<p>
								<strong>Order Date:</strong>
								<br />
								{formatDate(purchase.OrderDate)}
								<br />
							</p>
						</div>
						<div className="col-xs-6 d-flex flex-row justify-content-between">
							<p>
								<strong>Supplier:</strong>
								<br />
								{purchase.supplier.SupplierName}
							</p>
							<p>
								<strong>Contact Person:</strong>
								<br />
								{purchase.supplier.ContactPerson}
							</p>
							<p>
								<strong>Address:</strong>
								<br />
								{purchase.supplier.Address}
							</p>
							<p>
								<strong>Contact #:</strong>
								<br />
								{purchase.supplier.Mobile}
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
													<strong>Quantity</strong>
												</td>
												<td className="text-center">
													<strong>Price</strong>
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
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-right">
													<strong>Total Amount</strong>
												</td>
												<td className="no-line text-right">
													{parseFloat(purchase.Total).toFixed(2)}
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
export default PrintPO;
