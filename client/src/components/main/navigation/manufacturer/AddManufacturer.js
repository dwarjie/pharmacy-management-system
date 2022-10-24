// this module is responsible for adding new manufacturer
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManufacturerService from "../../../../services/ManufacturerService";

// icons
import { FaEdit } from "react-icons/fa";

const AddManufacturer = () => {
	const initialManufacturer = {
		id: null,
		ManufacturerName: "",
		Address: "",
		Mobile: "",
		Phone: "",
		Email: "",
	};
	let navigate = useNavigate();

	const [manufacturers, setManufacturers] = useState([]);
	const [newManufacturer, setNewManufacturer] = useState(initialManufacturer);

	// once the page is loaded, run this
	useEffect(() => {
		getAllManufacturers();
	}, []);

	// get all the manufacturer in the database
	const getAllManufacturers = () => {
		ManufacturerService.getManufacturer()
			.then((response) => {
				setManufacturers(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// create a new manufacturer
	const createManufacturer = () => {
		let data = {
			ManufacturerName: newManufacturer.ManufacturerName,
			Address: newManufacturer.Address,
			Mobile: newManufacturer.Mobile,
			Phone: newManufacturer.Phone,
			Email: newManufacturer.Email,
		};

		ManufacturerService.createManufacturer(data)
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update manufacturer
	const updateManufacturer = (manufacturer) => {
		navigate(`/pharmacy/maintenance/manufacturer/${manufacturer.id}`, {
			state: {
				manufacturer: manufacturer,
			},
		});
	};

	// handle the on change event for the forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewManufacturer({ ...newManufacturer, [name]: value });
	};

	// refresh the list
	const refreshList = () => {
		setNewManufacturer(initialManufacturer);
		setManufacturers([]);
		getAllManufacturers();
	};

	return (
		<div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<h4>Add Manufacturer</h4>
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
									value={newManufacturer.ManufacturerName}
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
									value={newManufacturer.Mobile}
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
									value={newManufacturer.Address}
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
									value={newManufacturer.Phone}
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
									value={newManufacturer.Email}
									onChange={handleInputChange}
									required
								/>
							</div>
						</div>
					</form>
					<button
						className="btn btn-primary simple-shadow"
						onClick={createManufacturer}
					>
						Add
					</button>
				</div>
			</div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
				<div className="p-3">
					<h4>Manufacturer List</h4>
					<hr />
				</div>
				<div className="p-3">
					<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
						<label htmlFor="manufacturer-search">Search:</label>
						<input
							type="text"
							className="form-control form-input"
							id="manufacturer-search"
						/>
					</form>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Mobile</th>
								<th scope="col">Address</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{manufacturers &&
								manufacturers.map((manufacturer, index) => (
									<tr key={index}>
										<td>{manufacturer.ManufacturerName}</td>
										<td>{manufacturer.Mobile}</td>
										<td>{manufacturer.Address}</td>
										<td>
											<span className="px-2">
												<FaEdit
													className="icon-size-sm cursor-pointer"
													onClick={() => updateManufacturer(manufacturer)}
												/>
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AddManufacturer;
