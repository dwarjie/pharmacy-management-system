import React, { useState, useEffect, useRef } from "react";
import MedicineService from "../../../../services/MedicineService";
import Loader from "../../../layout/Loader";
import ReactToPrint from "react-to-print";
import { formatDate, getCurrentDate } from "../../../../helper/dateHelper";

import logo from "../../../../asset/logo.png";

const InventoryValuation = () => {
	let componentRef = useRef();

	const [productList, setProductList] = useState([]);
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
						<td>{product.SupplierPrice}</td>
						<td>{product.SellingPrice}</td>
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
							<th scope="col">Unit Cost</th>
							<th scope="col">Unit Price</th>
						</tr>
					</thead>
					<tbody>
						{renderItems()}
						<tr>
							<td className="no-line"></td>
							<td className="no-line text-center">
								<strong>Grand Total</strong>
							</td>
							<td className="no-line text-right">&#8369;{1.9}</td>
							<td className="no-line text-right">&#8369;{1.9}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default InventoryValuation;
