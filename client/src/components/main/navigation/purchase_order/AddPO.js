import { generateOrderNumber } from "../../../../helper/dateHelper";
import { getCurrentDate } from "../../../../helper/dateHelper";
import PurchaseOrder from "./PurchaseOrder";

const AddPO = () => {
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
		supplierData: "",
	};

	return (
		<PurchaseOrder
			mode="add"
			initialPurchaseOrder={initialPurchaseOrder}
			initialDropDownValue={initialDropDownValue}
			initialOrderList={[]}
		/>
	);
};

export default AddPO;
