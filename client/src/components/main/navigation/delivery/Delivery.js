// This component will add a purchase order
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { createAuditTrail } from "../../../../helper/AuditTrailHelper";

// icons
import { MdDelete } from "react-icons/md";
import Loader from "../../../layout/Loader";
import { useGlobalState } from "../../../../state";

const Delivery = () => {
	let [currentUser] = useGlobalState("currentUser");
	const navigate = useNavigate();
	const location = useLocation();
	const purchase = location.state.purchase;
	const supplier = location.state.supplier;
	const initialPurchaseOrder = {
		id: null,
		POCode: "",
		OrderDate: "",
		ItemQty: 0,
		Status: "",
		Total: 0,
		supplierId: null,
	};

	const initialDropDownValue = {
		supplier: "",
		supplierData: {},
	};

	const [purchaseOrder, setPurchaseOrder] = useState(initialPurchaseOrder);
	const [orderList, setOrderList] = useState([]);
	const [supplierList, setSupplierList] = useState([]);
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDownValue);
	const [loading, setLoading] = useState(true);
	const [purchaseSettled, setPurchaseSettled] = useState(false);

	// update the purchase once loaded
	useEffect(() => {
		setPurchaseOrder({
			...purchase,
			id: purchase.id,
			POCode: purchase.POCode,
			OrderDate: purchase.OrderDate,
			ItemQty: purchase.ItemQty,
			Status: "received",
			Total: purchase.Total,
			supplierId: purchase.supplierId,
		});
		setActiveDropDownValue({
			...activeDropDownValue,
			supplier: supplier.SupplierName,
			supplierData: supplier,
		});
	}, [purchase]);

	useEffect(() => {
		getAllSuppliers();
		getOrderList(purchase.id);
	}, []);

	const updatePurchase = async () => {
		await PurchaseService.updatePurchase(purchaseOrder.id, purchaseOrder)
			.then((response) => {
				console.log(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateItems = async () => {
		await orderList.map(async (item) => {
			// update items properties
			// item.Quantity = subtractReceivedItem(item); // subtract the received item to ordered items
			item.ReceivedQty =
				parseFloat(item.ReceivedQty) + parseFloat(item.ReceiveQuantity); // set the received item
			checkItemStatus(item); // check if item is already delivered
			console.log(item);
			await updateItem(item);
			await updateItemStock(item);
			createAuditTrail(
				`Updated ${purchaseOrder.POCode} in Delivery.`,
				"Update",
				currentUser.id
			);
			navigate("/pharmacy/inventory/delivery-list");
		});
	};

	const updateItem = (item) => {
		PurchaseDetailService.updateItem(item.id, item)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateItemStock = (item) => {
		let data = {
			Quantity: item.ReceiveQuantity,
		};
		MedicineService.updateMedicineStock(item.medicineId, data)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateOrder = async () => {
		if (!AlertPrompt()) return;

		setLoading(true);
		await updateItems();
		let isSettled = checkPurchaseStatus(); // check if all items are already received, make the purchase settled
		await updatePurchase();
		await getOrderList(purchaseOrder.id);
		if (!isSettled) return;

		// if purchase is settled, update the status
		await updatePurchaseStatus();
		navigate(`/pharmacy/inventory/delivery-list`);
	};

	const updatePurchaseStatus = async () => {
		let data = {
			Status: "settled",
		};

		await PurchaseService.updateStatus(purchase.id, data)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updatePurchaseQuantity = async () => {
		await PurchaseService.updatePurchase(purchaseOrder.id, {
			ItemQty: orderList.length - 1,
		})
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// delete a single item for updateing order list
	const deleteItem = async (item) => {
		if (!AlertPrompt()) return;

		await deleteUpdateItem(item);
		await getOrderList(purchaseOrder.id);
		await updatePurchaseQuantity();
	};

	const deleteUpdateItem = async (item) => {
		await PurchaseDetailService.deleteItem(item.id)
			.then((response) => {
				console.log(response.data);
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

	const getOrderList = async (id) => {
		await PurchaseDetailService.getOrderList(id)
			.then((response) => {
				console.log(response.data);
				setOrderItem(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const setOrderItem = (data) => {
		let newOrderList = data.map((item) => {
			console.log(item);
			return {
				id: item.id,
				PCode: item.medicine.ProductCode,
				Item: item.medicine.ProductName,
				OnHand: item.medicine.Quantity,
				ReorderPoint: item.medicine.ReorderPoint,
				Quantity: item.Quantity,
				ReceivedQty: item.ReceivedQty,
				ReceiveQuantity: 0,
				UnitCost: item.medicine.SupplierPrice,
				Total: item.Total,
				RecieveDate: item.RecieveDate,
				Status: item.Status,
				medicineId: item.medicineId,
				purchaseId: item.purchaseId,
			};
		});
		setOrderList(newOrderList);
		setLoading(false);
	};

	// subtract item received from the ordered quantity of the item
	const subtractReceivedItem = (item) => {
		let remainingQuantity = item.Quantity - item.ReceivedQuantity;

		// check if negative number, else return 0
		if (Math.sign(remainingQuantity) === -1) {
			return 0;
		} else {
			return remainingQuantity;
		}
	};

	// check if all items are received,
	// if yes, make the purchase settled else let it
	const checkPurchaseStatus = () => {
		let settled = true;
		orderList.map((item) => {
			console.log(item);
			if (item.Status === "pending") {
				settled = false;
			}
		});

		return settled;
	};

	// check if item status is received
	const checkItemStatus = (item) => {
		if (item.ReceivedQty === item.Quantity) {
			item.RecieveDate = getCurrentDate();
			return (item.Status = "received");
		}
	};

	// handle the input change for the purchase order state
	const handlePurchaseChange = (event) => {
		const { name, value } = event.target;
		setPurchaseOrder((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<div className="h-auto d-flex flex-column justify-content-between gap-1">
					<div className="p-2">
						<h4>Delivery</h4>
						<hr />
					</div>
					<div className="col-12 h-auto">
						<OrderInformation
							purchaseOrder={purchaseOrder}
							supplierList={supplierList}
							activeDropDownValue={activeDropDownValue}
							setPurchaseOrder={setPurchaseOrder}
							setActiveDropDownValue={setActiveDropDownValue}
							handlePurchaseChange={handlePurchaseChange}
						/>
					</div>
					<div className="h-75 border border-dark rounded simple-shadow mt-3">
						<div className="table-responsive max-height-100">
							<ProductTable
								orderList={orderList}
								purchaseOrder={purchaseOrder}
								setOrderList={setOrderList}
								deleteItem={deleteItem}
							/>
						</div>
					</div>
					<div className="w-auto">
						<button
							type="button"
							className="btn btn-primary simple-shadow mt-2 me-3"
							disabled={purchaseOrder.Status === "settled" ? true : false}
							onClick={updateOrder}
						>
							Update
						</button>
						<button
							type="button"
							className="btn btn-secondary simple-shadow mt-2 me-3"
							onClick={() => navigate(`/pharmacy/inventory/delivery-list`)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</>
	);
};

const OrderInformation = ({
	purchaseOrder,
	supplierList,
	activeDropDownValue,
	setPurchaseOrder,
	setActiveDropDownValue,
	handlePurchaseChange,
}) => {
	return (
		<>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Reference #:
					</label>
					<input
						type="text"
						name="POCode"
						className="form-control form-input"
						placeholder="Reference #"
						value={purchaseOrder.POCode}
						onChange={handlePurchaseChange}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label htmlFor="">Contact Person:</label>
					<input
						type="text"
						className="form-control form-input"
						placeholder="Contact Person"
						disabled={true}
						defaultValue={activeDropDownValue.supplierData.ContactPerson}
					/>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Supplier:
					</label>
					<select
						name="supplierId"
						className="form-select form-input"
						disabled={true}
						value={activeDropDownValue.supplier}
						onChange={(event) => {
							let data = parseDropdownValue(event);
							setActiveDropDownValue((prevState) => ({
								...prevState,
								supplier: data.SupplierName,
								supplierData: data,
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
				<div className="col-sm-12 col-md">
					<label htmlFor="">Address:</label>
					<input
						type="text"
						className="form-control form-input"
						placeholder="Contact Person"
						disabled={true}
						value={activeDropDownValue.supplierData.Address}
					/>
				</div>
			</div>
		</>
	);
};

const ProductTable = ({
	purchaseOrder,
	orderList,
	setOrderList,
	deleteItem,
}) => {
	const getProductTotal = (order) => {
		order.Total = order.UnitCost * order.Quantity;
		return order.Total.toFixed(1);
	};

	const handleQuantityChange = (event, i) => {
		let value = parseInt(event.target.value);

		const newOrderList = orderList.map((order, index) => {
			if (index !== i) return order;

			if (checkQuantity(value)) {
				return { ...order, ReceiveQuantity: value };
			} else {
				return order;
			}
		});
		setOrderList(newOrderList);
	};

	// check if this item quantity matches with the received quantity
	const changeOrderStatus = (order) => {
		if (order.Status === "received") return " item-received";

		return "";
	};

	const orderData = () => {
		return (
			orderList &&
			orderList.map((order, index) => (
				<tr key={index} className={changeOrderStatus(order)}>
					<td>{order.PCode}</td>
					<td>{order.Item}</td>
					<td>{order.Quantity}</td>
					<td>{order.ReceivedQty}</td>
					<td>
						<input
							type="number"
							min={0}
							className="form-control form-input w-xs-auto w-20 p-1"
							value={order.ReceiveQuantity}
							disabled={order.Status === "received" ? true : false}
							onChange={(event) => {
								handleQuantityChange(event, index);
								getProductTotal(order);
								orderData();
							}}
						/>
					</td>
					<td>
						{isNaN(order.Quantity - order.ReceivedQty)
							? 0
							: order.Quantity - order.ReceivedQty}
					</td>
					<td>{parseFloat(order.UnitCost).toFixed(2)}</td>
					{/* <td>{getProductTotal(order)}</td> */}
					{/* <td>
						<span className="px-1">
							<MdDelete
								className="icon-size-sm cursor-pointer"
								onClick={() => deleteItem(order)}
							/>
						</span>
					</td> */}
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
					<th scope="col">Ordered Qty</th>
					<th scope="col">Received Qty</th>
					<th scope="col">To Receive</th>
					<th scope="col">Back Order</th>
					<th scope="col">Unit Cost</th>
					{/* <th scope="col">Action</th> */}
				</tr>
			</thead>
			<tbody>
				{orderData()}
				{/* <tr>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line"></td>
					<td className="no-line text-center">
						<strong>Total:</strong>
					</td>
					<td className="no-line text-right">&#8369;{purchaseOrder.Total}</td>
				</tr> */}
			</tbody>
		</table>
	);
};

export default Delivery;
