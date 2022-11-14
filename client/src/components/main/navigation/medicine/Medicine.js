// this module is responsible for adding new medicines
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MedicineService from "../../../../services/MedicineService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

const Medicine = (props) => {
	// this is for the status drop down
	const statusList = ["Active", "Inactive"];

	const [medicine, setMedicine] = useState(props.initialMedicine);
	const [extraModel, setExtraModel] = useState([]); // this state is for other models that are needed for drop downs
	const [activeDropDownValue, setActiveDropDownValue] = useState(
		props.initialDropDownValue
	);
	const [status, setStatus] = useState(props.status);
	const [subCategory, setSubCategory] = useState(props.subCategory);

	useEffect(() => {
		setMedicine(props.initialMedicine);
		setActiveDropDownValue(props.initialDropDownValue);
		setStatus(props.status);
		setSubCategory(props.subCategory);
	}, [
		props.initialMedicine,
		props.initialDropDownValue,
		props.status,
		props.subCategory,
	]);

	let navigate = useNavigate();

	useEffect(() => {
		getOtherModel();
	}, []);

	// everytime the subcategory changes, compute sellingprice
	useEffect(() => {
		setSellingPrice();
	}, [activeDropDownValue.subCategoryId, medicine.ManufacturerPrice]);

	// reset subcategory everytime category changes
	useEffect(() => {
		resetSubCategory();
	}, [activeDropDownValue.category]);

	// create new product
	const createProduct = () => {
		// ask for confirmation
		if (!AlertPrompt()) return;

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
				setMedicine(props.initialMedicine);
				setActiveDropDownValue(props.initialDropDownValue);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update medicine
	const updateMedicine = () => {
		MedicineService.updateMedicine(medicine.id, medicine)
			.then((response) => {
				console.log(response.data);
				navigate(-1);
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
		// check if props already have SellingPrice
		let price = computeSellingPrice();
		setMedicine({ ...medicine, SellingPrice: price });
	};

	const computeSellingPrice = () => {
		let manufacturerPrice = parseFloat(medicine.ManufacturerPrice);
		if (manufacturerPrice === 0) return 0;

		// check if the type is amount or percentage
		let price = 0;
		let subCategory = activeDropDownValue.subCategoryItem;
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

	const handleSelectChange = (event) => {
		const { name, value } = event.target;
		setActiveDropDownValue({ ...activeDropDownValue, [name]: value });
	};

	// reset sub categories and selling price once category changed
	const resetSubCategory = () => {
		setActiveDropDownValue({
			...activeDropDownValue,
			subCategoryId: "",
			subCategoryItem: "",
		});
		setMedicine({ ...medicine, SellingPrice: 0, subCategoryId: 0 });
	};

	// parse the dropdown value into JSON and return it
	const parseDropdownValue = (event) => {
		return JSON.parse(
			event.target[event.target.selectedIndex].getAttribute("data-value")
		);
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>{props.title}</h4>
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
							<select
								name="category"
								id="category"
								className="form-select form-input"
								defaultValue={activeDropDownValue.category}
								// set the sub category
								onChange={(event) => {
									let data = JSON.parse(event.target.value);
									setActiveCategory(data);
								}}
							>
								{/* check if props category has value
									if yes, don't show the default value */}
								{props.initialDropDownValue.category === "" ? (
									<option disabled={true} hidden value="">
										Select category
									</option>
								) : (
									""
								)}
								{extraModel.category &&
									extraModel.category.map((item, index) => (
										<option
											className="dropdown-item"
											key={index}
											value={JSON.stringify(item)}
										>
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
								value={activeDropDownValue.subCategoryId}
								onChange={(event) => {
									// handle the value for subCategoryId name
									// and also add the subcategory items
									let data = parseDropdownValue(event);
									setActiveDropDownValue({
										...activeDropDownValue,
										subCategoryId: event.target.value,
										subCategoryItem: data,
									});
									setMedicine({ ...medicine, subCategoryId: data.id });
								}}
							>
								{/* check if props subCategory has value
									if yes, don't show the default value */}
								{props.subCategory === "" ||
								activeDropDownValue.subCategoryId === "" ? (
									<option disabled={true} hidden value="">
										Select Sub category
									</option>
								) : (
									""
								)}
								{subCategory &&
									subCategory.map((item, index) => (
										<option
											className="dropdown-item"
											key={index}
											value={item.SubCategoryName}
											data-value={JSON.stringify(item)}
										>
											{item.SubCategoryName}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="ManufacturerPrice">Unit Price:</label>
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
							<label htmlFor="manufacturerId">Supplier:</label>
							<select
								name="manufacturerId"
								id="manufacturerId"
								className="form-select form-input"
								value={activeDropDownValue.manufacturerId}
								onChange={(event) => {
									let data = parseDropdownValue(event);
									handleSelectChange(event);
									setMedicine({ ...medicine, manufacturerId: data.id });
								}}
							>
								<option disabled hidden value="">
									Select supplier
								</option>
								{extraModel.manufacturer &&
									extraModel.manufacturer.map((item, index) => (
										<option
											className="dropdown-item"
											key={index}
											value={item.ManufacturerName}
											data-value={JSON.stringify(item)}
										>
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
								value={activeDropDownValue.unitId}
								onChange={(event) => {
									let data = parseDropdownValue(event);
									handleSelectChange(event);
									setMedicine({ ...medicine, unitId: data.id });
								}}
							>
								<option disabled hidden value="">
									Select Unit
								</option>
								{extraModel.unit &&
									extraModel.unit.map((item, index) => (
										<option
											className="dropdown-item"
											key={index}
											value={item.UnitName}
											data-value={JSON.stringify(item)}
										>
											{item.UnitName}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md-6">
							<label htmlFor="status">Status:</label>
							<select
								className="form-select form-input"
								name="status"
								id="status"
								value={status}
								onChange={(event) => {
									let data = event.target.value;
									setStatus(data);
									setMedicine({
										...medicine,
										Status: data === "Active" ? 1 : 0,
									});
								}}
							>
								{statusList &&
									statusList.map((item, index) => (
										<option className="dropdown-item" key={index} value={item}>
											{item}
										</option>
									))}
							</select>
						</div>
					</div>
				</form>
				<button
					className="btn btn-primary simple-shadow me-3"
					onClick={() =>
						props.mode === "update" ? updateMedicine() : createProduct()
					}
				>
					{props.mode === "update" ? "Update" : "Save"}
				</button>
			</div>
		</div>
	);
};

export default Medicine;
