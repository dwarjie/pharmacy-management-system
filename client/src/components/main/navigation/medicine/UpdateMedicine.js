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
		SupplierPrice: oldMedicine.SupplierPrice,
		SellingPrice: oldMedicine.SellingPrice,
		Quantity: 0,
		ReorderPoint: oldMedicine.ReorderPoint,
		SafetyStock: oldMedicine.SafetyStock,
		Status: oldMedicine.Status,
		supplierId: oldMedicine.supplierId,
		unitId: oldMedicine.unitId,
		subCategoryId: oldMedicine.subCategoryId,
	});

	const initialDropDownValue = {
		category: "",
		subCategoryId: oldMedicine.subCategory.SubCategoryName,
		subCategoryItem: oldMedicine.subCategory,
		supplierId: oldMedicine.supplier.SupplierName,
		unitId: oldMedicine.unit.UnitName,
	};

	// initialize the initial value for medicines dropdown
	const [dropDownValue, setDropDownValue] = useState(initialDropDownValue);
	// initialize state for subcategory dropdown
	const [subCategory, setSubCategory] = useState([]);

	useEffect(() => {
		getOneCategory();
		console.log(dropDownValue);
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
				setDropDownValue((prevValue) => ({
					...prevValue,
					category: categoryData.CategoryName,
				}));
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
