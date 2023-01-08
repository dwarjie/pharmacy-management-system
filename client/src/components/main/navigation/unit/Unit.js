// This module is responsible for adding new medicine Unit
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import UnitOfMeasureService from "../../../../services/UnitOfMeasureService";

// icon
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AddUnit = () => {
	const initialUnit = {
		id: null,
		UnitName: "",
	};
	let navigate = useNavigate();

	const [units, setUnits] = useState([]);
	const [newUnit, setNewUnit] = useState(initialUnit);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllUnits();
	}, []);

	// get all units in the database
	const getAllUnits = () => {
		UnitOfMeasureService.getUnitOfMeasure()
			.then((response) => {
				setUnits(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// add a new unit
	const createUnitOfMeasure = (event) => {
		event.preventDefault();

		// ask for confirmation
		if (!AlertPrompt()) return;

		let data = {
			UnitName: newUnit.UnitName,
		};

		UnitOfMeasureService.createUnitOfMeasure(data)
			.then((response) => {
				console.log(response.data);
				refreshList();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// delete the unit
	const deleteUnitOfMeasure = (unit) => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		UnitOfMeasureService.deleteUnitOfMeasure(unit.id)
			.then((response) => {
				console.log(response.data);
				refreshList();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update a unit
	const updateUnitOfMeasure = (unit) => {
		navigate(`/pharmacy/maintenance/unit/${unit.id}`, {
			state: {
				unit: unit,
			},
		});
	};

	// handle input change events for forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewUnit({ ...newUnit, [name]: value });
	};

	// refresh the list of the page
	const refreshList = () => {
		setNewUnit(initialUnit);
		setUnits([]);
		getAllUnits();
	};

	return (
		<div>
			<div className="col-12 h-auto">
				<div className="p-2">
					<h4>Add Unit of Measure</h4>
					<hr />
				</div>
				{alertMessage ? (
					<AlertInfoLayout
						content={alertMessage}
						onClick={(value) => setAlertMessage(value)}
					/>
				) : (
					""
				)}
				<div className="p-2">
					<form
						className="col-11 col-lg-10 pb-5 mx-auto"
						onSubmit={(event) => createUnitOfMeasure(event)}
					>
						<label className="required" htmlFor="UnitName">
							Unit Name:
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="UnitName"
							name="UnitName"
							value={newUnit.UnitName}
							onChange={handleInputChange}
							required
						/>
						<button
							type="submit"
							className="btn btn-primary simple-shadow mt-3"
						>
							Add
						</button>
					</form>
				</div>
			</div>
			<div className="col-12 h-auto mt-3">
				<div className="p-2">
					<h4>Unit of Measure List</h4>
					<hr />
				</div>
				<div className="p-2">
					{/* <form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
						<label htmlFor="manufacturer-search">Search:</label>
						<input
							type="text"
							className="form-control form-input"
							id="manufacturer-search"
						/>
					</form> */}
					<div className="table-responsive">
						<table className="table table-striped table-hover">
							<thead className="table-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{units &&
									units.map((unit, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{unit.UnitName}</td>
											<td>
												<span className="px-2">
													<FaEdit
														className="icon-size-sm cursor-pointer"
														onClick={() => updateUnitOfMeasure(unit)}
													/>
												</span>
												<span className="px-2">
													<MdDelete
														className="icon-size-sm cursor-pointer"
														onClick={() => deleteUnitOfMeasure(unit)}
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
		</div>
	);
};

export default AddUnit;
