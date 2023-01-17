import { useState, useEffect, createContext, useContext } from "react";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import MedicineService from "../../../../services/MedicineService";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import Loader from "../../../layout/Loader";
import { getCurrentDate } from "../../../../helper/dateHelper";
import { useGlobalState } from "../../../../state";
import ReturnService from "../../../../services/ReturnService";
import { useLocation, useParams } from "react-router-dom";
import SalesDetailService from "../../../../services/SalesDetailService";
import { createAuditTrail } from "../../../../helper/AuditTrailHelper";
import InvoiceDetailService from "../../../../services/InvoiceDetailService";
import { formatCurrency } from "../../../../helper/currencyFormat";

// create context API
const AdjustmentContext = createContext();
const { Provider } = AdjustmentContext;

const Return = () => {
	let [currentUser] = useGlobalState("currentUser");
	let location = useLocation();
	let saleInformation = location.state.sale;
	let orderNo = location.state.orderNo;
	let type = location.state.type;
	let { id } = useParams();

	let initialReturn = {
		ReferenceNo: orderNo,
		Quantity: 0,
		DateCreated: getCurrentDate(),
		Total: 0,
		Reason: "",
		medicineId: null,
		userId: currentUser.id,
	};

	const [returnInformation, setReturnInformation] = useState(initialReturn);
	const [productList, setProductList] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});
	const [alertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(true);

	// context api value
	const contextValue = {
		returnInformation,
		setReturnInformation,
	};

	useEffect(() => {
		if (type === "sale") {
			getAllPurchaseItem();
		} else {
			getAllInvoiceItem();
		}
	}, []);

	useEffect(() => {
		setTotal();
	}, [returnInformation.Quantity]);

	const getAllPurchaseItem = async () => {
		await SalesDetailService.getSaleItems(id)
			.then((response) => {
				console.log(response.data);
				setProductList(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAllInvoiceItem = async () => {
		await InvoiceDetailService.getAllInvoiceItems(id)
			.then((response) => {
				console.log(response.data);
				setProductList(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const increaseProductStock = async () => {
		let data = {
			Quantity: returnInformation.Quantity,
		};
		await MedicineService.updateMedicineStock(
			returnInformation.medicineId,
			data
		)
			.then((response) => {
				console.log(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const createReturn = async () => {
		await ReturnService.createReturn(returnInformation)
			.then((response) => {
				console.log(response.data);
				createAuditTrail(
					`Created return process for Order ${saleInformation.OrderNo} for product ${selectedProduct.medicine.ProductName}.`,
					"Create	",
					currentUser.id
				);
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const returnProduct = async (event) => {
		event.preventDefault();
		if (returnInformation.medicineId === null)
			return alert("Pick product to adjust.");
		if (!AlertPrompt()) return;

		setLoading(true);
		await createReturn();
		await increaseProductStock();
		setReturnInformation(initialReturn);
		setSelectedProduct({});
	};

	const computeTotal = () => {
		let total =
			parseFloat(selectedProduct.UnitPrice) *
			parseInt(returnInformation.Quantity);

		if (isNaN(total)) return 0;
		return total;
	};

	const setTotal = () => {
		let total = computeTotal();
		setReturnInformation((prevState) => ({
			...prevState,
			Total: total.toFixed(2),
		}));
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
						<div className="p-2">
							<h4>Reference #: {saleInformation.OrderNo}</h4>
							<hr />
						</div>
						{alertMessage ? (
							<AlertInfoLayout
								content={alertMessage}
								onClick={(value) => setAlertMessage(value)}
							/>
						) : (
							""
						)}
						<div className="h-75 border border-dark rounded simple-shadow">
							<div className="table-responsive max-height-100">
								<div className="p-3 w-100"></div>
								<ProductTable
									productList={productList}
									setSelectedProduct={setSelectedProduct}
								/>
							</div>
						</div>
						<div className="col-12 h-auto">
							<div className="-75 border border-dark rounded simple-shadow mt-3">
								<ProductDetails
									selectedProduct={selectedProduct}
									adjustStock={returnProduct}
								/>
							</div>
						</div>
					</div>
				</Provider>
			)}
		</>
	);
};

const ProductDetails = ({ selectedProduct, adjustStock }) => {
	const { returnInformation, setReturnInformation } =
		useContext(AdjustmentContext);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setReturnInformation((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<form
			className="col-12 col-md-11 p-3 mb-3 mx-auto"
			onSubmit={(event) => adjustStock(event)}
		>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label htmlFor="">Item:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled={true}
						defaultValue={
							selectedProduct.medicine
								? selectedProduct.medicine.ProductName
								: ""
						}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label htmlFor="">Total:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled={true}
						value={returnInformation.Total}
					/>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label htmlFor="">Unit Price:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled={true}
						defaultValue={
							selectedProduct.medicine
								? formatCurrency(
										parseFloat(selectedProduct.medicine.SellingPrice).toFixed(2)
								  )
								: ""
						}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="Reason">
						Reason:
					</label>
					<input
						type="text"
						name="Reason"
						id="Reason"
						placeholder="Reason for return"
						className="form-control form-input"
						value={returnInformation.Reason}
						onChange={handleInputChange}
						required
					/>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md-6">
					<label className="required" htmlFor="Quantity">
						Qty:
					</label>
					<input
						type="number"
						name="Quantity"
						id="Quantity"
						min={1}
						max={selectedProduct.Quantity}
						disabled={selectedProduct.UnitPrice ? false : true}
						placeholder="Quantity to adjust"
						className="form-control form-input"
						value={returnInformation.Quantity}
						onChange={handleInputChange}
						required
					/>
				</div>
			</div>
			<button
				type="submit"
				className="btn btn-primary simple-shadow mt-3"
				disabled={returnInformation.medicineId ? false : true}
			>
				Create
			</button>
		</form>
	);
};

const ProductTable = ({ productList, setSelectedProduct }) => {
	const { returnInformation, setReturnInformation } =
		useContext(AdjustmentContext);

	const productData = () => {
		return (
			productList &&
			productList.map((product, index) => (
				<tr
					key={index}
					className="cursor-pointer"
					onClick={async () => {
						await setSelectedProduct(product);
						await setReturnInformation({
							...returnInformation,
							medicineId: product.id,
						});
					}}
				>
					<td>{index + 1}</td>
					<td>{product.medicine.ProductCode}</td>
					<td>{product.medicine.ProductName}</td>
					<td>{product.Quantity}</td>
					<td>{formatCurrency(product.medicine.SellingPrice)}</td>
				</tr>
			))
		);
	};

	return (
		<>
			<table className="table table-striped table-hover">
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">PCode</th>
						<th scope="col">Item</th>
						<th scope="col">Sold Qty</th>
						<th scope="col">Unit Price</th>
					</tr>
				</thead>
				<tbody>{productData()}</tbody>
			</table>
		</>
	);
};

const SearchProduct = ({
	searchInput,
	setSearchInput,
	findByTitle,
	getProductList,
}) => {
	useEffect(() => {
		if (searchInput !== "") {
			findByTitle(searchInput);
		} else {
			getProductList();
		}
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

export default Return;
