import { useState, useEffect } from "react";
import MedicineService from "../../../../services/MedicineService";
import Loader from "../../../layout/Loader";

const StockAdjustment = () => {
	const [productList, setProductList] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});
	const [searchInput, setSearchInput] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getProductList();
	}, []);

	const getProductList = async () => {
		await MedicineService.getAllMedicine()
			.then((response) => {
				console.log(response.data);
				setProductList(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const findByTitle = (title) => {
		MedicineService.getByTitle(title)
			.then((response) => {
				console.log(response.data);
				setProductList(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<div className="h-auto d-flex flex-column justify-content-between gap-1">
					<div className="h-75 border border-dark rounded simple-shadow mt-3">
						<div className="table-responsive max-height-100">
							<div className="p-3 w-100">
								<SearchProduct
									setSearchInput={setSearchInput}
									searchInput={searchInput}
									findByTitle={findByTitle}
									getProductList={getProductList}
								/>
							</div>
							<ProductTable
								productList={productList}
								setSelectedProduct={setSelectedProduct}
							/>
						</div>
					</div>
					<div className="col-12 h-auto">
						<div className="h-75 border border-dark rounded simple-shadow mt-3">
							<ProductDetails selectedProduct={selectedProduct} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

const ProductDetails = ({ selectedProduct }) => {
	return (
		<form className="col-12 col-md-11 p-3 mb-3 mx-auto">
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label htmlFor="">Item:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled={true}
						defaultValue={selectedProduct ? selectedProduct.ProductName : ""}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="Mode">
						Mode:
					</label>
					<select
						name="Mode"
						id="Mode"
						className="form-select form-input"
						required
					>
						<option value="add">Add</option>
						<option value="subtract">Subtract</option>
					</select>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label htmlFor="">Stock On Hand:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled={true}
						defaultValue={selectedProduct ? selectedProduct.Quantity : ""}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="Quantity">
						Qty:
					</label>
					<input
						type="number"
						name="Quantity"
						id="Quantity"
						placeholder="Quantity to adjust"
						className="form-control form-input"
						required
					/>
				</div>
			</div>
			<div className="row mt-3 col-12">
				<div className="col-sm-12 col-md">
					<label htmlFor="">Supplier:</label>
					<input
						type="text"
						className="form-control form-input"
						disabled={true}
						defaultValue={
							selectedProduct.supplier
								? selectedProduct.supplier.SupplierName
								: ""
						}
					/>
				</div>
				<div className="col-sm-12 col-md">
					<label className="required" htmlFor="Reason">
						Reason:
					</label>
					<input
						type="text"
						name="Reason"
						id="Reason"
						placeholder="Reason for adjustment"
						className="form-control form-input"
						required
					/>
				</div>
			</div>
		</form>
	);
};

const ProductTable = ({ productList, setSelectedProduct }) => {
	const productData = () => {
		return (
			productList &&
			productList.map((product, index) => (
				<tr
					key={index}
					className="cursor-pointer"
					onClick={() => setSelectedProduct(product)}
				>
					<td>{index}</td>
					<td>{product.ProductCode}</td>
					<td>{product.ProductName}</td>
					<td>{product.Quantity}</td>
					<td>{product.SellingPrice}</td>
				</tr>
			))
		);
	};

	return (
		<>
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
				<tbody>{productData()}</tbody>
			</table>
		</>
	);
};

const SearchProduct = ({
	searchInput,
	setSearchInput,
	findByTitle,
	getProductList,
}) => {
	useEffect(() => {
		if (searchInput !== "") {
			findByTitle(searchInput);
		} else {
			getProductList();
		}
	}, [searchInput]);

	return (
		<div className="input-group flex-nowrap">
			<input
				type="text"
				className="w-100 form-control form-input"
				placeholder="Search product name"
				name="searchInput"
				id="searchInput"
				value={searchInput}
				onChange={(event) => setSearchInput(event.target.value)}
			/>
			<button
				className="btn btn-secondary"
				type="button"
				onClick={() => setSearchInput("")}
			>
				Clear
			</button>
		</div>
	);
};

export default StockAdjustment;
