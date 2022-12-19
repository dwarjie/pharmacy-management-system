import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PurchaseOrder from "./PurchaseOrder";
import PurchaseDetailService from "../../../../services/PurchaseDetailService";

const UpdatePO = () => {
	const location = useLocation();
	const oldPurchase = location.state.purchase;
	const initialPurchaseOrder = {
		id: oldPurchase.id,
		POCode: oldPurchase.POCode,
		OrderDate: oldPurchase.OrderDate,
		ItemQty: oldPurchase.ItemQty,
		Status: oldPurchase.Status,
		Total: oldPurchase.Total,
		supplierId: oldPurchase.supplierId,
	};

	const initialDropDownValue = {
		supplier: oldPurchase.supplier.SupplierName,
	};

	const [orderList, setOrderList] = useState([]);

	useEffect(() => {
		getOrderList(oldPurchase.id);
	}, []);

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
			return {
				id: item.id,
				PCode: item.medicine.ProductCode,
				Item: item.medicine.ProductName,
				OnHand: item.medicine.Quantity,
				ReorderPoint: item.medicine.ReorderPoint,
				Quantity: item.Quantity,
				UnitCost: item.medicine.SellingPrice,
				Total: item.Total,
				ReceivedDate: item.ReceivedDate,
				medicineId: item.medicineId,
				purchaseId: item.purchaseId,
			};
		});
		setOrderList(newOrderList);
	};

	return (
		<PurchaseOrder
			mode="update"
			initialPurchaseOrder={initialPurchaseOrder}
			initialDropDownValue={initialDropDownValue}
			initialOrderList={orderList}
			getOrderList={getOrderList}
		/>
	);
};

export default UpdatePO;
