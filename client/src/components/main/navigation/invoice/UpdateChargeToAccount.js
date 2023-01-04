import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InvoiceDetailService from "../../../../services/InvoiceDetailService";
import ChargeToAccount from "./ChargeToAccount";

const UpdateChargeToAccount = () => {
	const location = useLocation();
	const oldInvoice = location.state.invoice;

	const initialInvoice = {
		id: oldInvoice.id,
		InvoiceNo: oldInvoice.InvoiceNo,
		ORNumber: oldInvoice.ORNumber,
		InvoiceDate: oldInvoice.InvoiceDate,
		DueDate: oldInvoice.DueDate,
		VAT: oldInvoice.VAT,
		Total: oldInvoice.Total,
		PaidAmount: oldInvoice.PaidAmount,
		GrossAmount: oldInvoice.GrossAmount,
		Status: oldInvoice.Status,
		Remarks: oldInvoice.Remarks,
		handlerId: oldInvoice.handlerId,
		userId: oldInvoice.userId,
		patientId: oldInvoice.patientId,
	};

	const initialDropDownValue = {
		handler: oldInvoice.handler.FirstName,
		patient: oldInvoice.patient.FirstName,
		user: `${oldInvoice.user.FirstName} ${oldInvoice.user.LastName}`,
	};

	const [orderList, setOrderList] = useState([]);

	useEffect(() => {
		getOrderList(oldInvoice.id);
	}, []);

	const getOrderList = async (id) => {
		await InvoiceDetailService.getAllInvoiceItems(id)
			.then((response) => {
				console.log(response.data);
				setOrderItem(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const setOrderItem = async (data) => {
		let newOrderList = data.map((item) => {
			return {
				id: item.id,
				PCode: item.medicine.ProductCode,
				Item: item.medicine.ProductName,
				OnHand: item.medicine.Quantity,
				Quantity: item.Quantity,
				UnitPrice: item.medicine.SellingPrice,
				Total: item.Total,
				medicineId: item.medicineId,
				invoiceId: item.invoiceId,
			};
		});
		await setOrderList(newOrderList);
	};

	return (
		<ChargeToAccount
			mode={"update"}
			initialInvoice={initialInvoice}
			initialDropDownValue={initialDropDownValue}
			initialOrderList={orderList}
			getOrderList={getOrderList}
		/>
	);
};

export default UpdateChargeToAccount;
