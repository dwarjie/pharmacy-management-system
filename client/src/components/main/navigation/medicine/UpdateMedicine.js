// this module is responsible for updating new medicines
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CategoryService from "../../../../services/CategoryService";
import Medicine from "./Medicine";

const UpdateMedicine = () => {
	const location = useLocation();
	const oldMedicine = location.state.medicine;
	let categoryData = {}; // put here the data from getting category

	// initialize the initial value for medicine forms
	const [medicine, setMedicine] = useState({
		id: oldMedicine.id,
		ProductCode: oldMedicine.ProductCode,
		ProductName: oldMedicine.ProductName,
		ProductDetails: oldMedicine.ProductDetails,
		GenericName: oldMedicine.GenericName,
		ManufacturerPrice: oldMedicine.ManufacturerPrice,
		SellingPrice: oldMedicine.SellingPrice,
		Quantity: 0,
		Status: oldMedicine.Status,
		manufacturerId: oldMedicine.manufacturerId,
		unitId: oldMedicine.unitId,
		subCategoryId: oldMedicine.subCategoryId,
	});

	const initialDropDownValue = {
		category: "",
		subCategoryId: "",
		subCategoryItem: {},
		manufacturerId: "",
		unitId: "",
	};

	// initialize the initial value for medicines dropdown
	const [dropDownValue, setDropDownValue] = useState(initialDropDownValue);
	// initialize state for subcategory dropdown
	const [subCategory, setSubCategory] = useState([]);

	useEffect(() => {
		getOneCategory();
	}, []);

	// get the category data based from oldMedicine category id
	const getOneCategory = () => {
		console.log(oldMedicine);
		CategoryService.getOneCategory(
			oldMedicine.id,
			oldMedicine.subCategory.categoryId
		)
			.then((response) => {
				categoryData = response.data;
				setDropDownValue({
					...dropDownValue,
					category: categoryData.CategoryName,
					subCategoryId: oldMedicine.subCategory.SubCategoryName,
					subCategoryItem: oldMedicine.subCategory,
					manufacturerId: oldMedicine.manufacturer.ManufacturerName,
					unitId: oldMedicine.unit.UnitName,
				});
				setSubCategory(categoryData.subCategory);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// check if status is Active or Inactive
	// if 1 = active, 0 = inactive
	const checkStatus = () => {
		return oldMedicine.Status === 1 ? "Active" : "Inactive";
	};

	return (
		<Medicine
			title={"Update Medicine"}
			initialMedicine={medicine}
			initialDropDownValue={dropDownValue}
			status={checkStatus}
			subCategory={subCategory}
			mode={"update"}
		/>
	);
};

export default UpdateMedicine;
