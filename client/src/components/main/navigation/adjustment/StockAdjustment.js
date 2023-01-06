import { useState, useEffect, createContext, useContext } from "react";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import MedicineService from "../../../../services/MedicineService";
import StockAdjustmentService from "../../../../services/StockAdjustmentService";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import Loader from "../../../layout/Loader";
import { getCurrentDate } from "../../../../helper/dateHelper";
import { useGlobalState } from "../../../../state";

// create context API
const AdjustmentContext = createContext();
const { Provider } = AdjustmentContext;

const StockAdjustment = () => {
	let [currentUser] = useGlobalState("currentUser");
	const initialStockAdjustmentValue = {
		id: null,
		Mode: "add",
		Quantity: 0,
		DateCreated: getCurrentDate(),
		Reason: "",
		medicineId: null,
		userId: currentUser.id,
	};

	const [adjustment, setAdjustment] = useState(initialStockAdjustmentValue);
	const [productList, setProductList] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});
	const [searchInput, setSearchInput] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(true);

	// context api value
	const contextValue = {
		adjustment,
		setAdjustment,
	};

	useEffect(() => {
		getProductList();
	}, []);

	const createStockAdjustment = async () => {
		await StockAdjustmentService.createStockAdjustment(adjustment)
			.then((response) => {
				console.log(response.data);
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const increaseProductStock = async () => {
		let data = {
			Quantity: adjustment.Quantity,
		};
		await MedicineService.updateMedicineStock(adjustment.medicineId, data)
			.then((response) => {
				console.log(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const decreaseProductStock = async () => {
		let data = {
			Quantity: adjustment.Quantity,
		};
		await MedicineService.updateDecreaseMedicineStock(
			adjustment.medicineId,
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

	const adjustStock = async (event) => {
		event.preventDefault();
		if (adjustment.medicineId === null) return alert("Pick product to adjust.");
		if (!AlertPrompt()) return;

		setLoading(true);
		await createStockAdjustment();
		if (adjustment.Mode === "add") {
			await increaseProductStock();
		} else {
			await decreaseProductStock();
		}
		setAdjustment(initialStockAdjustmentValue);
		setSelectedProduct({});
	};

	const getProductList = async () => {
		await MedicineService.getAllMedicine()
			.then((response) => {
				console.log(response.data);
				setProductList(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const findByTitle = (title) => {
		MedicineService.getByTitle(title)
			.then((response) => {
				console.log(response.data);
				setProductList(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
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
								<div className="p-3 w-100">
									<SearchProduct
										setSearchInput={setSearchInput}
										searchInput={searchInput}
										findByTitle={findByTitle}
										getProductList={getProductList}
									/>
								</div>
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
									adjustStock={adjustStock}
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
	const { adjustment, setAdjustment } = useContext(AdjustmentContext);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setAdjustment((prevState) => ({ ...prevState, [name]: value }));
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
						defaultValue={selectedProduct ? selectedProduct.ProductName : ""}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="Mode">
						Mode:
					</label>
					<select
						name="Mode"
						id="Mode"
						className="form-select form-input"
						value={adjustment.Mode}
						onChange={handleInputChange}
						required
					>
						<option value="add">Add</option>
						<option value="subtract">Subtract</option>
					</select>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label htmlFor="">Stock On Hand:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled={true}
						defaultValue={selectedProduct ? selectedProduct.Quantity : ""}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="Quantity">
						Qty:
					</label>
					<input
						type="number"
						name="Quantity"
						id="Quantity"
						min={1}
						placeholder="Quantity to adjust"
						className="form-control form-input"
						value={adjustment.Quantity}
						onChange={handleInputChange}
						required
					/>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label htmlFor="">Supplier:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled={true}
						defaultValue={
							selectedProduct.supplier
								? selectedProduct.supplier.SupplierName
								: ""
						}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label htmlFor="Reason">Reason:</label>
					<input
						type="text"
						name="Reason"
						id="Reason"
						placeholder="Reason for adjustment"
						className="form-control form-input"
						value={adjustment.Reason}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<button type="submit" className="btn btn-primary simple-shadow mt-3">
				Create
			</button>
		</form>
	);
};

const ProductTable = ({ productList, setSelectedProduct }) => {
	const { adjustment, setAdjustment } = useContext(AdjustmentContext);

	const productData = () => {
		return (
			productList &&
			productList.map((product, index) => (
				<tr
					key={index}
					className="cursor-pointer"
					onClick={async () => {
						await setSelectedProduct(product);
						await setAdjustment({ ...adjustment, medicineId: product.id });
					}}
				>
					<td>{index}</td>
					<td>{product.ProductCode}</td>
					<td>{product.ProductName}</td>
					<td>{product.Quantity}</td>
					<td>{product.SellingPrice}</td>
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
						<th scope="col">On hand</th>
						<th scope="col">Unit Cost</th>
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

export default StockAdjustment;
