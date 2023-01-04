// This component will add a purchase order
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { checkQuantity, checkStock } from "../../../../helper/checkQuantity";
import {
	formatDate,
	generateOrderNumber,
	getCurrentDate,
} from "../../../../helper/dateHelper";
import { useGlobalState } from "../../../../state";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";
import parseDropdownValue from "../../../../helper/parseJSON";
import Loader from "../../../layout/Loader";
import VatService from "../../../../services/VatService";
import InvoiceService from "../../../../services/InvoiceService";
import InvoiceDetailService from "../../../../services/InvoiceDetailService";
import MedicineService from "../../../../services/MedicineService";
import HandlerService from "../../../../services/HandlerService";
import PatientService from "../../../../services/PatientService";

// icons
import { MdDelete } from "react-icons/md";
import { getOR, incrementOR } from "../../../../helper/ORHelper";

// creating context API
const InvoiceContext = createContext();
const { Provider } = InvoiceContext;

const ChargeToAccount = (props) => {
	const {
		mode,
		initialInvoice,
		initialDropDownValue,
		initialOrderList,
		getOrderList,
	} = props;
	let [currentUser] = useGlobalState("currentUser");
	const navigate = useNavigate();

	const [invoice, setInvoice] = useState(initialInvoice);
	const [orderList, setOrderList] = useState(initialOrderList);
	const [products, setProducts] = useState([]);
	const [handlerList, setHandlerList] = useState([]);
	const [patientList, setPatientList] = useState([]);
	const [searchProduct, setSearchProduct] = useState("");
	const [searchProductCode, setSearchProductCode] = useState("");
	const [vat, setVat] = useState(0);
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDownValue);
	const [loading, setLoading] = useState(true);

	// create context value
	const contextValue = {
		currentUser,
		invoice,
		setInvoice,
		orderList,
		setOrderList,
		activeDropDownValue,
		setActiveDropDownValue,
		searchProduct,
		setSearchProduct,
		searchProductCode,
		setSearchProductCode,
		products,
		setProducts,
		setLoading,
	};

	useEffect(() => {
		setLoading(true);
		setInvoice(initialInvoice);
		setLoading(false);
	}, [initialInvoice]);

	useEffect(() => {
		setLoading(true);
		setOrderList(initialOrderList);
		setLoading(false);
	}, [initialOrderList]);

	useEffect(() => {
		getHandlers();
		setORNumber();
		getVAT();
		getPatients();
	}, []);

	useEffect(() => {
		setInvoiceInformation();
	}, [orderList]);

	const createChargeToAccount = async () => {
		let invoiceId = 0;
		await InvoiceService.createInvoice(invoice)
			.then((response) => {
				console.log(response.data);
				incrementOR();
				invoiceId = response.data.data.id;
			})
			.catch((err) => {
				console.log(err);
			});

		return invoiceId;
	};

	const createInvoiceDetails = async (invoiceId) => {
		await orderList.forEach((order) => {
			order.invoiceId = invoiceId;

			InvoiceDetailService.createInvoiceDetail(order)
				.then((response) => {
					console.log(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	const createSpecificItem = async (item) => {
		await InvoiceDetailService.createInvoiceDetail(item)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const decreaseSpecificItemStock = async (item, value) => {
		let data = {
			Quantity: value,
		};

		MedicineService.updateDecreaseMedicineStock(item.medicineId, data)
			.then((response) => {
				console.log(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
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

	const createInvoice = async (event) => {
		event.preventDefault();
		if (!AlertPrompt("Are you sure you want to create this invoice?")) return;

		setLoading(true);
		let invoiceId = await createChargeToAccount();
		await createInvoiceDetails(invoiceId);
		await decreaseProductStock();
		navigate(`/pharmacy/sales/charge-to-account/print/${invoiceId}`);
	};

	const updateInvoiceItem = async (item) => {
		await InvoiceDetailService.updateItem(item.id, item)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateInvoice = async (event) => {
		event.preventDefault();

		await InvoiceService.updateInvoice(invoice.id, invoice)
			.then((response) => {
				console.log(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteUpdateItem = async (item) => {
		await InvoiceDetailService.deleteItem(item.id)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteItem = async (event, item) => {
		if (!AlertPrompt()) return;

		setLoading(true);
		await deleteUpdateItem(item);
		await getOrderList(invoice.id);
		await updateInvoice(event);
	};

	// set the ORNumber once the page loaded
	const setORNumber = async () => {
		let orNumber = await getOR();
		setInvoice((prevState) => ({ ...prevState, ORNumber: orNumber.CurrentOR }));
	};

	const getHandlers = async () => {
		await HandlerService.getAllHandler()
			.then((response) => {
				console.log(response.data);
				setHandlerList(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getPatients = async () => {
		await PatientService.getAllPatient()
			.then((response) => {
				console.log(response.data);
				setPatientList(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAllProducts = async () => {
		await MedicineService.getByTitle(searchProduct)
			.then((response) => {
				console.log(response.data);
				setProducts(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getVAT = async () => {
		await VatService.getAllVAT()
			.then((response) => {
				console.log(response.data);
				setVat(parseFloat(response.data.VatAmount));
			})
			.catch((err) => {
				console.log(err);
			});
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
	const addProduct = async (event, selectedProduct) => {
		if (!checkOrderExist(selectedProduct)) {
			// check if quantity is greater than 0 before adding to the order list
			if (checkQuantity(selectedProduct.Quantity)) {
				// check if update mode
				if (!isUpdate()) {
					let initialSelectedProduct = {
						id: -1,
						PCode: selectedProduct.ProductCode,
						Item: selectedProduct.ProductName,
						OnHand: selectedProduct.Quantity,
						Quantity: 1,
						UnitPrice: selectedProduct.SellingPrice,
						Total: selectedProduct.SellingPrice,
						medicineId: selectedProduct.id,
						invoiceId: null,
					};
					setOrderList([...orderList, initialSelectedProduct]);
				} else {
					let initialSelectedProduct = {
						PCode: selectedProduct.ProductCode,
						Item: selectedProduct.ProductName,
						OnHand: selectedProduct.Quantity,
						Quantity: 1,
						UnitPrice: selectedProduct.SellingPrice,
						Total: selectedProduct.SellingPrice,
						medicineId: selectedProduct.id,
						invoiceId: invoice.id,
					};
					setLoading(true);
					await createSpecificItem(initialSelectedProduct);
					await getOrderList(invoice.id);
					await updateInvoice(event);
				}
			} else {
				alert("Insufficient Quantity!");
			}
		}
	};

	// set the sale information
	const setInvoiceInformation = () => {
		// check if orderList is not empty
		if (orderList.length !== 0) {
			let grossAmount = parseFloat(computeTotal());
			let vat = parseFloat(computeVAT(grossAmount));
			let total = parseFloat(grossAmount + vat).toFixed(2);

			setInvoice((prevState) => ({
				...prevState,
				GrossAmount: grossAmount,
				VAT: vat,
				Total: total,
			}));
		} else {
			setInvoice((prevState) => ({
				...prevState,
				GrossAmount: 0,
				VAT: 0,
				Total: 0,
			}));
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

	// compute the VAT base on the selected VAT and current total
	const computeVAT = (grossAmount) => {
		let percentage = parseFloat(vat) / 100;
		let amount = percentage * parseFloat(grossAmount);

		return amount.toFixed(2);
	};

	// delete an order in the list
	// use array map, check the medicineId
	const deleteOrder = (orderIndex) => {
		const newOrderList = orderList.filter((item, index) => {
			if (index !== orderIndex) return item;
		});

		setOrderList(newOrderList);
	};

	const isUpdate = () => {
		if (mode !== "update") {
			return false;
		}
		return true;
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<Provider value={contextValue}>
					<div className="h-auto d-flex flex-column justify-content-between gap-1">
						<div className="col-12 h-auto">
							<InvoiceInformation
								patientList={patientList}
								handlerList={handlerList}
								createInvoice={createInvoice}
								isUpdate={isUpdate}
								updateInvoice={updateInvoice}
							/>
							<SearchProduct
								getAllProducts={getAllProducts}
								addProduct={addProduct}
							/>
						</div>
						<div className="h-75 border border-dark rounded simple-shadow mt-3">
							<div className="table-responsive max-height-100">
								<ProductTable
									isUpdate={isUpdate}
									deleteOrder={deleteOrder}
									deleteItem={deleteItem}
									decreaseSpecificItemStock={decreaseSpecificItemStock}
									updateInvoiceItem={updateInvoiceItem}
									getOrderList={getOrderList}
								/>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<label htmlFor="">Remarks:</label>
							<textarea
								className="form-control form-input"
								placeholder="Invoice Remarks"
								value={invoice.Remarks}
								onChange={(event) => {
									setInvoice((prevState) => ({
										...prevState,
										Remarks: event.target.value,
									}));
								}}
							></textarea>
						</div>
						<div className="w-auto">
							<button
								type="submit"
								form="main-form"
								className="btn btn-primary simple-shadow mt-2 me-3"
								disabled={orderList.length === 0 ? true : false}
							>
								{isUpdate() ? "Update" : "Create"}
							</button>
							<button
								type="button"
								className="btn btn-dark simple-shadow mt-2 me-3"
							>
								Print
							</button>
							<button
								type="button"
								className="btn btn-secondary simple-shadow mt-2 me-3"
								onClick={() => navigate(-1)}
							>
								Cancel
							</button>
						</div>
					</div>
				</Provider>
			)}
		</>
	);
};

const InvoiceInformation = ({
	handlerList,
	patientList,
	createInvoice,
	updateInvoice,
	isUpdate,
}) => {
	const {
		currentUser,
		invoice,
		setInvoice,
		activeDropDownValue,
		setActiveDropDownValue,
	} = useContext(InvoiceContext);

	return (
		<form
			id="main-form"
			onSubmit={(event) =>
				isUpdate() ? updateInvoice(event) : createInvoice(event)
			}
		>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Invoice #:
					</label>
					<input
						type="text"
						className="form-control form-input"
						placeholder="Invoice No"
						value={invoice.InvoiceNo}
						onChange={(event) =>
							setInvoice({ ...invoice, InvoiceNo: event.target.value })
						}
						required
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Invoice Date:
					</label>
					<input
						type="date"
						className="form-control form-input"
						value={formatDate(invoice.InvoiceDate)}
						onChange={(event) =>
							setInvoice({
								...invoice,
								InvoiceDate: formatDate(event.target.value),
							})
						}
						required
					/>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Requested By:
					</label>
					<select
						name="handler"
						className="form-select form-input"
						required
						value={activeDropDownValue.handler}
						onChange={(event) => {
							let data = parseDropdownValue(event);
							setActiveDropDownValue((prevState) => ({
								...prevState,
								handler: data.FirstName,
							}));
							setInvoice((prevState) => ({ ...prevState, handlerId: data.id }));
						}}
					>
						<DropDownDefaultOption content={"Select Handler"} />
						{handlerList &&
							handlerList.map((handler, index) => (
								<option
									value={handler.FirstName}
									className="dropdown-item"
									key={index}
									data-value={JSON.stringify(handler)}
								>
									{handler.FirstName}
								</option>
							))}
					</select>
				</div>
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Due Date:
					</label>
					<input
						type="date"
						className="form-control form-input"
						value={formatDate(invoice.DueDate)}
						onChange={(event) =>
							setInvoice({
								...invoice,
								DueDate: formatDate(event.target.value),
							})
						}
						required
					/>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Patient:
					</label>
					<select
						name="patient"
						className="form-select form-input"
						required
						value={activeDropDownValue.patient}
						onChange={(event) => {
							let data = parseDropdownValue(event);
							setActiveDropDownValue((prevState) => ({
								...prevState,
								patient: data.FirstName,
							}));
							setInvoice((prevState) => ({ ...prevState, patientId: data.id }));
						}}
					>
						<DropDownDefaultOption content={"Select Patient"} />
						{patientList &&
							patientList.map((patient, index) => (
								<option
									value={patient.FirstName}
									className="dropdown-item"
									key={index}
									data-value={JSON.stringify(patient)}
								>
									{patient.FirstName}
								</option>
							))}
					</select>
				</div>
				<div className="col-sm-12 col-md">
					<label htmlFor="">Prepared By:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled
						defaultValue={activeDropDownValue.user}
					/>
				</div>
			</div>
		</form>
	);
};

const ProductTable = ({
	deleteOrder,
	deleteItem,
	isUpdate,
	decreaseSpecificItemStock,
	updateInvoiceItem,
	getOrderList,
}) => {
	const { orderList, setOrderList, invoice, setLoading } =
		useContext(InvoiceContext);

	const [lastValue, setLastValue] = useState(-1);

	const getProductTotal = (order) => {
		order.Total = order.UnitPrice * order.Quantity;
		return order.Total.toFixed(2);
	};

	const handleQuantityChange = (event, order, i) => {
		let value = parseInt(event.target.value);
		if (!checkQuantity(value)) return alert("Please input a valid quantity!");

		const newOrderList = orderList.map((order, index) => {
			if (index !== i) return order;

			if (checkQuantity(value)) {
				return { ...order, Quantity: value };
			} else {
				return order;
			}
		});
		setOrderList(newOrderList);
	};

	const handleStockCheck = (event, order, i) => {
		let value = parseInt(event.target.value);

		if (!checkStock(order.OnHand, value) || isNaN(value)) {
			alert("Insufficient Quantity!");

			const newOrderList = orderList.map((order, index) => {
				if (index !== i) return order;

				if (checkQuantity(value)) {
					if (isUpdate()) {
						return { ...order, Quantity: lastValue };
					} else {
						return { ...order, Quantity: 1 };
					}
				} else {
					return order;
				}
			});
			setOrderList(newOrderList);
		} else {
			if (!isUpdate()) return;

			updateQuantityStock(order, value);
		}
	};

	const updateQuantityStock = async (item, value) => {
		// check if mode is update, if yes decrease product quantity with the new value
		console.log(value, lastValue);
		if (value === parseInt(lastValue) || value < parseInt(lastValue)) return;

		let newValue = value - lastValue;
		setLoading(true);
		await updateInvoiceItem(item);
		await getOrderList(invoice.id);
		await decreaseSpecificItemStock(item, newValue);
	};

	const getLastValue = (event) => {
		if (!isUpdate()) return;

		let value = event.target.value;
		setLastValue(value);
	};

	const orderData = () => {
		return (
			orderList &&
			orderList.map((order, index) => (
				<tr key={index}>
					<td>{order.PCode}</td>
					<td>{order.Item}</td>
					<td>{order.OnHand}</td>
					<td>
						<input
							type="number"
							min={1}
							className="form-control form-input w-xs-auto w-20 p-1"
							value={order.Quantity}
							onChange={(event) => {
								handleQuantityChange(event, order, index);
								getProductTotal(order);
								orderData();
							}}
							onFocus={(event) => getLastValue(event)}
							onBlur={(event) => handleStockCheck(event, order, index)}
						/>
					</td>
					<td>{order.UnitPrice}</td>
					<td>{getProductTotal(order)}</td>
					<td>
						<span className="px-1">
							<MdDelete
								className="icon-size-sm cursor-pointer"
								onClick={(event) =>
									isUpdate() ? deleteItem(event, order) : deleteOrder(index)
								}
							/>
						</span>
					</td>
				</tr>
			))
		);
	};

	return (
		<table className="table table-condensed">
			<thead>
				<tr>
					<th scope="col">PCode</th>
					<th scope="col">Item</th>
					<th scope="col">On hand</th>
					<th scope="col">Qty</th>
					<th scope="col">Unit Cost</th>
					<th scope="col">Sub-Total</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				{orderData()}
				<tr>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line text-center">
						<strong>VAT Exempt Sale:</strong>
					</td>
					<td className="no-line text-right">&#8369;{invoice.GrossAmount}</td>
				</tr>
				<tr>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line text-center">
						<strong>VAT:</strong>
					</td>
					<td className="no-line text-right">&#8369;{invoice.VAT}</td>
				</tr>
				<tr>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line text-center">
						<strong>Total:</strong>
					</td>
					<td className="no-line text-right">&#8369;{invoice.Total}</td>
				</tr>
			</tbody>
		</table>
	);
};

const SearchProduct = ({ getAllProducts, addProduct }) => {
	const {
		searchProduct,
		setSearchProduct,
		searchProductCode,
		setSearchProductCode,
		products,
		setProducts,
	} = useContext(InvoiceContext);

	const searchData = () => {
		if (searchProduct === "") return;

		return (
			products &&
			products.slice(0, 10).map((item, index) => (
				<div
					className="dropdown-row cursor-pointer"
					key={index}
					onClick={(event) => addProduct(event, item)}
				>
					<h5>{item.ProductName}</h5>
				</div>
			))
		);
	};

	// handle the searching
	const handleSearchProduct = (event) => {
		if (event.target.value.trim() === "") setProducts([]);
		setSearchProduct(event.target.value);
		if (searchProduct.trim() !== "") getAllProducts();
	};

	const resetSearchTitle = () => {
		setSearchProduct("");
		setProducts([]);
	};

	return (
		<div className="row mt-3 col-12">
			{/* <div className="col-sm-12 col-md">
				<input
					type="text"
					className="form-control form-input"
					placeholder="Search Product Code"
					name="searchProductCode"
				/>
			</div> */}
			<div className="col-sm-12 col-md-6">
				<div className="search-inner">
					<div className="input-group flex-nowrap">
						<input
							type="text"
							className="form-control form-input"
							placeholder="Search Product Name"
							name="searchProduct"
							value={searchProduct}
							onChange={handleSearchProduct}
						/>
						<button
							className="btn btn-secondary"
							type="button"
							onClick={resetSearchTitle}
						>
							Clear
						</button>
					</div>
				</div>
				<div className="dropdown-items">{searchData()}</div>
			</div>
		</div>
	);
};

export default ChargeToAccount;
