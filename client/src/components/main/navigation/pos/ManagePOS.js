// This component shows the past transactions and view them
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, getCurrentDate } from "../../../../helper/dateHelper";
import SaleService from "../../../../services/SaleService";
import Loader from "../../../layout/Loader";
import ReactToPrint from "react-to-print";

// icons
import { FaEye } from "react-icons/fa";
import logo from "../../../../asset/logo.png";

const ManagePOS = () => {
	let componentRef = useRef();
	let navigate = useNavigate();

	const initialSearchDate = {
		from: formatDate(getCurrentDate()) || "",
		to: formatDate(getCurrentDate()) || "",
	};

	const [sales, setSales] = useState([]);
	const [searchDate, setSearchDate] = useState(initialSearchDate);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllSales();
	}, []);

	useEffect(() => {
		setLoading(true);
		getAllSales();
	}, [searchDate]);

	const getAllSales = () => {
		let dateObj = {
			from: searchDate.from,
			to: searchDate.to,
		};

		SaleService.getAllByDate(dateObj)
			.then((response) => {
				console.log(response.data);
				setSales(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const viewSale = (sale) => {
		navigate(`/pharmacy/sales/sales-list/${sale.id}`);
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
						<h4>Sales List</h4>
						<hr />
					</div>
					<div className="p-2">
						<div className=" d-flex flex-row flex-wrap gap-3 justify-content-start align-items-end pb-3">
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
							items={sales}
							viewSale={viewSale}
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
				items.map((sale, index) => (
					<tr
						key={index}
						className="cursor-pointer"
						onClick={() => this.props.viewSale(sale)}
					>
						<td>{sale.OrderNo}</td>
						<td>{sale.CustomerName}</td>
						<td>{formatDate(sale.OrderDate)}</td>
						<td>&#8369;{parseFloat(sale.Total).toFixed(2)}</td>
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
			<div className="" style={{ color: "black" }}>
				<style>{getPageMargins()}</style>
				<div className="d-flex flex-column align-items-center">
					<img src={logo} alt="" className="d-block col-12 mx-auto w-20" />
					<br />
					<h6>ActivCare Home Health Solution Inc.</h6>
					<h6>3 Santa Rosa St, Pasig, 1603 Metro Manila</h6>
					<h2 className="mt-3">Sales List</h2>
				</div>
				<div className="table-responsive">
					<table className="table table-striped table-hover">
						<thead className="table-dark">
							<tr>
								<th scope="col">Order No</th>
								<th scope="col">Customer Name</th>
								<th scope="col">Date</th>
								<th scope="col">Total</th>
							</tr>
						</thead>
						<tbody>
							{renderItems()}
							<tr>
								<td className="no-line"></td>
								<td className="no-line"></td>
								<td className="no-line text-right">
									<strong>Grand Total: </strong>
								</td>
								<td className="no-line text-right">
									&#8369;{parseFloat(getPriceTotal()).toFixed(2)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default ManagePOS;
