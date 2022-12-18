// This component will add a purchase order
import { useEffect, useState } from "react";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { checkQuantity } from "../../../../helper/checkQuantity";
import {
	generateOrderNumber,
	getCurrentDate,
} from "../../../../helper/dateHelper";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";
import parseDropdownValue from "../../../../helper/parseJSON";
import MedicineService from "../../../../services/MedicineService";
import SupplierService from "../../../../services/SupplierService";
import PurchaseService from "../../../../services/PurchaseService";
import PurchaseDetailService from "../../../../services/PurchaseDetailService";

// icons
import { MdDelete } from "react-icons/md";

const PurchaseOrder = (props) => {
	const { mode, initialPurchaseOrder, initialDropDownValue, initialOrderList } =
		props;

	const [purchaseOrder, setPurchaseOrder] = useState(initialPurchaseOrder);
	const [searchProduct, setSearchProduct] = useState("");
	const [supplierProducts, setSupplierProducts] = useState([]);
	const [orderList, setOrderList] = useState(initialOrderList);
	const [supplierList, setSupplierList] = useState([]);
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDownValue);

	useEffect(() => {
		setOrderList(initialOrderList);
	}, [initialOrderList]);

	useEffect(() => {
		getAllSuppliers();
	}, []);

	useEffect(() => {
		let total = computeTotal();
		setPurchaseOrder((prevState) => ({ ...prevState, Total: total }));
		countItems();
	}, [orderList]);

	// create the purchasedetails one by one
	const createPurchaseDetails = async (purchaseId) => {
		await orderList.forEach((order) => {
			order.purchaseId = purchaseId;
			PurchaseDetailService.createPurchaseDetails(order)
				.then((response) => {
					console.log(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

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
		createPurchaseDetails(purchaseId);
		resetPage();
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

	// count all the items in the order list
	const countItems = () => {
		let itemCount = orderList.length;
		setPurchaseOrder((prevState) => ({ ...prevState, ItemQty: itemCount }));
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
				ReceivedDate: "",
				medicineId: selectedProduct.id,
				purchaseId: null,
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

	const resetPage = () => {
		setPurchaseOrder(initialPurchaseOrder);
		setSupplierProducts([]);
		setOrderList([]);
		setActiveDropDownValue(initialDropDownValue);
	};

	const isUpdate = () => {
		return mode === "update" ? true : false;
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
				{isUpdate ? "Update" : "Create"}
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

const ProductTable = (props) => {
	const { orderList, purchaseOrder, setOrderList } = props;

	const getProductTotal = (order) => {
		order.Total = order.UnitCost * order.Quantity;
		return order.Total.toFixed(1);
	};

	// delete an order in the list
	// use array map, check the medicineId
	const deleteOrder = (orderIndex) => {
		const newOrderList = orderList.filter((item, index) => {
			if (index !== orderIndex) return item;
		});

		setOrderList(newOrderList);
	};

	const handleQuantityChange = (event, i) => {
		let value = parseInt(event.target.value);
		if (!checkQuantity(value)) alert("Please input a valid quantity!");

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
								handleQuantityChange(event, index);
								getProductTotal(order);
								orderData();
							}}
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
