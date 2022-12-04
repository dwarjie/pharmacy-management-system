// this module is responsible for adding new medicines
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import MedicineService from "../../../../services/MedicineService";

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
	const [alertMessage, setAlertMessage] = useState("");

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
	}, [activeDropDownValue.subCategoryId, medicine.SupplierPrice]);

	// reset subcategory everytime category changes
	// useEffect(() => {
	// 	resetSubCategory();
	// }, [activeDropDownValue.category]);

	// create new product
	const createProduct = (event) => {
		event.preventDefault();

		// ask for confirmation
		if (!AlertPrompt()) return;

		let product = {
			ProductCode: medicine.ProductCode,
			ProductName: medicine.ProductName,
			ProductDetails: medicine.ProductDetails,
			GenericName: medicine.GenericName,
			SupplierPrice: medicine.SupplierPrice,
			SellingPrice: medicine.SellingPrice,
			Quantity: 0,
			ReorderPoint: medicine.ReorderPoint,
			SafetyStock: medicine.SafetyStock,
			Status: medicine.Status,
			supplierId: medicine.supplierId,
			unitId: medicine.unitId,
			subCategoryId: medicine.subCategoryId,
		};
		MedicineService.createMedicine(product)
			.then((response) => {
				console.log(response.data);
				// reset the form
				setAlertMessage(response.data.message);
				if (response.data.data) {
					setMedicine(props.initialMedicine);
					setActiveDropDownValue(props.initialDropDownValue);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update medicine
	const updateMedicine = (event) => {
		event.preventDefault();

		MedicineService.updateMedicine(medicine.id, medicine)
			.then((response) => {
				console.log(response.data);
				alert(response.data.message);
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
	// then use the formula Supplier price + markup amount in order to compute for selling price
	const setSellingPrice = () => {
		// check if props already have SellingPrice
		let price = computeSellingPrice();
		setMedicine({ ...medicine, SellingPrice: price });
	};

	const computeSellingPrice = () => {
		let supplierPrice = parseFloat(medicine.SupplierPrice);
		if (supplierPrice === 0) return 0;

		// check if the type is amount or percentage
		let price = 0;
		let subCategory = activeDropDownValue.subCategoryItem;
		if (subCategory.MarkUpUnit === "%") {
			let percentage = 0; // if the type is percentage
			percentage = subCategory.MarkUp / supplierPrice;
			price = supplierPrice + percentage;
		} else {
			// if amount
			price = supplierPrice + subCategory.MarkUp;
		}

		// check if price is NaN
		if (isNaN(price)) return 0;
		return price.toFixed(2);
	};

	// this will set the current category
	// and will also set it's sub categories
	const setActiveCategory = (activeCategory) => {
		setActiveDropDownValue((prevValue) => ({
			...prevValue,
			category: activeCategory.CategoryName,
		}));
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
		setActiveDropDownValue((prevValue) => ({
			...prevValue,
			subCategoryId: "",
			subCategoryItem: "",
		}));
		setMedicine({ ...medicine, SellingPrice: 0, subCategoryId: 0 });
		console.log("reset");
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
			{alertMessage ? (
				<AlertInfoLayout
					content={alertMessage}
					onClick={(value) => setAlertMessage(value)}
				/>
			) : (
				""
			)}
			<div className="p-3">
				<form
					className="col-12 col-lg-10 pb-5 mx-auto"
					onSubmit={(event) => {
						props.mode === "update"
							? updateMedicine(event)
							: createProduct(event);
					}}
				>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="ProductCode">
								Product Code:
							</label>
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
							<label className="required" htmlFor="ProductName">
								Product Name:
							</label>
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
							<label className="required" htmlFor="category">
								Category:
							</label>
							<select
								name="category"
								id="category"
								className="form-select form-input"
								required
								value={activeDropDownValue.category}
								// set the sub category
								onChange={(event) => {
									let data = parseDropdownValue(event);
									resetSubCategory();
									setActiveCategory(data);
								}}
							>
								{/* check if props category has value
									if yes, don'i show the default value */}
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
											value={item.CategoryName}
											data-value={JSON.stringify(item)}
										>
											{item.CategoryName}
										</option>
									))}
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="unitId">
								Unit of Measure:
							</label>
							<select
								name="unitId"
								id="unitId"
								className="form-select form-input"
								required
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
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="subCategoryId">
								Sub Category:
							</label>
							<select
								name="subCategoryId"
								id="subCategoryId"
								className="form-select form-input"
								required
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
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="SellingPrice">
								Selling Price:
							</label>
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
							<label className="required" htmlFor="SupplierPrice">
								Unit Price:
							</label>
							<input
								type="number"
								min={1}
								className="form-control form-input"
								name="SupplierPrice"
								id="SupplierPrice"
								value={medicine.SupplierPrice}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md-6">
							<label className="required" htmlFor="status">
								Status:
							</label>
							<select
								className="form-select form-input"
								name="status"
								id="status"
								required
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
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="supplierId">
								Supplier:
							</label>
							<select
								name="supplierId"
								id="supplierId"
								className="form-select form-input"
								required
								value={activeDropDownValue.supplierId}
								onChange={(event) => {
									let data = parseDropdownValue(event);
									handleSelectChange(event);
									setMedicine({ ...medicine, supplierId: data.id });
								}}
							>
								<option disabled hidden value="">
									Select supplier
								</option>
								{extraModel.supplier &&
									extraModel.supplier.map((item, index) => (
										<option
											className="dropdown-item"
											key={index}
											value={item.SupplierName}
											data-value={JSON.stringify(item)}
										>
											{item.SupplierName}
										</option>
									))}
							</select>
						</div>
						<div className="col-sm-12 col-md-3">
							<label htmlFor="ReorderPoint" className="required">
								Reorder Point:
							</label>
							<input
								type="number"
								min={medicine.SafetyStock}
								className="form-control form-input"
								name="ReorderPoint"
								id="ReorderPoint"
								value={medicine.ReorderPoint}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md-3">
							<label htmlFor="SafetyStock" className="required">
								Safety Stock:
							</label>
							<input
								type="number"
								min={1}
								max={medicine.ReorderPoint}
								className="form-control form-input"
								name="SafetyStock"
								id="SafetyStock"
								value={medicine.SafetyStock}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary simple-shadow me-3 mt-3"
					>
						{props.mode === "update" ? "Update" : "Save"}
					</button>
					{props.mode === "update" ? (
						<button
							type="button"
							className="btn btn-secondary simple-shadow me-3 mt-3"
							onClick={() => navigate(-1)}
						>
							Back
						</button>
					) : (
						""
					)}
				</form>
			</div>
		</div>
	);
};

export default Medicine;
