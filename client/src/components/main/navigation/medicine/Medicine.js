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
	// this is for the status drop down
	const unitList = ["Active", "Inactive"];
	let navigate = useNavigate();

	const [medicine, setMedicine] = useState(initialMedicine);
	const [extraModel, setExtraModel] = useState([]); // this state is for other models that are needed for drop downs
	const [category, setCategory] = useState("Product Category");
	const [subCategory, setSubCategory] = useState([]);
	const [activeSubCategory, setActiveSubCategory] = useState("Choose Category");
	const [activeManufacturer, setActiveManufacturer] = useState(
		"Choose Manufacturer"
	);
	const [activeUnit, setActiveUnit] = useState("Choose Unit");
	const [activeStatus, setActiveStatus] = useState(unitList[0]);

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

	// this will set the current category
	// and will also set it's sub categories
	const setActiveCategory = (category) => {
		setCategory(category.CategoryName);
		setSubCategory(category.subCategory);
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
							<label htmlFor="category">Category:</label>
							<div className="dropdown w-auto">
								<button
									className="btn dropdown-toggle w-100 form-input"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									required
								>
									{category}
								</button>
								<ul className="dropdown-menu w-100">
									{extraModel.category &&
										extraModel.category.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() => setActiveCategory(item)}
											>
												{item.CategoryName}
											</li>
										))}
								</ul>
							</div>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="subCategoryId">Sub Category:</label>
							<div className="dropdown w-auto">
								<button
									className="btn dropdown-toggle w-100 form-input"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									required
								>
									{activeSubCategory}
								</button>
								<ul className="dropdown-menu w-100">
									{subCategory &&
										subCategory.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() =>
													setActiveSubCategory(item.SubCategoryName)
												}
											>
												{item.SubCategoryName}
											</li>
										))}
								</ul>
							</div>
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
							<div className="dropdown w-auto">
								<button
									className="btn dropdown-toggle w-100 form-input"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{activeManufacturer}
								</button>
								<ul className="dropdown-menu w-100">
									{extraModel.manufacturer &&
										extraModel.manufacturer.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() =>
													setActiveManufacturer(item.ManufacturerName)
												}
											>
												{item.ManufacturerName}
											</li>
										))}
								</ul>
							</div>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="unitId">Unit of Measure:</label>
							<div className="dropdown w-auto">
								<button
									className="btn dropdown-toggle w-100 form-input"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{activeUnit}
								</button>
								<ul className="dropdown-menu w-100">
									{extraModel.unit &&
										extraModel.unit.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() => setActiveUnit(item.UnitName)}
											>
												{item.UnitName}
											</li>
										))}
								</ul>
							</div>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md-6">
							<label htmlFor="Status">Status:</label>
							<div className="dropdown w-auto">
								<button
									className="btn dropdown-toggle w-100 form-input"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{activeStatus}
								</button>
								<ul className="dropdown-menu w-100">
									{unitList &&
										unitList.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() => setActiveStatus(item)}
											>
												{item}
											</li>
										))}
								</ul>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Medicine;
