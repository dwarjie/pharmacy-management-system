// This module is for adding new medicine/product
import Medicine from "./Medicine";

const AddMedicine = () => {
	// initialize the initial value for medicine
	const initialMedicine = {
		ProductCode: "",
		ProductName: "",
		ProductDetails: "",
		GenericName: "",
		SupplierPrice: 0,
		SellingPrice: 0,
		Quantity: 0,
		ReorderPoint: 0,
		SafetyStock: 0,
		Status: 1,
		supplierId: null,
		unitId: null,
		subCategoryId: null,
	};
	const initialDropDownValue = {
		category: "",
		subCategoryId: "",
		subCategoryItem: "",
		supplierId: "",
		unitId: "",
	};

	return (
		<Medicine
			title={"Add Medicine"}
			initialMedicine={initialMedicine}
			initialDropDownValue={initialDropDownValue}
			status={"Active"}
			subCategory={[]}
		/>
	);
};

export default AddMedicine;
