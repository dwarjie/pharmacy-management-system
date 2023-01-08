// This component will show the list of all purchase orders
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../../../helper/dateHelper";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import PurchaseService from "../../../../services/PurchaseService";
import PurchaseDetailService from "../../../../services/PurchaseDetailService";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ManagePO = () => {
	const navigate = useNavigate();
	const [purchases, setPurchases] = useState([]);

	useEffect(() => {
		getAllPurchase();
	}, []);

	const getAllPurchase = () => {
		PurchaseService.getAllPurchase()
			.then((response) => {
				console.log(response.data);
				setPurchases(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteItems = async (id) => {
		await PurchaseDetailService.deletePurchaseItems(id)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deletePurchase = async (id) => {
		await PurchaseService.deletePurchase(id)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteOrder = async (id) => {
		if (!AlertPrompt()) return;

		await deleteItems(id);
		await deletePurchase(id);
		getAllPurchase();
	};

	const updatePO = (purchase) => {
		navigate(`/pharmacy/inventory/purchase-order/${purchase.id}`, {
			state: {
				purchase: purchase,
			},
		});
	};

	return (
		<div className="col-12 h-auto">
			<div className="p-2">
				<h4>Manage PO</h4>
				<hr />
			</div>
			<div className="p-2">
				{/* <form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="medicine-search">Search:</label>
					<input type="text" className="form-control" id="medicine-search" />
				</form> */}
				<div className="table-responsive">
					<table className="table table-striped table-hover">
						<thead className="table-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Order Date</th>
								<th scope="col">Reference #</th>
								<th scope="col">Supplier</th>
								<th scope="col">Items</th>
								<th scope="col">Status</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{purchases &&
								purchases.map((purchase, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{formatDate(purchase.OrderDate)}</td>
										<td>{purchase.POCode}</td>
										<td>{purchase.supplier.SupplierName}</td>
										<td>{purchase.ItemQty}</td>
										<td>
											<span className="badge text-bg-warning">
												{purchase.Status}
											</span>
										</td>
										<td>
											<span className="px-2">
												<FaEdit
													className="icon-size-sm cursor-pointer"
													onClick={() => updatePO(purchase)}
												/>
											</span>
											<span className="px-2">
												<MdDelete
													className="icon-size-sm cursor-pointer"
													onClick={() => deleteOrder(purchase.id)}
												/>
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ManagePO;
