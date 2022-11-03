// this module is responsible for adding new medicines
import { useState, useEffect } from "react";
import MedicineService from "../../../../services/MedicineService";

const Medicine = () => {
	// this is for the status drop down
	const statusList = ["Active", "Inactive"];

	const initialMedicine = {
		ProductCode: "",
		ProductName: "",
		ProductDetails: "",
		GenericName: "",
		ManufacturerPrice: 0,
		SellingPrice: 0,
		Quantity: 0,
		Status: 1,
		manufacturerId: null,
		unitId: null,
		subCategoryId: null,
	};

	// this initial is for the dropdowns
	const initialDropDowns = {
		category: "Choose Category",
		subCategoryId: "Choose Sub Category",
		manufacturerId: "Choose Manufacturer",
		unitId: "Choose Unit",
		status: statusList[0],
	};

	const [medicine, setMedicine] = useState(initialMedicine);
	const [extraModel, setExtraModel] = useState([]); // this state is for other models that are needed for drop downs
	const [activeDropDownValue, setActiveDropDownValue] =
		useState(initialDropDowns);
	const [subCategory, setSubCategory] = useState([]);

	useEffect(() => {
		getOtherModel();
	}, []);

	// everytime the subcategory changes, compute sellingprice
	useEffect(() => {
		setSellingPrice();
	}, [activeDropDownValue.subCategoryId, medicine.ManufacturerPrice]);

	// reset subcategory everytime category changes
	useEffect(() => {
		if (typeof activeDropDownValue.subCategoryId === "object") {
			resetSubCategory();
		}
	}, [activeDropDownValue.category]);

	// create new product
	const createProduct = () => {
		let product = {
			ProductCode: medicine.ProductCode,
			ProductName: medicine.ProductName,
			ProductDetails: medicine.ProductDetails,
			GenericName: medicine.GenericName,
			ManufacturerPrice: medicine.ManufacturerPrice,
			SellingPrice: medicine.SellingPrice,
			Quantity: 0,
			Status: medicine.Status,
			manufacturerId: medicine.manufacturerId,
			unitId: medicine.unitId,
			subCategoryId: medicine.subCategoryId,
		};
		MedicineService.createMedicine(product)
			.then((response) => {
				console.log(response.data);
				// reset the form
				setMedicine(initialMedicine);
				setActiveDropDownValue(initialDropDowns);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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

	// this function will get the markup amount
	// then use the formula Manufacturer price + markup amount in order to compute for selling price
	const setSellingPrice = () => {
		// check if there is a chosen subCategory
		let price = computeSellingPrice();
		setMedicine({ ...medicine, SellingPrice: price });
	};

	const computeSellingPrice = () => {
		let manufacturerPrice = parseFloat(medicine.ManufacturerPrice);
		if (manufacturerPrice === 0) return 0;

		// check if the type is amount or percentage
		let price = 0;
		let subCategory = activeDropDownValue.subCategoryId;
		if (subCategory.MarkUpUnit === "%") {
			let percentage = 0; // if the type is percentage
			percentage = subCategory.MarkUp / manufacturerPrice;
			price = manufacturerPrice + percentage;
		} else {
			// if amount
			price = manufacturerPrice + subCategory.MarkUp;
		}

		// check if price is NaN
		if (isNaN(price)) return 0;
		return price;
	};

	// this will set the current category
	// and will also set it's sub categories
	const setActiveCategory = (activeCategory) => {
		setActiveDropDownValue({
			...activeDropDownValue,
			category: activeCategory.CategoryName,
		});
		setSubCategory(activeCategory.subCategory);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setMedicine({ ...medicine, [name]: value });
	};

	// reset sub categories and selling price once category changed
	const resetSubCategory = () => {
		setActiveDropDownValue({
			...activeDropDownValue,
			subCategoryId: initialDropDowns.subCategoryId,
		});
		setMedicine({ ...medicine, SellingPrice: 0 });
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
									{activeDropDownValue.category}
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
									{activeDropDownValue.subCategoryId.SubCategoryName
										? activeDropDownValue.subCategoryId.SubCategoryName
										: activeDropDownValue.subCategoryId}
								</button>
								<ul className="dropdown-menu w-100">
									{subCategory &&
										subCategory.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() => {
													setActiveDropDownValue({
														...activeDropDownValue,
														subCategoryId: item,
													});
													setMedicine({ ...medicine, subCategoryId: item.id });
												}}
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
									{activeDropDownValue.manufacturerId}
								</button>
								<ul className="dropdown-menu w-100">
									{extraModel.manufacturer &&
										extraModel.manufacturer.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() => {
													setActiveDropDownValue({
														...activeDropDownValue,
														manufacturerId: item.ManufacturerName,
													});
													setMedicine({ ...medicine, manufacturerId: item.id });
												}}
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
									{activeDropDownValue.unitId}
								</button>
								<ul className="dropdown-menu w-100">
									{extraModel.unit &&
										extraModel.unit.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() => {
													setActiveDropDownValue({
														...activeDropDownValue,
														unitId: item.UnitName,
													});
													setMedicine({ ...medicine, unitId: item.id });
												}}
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
									{activeDropDownValue.status}
								</button>
								<ul className="dropdown-menu w-100">
									{statusList &&
										statusList.map((item, index) => (
											<li
												className="dropdown-item"
												key={index}
												onClick={() => {
													setActiveDropDownValue({
														...activeDropDownValue,
														status: item,
													});
													setMedicine({
														...medicine,
														Status: item === "Active" ? 1 : 0,
													});
												}}
											>
												{item}
											</li>
										))}
								</ul>
							</div>
						</div>
					</div>
				</form>
				<button
					className="btn btn-primary simple-shadow me-3"
					onClick={createProduct}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default Medicine;
