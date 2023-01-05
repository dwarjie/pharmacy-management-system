import React, { useState, useEffect, useRef } from "react";
import MedicineService from "../../../../services/MedicineService";
import Loader from "../../../layout/Loader";
import ReactToPrint from "react-to-print";
import { formatDate, getCurrentDate } from "../../../../helper/dateHelper";

import logo from "../../../../asset/logo.png";

const DeliveryHistory = () => {
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

	const getAllInformation = async () => {
		await getAllProducts();
	};

	const getAllProducts = async () => {
		await MedicineService.getAllMedicine()
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
						<h4>Master List</h4>
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
						<td>{product.ProductCode}</td>
						<td>{product.ProductName}</td>
						<td>{product.unit.UnitName}</td>
						<td>{product.subCategory.SubCategoryName}</td>
						<td>{product.supplier.SupplierName}</td>
						<td>{product.SupplierPrice}</td>
						<td>{product.SellingPrice}</td>
						<td>{product.ReorderPoint}</td>
						<td>{product.Quantity}</td>
					</tr>
				))
			);
		};

		return (
			<div className="container" style={{ color: "black" }}>
				<style>{getPageMargins()}</style>
				<div className="d-flex flex-column align-items-center">
					<img src={logo} alt="" className="d-block col-12 mx-auto w-20" />
					<br />
					<h6>ActivCare Home Health Solution Inc.</h6>
					<h6>3 Santa Rosa St, Pasig, 1603 Metro Manila</h6>
					<h2 className="mt-3">Master List</h2>
				</div>
				<table className="table table-striped table-hover">
					<thead className="table-dark">
						<tr>
							<th scope="col">PCode</th>
							<th scope="col">Name</th>
							<th scope="col">Unit</th>
							<th scope="col">Category</th>
							<th scope="col">Supplier</th>
							<th scope="col">Unit Cost</th>
							<th scope="col">Unit Price</th>
							<th scope="col">Critical Level</th>
							<th scope="col">Quantity</th>
						</tr>
					</thead>
					<tbody>{renderItems()}</tbody>
				</table>
			</div>
		);
	}
}

export default DeliveryHistory;
