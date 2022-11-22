// This component is for POS
import { useState, useEffect } from "react";

const POS = () => {
	return (
		<div className="min-height-85 d-flex flex-row justify-content-between gap-1">
			<div className="d-flex flex-column justify-content-between gap-1 col h-auto">
				<div className="h-50 border border-dark rounded simple-shadow">
					<form className="p-2 col-12 d-flex flex-row justify-content-between gap-1">
						<div className="col-8">
							<SearchProduct />
						</div>
						<SearchProductCode />
					</form>
					<div className="table-responsive max-height-85">
						<ProductTable />
					</div>
				</div>
				<div className="h-50 border border-dark rounded simple-shadow">
					<div className="table-responsive max-height-100">
						<OrderTable />
					</div>
				</div>
			</div>
			<div className="col-4 h-auto border border-dark rounded simple-shadow">
				<OrderInformation />
			</div>
		</div>
	);
};

const OrderInformation = (props) => {
	return (
		<div className="d-flex flex-column justify-content-between gap-7 p-3">
			<div>
				<h1 className="text-date">
					<strong>08:47:70 AM</strong>
				</h1>
				<h5 className="text-weight-medium">Tuesday, November 22, 2022</h5>
			</div>
			<div className="d-flex flex-column justify-content-between pt-7 gap-5">
				<div>
					<select
						className="form-select form-input mb-3"
						name="customer"
						id="customer"
					>
						<option value="Walk in">Walk in</option>
					</select>
					<select
						className="form-select form-input mb-3"
						name="discount"
						id="discount"
					>
						<option value="">Select discount</option>
					</select>
					<select className="form-select form-input" name="vat" id="vat">
						<option value="">Select VAT</option>
					</select>
				</div>
				<div>
					<h6>
						<strong>Total: </strong>
					</h6>
					<h6>
						<strong>Discount: </strong>
					</h6>
					<h6>
						<strong>VAT: </strong>
					</h6>
					<h6>
						<strong>VAT exempt sale: </strong>
					</h6>
					<h6>
						<strong>Grand Total: </strong>
					</h6>
					<div className="pt-3">
						<button className="btn btn-primary w-100 mb-2">
							Proceed to checkout
						</button>
						<button className="btn btn-secondary w-100">Cancel order</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const ProductTable = (props) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Barcode</th>
					<th scope="col">Product Name</th>
					<th scope="col">Generic Name</th>
					<th scope="col">Formulation</th>
					<th scope="col">Price</th>
					<th scope="col">Stock</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
			</tbody>
		</table>
	);
};

const OrderTable = (props) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Price</th>
					<th scope="col">Qty</th>
					<th scope="col">Total</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
			</tbody>
		</table>
	);
};

const SearchProductCode = (props) => {
	return (
		<input
			type="text"
			className="w-100 form-control form-input"
			placeholder="Scan product code"
			name="searchCode"
			id="searchCode"
		/>
	);
};

const SearchProduct = (props) => {
	return (
		<input
			type="text"
			className="w-100 form-control form-input"
			placeholder="Search product name"
			name="searchInput"
			id="searchInput"
		/>
	);
};

export default POS;
