import React, { useState, useEffect, useRef } from "react";
import SupplierService from "../../../../services/SupplierService";
import Loader from "../../../layout/Loader";
import ReactToPrint from "react-to-print";

import logo from "../../../../asset/logo.png";

const SupplierList = () => {
	let componentRef = useRef();

	const [supplierList, setSupplierList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllInformation();
	}, []);

	const getAllInformation = async () => {
		await getAllSupplier();
	};

	const getAllSupplier = async () => {
		await SupplierService.getSupplier()
			.then((response) => {
				console.log(response.data);
				setSupplierList(response.data);
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
						<h4>Supplier List</h4>
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
							items={supplierList}
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
				items.map((supplier, index) => (
					<tr key={index}>
						<td>{supplier.SupplierName}</td>
						<td>{supplier.ContactPerson}</td>
						<td>{supplier.Address}</td>
						<td>{supplier.Mobile}</td>
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
					<h2 className="mt-3">Supplier List</h2>
				</div>
				<table className="table table-striped table-hover">
					<thead className="table-dark">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Contact Person</th>
							<th scope="col">Address</th>
							<th scope="col">Contact #</th>
						</tr>
					</thead>
					<tbody>{renderItems()}</tbody>
				</table>
			</div>
		);
	}
}

export default SupplierList;
