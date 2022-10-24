// This module is responsible for updated the manufacturer
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ManufacturerService from "../../../../services/ManufacturerService";

const UpdateManufacturer = () => {
	const initialManufacturer = {
		id: null,
		ManufacturerName: "",
		Address: "",
		Mobile: "",
		Phone: "",
		Email: "",
	};
	let navigate = useNavigate();
	let location = useLocation();

	const [manufacturer, setManufacturer] = useState(initialManufacturer);
	const [success, setSuccess] = useState(true);

	useEffect(() => {
		setManufacturer({
			id: location.state.manufacturer.id,
			ManufacturerName: location.state.manufacturer.ManufacturerName,
			Address: location.state.manufacturer.Address,
			Mobile: location.state.manufacturer.Mobile,
			Phone: location.state.manufacturer.Phone,
			Email: location.state.manufacturer.Email,
		});
	}, []);

	// update the manufacturer
	const updateManufacturer = () => {
		ManufacturerService.updateManufacturer(manufacturer.id, manufacturer)
			.then((response) => {
				console.log(response.data);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setSuccess(false);
			});
		checkSuccess();
	};

	// delete the manufacturer
	const deleteManufacturer = () => {
		ManufacturerService.deleteManufacturer(manufacturer.id)
			.then((response) => {
				console.log(response.data);
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setSuccess(false);
			});
		checkSuccess();
	};

	// handle the input change of the forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setManufacturer({ ...manufacturer, [name]: value });
	};

	// check if the update is success, if yes go back, else stay
	const checkSuccess = () => {
		if (!success) {
			return;
		}

		navigate(-1);
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Update Manufacturer</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-lg-10 pb-5 mx-auto">
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="ManufacturerName">Manufacturer Name:</label>
							<input
								type="text"
								className="form-control form-input"
								name="ManufacturerName"
								id="ManufacturerName"
								value={manufacturer.ManufacturerName}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="Mobile">Mobile #:</label>
							<input
								type="text"
								className="form-control form-input"
								name="Mobile"
								id="Mobile"
								value={manufacturer.Mobile}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="Address">Address:</label>
							<input
								type="text"
								className="form-control form-input"
								name="Address"
								id="Address"
								value={manufacturer.Address}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="Phone">Phone #:</label>
							<input
								type="text"
								className="form-control form-input"
								name="Phone"
								id="Phone"
								value={manufacturer.Phone}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="Email">Email:</label>
							<input
								type="email"
								className="form-control form-input"
								name="Email"
								id="Email"
								value={manufacturer.Email}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
				</form>
				<button
					className="btn btn-primary simple-shadow me-3"
					onClick={updateManufacturer}
				>
					Update
				</button>
				<button
					className="btn btn-secondary simple-shadow me-3"
					onClick={() => navigate(-1)}
				>
					Cancel
				</button>
				<button
					className="btn btn-danger simple-shadow"
					onClick={deleteManufacturer}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default UpdateManufacturer;
