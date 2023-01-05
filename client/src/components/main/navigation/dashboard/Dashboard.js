import { useState, useEffect } from "react";
import Loader from "../../../layout/Loader";

const Dashboard = () => {
	const [loading, setLoading] = useState(false);

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
											<h5 className="card-title">Primary card title</h5>
											<p className="card-text">
												Some quick example text to build on the card title and
												make up the bulk of the card's content.
											</p>
										</div>
									</div>
								</div>
								<div className="col-12 col-md">
									<div className="card text-white bg-primary mb-3 dashboard-card simple-shadow">
										<div className="card-header">Total Handlers</div>
										<div className="card-body">
											<h5 className="card-title">Primary card title</h5>
											<p className="card-text">
												Some quick example text to build on the card title and
												make up the bulk of the card's content.
											</p>
										</div>
									</div>
								</div>
								<div className="col-12 col-md">
									<div className="card text-white bg-primary mb-3 dashboard-card simple-shadow">
										<div className="card-header">Total Patients</div>
										<div className="card-body">
											<h5 className="card-title">Primary card title</h5>
											<p className="card-text">
												Some quick example text to build on the card title and
												make up the bulk of the card's content.
											</p>
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
