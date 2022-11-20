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
					<div className="table-responsive table-fixed max-height-100">
						<OrderTable />
					</div>
				</div>
			</div>
			<div className="col-4 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<form className="col-11 col-lg-10 pb-5 mx-auto"></form>
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
			<tbody className="table-">
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
				<tr>
					<td>20000094935</td>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>Fluimucil</td>
					<td>400ml</td>
					<td>10.99</td>
					<td>15</td>
				</tr>
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

const OrderTable = () => {
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
			<tbody className="table-">
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
				<tr>
					<td>Acetylcysteine (Fluimucil)</td>
					<td>10.99</td>
					<td>1</td>
					<td>10.99</td>
					<td>X</td>
				</tr>
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

const ProductList = () => {};

export default POS;
