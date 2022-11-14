// This module is responsible for updated the supplier
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SupplierService from "../../../../services/SupplierService";

const UpdateSupplier = () => {
	const initialSupplier = {
		id: null,
		SupplierName: "",
		Address: "",
		Mobile: "",
		Phone: "",
		Email: "",
	};
	let navigate = useNavigate();
	let location = useLocation();

	const [supplier, setSupplier] = useState(initialSupplier);
	const [success, setSuccess] = useState(true);

	useEffect(() => {
		setSupplier({
			id: location.state.supplier.id,
			SupplierName: location.state.supplier.SupplierName,
			Address: location.state.supplier.Address,
			Mobile: location.state.supplier.Mobile,
			Phone: location.state.supplier.Phone,
			Email: location.state.supplier.Email,
		});
	}, []);

	// update the supplier
	const updateSupplier = () => {
		SupplierService.updateSupplier(supplier.id, supplier)
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

	// delete the supplier
	const deleteSupplier = () => {
		SupplierService.deleteSupplier(supplier.id)
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
		setSupplier({ ...supplier, [name]: value });
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
				<h4>Update Supplier</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-lg-10 pb-5 mx-auto">
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="SupplierName">Supplier Name:</label>
							<input
								type="text"
								className="form-control form-input"
								name="SupplierName"
								id="SupplierName"
								value={supplier.SupplierName}
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
								value={supplier.Mobile}
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
								value={supplier.Address}
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
								value={supplier.Phone}
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
								value={supplier.Email}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
				</form>
				<button
					className="btn btn-primary simple-shadow me-3"
					onClick={updateSupplier}
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
					onClick={deleteSupplier}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default UpdateSupplier;
