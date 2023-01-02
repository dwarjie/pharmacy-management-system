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
import MedicineService from "../../../../services/MedicineService";
import HandlerService from "../../../../services/HandlerService";
import PatientService from "../../../../services/PatientService";

// icons
import { MdDelete } from "react-icons/md";
import Loader from "../../../layout/Loader";
import VatService from "../../../../services/VatService";

// creating context API
const InvoiceContext = createContext();
const { Provider } = InvoiceContext;

const ChargeToAccount = (props) => {
	let [currentUser] = useGlobalState("currentUser");
	const navigate = useNavigate();

	const initialInvoice = {
		id: null,
		InvoiceNo: generateOrderNumber(),
		InvoiceDate: getCurrentDate(),
		DueDate: "",
		VAT: 0,
		Total: 0,
		PaidAmount: 0,
		GrossAmount: 0,
		Status: "pending",
		Remarks: "Charge Upon Use",
		handlerId: null,
		userId: currentUser.id,
		patientId: null,
	};

	const initialDropDownValue = {
		handler: "",
		patient: "",
		user: "",
	};

	const initialOrderList = [];

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
	};

	useEffect(() => {
		getHandlers();
		getVAT();
		getPatients();
	}, []);

	useEffect(() => {
		setInvoiceInformation();
	}, [orderList]);

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
	const addProduct = (selectedProduct) => {
		if (!checkOrderExist(selectedProduct)) {
			// check if quantity is greater than 0 before adding to the order list
			if (checkQuantity(selectedProduct.Quantity)) {
				let initialSelectedProduct = {
					id: -1,
					PCode: selectedProduct.ProductCode,
					Item: selectedProduct.ProductName,
					OnHand: selectedProduct.Quantity,
					Quantity: 1,
					UnitCost: selectedProduct.SellingPrice,
					Total: selectedProduct.SellingPrice,
					medicineId: selectedProduct.id,
					purchaseId: null,
				};
				setOrderList([...orderList, initialSelectedProduct]);

				setOrderList([...orderList, initialSelectedProduct]);
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
							/>
							<SearchProduct
								getAllProducts={getAllProducts}
								addProduct={addProduct}
							/>
						</div>
						<div className="h-75 border border-dark rounded simple-shadow mt-3">
							<div className="table-responsive max-height-100">
								<ProductTable deleteOrder={deleteOrder} />
							</div>
						</div>
						<div className="w-auto">
							<button
								type="submit"
								className="btn btn-primary simple-shadow mt-2 me-3"
								disabled={orderList.length === 0 ? true : false}
							>
								Create
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

const InvoiceInformation = ({ handlerList, patientList }) => {
	const {
		currentUser,
		invoice,
		setInvoice,
		activeDropDownValue,
		setActiveDropDownValue,
	} = useContext(InvoiceContext);

	return (
		<>
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
						value={invoice.DueDate}
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
						defaultValue={`${currentUser.FirstName} ${currentUser.LastName}`}
					/>
				</div>
			</div>
		</>
	);
};

const ProductTable = ({ deleteOrder }) => {
	const { orderList, setOrderList, invoice } = useContext(InvoiceContext);

	const getProductTotal = (order) => {
		order.Total = order.UnitCost * order.Quantity;
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
					return { ...order, Quantity: 1 };
				} else {
					return order;
				}
			});
			setOrderList(newOrderList);
		}
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
							onBlur={(event) => handleStockCheck(event, order, index)}
						/>
					</td>
					<td>{order.UnitCost}</td>
					<td>{getProductTotal(order)}</td>
					<td>
						<span className="px-1">
							<MdDelete
								className="icon-size-sm cursor-pointer"
								onClick={() => deleteOrder(index)}
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
					onClick={() => addProduct(item)}
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
			<div className="col-sm-12 col-md">
				<input
					type="text"
					className="form-control form-input"
					placeholder="Search Product Code"
					name="searchProductCode"
				/>
			</div>
			<div className="col-sm-12 col-md">
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
