// This component prints the invoice for the pos
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../helper/dateHelper";
import Loader from "../../../layout/Loader";
import ReactToPrint from "react-to-print";
import PurchaseService from "../../../../services/PurchaseService";
import PurchaseDetailService from "../../../../services/PurchaseDetailService";

const PrintPO = () => {
	const { id } = useParams();
	let componentRef = useRef();

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
						<td className="text-center">{item.medicine.SupplierPrice}</td>
						<td className="text-right">{item.Total}</td>
					</tr>
				))
			);
		};

		return (
			<div className="container" style={{ color: "black" }}>
				<style>{getPageMargins()}</style>
				<div className="row">
					<div className="col-xs-12 mt-3">
						<div className="invoice-title">
							<h3 className="pull-right">PO Code: {purchase.POCode}</h3>
						</div>
						<hr />
					</div>
					<div className="row">
						<div className="col-xs-6 text-right">
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
													<strong>Total</strong>
												</td>
											</tr>
										</thead>
										<tbody>
											{/* <!-- foreach ($order->lineItems as $line) or some such thing here --> */}
											{renderItems()}
											<tr>
												<td className="no-line"></td>
												<td className="no-line"></td>
												<td className="no-line text-center">
													<strong>Total</strong>
												</td>
												<td className="no-line text-right">
													&#8369;{purchase.Total}
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
