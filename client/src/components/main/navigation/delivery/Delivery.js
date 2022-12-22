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

// icons
import { MdDelete } from "react-icons/md";

const Delivery = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const purchase = location.state.purchase;
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
	const [supplierList, setSupplierList] = useState([]);
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDownValue);

	// update the purchase once loaded
	useEffect(() => {
		setPurchaseOrder({
			...purchase,
			id: purchase.id,
			POCode: purchase.POCode,
			OrderDate: purchase.OrderDate,
			ItemQty: purchase.ItemQty,
			Status: purchase.Status,
			Total: purchase.Total,
			supplierId: purchase.supplierId,
		});
		setActiveDropDownValue({
			...activeDropDownValue,
			supplier: purchase.supplier.SupplierName,
			supplierData: purchase.supplier,
		});
	}, [purchase]);

	useEffect(() => {
		getAllSuppliers();
	}, []);

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

	// handle the input change for the purchase order state
	const handlePurchaseChange = (event) => {
		const { name, value } = event.target;
		setPurchaseOrder((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div className="h-auto d-flex flex-column justify-content-between gap-1">
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
					<ProductTable />
				</div>
			</div>
			<div className="w-auto">
				<button
					type="button"
					className="btn btn-success simple-shadow mt-2 me-3"
				>
					Recieved
				</button>
				<button type="button" className="btn btn-dark simple-shadow mt-2 me-3">
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

const ProductTable = (props) => {
	const orderData = () => {
		// return (
		// orderList &&
		// orderList.map((order, index) => (
		// 	<tr key={index}>
		// 		<td>{order.PCode}</td>
		// 		<td>{order.Item}</td>
		// 		<td>{order.OnHand}</td>
		// 		<td>{order.ReorderPoint}</td>
		// 		<td>
		// 			<input
		// 				type="number"
		// 				className="form-control form-input w-xs-auto w-20 p-1"
		// 				value={order.Quantity}
		// 				onChange={(event) => {
		// 					handleQuantityChange(event, index);
		// 					getProductTotal(order);
		// 					orderData();
		// 				}}
		// 			/>
		// 		</td>
		// 		<td>{order.UnitCost}</td>
		// 		<td>{getProductTotal(order)}</td>
		// 		<td>
		// 			<span className="px-1">
		// 				<MdDelete
		// 					className="icon-size-sm cursor-pointer"
		// 					onClick={() => {
		// 						isUpdate() ? deleteItem(order) : deleteOrder(index);
		// 					}}
		// 				/>
		// 			</span>
		// 		</td>
		// 	</tr>
		// ))
		// );
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
					{/* <td className="no-line text-right">&#8369;{purchaseOrder.Total}</td> */}
				</tr>
			</tbody>
		</table>
	);
};

export default Delivery;
