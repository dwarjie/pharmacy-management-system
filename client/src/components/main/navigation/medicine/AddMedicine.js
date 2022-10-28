// this module is responsible for adding new medicines
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MedicineService from "../../../../services/MedicineService";

const AddMedicine = () => {
	const initialMedicine = {
		id: null,
		ProductCode: "",
		ProductName: "",
		ProductDetails: "",
		GenericName: "",
		ManufacturerPrice: "",
		SellingPrice: "",
		Quantity: "",
		Status: "",
		manufacturerId: null,
		unitId: null,
		subCategoryId: null,
	};
	let navigate = useNavigate();

	const [medicine, setMedicine] = useState(initialMedicine);

	useEffect(() => {
		getOtherModel();
	}, []);

	const getOtherModel = () => {
		MedicineService.getOtherModel()
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setMedicine({ ...medicine, [name]: value });
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Add Medicine</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="pb-5">
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="ProductCode">Product Code:</label>
							<input
								type="text"
								className="form-control form-input"
								name="ProductCode"
								id="ProductCode"
								value={medicine.ProductCode}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="GenericName">Generic Name:</label>
							<input
								type="text"
								className="form-control form-input"
								name="GenericName"
								id="GenericName"
								value={medicine.GenericName}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="ProductName">Product Name:</label>
							<input
								type="text"
								className="form-control form-input"
								name="ProductName"
								id="ProductName"
								value={medicine.ProductName}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="ProductDetails">Product Details:</label>
							<input
								type="text"
								className="form-control form-input"
								name="ProductDetails"
								id="ProductDetails"
								value={medicine.ProductDetails}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="subCategoryId">Category:</label>
							<select
								name="subCategoryId"
								id="subCategoryId"
								className="form-select form-input"
								required
							>
								<option value="cat_1">Category 1</option>
								<option value="cat_2">Category 2</option>
							</select>
						</div>
						{/* <div className="col-sm-12 col-md">
							<label htmlFor="strength">Strength:</label>
							<input
								type="text"
								className="form-control form-input"
								id="strength"
								required
							/>
						</div> */}
						<div className="col-sm-12 col-md">
							<label htmlFor="SellingPrice">Selling Price:</label>
							<input
								type="text"
								className="form-control form-input"
								name="SellingPrice"
								id="SellingPrice"
								value={medicine.SellingPrice}
								onChange={handleInputChange}
								disabled
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="manufacturerId">Manufacturer:</label>
							<select
								name="manufacturerId"
								id="manufacturerId"
								className="form-select form-input"
								required
							>
								<option value="Manufacturer_1">Manufacturer 1</option>
								<option value="Manufacturer_2">Manufacturer 2</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="ManufacturerPrice">Manufacturer Price:</label>
							<input
								type="number"
								className="form-control form-input"
								name="ManufacturerPrice"
								id="ManufacturerPrice"
								value={medicine.ManufacturerPrice}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="Status">Status:</label>
							<select
								name="Status"
								id="Status"
								className="form-select form-input"
								required
							>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="unitId">Unit of Measure:</label>
							<select
								name="unitId"
								id="unitId"
								className="form-select form-input"
								required
							>
								<option value="pack">Pack</option>
								<option value="piece">Piece</option>
								<option value="table">Table</option>
							</select>
						</div>
					</div>
					{/* <div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="type">Medicine Type:</label>
							<select
								name="type"
								id="type"
								className="form-select form-input"
								required
							>
								<option value="painKiller" selected>
									Pain Killer
								</option>
								<option value="suspension">Suspension</option>
							</select>
						</div>
					</div> */}
				</form>
			</div>
		</div>
	);
};

export default AddMedicine;
