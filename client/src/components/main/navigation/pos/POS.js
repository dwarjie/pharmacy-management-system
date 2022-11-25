// This component is for POS
import { useState, useEffect } from "react";
import { getCurrentTime, getCurrentDate } from "../../../../helper/dateHelper";
import MedicineService from "../../../../services/MedicineService";
import DiscountService from "../../../../services/DiscountService";
import VatService from "../../../../services/VatService";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";

// icons
import { AiFillMinusCircle } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import parseDropdownValue from "../../../../helper/parseJSON";

const POS = (props) => {
	// const { initialActiveDropDownValue, initialOrderList } = props;

	const initialActiveDropDownValue = {
		discountId: "",
		VATId: "",
		discountAmount: 0,
		discountType: "",
		VATAmount: 0,
	};

	const [products, setProducts] = useState([]);
	const [orderList, setOrderList] = useState([]);
	const [discountList, setDiscountList] = useState([]);
	const [vatList, setVatList] = useState([]);
	const [activeDropDownValue, setActiveDropDownValue] = useState(
		initialActiveDropDownValue
	);
	const [currentTime, setCurrentTime] = useState(null);

	// get current time and auto update every second
	useEffect(() => {
		setInterval(() => setCurrentTime(getCurrentTime()), 1000);
	}, []);

	useEffect(() => {
		getAllDiscount();
		getAllVAT();
	}, []);

	// get all the discounts
	const getAllDiscount = () => {
		DiscountService.getAllDiscount()
			.then((response) => {
				console.log(response.data);
				setDiscountList(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// get all the vats
	const getAllVAT = () => {
		VatService.getAllVAT()
			.then((response) => {
				console.log(response.data);
				setVatList(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
				<OrderInformation
					currentTime={currentTime}
					activeDropDownValue={activeDropDownValue}
					discountList={discountList}
					vatList={vatList}
					setActiveDropDownValue={setActiveDropDownValue}
				/>
			</div>
		</div>
	);
};

const OrderInformation = (props) => {
	const {
		currentTime,
		activeDropDownValue,
		discountList,
		vatList,
		setActiveDropDownValue,
	} = props;

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
						name="discountId"
						id="discountId"
						value={activeDropDownValue.discountId}
						onChange={(event) => {
							let data = parseDropdownValue(event);
							setActiveDropDownValue({
								...activeDropDownValue,
								discountId: data.DiscountName,
								discountAmount: data.DiscountAmount,
								discountType: data.DiscountType,
							});
						}}
					>
						<DropDownDefaultOption content={"Select Discount"} />
						{discountList &&
							discountList.map((discount, index) => (
								<option
									className="dropdown-item"
									value={discount.DiscountName}
									key={index}
									data-value={JSON.stringify(discount)}
								>
									{discount.DiscountName}
								</option>
							))}
					</select>
					<select
						className="form-select form-input"
						name="VATId"
						id="VATId"
						value={activeDropDownValue.VATId}
						onChange={(event) => {
							let data = parseDropdownValue(event);
							setActiveDropDownValue({
								...activeDropDownValue,
								VATId: data.VatName,
								VATAmount: data.VatAmount,
							});
						}}
					>
						<DropDownDefaultOption content={"Select VAT"} />
						{vatList &&
							vatList.map((vat, index) => (
								<option
									value={vat.VatName}
									className="dropdown-item"
									key={index}
									data-value={JSON.stringify(vat)}
								>
									{vat.VatName}
								</option>
							))}
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
			maxQuantity: selectedProduct.Quantity,
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
							<td>
								<input
									type="number"
									min={1}
									max={order.maxQuantity}
									className="form-control w-20"
									value={order.Quantity}
									onChange={(event) => {
										order.Quantity = event.target.value;
									}}
								/>
							</td>
							<td>{order.Total}</td>
							<td>
								{/* <span className="px-1">
									<IoMdAddCircle
										className="icon-size-sm cursor-pointer"
									/>
								</span>
								<span className="px-1">
									<AiFillMinusCircle className="icon-size-sm cursor-pointer" />
								</span> */}
								<span className="px-1">
									<MdDelete className="icon-size-sm cursor-pointer" />
								</span>
							</td>
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
