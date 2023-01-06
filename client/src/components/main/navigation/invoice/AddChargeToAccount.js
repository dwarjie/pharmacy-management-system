import {
	generateOrderNumber,
	getCurrentDate,
} from "../../../../helper/dateHelper";
import { useGlobalState } from "../../../../state";
import ChargeToAccount from "./ChargeToAccount";

const AddChargeToAccount = () => {
	let [currentUser] = useGlobalState("currentUser");

	const initialInvoice = {
		id: null,
		InvoiceNo: generateOrderNumber(),
		ORNumber: "",
		InvoiceDate: getCurrentDate(),
		DueDate: "",
		PaidDate: "",
		VAT: 0,
		Total: 0,
		PaidAmount: 0,
		GrossAmount: 0,
		Status: "pending",
		Remarks: "Charge Upon Use",
		handlerId: null,
		userId: currentUser.id,
		patientId: null,
	};

	const initialDropDownValue = {
		handler: "",
		patient: "",
		user: `${currentUser.FirstName} ${currentUser.LastName}`,
	};

	const initialOrderList = [];

	return (
		<ChargeToAccount
			initialInvoice={initialInvoice}
			initialDropDownValue={initialDropDownValue}
			initialOrderList={initialOrderList}
		/>
	);
};

export default AddChargeToAccount;
