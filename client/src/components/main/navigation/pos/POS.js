// This component is for POS
import { useState, useEffect } from "react";
import { getCurrentTime, getCurrentDate } from "../../../../helper/dateHelper";
import { checkQuantity } from "../../../../helper/checkQuantity";
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
	const initialSalesValue = {
		OrderNo: "",
		OrderDate: getCurrentDate(),
		CustomerName: "Walk in",
		Discount: 0,
		VAT: 0,
		Total: 0,
	};

	const initialActiveDropDownValue = {
		discountId: "",
		VATId: "",
		discountAmount: 0,
		discountType: "",
		VATAmount: 0,
	};

	const [sale, setSale] = useState(initialSalesValue);
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

	// get the discounts and vat
	useEffect(() => {
		getAllDiscount();
		getAllVAT();
	}, []);

	// compute the Grand Total amount
	useEffect(() => {
		computeTotal();
		computeDiscount();
		console.log("call");
	}, [orderList, activeDropDownValue.discountId]);

	// compute discount
	// useEffect(() => {
	// 	let discount = computeDiscount();
	// 	setSale({ ...sale, Discount: discount });
	// 	console.log("call");
	// }, [orderList, activeDropDownValue.discountId]);

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

	// compute the total amount of the transaction
	const computeTotal = () => {
		let total = 0;
		orderList.map((order, index) => {
			total += order.Total;
			console.log(total);
		});
		let discount = computeDiscount();
		setSale({
			...sale,
			Total: total.toFixed(1),
			Discount: discount.toFixed(1),
		});
	};

	// compute the discount base on the selected discount and current total
	const computeDiscount = () => {
		if (activeDropDownValue.discountId === "") return 0;

		// check the discount type if percentage or fixed
		if (activeDropDownValue.discountType === "%") {
			let percentage = parseFloat(activeDropDownValue.discountAmount) / 100;
			let amount = percentage * parseFloat(sale.Total);

			return amount;
		} else {
			return parseFloat(activeDropDownValue.discountAmount);
		}
	};

	// // compute the VAT base on the selected VAT and current total
	// const computeVAT = () => {
	// 	if (activeDropDownValue.VATId === "") return 0;

	// 	let percentage = parseFloat(activeDropDownValue.VATAmount) / 100;
	// 	let amount = percentage * parseFloat(sale.Total);

	// 	return amount;
	// };

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
						<OrderTable orderList={orderList} computeTotal={computeTotal} />
					</div>
				</div>
			</div>
			<div className="col-4 h-auto border border-dark rounded simple-shadow">
				<OrderInformation
					currentTime={currentTime}
					sale={sale}
					activeDropDownValue={activeDropDownValue}
					discountList={discountList}
					vatList={vatList}
					setSale={setSale}
					setActiveDropDownValue={setActiveDropDownValue}
				/>
			</div>
		</div>
	);
};

const OrderInformation = (props) => {
	const {
		currentTime,
		sale,
		activeDropDownValue,
		discountList,
		vatList,
		setSale,
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
						name="CustomerName"
						id="CustomerName"
						placeholder="Customer Name"
						value={sale.CustomerName}
						onChange={(event) =>
							setSale({ ...sale, CustomerName: event.target.value })
						}
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
						<strong>Total: {sale.Total}</strong>
					</h6>
					<h6>
						<strong>Discount: {sale.Discount}</strong>
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
						<button className="btn btn-primary w-100 mb-2">Checkout</button>
						<button className="btn btn-secondary w-100">Cancel order</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const ProductTable = (props) => {
	const { products, orderList, setOrderList } = props;

	// this function will check if order already exists in order list
	const checkOrderExist = (selectedProduct) => {
		let isExist = false;
		// check if the medicineId already exists in order list
		orderList.forEach((order) => {
			if (order.medicineId === selectedProduct.id) {
				isExist = true;
			}
		});

		return isExist;
	};

	const addProduct = (selectedProduct) => {
		if (!checkOrderExist(selectedProduct)) {
			// check if quantity is greater than 0 before adding to the order list
			if (checkQuantity(selectedProduct.Quantity)) {
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
			} else {
				alert("Insufficient Quantity!");
			}
		} else {
			// if order exists, check if quantity is < the order quantity then update the order quantity
			let order = orderList.map((product, index) => {
				if (product.medicineId === selectedProduct.id) {
					if (parseInt(product.Quantity) <= selectedProduct.Quantity) {
						product.Quantity = parseInt(product.Quantity) + 1;
					} else {
						alert("Insufficient Quantity!");
					}
				}
				return product;
			});

			setOrderList(order);
		}
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
	const { orderList, computeTotal } = props;

	const getProductTotal = (product) => {
		product.Total = product.UnitPrice * product.Quantity;
		return product.Total.toFixed(1);
	};

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
									inputMode="numeric"
									min={1}
									max={order.maxQuantity}
									className="form-control w-30"
									value={order.Quantity}
									onChange={(event) => {
										order.Quantity = event.target.value;
										getProductTotal(order);
										computeTotal();
									}}
								/>
							</td>
							<td>{getProductTotal(order)}</td>
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
		<div className="input-group flex-nowrap">
			<input
				type="text"
				className="w-100 form-control form-input"
				placeholder="Search product name"
				name="searchInput"
				id="searchInput"
				value={searchInput}
				onChange={(event) => setSearchInput(event.target.value)}
			/>
			<button
				className="btn btn-secondary"
				type="button"
				onClick={() => setSearchInput("")}
			>
				Clear
			</button>
		</div>
	);
};

export default POS;
