// this module is responsible for listing all the medicines
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MedicineService from "../../../../services/MedicineService";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MedicineList = () => {
	let navigate = useNavigate();
	const [medicines, setMedicines] = useState([]);

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

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Medicine List</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="medicine-search">Search:</label>
					<input type="text" className="form-control" id="medicine-search" />
				</form>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Product Name</th>
							<th scope="col">Generic Name</th>
							<th scope="col">Category</th>
							<th scope="col">Manufacturer</th>
							<th scope="col">Price</th>
							<th scope="col">Manufacturer Price</th>
							<th scope="col">Details</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{medicines &&
							medicines.map((medicine, index) => (
								<tr key={index}>
									<td>{medicine.ProductName}</td>
									<td>{medicine.GenericName}</td>
									<td>{medicine.subCategory.SubCategoryName}</td>
									<td>{medicine.manufacturer.ManufacturerName}</td>
									<td>{medicine.SellingPrice}</td>
									<td>{medicine.ManufacturerPrice}</td>
									<td>{medicine.ProductDetails}</td>
									<td>
										<span className="px-2">
											<FaEdit
												className="icon-size-sm cursor-pointer"
												onClick={() => updateMedicine(medicine)}
											/>
										</span>
										<span className="px-2">
											<MdDelete className="icon-size-sm cursor-pointer" />
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MedicineList;
