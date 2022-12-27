// This component shows the past transactions and view them
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../helper/dateHelper";
import SaleService from "../../../../services/SaleService";

// icons
import { FaEye } from "react-icons/fa";

const ManagePOS = () => {
	let navigate = useNavigate();

	const [sales, setSales] = useState([]);

	useEffect(() => {
		getAllSales();
	}, []);

	const getAllSales = () => {
		SaleService.getAllSales()
			.then((response) => {
				console.log(response.data);
				setSales(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const viewSale = (sale) => {
		navigate(`/pharmacy/sales/sales-list/${sale.id}`);
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Sales List</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="medicine-search">Search:</label>
					<input type="text" className="form-control" id="medicine-search" />
				</form>
				<table className="table table-striped table-hover">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Order No</th>
							<th scope="col">Customer Name</th>
							<th scope="col">Date</th>
							<th scope="col">Total</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{sales &&
							sales.map((sale, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{sale.OrderNo}</td>
									<td>{sale.CustomerName}</td>
									<td>{formatDate(sale.OrderDate)}</td>
									<td>&#8369;{sale.Total}</td>
									<td>
										<span className="px-2">
											<FaEye
												className="icon-size-sm cursor-pointer"
												onClick={() => viewSale(sale)}
											/>
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManagePOS;
