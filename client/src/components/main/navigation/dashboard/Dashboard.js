import { useState, useEffect } from "react";
import HandlerService from "../../../../services/HandlerService";
import MedicineService from "../../../../services/MedicineService";
import PatientService from "../../../../services/PatientService";
import Loader from "../../../layout/Loader";

const Dashboard = () => {
	const [loading, setLoading] = useState(false);
	const [totalProducts, setTotalProducts] = useState(0);
	const [totalHandlers, setTotalHandlers] = useState(0);
	const [totalPatients, setTotalPatients] = useState(0);

	useEffect(() => {
		getAllInformation();
	}, []);

	const getAllInformation = async () => {
		await getAllProduct();
		await getAllHandlers();
		await getAllPatient();
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
						<div className="d-flex flex-row p-4">
							<div className="row">
								<div className="col-12 col-md">
									<div className="card text-white bg-primary mb-3 dashboard-card simple-shadow">
										<div className="card-header">Total Product</div>
										<div className="card-body">
											<h2 className="card-text">{totalProducts}</h2>
										</div>
									</div>
								</div>
								<div className="col-12 col-md">
									<div className="card text-white bg-secondary mb-3 dashboard-card simple-shadow">
										<div className="card-header">Total Handlers</div>
										<div className="card-body">
											<h2 className="card-text">{totalHandlers}</h2>
										</div>
									</div>
								</div>
								<div className="col-12 col-md">
									<div className="card text-white bg-info mb-3 dashboard-card simple-shadow">
										<div className="card-header">Total Patients</div>
										<div className="card-body">
											<h2 className="card-text">{totalPatients}</h2>
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
