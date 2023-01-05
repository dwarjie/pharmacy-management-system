import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { generateOrderNumber } from "../../../../helper/dateHelper";
import { getCurrentDate } from "../../../../helper/dateHelper";
import PurchaseOrder from "./PurchaseOrder";

const AddAllPO = () => {
	const location = useLocation();
	const products = location.state.products;
	const supplier = products[0].supplier;

	const initialPurchaseOrder = {
		id: null,
		POCode: generateOrderNumber(),
		OrderDate: getCurrentDate(),
		ItemQty: 0,
		Status: "pending",
		Total: 0,
		supplierId: supplier.id,
	};

	const initialDropDownValue = {
		supplier: supplier.SupplierName,
		supplierData: supplier,
	};

	const [orderList, setOrderList] = useState([]);

	useEffect(() => {
		setOrderItem(products);
	}, []);

	const setOrderItem = async (data) => {
		let newOrderList = data.map((item) => {
			return {
				id: -1,
				PCode: item.ProductCode,
				Item: item.ProductName,
				OnHand: item.Quantity,
				ReorderPoint: item.ReorderPoint,
				Quantity: 1,
				UnitCost: item.SellingPrice,
				Total: item.Total,
				ReceivedDate: "",
				medicineId: item.id,
				purchaseId: null,
			};
		});
		await setOrderList(newOrderList);
	};

	return (
		<PurchaseOrder
			mode="add"
			initialPurchaseOrder={initialPurchaseOrder}
			initialDropDownValue={initialDropDownValue}
			initialOrderList={orderList}
		/>
	);
};

export default AddAllPO;
