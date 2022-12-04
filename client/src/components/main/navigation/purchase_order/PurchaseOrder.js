// This component will add a purchase order
import { useState } from "react";
import MedicineService from "../../../../services/MedicineService";

const PurchaseOrder = () => {
	const [searchProduct, setSearchProduct] = useState("");
	const [supplierProducts, setSupplierProducts] = useState([]);

	const handleSearchProduct = (event) => {
		setSearchProduct(event.target.value);
		getAllProducts(event.target.value);
	};

	const getAllProducts = (title) => {
		MedicineService.getByTitleAndSupplier(title, 2)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="h-auto d-flex flex-column justify-content-between gap-1">
			<div className="d-flex flex-column flex-md-row justify-content-start gap-3">
				<OrderInformation
					searchProduct={searchProduct}
					handleSearchProduct={handleSearchProduct}
				/>
			</div>
			<div className="h-75 border border-dark rounded simple-shadow mt-3">
				<div className="table-responsive max-height-100">
					<ProductTable />
				</div>
			</div>
		</div>
	);
};

const OrderInformation = ({ searchProduct, handleSearchProduct }) => {
	return (
		<>
			<div className="col-sm-12 col-md-4">
				<label htmlFor="searchProduct">Search:</label>
				<div className="search-inner">
					<input
						type="text"
						className="form-control form-input"
						placeholder="Search Product"
						name="searchProduct"
						value={searchProduct}
						onChange={handleSearchProduct}
						required
					/>
					{/* <div className="input-group flex-nowrap">
						<button className="btn btn-secondary" type="button">
							Search
						</button>
					</div> */}
				</div>
				<div className="dropdown-items"></div>
			</div>
			<div className="col-sm-12 col-md-3">
				<label className="required" htmlFor="">
					P.O Code:
				</label>
				<input
					type="text"
					className="form-control form-input"
					placeholder="Search Product"
					required
				/>
			</div>
			<div className="col-sm-12 col-md-3">
				<label className="required" htmlFor="">
					Supplier:
				</label>
				<select name="" id="" className="form-select form-input">
					<option value="">Supplier</option>
				</select>
			</div>
		</>
	);
};

const ProductTable = () => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">PCode</th>
					<th scope="col">Item</th>
					<th scope="col">On hand</th>
					<th scope="col">Reorder</th>
					<th scope="col">Qty</th>
					<th scope="col">Unit Cost</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line text-center">
						<strong>Total</strong>
					</td>
					<td className="no-line text-right">&#8369; 100.00</td>
				</tr>
			</tbody>
		</table>
	);
};

export default PurchaseOrder;
