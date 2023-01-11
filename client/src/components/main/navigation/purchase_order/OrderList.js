import { useState, useEffect } from "react";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";
import SupplierService from "../../../../services/SupplierService";
import MedicineService from "../../../../services/MedicineService";
import Loader from "../../../layout/Loader";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
	const [supplierList, setSupplierList] = useState([]);
	const [productList, setProductList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllInformation();
	}, []);

	const getAllInformation = async () => {
		await getAllMedicine();
	};

	const getAllMedicine = async () => {
		await MedicineService.getAllMedicine()
			.then((response) => {
				console.log(response.data);
				setProductList(groupProductBySupplier(response.data));
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const groupProductBySupplier = (productsArray, key) => {
		let filteredList = filterProducts(productsArray);
		const groupBySupplier = groupBy("SupplierName");
		console.log(groupBySupplier(filteredList));

		return groupBySupplier(filteredList);
	};

	function groupBy(key) {
		return function group(array) {
			return array.reduce((acc, obj) => {
				const property = obj["supplier"][key];
				acc[property] = acc[property] || [];
				acc[property].push(obj);
				return acc;
			}, {});
		};
	}

	// filter the array of all products, only get the products need to be ordered
	const filterProducts = (productList) => {
		const filteredList = productList.filter((product) => {
			return product.Quantity <= product.ReorderPoint;
		});

		return filteredList;
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<div className="h-auto d-flex flex-column justify-content-between gap-1">
					<div className="p-2">
						<h4>Purchase Order List</h4>
						<hr />
					</div>
					{/* <div className="col-12 col-md-3 h-auto">
						<SupplierList />
					</div> */}
					<GroupedList productList={productList} />
				</div>
			)}
		</>
	);
};

const GroupedList = ({ productList }) => {
	const iterateObject = () => {
		if (productList === []) return;

		return Object.keys(productList).map((supplier, key) => (
			<ProductTable key={key} supplier={supplier} productList={productList} />
		));
	};

	return (
		<div className="h-auto d-flex flex-column justify-content-between gap-2 mt-3">
			{iterateObject()}
		</div>
	);
};

const ProductTable = ({ productList, supplier }) => {
	const navigate = useNavigate();
	const products = productList[supplier];

	const orderData = () => {
		console.log(products);
		return (
			products &&
			products.map((product, index) => (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{product.ProductCode}</td>
					<td>{product.ProductName}</td>
					<td>{product.Quantity}</td>
					<td>{product.SupplierPrice}</td>
				</tr>
			))
		);
	};

	const orderAll = () => {
		navigate(`/pharmacy/inventory/order-list/purchase-order`, {
			state: {
				products: products,
			},
		});
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-2">
				<h5>{supplier}</h5>
				<hr />
			</div>
			<div className="table-responsive max-height-100">
				<table className="table table-striped table-hover">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">PCode</th>
							<th scope="col">Item</th>
							<th scope="col">On hand</th>
							<th scope="col">Unit Cost</th>
						</tr>
					</thead>
					<tbody>{orderData()}</tbody>
				</table>
				<span className="btn btn-primary m-2" onClick={() => orderAll()}>
					Order All
				</span>
			</div>
		</div>
	);
};

const SupplierList = () => {
	return (
		<>
			<div className="col-sm-12 col-md">
				<label className="required" htmlFor="">
					Supplier:
				</label>
				<select
					name="supplierId"
					className="form-select form-input"
					// onChange={(event) => {
					// 	let data = parseDropdownValue(event);
					// 	setActiveDropDownValue((prevState) => ({
					// 		...prevState,
					// 		supplier: data.SupplierName,
					// 		supplierData: data,
					// 	}));
					// 	setPurchaseOrder((prevState) => ({
					// 		...prevState,
					// 		supplierId: data.id,
					// 	}));
					// }}
				>
					<DropDownDefaultOption content={"Select Supplier"} />
					{/* {supplierList &&
							supplierList.map((supplier, index) => (
								<option
									className="dropdown-item"
									value={supplier.SupplierName}
									key={index}
									data-value={JSON.stringify(supplier)}
								>
									{supplier.SupplierName}
								</option>
							))} */}
				</select>
			</div>
		</>
	);
};

export default OrderList;
