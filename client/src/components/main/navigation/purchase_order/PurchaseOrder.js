// This component will add a purchase order
import { useEffect, useState } from "react";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";
import MedicineService from "../../../../services/MedicineService";

// icons
import { MdDelete } from "react-icons/md";
import SupplierService from "../../../../services/SupplierService";
import {
	generateOrderNumber,
	getCurrentDate,
} from "../../../../helper/dateHelper";
import parseDropdownValue from "../../../../helper/parseJSON";
import PurchaseService from "../../../../services/PurchaseService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

const PurchaseOrder = () => {
	const initialPurchaseOrder = {
		id: null,
		POCode: generateOrderNumber(),
		OrderDate: getCurrentDate(),
		ItemQty: 0,
		Status: "pending",
		Total: 0,
		supplierId: null,
	};

	const initialDropDownValue = {
		supplier: "",
	};

	const [purchaseOrder, setPurchaseOrder] = useState(initialPurchaseOrder);
	const [searchProduct, setSearchProduct] = useState("");
	const [supplierProducts, setSupplierProducts] = useState([]);
	const [orderList, setOrderList] = useState([]);
	const [supplierList, setSupplierList] = useState([]);
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDownValue);

	useEffect(() => {
		getAllSuppliers();
	}, []);

	useEffect(() => {
		let total = computeTotal();
		setPurchaseOrder((prevState) => ({ ...prevState, Total: total }));
	}, [orderList]);

	const createPurchase = async () => {
		let purchaseId = 0;
		await PurchaseService.createPurchase(purchaseOrder)
			.then((response) => {
				console.log(response.data);
				purchaseId = response.data.data.id;
			})
			.catch((err) => {
				console.log(err);
			});

		return purchaseId;
	};

	// create the purchase order
	const createOrder = async () => {
		if (!AlertPrompt("Are you sure you want to create this purchase order?"))
			return;

		let purchaseId = await createPurchase();
		console.log(purchaseId);
	};

	// get all the products in search
	const getAllProducts = () => {
		MedicineService.getByTitleAndSupplier(
			searchProduct,
			purchaseOrder.supplierId
		)
			.then((response) => {
				console.log(response.data);
				setSupplierProducts(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// get all the suppliers
	const getAllSuppliers = () => {
		SupplierService.getSupplier()
			.then((response) => {
				console.log(response.data);
				setSupplierList(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// compute the total amount, vat and discount of the transaction
	const computeTotal = () => {
		let total = 0;
		orderList.map((order, index) => {
			total += order.Total;
		});
		return total.toFixed(2);
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

	// add the product into orderList
	const addProduct = (selectedProduct) => {
		if (!checkOrderExist(selectedProduct)) {
			// not yet exist
			let initialSelectedProduct = {
				PCode: selectedProduct.ProductCode,
				Item: selectedProduct.ProductName,
				OnHand: selectedProduct.Quantity,
				ReorderPoint: selectedProduct.ReorderPoint,
				Quantity: 1,
				UnitCost: selectedProduct.SellingPrice,
				Total: selectedProduct.SellingPrice,
				ReceivedData: "",
				medicineId: selectedProduct.id,
				purchaseId: 0,
			};
			setOrderList([...orderList, initialSelectedProduct]);
		}
	};

	// handle the searching
	const handleSearchProduct = (event) => {
		if (event.target.value.trim() === "") setSupplierProducts([]);
		setSearchProduct(event.target.value);
		if (searchProduct.trim() !== "") getAllProducts();
	};

	return (
		<div className="h-auto d-flex flex-column justify-content-between gap-1">
			<div className="d-flex flex-column flex-md-row justify-content-start gap-3">
				<OrderInformation
					searchProduct={searchProduct}
					supplierList={supplierList}
					purchaseOrder={purchaseOrder}
					activeDropDownValue={activeDropDownValue}
					supplierProducts={supplierProducts}
					handleSearchProduct={handleSearchProduct}
					addProduct={addProduct}
					setSearchProduct={setSearchProduct}
					setSupplierProducts={setSupplierProducts}
					setPurchaseOrder={setPurchaseOrder}
					setActiveDropDownValue={setActiveDropDownValue}
				/>
			</div>
			<div className="h-75 border border-dark rounded simple-shadow mt-3">
				<div className="table-responsive max-height-100">
					<ProductTable
						orderList={orderList}
						purchaseOrder={purchaseOrder}
						setOrderList={setOrderList}
					/>
				</div>
			</div>
			<button
				type="submit"
				className="btn btn-primary col-12 col-md-1 simple-shadow mt-3 me-3"
				disabled={orderList.length === 0 ? true : false}
				onClick={() => createOrder()}
			>
				Create
			</button>
		</div>
	);
};

const OrderInformation = ({
	searchProduct,
	supplierProducts,
	activeDropDownValue,
	purchaseOrder,
	supplierList,
	handleSearchProduct,
	addProduct,
	setPurchaseOrder,
	setSearchProduct,
	setSupplierProducts,
	setActiveDropDownValue,
}) => {
	const searchData = () => {
		if (searchProduct === "") return;

		return (
			supplierProducts &&
			supplierProducts.slice(0, 10).map((item, index) => (
				<div
					className="dropdown-row m-1 cursor-pointer"
					key={index}
					onClick={() => addProduct(item)}
				>
					<h5>{item.ProductName}</h5>
				</div>
			))
		);
	};

	const resetSearch = () => {
		setSearchProduct("");
		setSupplierProducts([]);
	};

	return (
		<>
			<div className="col-sm-12 col-md-4">
				<label htmlFor="searchProduct">Search:</label>
				<div className="search-inner">
					<div className="input-group flex-nowrap">
						<input
							type="text"
							className="form-control form-input"
							placeholder="Search Product"
							name="searchProduct"
							disabled={purchaseOrder.supplierId ? false : true}
							value={searchProduct}
							onChange={handleSearchProduct}
							required
						/>
						<button
							className="btn btn-secondary"
							type="button"
							onClick={resetSearch}
						>
							Clear
						</button>
					</div>
				</div>
				<div className="dropdown-items">{searchData()}</div>
			</div>
			<div className="col-sm-12 col-md-3">
				<label className="required" htmlFor="">
					P.O Code:
				</label>
				<input
					type="text"
					className="form-control form-input"
					placeholder="Purchase Code"
					value={purchaseOrder.POCode}
					onChange={(event) =>
						setPurchaseOrder((prevState) => ({
							...prevState,
							POCode: event.target.value,
						}))
					}
					required
				/>
			</div>
			<div className="col-sm-12 col-md-3">
				<label className="required" htmlFor="">
					Supplier:
				</label>
				<select
					name="supplierId"
					className="form-select form-input"
					value={activeDropDownValue.supplier}
					onChange={(event) => {
						let data = parseDropdownValue(event);
						setActiveDropDownValue((prevState) => ({
							...prevState,
							supplier: data.SupplierName,
						}));
						setPurchaseOrder((prevState) => ({
							...prevState,
							supplierId: data.id,
						}));
					}}
				>
					<DropDownDefaultOption content={"Select Supplier"} />
					{supplierList &&
						supplierList.map((supplier, index) => (
							<option
								className="dropdown-item"
								value={supplier.SupplierName}
								key={index}
								data-value={JSON.stringify(supplier)}
							>
								{supplier.SupplierName}
							</option>
						))}
				</select>
			</div>
		</>
	);
};

const ProductTable = ({ orderList, purchaseOrder, setOrderList }) => {
	const getProductTotal = (order) => {
		order.Total = order.UnitCost * order.Quantity;
		return order.Total.toFixed(1);
	};

	const handleQuantityChange = (event, order) => {
		let value = parseInt(event.target.value);
		if (value !== 0) {
			order.Quantity = value;
		} else {
			alert("Please input a valid quantity!");
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
					<td>{order.ReorderPoint}</td>
					<td>
						<input
							type="number"
							className="form-control w-20 p-1"
							value={order.Quantity}
							onChange={(event) => {
								console.log(orderList[index].Quantity);
								handleQuantityChange(event, order);
								getProductTotal(order);
								orderData();
							}}
						/>
					</td>
					<td>{order.UnitCost}</td>
					<td>{getProductTotal(order)}</td>
					<td>
						<span className="px-1">
							<MdDelete className="icon-size-sm cursor-pointer" />
						</span>
					</td>
				</tr>
			))
		);
	};

	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">PCode</th>
					<th scope="col">Item</th>
					<th scope="col">On hand</th>
					<th scope="col">Reorder</th>
					<th scope="col">Qty</th>
					<th scope="col">Unit Cost</th>
					<th scope="col">Total</th>
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
					<td className="no-line"></td>
					<td className="no-line text-center">
						<strong>Total:</strong>
					</td>
					<td className="no-line text-right">&#8369;{purchaseOrder.Total}</td>
				</tr>
			</tbody>
		</table>
	);
};

export default PurchaseOrder;
