// This component will add a purchase order
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Loader from "../../../layout/Loader";

const ChargeToAccount = (props) => {
	const navigate = useNavigate();

	const initialInvoice = {
		id: null,
		InvoiceNo: "",
		InvoiceDate: getCurrentDate(),
		DueDate: "",
		Total: 0,
		PaidAmount: 0,
		handlerId: null,
		userId: null,
		patientId: null,
	};

	const initialDropDownValue = {
		handler: "",
		patient: "",
		user: "",
	};

	const initialOrderList = [];

	const [invoice, setInvoice] = useState(initialInvoice);
	const [searchProduct, setSearchProduct] = useState("");
	const [orderList, setOrderList] = useState(initialOrderList);
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDownValue);
	const [loading, setLoading] = useState(false);

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<div className="h-auto d-flex flex-column justify-content-between gap-1">
					<div className="col-12 h-auto">
						<InvoiceInformation />
					</div>
					<div className="h-75 border border-dark rounded simple-shadow mt-3">
						<div className="table-responsive max-height-100"></div>
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
			)}
		</>
	);
};

const InvoiceInformation = () => {
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
						required
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label htmlFor="">Invoice Date:</label>
					<input type="date" className="form-control form-input" />
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Requested By:
					</label>
					<select name="handler" className="form-select form-input">
						<DropDownDefaultOption content={"Select Supplier"} />
					</select>
				</div>
				<div className="col-sm-12 col-md">
					<label htmlFor="">Due Date:</label>
					<input type="date" className="form-control form-input" />
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="">
						Patient:
					</label>
					<select name="patient" className="form-select form-input">
						<DropDownDefaultOption content={"Select Patient"} />
					</select>
				</div>
				<div className="col-sm-12 col-md">
					<label htmlFor="">Prepared By:</label>
					<input type="text" className="form-control form-input" />
				</div>
			</div>
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
							/>
							<button className="btn btn-secondary" type="button">
								Clear
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const ProductTable = (props) => {
	const { orderList, purchaseOrder, setOrderList, deleteItem, isUpdate } =
		props;

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
							className="form-control form-input w-xs-auto w-20 p-1"
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
								onClick={() => {
									isUpdate() ? deleteItem(order) : deleteOrder(index);
								}}
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

export default ChargeToAccount;
