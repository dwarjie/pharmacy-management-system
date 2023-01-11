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
				<div className="col-12 h-auto">
					<div className="p-2">
						<h4>Inventory Valuation</h4>
						<hr />
					</div>
					<div className="p-2">
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
						<td>{parseFloat(product.SupplierPrice).toFixed(2)}</td>
						<td>{parseFloat(product.SellingPrice).toFixed(2)}</td>
					</tr>
				))
			);
		};

		const getUnitTotal = () => {
			let unitTotal = 0;
			items.map((product, index) => {
				unitTotal += product.SupplierPrice;
			});

			return unitTotal.toFixed(2);
		};

		const getPriceTotal = () => {
			let priceTotal = 0;
			items.map((product, index) => {
				priceTotal += product.SellingPrice;
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
					<h2 className="mt-3">Inventory Valuation</h2>
				</div>
				<div className="table-responsive">
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
								<td className="no-line text-right">
									<strong>Grand Total: </strong>
								</td>
								<td className="no-line text-right">
									&#8369;{parseFloat(getUnitTotal()).toFixed(2)}
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

export default InventoryValuation;
