// This component views the specific sale of the POS
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { formatDate } from "../../../../helper/dateHelper";
import SaleService from "../../../../services/SaleService";
import SalesDetailService from "../../../../services/SalesDetailService";

const ViewSale = () => {
	let componentRef = useRef();
	const { id } = useParams();

	const [sale, setSale] = useState({});
	const [items, setItems] = useState([]);

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
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
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
								<button className="btn btn-primary mx-2">Print Receipt</button>
							)}
							content={() => componentRef}
						/>
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
					<div className="col-xs-12 mt-3">
						<div className="invoice-title">
							<h3 className="pull-right">Order # {sale.OrderNo}</h3>
							<h6 className="pull-left">OR # {sale.ORNumber}</h6>
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

export default ViewSale;
