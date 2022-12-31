// This component is for POS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	getCurrentTime,
	getCurrentDate,
	generateOrderNumber,
} from "../../../../helper/dateHelper";
import { checkQuantity, checkStock } from "../../../../helper/checkQuantity";
import { getOR, incrementOR } from "../../../../helper/ORHelper";
import MedicineService from "../../../../services/MedicineService";
import DiscountService from "../../../../services/DiscountService";
import VatService from "../../../../services/VatService";
import SaleService from "../../../../services/SaleService";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

// icons
import { MdDelete } from "react-icons/md";
import parseDropdownValue from "../../../../helper/parseJSON";
import SalesDetailService from "../../../../services/SalesDetailService";
import Loader from "../../../layout/Loader";

const POS = (props) => {
	let navigate = useNavigate();
	const initialSalesValue = {
		OrderNo: generateOrderNumber(),
		ORNumber: "",
		OrderDate: getCurrentDate(),
		CustomerName: "Walk in",
		Discount: 0,
		VAT: 0,
		Total: 0,
		GrossAmount: 0,
	};

	const initialActiveDropDownValue = {
		discountId: "",
		VATId: "",
		discountAmount: 0,
		discountType: "",
		VATAmount: 0,
	};

	const [sale, setSale] = useState(initialSalesValue);
	const [cashTendered, setCashTendered] = useState("");
	const [products, setProducts] = useState([]);
	const [orderList, setOrderList] = useState([]);
	const [discountList, setDiscountList] = useState([]);
	const [vatList, setVatList] = useState([]);
	const [activeDropDownValue, setActiveDropDownValue] = useState(
		initialActiveDropDownValue
	);
	const [searchCode, setSearchCode] = useState("");
	const [changeAmount, setChangeAmount] = useState(0);
	const [currentTime, setCurrentTime] = useState(null);
	const [specialDiscount, setSpecialDiscount] = useState(false);
	const [loading, setLoading] = useState(true);

	// compute the Grand Total amount
	useEffect(() => {
		setSaleInformation();
	}, [orderList, activeDropDownValue]);

	// get current time and auto update every second
	useEffect(() => {
		setInterval(() => setCurrentTime(getCurrentTime()), 1000);
	}, []);

	// get the discounts and vat
	useEffect(() => {
		getAllDiscount();
		getAllVAT();
		setORNumber();
	}, []);

	// set the ORNumber once the page loaded
	const setORNumber = async () => {
		let orNumber = await getOR();
		setSale((prevState) => ({ ...prevState, ORNumber: orNumber.CurrentOR }));
		setLoading(false);
	};

	// create the sales for the salesDetails
	// then return the id of the sale
	const createSale = async () => {
		let saleId = 0;
		await SaleService.createSale(sale)
			.then((response) => {
				console.log(response.data);
				setLoading(true);
				incrementOR();
				saleId = response.data.data.id;
			})
			.catch((err) => {
				console.log(err);
			});
		return saleId;
	};

	// create the salesdetails one by one
	const createSalesDetails = async (saleId) => {
		await orderList.forEach((order) => {
			order.saleId = saleId;
			SalesDetailService.createSalesDetails(order)
				.then((response) => {
					console.log(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	const decreaseProductStock = async () => {
		await orderList.forEach((product) => {
			let data = {
				Quantity: product.Quantity,
			};

			MedicineService.updateDecreaseMedicineStock(product.medicineId, data)
				.then((response) => {
					console.log(response.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	// ask the user if they want to print, else stay and reset the page
	const printInvoice = () => {
		// ask the user
		navigate(`/pharmacy/sales/pos/print`, {
			state: {
				sale: sale,
				orderList: orderList,
			},
		});
	};

	const checkOut = async () => {
		// ask for confirmation
		if (!AlertPrompt("Are you sure you want to check out?")) {
			return;
		}

		// if proceed checkout,
		// create the sale of the order, return the id order
		// use the salesId in order to foreign key into SalesDetails
		// then if successful, incrementOR for the next transaction
		// and set the ORNumber of the next transaction
		// then ask the user if they want to print the receipt
		let saleId = await createSale();
		await createSalesDetails(saleId);
		await decreaseProductStock();
		printInvoice();
	};

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
				setActiveDropDownValue({
					...activeDropDownValue,
					VATId: response.data.VatName,
					VATAmount: response.data.VatAmount,
				});
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

	const findByCode = (code) => {
		MedicineService.getByCode(code)
			.then((response) => {
				console.log(response.data);
				// check if response is not null, else
				// add the scanned product to the order list
				setSearchCode("");
				if (typeof response.data !== "object") {
					return alert("Product does not exist.");
				}
				addProduct(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// delete an order in the list
	// use array map, check the medicineId
	const deleteOrder = (orderIndex) => {
		orderList.splice(orderIndex, 1);
		setSaleInformation();
	};

	// set the sale information
	const setSaleInformation = () => {
		// check if orderList is not empty
		if (orderList.length !== 0) {
			let total = computeTotal();
			let discount = computeDiscount(total);
			let vat = computeVAT(total);

			setSale((previousSale) => ({
				...previousSale,
				GrossAmount: total,
				Discount: discount.toFixed(2),
				VAT: vat.toFixed(2),
				Total: (total - discount + vat).toFixed(2),
			}));
		} else {
			setSale({
				...sale,
				GrossAmount: 0.0,
				Discount: 0.0,
				VAT: 0.0,
				Total: 0.0,
			});
		}
	};

	// compute the total amount, vat and discount of the transaction
	const computeTotal = () => {
		let total = 0;
		orderList.map((order, index) => {
			total += order.Total;
		});
		return total.toFixed(2);
	};

	// compute the discount base on the selected discount and current total
	const computeDiscount = (grossAmount) => {
		if (activeDropDownValue.discountId === "" || parseFloat(grossAmount) === 0)
			return 0;

		// check the discount type if percentage or fixed
		if (activeDropDownValue.discountType === "%") {
			let percentage = parseFloat(activeDropDownValue.discountAmount) / 100;
			let amount = percentage * grossAmount;

			return amount;
		} else {
			return parseFloat(activeDropDownValue.discountAmount);
		}
	};

	// compute the VAT base on the selected VAT and current total
	const computeVAT = (grossAmount) => {
		if (activeDropDownValue.VATId === "" || grossAmount === 0) return 0;
		if (specialDiscount) return 0;

		let percentage = parseFloat(activeDropDownValue.VATAmount) / 100;
		let amount = percentage * parseFloat(grossAmount);

		return amount;
	};

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

	// add product into the order list
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
					saleId: 0,
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
					if (parseInt(product.Quantity) < selectedProduct.Quantity) {
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

	// refresh the page
	const refreshPage = () => {
		setSale(initialSalesValue);
		setORNumber();
		setOrderList([]);
		setProducts([]);
		setActiveDropDownValue(initialActiveDropDownValue);
		setCashTendered("");
		setChangeAmount(0);
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<div className="min-height-85 d-flex flex-row justify-content-between gap-1">
					<div className="d-flex flex-column justify-content-between gap-1 col h-auto">
						<div className="h-50 border border-dark rounded simple-shadow">
							<form className="p-2 col-12 d-flex flex-row justify-content-between gap-1">
								<SearchProductCode
									findByCode={findByCode}
									searchCode={searchCode}
									setSearchCode={setSearchCode}
								/>
								<div className="col-8">
									<SearchProduct
										findByTitle={findByTitle}
										setProducts={setProducts}
									/>
								</div>
							</form>
							<div className="table-responsive max-height-85">
								<ProductTable
									products={products}
									orderList={orderList}
									setOrderList={setOrderList}
									addProduct={addProduct}
								/>
							</div>
						</div>
						<div className="h-50 border border-dark rounded simple-shadow">
							<div className="table-responsive max-height-100">
								<OrderTable
									orderList={orderList}
									setSaleInformation={setSaleInformation}
									deleteOrder={deleteOrder}
								/>
							</div>
						</div>
					</div>
					<div className="col-4 h-auto border border-dark rounded simple-shadow">
						<OrderInformation
							currentTime={currentTime}
							sale={sale}
							changeAmount={changeAmount}
							setChangeAmount={setChangeAmount}
							orderList={orderList}
							cashTendered={cashTendered}
							activeDropDownValue={activeDropDownValue}
							discountList={discountList}
							vatList={vatList}
							setSale={setSale}
							setCashTendered={setCashTendered}
							setActiveDropDownValue={setActiveDropDownValue}
							setSpecialDiscount={setSpecialDiscount}
							checkOut={checkOut}
							refreshPage={refreshPage}
						/>
					</div>
				</div>
			)}
		</>
	);
};

const OrderInformation = (props) => {
	const {
		currentTime,
		orderList,
		sale,
		changeAmount,
		activeDropDownValue,
		discountList,
		vatList,
		setSale,
		setChangeAmount,
		setActiveDropDownValue,
		cashTendered,
		setCashTendered,
		checkOut,
		setSpecialDiscount,
		refreshPage,
	} = props;

	useEffect(() => {
		computeChange();
	}, [cashTendered, sale.Total]);

	// compute the change of the customer
	const computeChange = () => {
		if (cashTendered !== "") {
			setChangeAmount(
				(parseFloat(cashTendered) - parseFloat(sale.Total)).toFixed(2)
			);
		} else {
			setChangeAmount(0);
		}
	};

	// check if the cash tendered is >= grand total
	const checkPayment = () => {
		if (parseFloat(cashTendered) - parseFloat(sale.Total) >= 0) return true;

		return false;
	};

	return (
		<div className="d-flex flex-column justify-content-between gap-6 p-3">
			<div>
				<h1 className="text-date">
					<strong>{currentTime}</strong>
				</h1>
				<h5 className="text-weight-medium">{getCurrentDate()}</h5>
			</div>
			<div className="d-flex flex-column justify-content-between pt-4 gap-3">
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
						disabled={orderList.length > 0 ? false : true}
						value={activeDropDownValue.discountId}
						onChange={(event) => {
							let data = parseDropdownValue(event);
							console.log(data);
							setActiveDropDownValue({
								...activeDropDownValue,
								discountId: data.DiscountName,
								discountAmount: data.DiscountAmount,
								discountType: data.DiscountType,
							});
							// if senior/pwd is discount, set special discount true
							if (data.id === 1) {
								setSpecialDiscount(true);
							} else {
								setSpecialDiscount(false);
							}
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
					{/* //TODO: CHANGE INTO INPUT, AND REMOVE VAT IF DISCOUNT IS SC OR PWD */}
					<input
						type="text"
						className="form-control form-input"
						name="VATId"
						id="VATId"
						disabled={true}
						value={activeDropDownValue.VATId}
					/>
					{/* <select
						className="form-select form-input"
						name="VATId"
						id="VATId"
						disabled={orderList.length > 0 ? false : true}
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
					</select> */}
				</div>
				<div>
					<h6>
						<strong>Discount Percentage/Fixed:</strong>{" "}
						{`${activeDropDownValue.discountAmount} ${
							activeDropDownValue.discountType !== ""
								? "(" + activeDropDownValue.discountType + ")"
								: ""
						}`}
					</h6>
					<h6>
						<strong>Discount Amount &#8369;:</strong> {sale.Discount}
					</h6>
					<h6 className="text-weight-regular">
						<strong>VAT Exempt Sales &#8369;: </strong> {sale.GrossAmount}
					</h6>
					<h6>
						<strong>VAT %:</strong> {sale.VAT}
					</h6>
					<h6>
						<strong>Total Amount &#8369;: </strong> {sale.Total}
					</h6>
					<h6>
						<strong>Cash Tendered &#8369;:</strong>
					</h6>
					<input
						className="form-control form-input mb-3"
						min={1}
						disabled={orderList.length > 0 ? false : true}
						placeholder="Input cash tender"
						type="number"
						name="cashTendered"
						id="cashTendered"
						value={cashTendered}
						onChange={(event) => {
							setCashTendered(event.target.value);
						}}
					/>
					<h6>
						<strong>Change &#8369;:</strong> {changeAmount}
					</h6>
					<div className="pt-3">
						<button
							className="btn btn-primary w-100 mb-2"
							onClick={checkOut}
							disabled={orderList.length > 0 && checkPayment() ? false : true}
						>
							Checkout
						</button>
						<button
							className="btn btn-secondary w-100"
							disabled={orderList.length > 0 ? false : true}
							onClick={() => window.location.reload()}
						>
							Cancel order
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const ProductTable = (props) => {
	const { products, addProduct } = props;

	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th scope="col">Barcode</th>
					<th scope="col">Item</th>
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
	const { orderList, setSaleInformation, deleteOrder } = props;

	const getProductTotal = (product) => {
		product.Total = product.UnitPrice * product.Quantity;
		return product.Total.toFixed(1);
	};

	const handleQuantityChange = (event, order) => {
		let value = event.target.value;
		if (checkStock(order.maxQuantity, value)) {
			if (parseInt(value) !== 0) {
				order.Quantity = value;
			} else {
				alert("Please input a valid quantity!");
			}
		} else {
			alert("Insufficient Quantity!");
		}
	};

	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Item</th>
					<th scope="col">Price</th>
					<th scope="col">Qty</th>
					<th scope="col">Sub-Total</th>
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
									className="form-control w-30 p-1"
									value={order.Quantity}
									onChange={(event) => {
										handleQuantityChange(event, order);
										getProductTotal(order);
										setSaleInformation();
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
									<MdDelete
										className="icon-size-sm cursor-pointer"
										onClick={() => deleteOrder(index)}
									/>
								</span>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

const SearchProductCode = (props) => {
	const { findByCode, searchCode, setSearchCode } = props;

	const checkKeyPress = (e) => {
		if (searchCode !== "") {
			if (e.keyCode === 32) {
				findByCode(searchCode);
			}
		}
	};

	return (
		<input
			type="text"
			className="w-100 form-control form-input"
			placeholder="Scan product code"
			name="searchInput"
			id="searchInput"
			value={searchCode}
			onKeyPress={(event) => checkKeyPress(event)}
			onChange={(event) => setSearchCode(event.target.value)}
		/>
	);
};

const SearchProduct = (props) => {
	const { findByTitle, setProducts } = props;

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
				onClick={() => {
					setSearchInput("");
					setProducts([]);
				}}
			>
				Clear
			</button>
		</div>
	);
};

export default POS;
