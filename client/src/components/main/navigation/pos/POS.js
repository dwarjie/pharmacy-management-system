// This component is for POS
import { useState, useEffect } from "react";
import { getCurrentTime, getCurrentDate } from "../../../../helper/dateHelper";
import MedicineService from "../../../../services/MedicineService";

const POS = () => {
	const [products, setProducts] = useState([]);
	const [orderList, setOrderList] = useState([]);
	const [currentTime, setCurrentTime] = useState(null);

	// get current time and auto update every second
	useEffect(() => {
		setInterval(() => setCurrentTime(getCurrentTime()), 1000);
	}, []);

	const findByTitle = (title) => {
		MedicineService.getByTitle(title)
			.then((response) => {
				console.log(response.data);
				setProducts(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="min-height-85 d-flex flex-row justify-content-between gap-1">
			<div className="d-flex flex-column justify-content-between gap-1 col h-auto">
				<div className="h-50 border border-dark rounded simple-shadow">
					<form className="p-2 col-12 d-flex flex-row justify-content-between gap-1">
						<div className="col-8">
							<SearchProduct findByTitle={findByTitle} />
						</div>
						<SearchProductCode />
					</form>
					<div className="table-responsive max-height-85">
						<ProductTable
							products={products}
							orderList={orderList}
							setOrderList={setOrderList}
						/>
					</div>
				</div>
				<div className="h-50 border border-dark rounded simple-shadow">
					<div className="table-responsive max-height-100">
						<OrderTable orderList={orderList} />
					</div>
				</div>
			</div>
			<div className="col-4 h-auto border border-dark rounded simple-shadow">
				<OrderInformation currentTime={currentTime} />
			</div>
		</div>
	);
};

const OrderInformation = (props) => {
	const { currentTime } = props;

	return (
		<div className="d-flex flex-column justify-content-between gap-7 p-3">
			<div>
				<h1 className="text-date">
					<strong>{currentTime}</strong>
				</h1>
				<h5 className="text-weight-medium">{getCurrentDate()}</h5>
			</div>
			<div className="d-flex flex-column justify-content-between pt-4 gap-5">
				<div>
					<input
						type="text"
						className="form-control form-input mb-3"
						name="customer"
						id="customer"
						placeholder="Customer Name"
					/>
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
	const { products, orderList, setOrderList } = props;

	const addProduct = (selectedProduct) => {
		let initialSelectedProduct = {
			UnitPrice: selectedProduct.SellingPrice,
			Quantity: 1,
			DiscountedPrice: 0,
			Total: selectedProduct.SellingPrice,
			medicineId: selectedProduct.id,
			salesId: 0,
			name: selectedProduct.ProductName,
		};

		setOrderList([...orderList, initialSelectedProduct]);
	};

	return (
		<table className="table table-hover">
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
				{products &&
					products.map((product, index) => (
						<tr
							key={index}
							className="cursor-pointer"
							onClick={() => addProduct(product)}
						>
							<td>{product.ProductCode}</td>
							<td>{product.ProductName}</td>
							<td>{product.GenericName}</td>
							<td>{product.ProductDetails}</td>
							<td>&#8369; {product.SellingPrice}</td>
							<td>{product.Quantity}</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

const OrderTable = (props) => {
	const { orderList } = props;

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
				{orderList &&
					orderList.map((order, index) => (
						<tr key={index}>
							<td>{order.name}</td>
							<td>{order.UnitPrice}</td>
							<td>{order.Quantity}</td>
							<td>{order.Total}</td>
							<td>X</td>
						</tr>
					))}
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
	const { findByTitle } = props;

	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		if (searchInput !== "") findByTitle(searchInput);
	}, [searchInput]);

	return (
		<input
			type="text"
			className="w-100 form-control form-input"
			placeholder="Search product name"
			name="searchInput"
			id="searchInput"
			value={searchInput}
			onChange={(event) => setSearchInput(event.target.value)}
		/>
	);
};

export default POS;
