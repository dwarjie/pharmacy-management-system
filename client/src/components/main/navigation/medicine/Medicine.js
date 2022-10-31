// this module is responsible for adding new medicines
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MedicineService from "../../../../services/MedicineService";

const Medicine = () => {
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
	const [extraModel, setExtraModel] = useState([]);

	useEffect(() => {
		getOtherModel();
	}, []);

	const getOtherModel = () => {
		MedicineService.getOtherModel()
			.then((response) => {
				console.log(response.data);
				setExtraModel(response.data);
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
								{extraModel.category &&
									extraModel.category.map((item, index) => (
										<option value={item.id} key={index}>
											{item.CategoryName}
										</option>
									))}
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="subCategoryId">Sub Category:</label>
							<select
								name="subCategoryId"
								id="subCategoryId"
								className="form-select form-input"
								required
							>
								{extraModel.category &&
									extraModel.category.map((item, index) => (
										<option value={item.id} key={index}>
											{item.CategoryName}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="row mb-3">
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
								{extraModel.manufacturer &&
									extraModel.manufacturer.map((item, index) => (
										<option value={item.id} key={index}>
											{item.ManufacturerName}
										</option>
									))}
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
								{extraModel.unit &&
									extraModel.unit.map((item, index) => (
										<option value={item.id} key={index}>
											{item.UnitName}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md-6">
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
					</div>
				</form>
			</div>
		</div>
	);
};

export default Medicine;
