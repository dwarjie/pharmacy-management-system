import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../helper/dateHelper";
import SaleService from "../../../../services/SaleService";
import Loader from "../../../layout/Loader";

const SalesList = () => {
	let navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [sales, setSales] = useState([]);

	useEffect(() => {
		getAllSales();
	}, []);

	const getAllSales = async () => {
		SaleService.getAllSales()
			.then((response) => {
				console.log(response.data);
				setSales(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const navigateSale = (sale) => {
		navigate(`/pharmacy/sales/return/${sale.id}`, {
			state: {
				sale: sale,
			},
		});
	};

	const renderItems = () => {
		return (
			sales &&
			sales.map((sale, index) => (
				<tr
					key={index}
					className="cursor-pointer"
					onClick={() => navigateSale(sale)}
				>
					<td>{index + 1}</td>
					<td>{sale.OrderNo}</td>
					<td>{sale.CustomerName}</td>
					<td>{formatDate(sale.OrderDate)}</td>
					<td>{parseFloat(sale.Total).toFixed(2)}</td>
				</tr>
			))
		);
	};

	return (
		<>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
					<Loader />
				</div>
			) : (
				<div className="col-12 h-auto">
					<div className="p-2">
						<h4>Sales List</h4>
						<hr />
					</div>
					<div className="table-responsive">
						<table className="table table-striped table-hover">
							<thead className="table-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Order No</th>
									<th scope="col">Customer Name</th>
									<th scope="col">Date</th>
									<th scope="col">Total</th>
								</tr>
							</thead>
							<tbody>{renderItems()}</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default SalesList;
