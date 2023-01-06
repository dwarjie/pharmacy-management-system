import React, { useState, useEffect, useRef } from "react";
import MedicineService from "../../../../services/MedicineService";
import Loader from "../../../layout/Loader";
import ReactToPrint from "react-to-print";
import { formatDate, getCurrentDate } from "../../../../helper/dateHelper";

import logo from "../../../../asset/logo.png";
import StockAdjustmentService from "../../../../services/StockAdjustmentService";
import ReturnService from "../../../../services/ReturnService";
import InvoiceService from "../../../../services/InvoiceService";

const InvoiceHistory = () => {
	let componentRef = useRef();

	const initialSearchDate = {
		from: formatDate(getCurrentDate()) || "",
		to: formatDate(getCurrentDate()) || "",
	};

	const [productList, setProductList] = useState([]);
	const [searchDate, setSearchDate] = useState(initialSearchDate);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllInformation();
	}, []);

	useEffect(() => {
		setLoading(true);
		getAllStockAdjustment();
	}, [searchDate]);

	const getAllInformation = async () => {
		await getAllStockAdjustment();
	};

	const getAllStockAdjustment = async () => {
		let dateObj = {
			from: searchDate.from,
			to: searchDate.to,
		};

		await InvoiceService.getAllByDate(dateObj)
			.then((response) => {
				console.log(response.data);
				setProductList(response.data);
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
						<h4>Invoice Report</h4>
						<hr />
					</div>
					<div className="p-3">
						<div className="d-flex flex-row gap-3 justify-content-start align-items-end pb-3">
							<div>
								<label htmlFor="">From:</label>
								<input
									type="date"
									name="from"
									className="form-control form-input w-auto"
									value={formatDate(searchDate.from)}
									onChange={(event) =>
										setSearchDate((prevState) => ({
											...prevState,
											from: formatDate(event.target.value),
										}))
									}
								/>
							</div>
							<div>
								<label htmlFor="">To:</label>
								<input
									type="date"
									name="to"
									className="form-control form-input w-auto"
									value={formatDate(searchDate.to)}
									onChange={(event) =>
										setSearchDate((prevState) => ({
											...prevState,
											to: formatDate(event.target.value),
										}))
									}
								/>
							</div>
							<div>
								<ReactToPrint
									trigger={() => (
										<button className="btn btn-primary h-auto">
											Print All
										</button>
									)}
									content={() => componentRef}
								/>
							</div>
						</div>
						<ComponentToPrint
							ref={(element) => (componentRef = element)}
							items={productList}
						/>
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
		const items = this.props.items;

		const getPageMargins = () => {
			const marginTop = "50px";
			const marginRight = "10px";
			const marginBottom = "50px";
			const marginLeft = "10px";
			return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
		};

		const renderItems = () => {
			return (
				items &&
				items.map((product, index) => (
					<tr key={index}>
						<td>{product.InvoiceNo}</td>
						<td>{formatDate(product.InvoiceDate)}</td>
						<td>{formatDate(product.PaidDate)}</td>
						<td>{product.handler.FirstName}</td>
						<td>{product.patient.FirstName}</td>
						<td>{product.user.FirstName}</td>
						<td>{product.Total}</td>
					</tr>
				))
			);
		};

		const getPriceTotal = () => {
			let priceTotal = 0;
			items.map((product, index) => {
				priceTotal += product.Total;
			});

			return priceTotal.toFixed(2);
		};

		return (
			<div className="container" style={{ color: "black" }}>
				<style>{getPageMargins()}</style>
				<div className="d-flex flex-column align-items-center">
					<img src={logo} alt="" className="d-block col-12 mx-auto w-20" />
					<br />
					<h6>ActivCare Home Health Solution Inc.</h6>
					<h6>3 Santa Rosa St, Pasig, 1603 Metro Manila</h6>
					<h2 className="mt-3">Invoice Report</h2>
				</div>
				<table className="table table-striped table-hover">
					<thead className="table-dark">
						<tr>
							<th scope="col">Invoice #</th>
							<th scope="col">Order Date</th>
							<th scope="col">Paid Date</th>
							<th scope="col">Requested</th>
							<th scope="col">Patient</th>
							<th scope="col">Prepared</th>
							<th scope="col">Total</th>
						</tr>
					</thead>
					<tbody>
						{renderItems()}

						<tr>
							<td className="no-line"></td>
							<td className="no-line"></td>
							<td className="no-line"></td>
							<td className="no-line"></td>
							<td className="no-line"></td>
							<td className="no-line text-center">
								<strong>Grand Total</strong>
							</td>
							<td className="no-line text-right">&#8369;{getPriceTotal()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default InvoiceHistory;
