import { useState, useEffect } from "react";
import HandlerService from "../../../../services/HandlerService";
import MedicineService from "../../../../services/MedicineService";
import PatientService from "../../../../services/PatientService";
import Loader from "../../../layout/Loader";
import "boxicons";

import handlerImg from "../../../../asset/handler.png";
import InvoiceService from "../../../../services/InvoiceService";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [totalProducts, setTotalProducts] = useState(0);
	const [totalHandlers, setTotalHandlers] = useState(0);
	const [totalPatients, setTotalPatients] = useState(0);
	const [totalPending, setTotalPending] = useState(0);

	useEffect(() => {
		getAllInformation();
	}, []);

	const getAllInformation = async () => {
		await getAllProduct();
		await getAllHandlers();
		await getAllPatient();
		await getAllPendingInvoice();
		setLoading(false);
	};

	const getAllProduct = async () => {
		await MedicineService.countMedicine()
			.then((response) => {
				console.log(response.data);
				setTotalProducts(response.data.count);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAllHandlers = async () => {
		await HandlerService.getAllHandler()
			.then((response) => {
				console.log(response.data.length);
				setTotalHandlers(response.data.length);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAllPatient = async () => {
		await PatientService.getAllPatient()
			.then((response) => {
				console.log(response.data.length);
				setTotalPatients(response.data.length);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getAllPendingInvoice = async () => {
		await InvoiceService.getAllPendingInvoice()
			.then((response) => {
				console.log(response.data);
				setTotalPending(response.data.length);
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
				<div>
					<div className="col-12 h-auto">
						<div className="p-3">
							<h4>Dashboard</h4>
							<hr />
						</div>
						<div className="w-100 row d-flex flex-row p-3 g-1">
							<div className="card col-md-12 col-lg card-info">
								<div className="d-flex flex-row flex-nowrap g-4 justify-content-center align-items-center">
									<div className="card-product">
										<box-icon
											type="solid"
											name="cart"
											size="md"
											color="#35a850"
										></box-icon>
									</div>
									<div>
										<div className="card-body">
											<h6 className="card-title">Total Products</h6>
											<h2 className="card-text">{totalProducts}</h2>
										</div>
									</div>
								</div>
							</div>
							<div className="card col-md-12 col-lg card-info">
								<div className="d-flex flex-row flex-nowrap g-4 justify-content-center align-items-center">
									<div className="card-handler">
										<box-icon
											name="user"
											type="solid"
											size="md"
											color="#1d3557"
										></box-icon>
									</div>
									<div>
										<div className="card-body">
											<h6 className="card-title">Total Handlers</h6>
											<h2 className="card-text">{totalHandlers}</h2>
										</div>
									</div>
								</div>
							</div>
							<div className="card col-md-12 col-lg card-info">
								<div className="d-flex flex-row flex-nowrap g-4 justify-content-center align-items-center">
									<div className="card-patient">
										<box-icon
											type="solid"
											name="user"
											size="md"
											color="#b6202d"
										></box-icon>
									</div>
									<div>
										<div className="card-body">
											<h6 className="card-title">Total Patients</h6>
											<h2 className="card-text">{totalPatients}</h2>
										</div>
									</div>
								</div>
							</div>
							<div className="card col-md-12 col-lg card-info">
								<div className="d-flex flex-row flex-nowrap g-4 justify-content-center align-items-center">
									<div className="card-invoice">
										<box-icon
											type="solid"
											name="receipt"
											size="md"
											color="#457b9d"
										></box-icon>
									</div>
									<div>
										<div className="card-body">
											<h6 className="card-title">Pending Invoices</h6>
											<h2 className="card-text">{totalPending}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Dashboard;
