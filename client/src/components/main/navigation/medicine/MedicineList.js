// this module is responsible for listing all the medicines
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import MedicineService from "../../../../services/MedicineService";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MedicineList = () => {
	let navigate = useNavigate();

	const [medicines, setMedicines] = useState([]);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllMedicine();
	}, []);

	const getAllMedicine = () => {
		MedicineService.getAllMedicine()
			.then((response) => {
				console.log(response.data);
				setMedicines(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateMedicine = (medicine) => {
		navigate(`/pharmacy/maintenance/medicine/${medicine.id}`, {
			state: {
				medicine: medicine,
			},
		});
	};

	const deleteMedicine = (medicine) => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		MedicineService.deleteMedicine(medicine.id)
			.then((response) => {
				console.log(response.data);
				getAllMedicine();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="col-12 h-auto">
			<div className="p-2">
				<h4>Product List</h4>
				<hr />
			</div>
			{alertMessage ? (
				<AlertInfoLayout
					content={alertMessage}
					onClick={(value) => setAlertMessage(value)}
				/>
			) : (
				""
			)}
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
								<th scope="col">Product Name</th>
								<th scope="col">Generic Name</th>
								<th scope="col">Category</th>
								<th scope="col">Supplier</th>
								<th scope="col">Price</th>
								<th scope="col">Unit Price</th>
								<th scope="col">Details</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{medicines &&
								medicines.map((medicine, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{medicine.ProductName}</td>
										<td>{medicine.GenericName}</td>
										<td>{medicine.subCategory.SubCategoryName}</td>
										<td>{medicine.supplier.SupplierName}</td>
										<td>{medicine.SellingPrice}</td>
										<td>{medicine.SupplierPrice}</td>
										<td>{medicine.ProductDetails}</td>
										<td>
											<span className="px-2">
												<FaEdit
													className="icon-size-sm cursor-pointer"
													onClick={() => updateMedicine(medicine)}
												/>
											</span>
											<span className="px-2">
												<MdDelete
													className="icon-size-sm cursor-pointer"
													onClick={() => deleteMedicine(medicine)}
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

export default MedicineList;
