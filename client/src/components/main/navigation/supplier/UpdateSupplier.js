// This module is responsible for updated the supplier
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SupplierService from "../../../../services/SupplierService";

const UpdateSupplier = () => {
	const initialSupplier = {
		id: null,
		SupplierName: "",
		ContactPerson: "",
		Address: "",
		Mobile: "",
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
			ContactPerson: location.state.supplier.ContactPerson,
			Address: location.state.supplier.Address,
			Mobile: location.state.supplier.Mobile,
			Email: location.state.supplier.Email,
		});
	}, []);

	// update the supplier
	const updateSupplier = (event) => {
		event.preventDefault();

		SupplierService.updateSupplier(supplier.id, supplier)
			.then((response) => {
				console.log(response.data);
				alert(response.data.message);
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
		<div className="col-12 h-auto">
			<div className="p-2">
				<h4>Update Supplier</h4>
				<hr />
			</div>
			<div className="p-2">
				<form
					className="col-12 col-lg-10 pb-5 mx-auto"
					onSubmit={(event) => updateSupplier(event)}
				>
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="SupplierName">
								Supplier Name:
							</label>
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
							<label className="required" htmlFor="SupplierName">
								Contact Person:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="ContactPerson"
								id="ContactPerson"
								value={supplier.ContactPerson}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Mobile">
								Contact #:
							</label>
							<input
								type="text"
								minLength={11}
								maxLength={11}
								pattern="[0-9]+"
								className="form-control form-input"
								name="Mobile"
								id="Mobile"
								value={supplier.Mobile}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Address">
								Address:
							</label>
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
							<label htmlFor="Email">Email:</label>
							<input
								type="email"
								className="form-control form-input"
								name="Email"
								id="Email"
								value={supplier.Email}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary simple-shadow me-3 mt-3"
					>
						Update
					</button>
					<button
						type="button"
						className="btn btn-secondary simple-shadow me-3 mt-3"
						onClick={() => navigate(-1)}
					>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateSupplier;
