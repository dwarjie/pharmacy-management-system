// This module is responsible for adding new medicine Unit
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UnitOfMeasureService from "../../../../services/UnitOfMeasureService";

// icon
import { FaEdit } from "react-icons/fa";

const AddUnit = () => {
	const initialUnit = {
		id: null,
		UnitName: "",
	};
	let navigate = useNavigate();

	const [units, setUnits] = useState([]);
	const [newUnit, setNewUnit] = useState(initialUnit);

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
	const createUnitOfMeasure = () => {
		let data = {
			UnitName: newUnit.UnitName,
		};

		UnitOfMeasureService.createUnitOfMeasure(data)
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((err) => {
				console.log(err);
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
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<h4>Add Unit of Measure</h4>
					<hr />
				</div>
				<div className="p-3">
					<form className="col-12 col-lg-10 pb-5 mx-auto">
						<label htmlFor="UnitName">Unit Name:</label>
						<input
							type="text"
							className="form-control form-input"
							id="UnitName"
							name="UnitName"
							value={newUnit.UnitName}
							onChange={handleInputChange}
							required
						/>
					</form>
					<button
						className="btn btn-primary simple-shadow"
						onClick={createUnitOfMeasure}
					>
						Add
					</button>
				</div>
			</div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
				<div className="p-3">
					<h4>Unit of Measure List</h4>
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
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{units &&
								units.map((unit, index) => (
									<tr key={index}>
										<td>{unit.UnitName}</td>
										<td>
											<span className="px-2">
												<FaEdit className="icon-size-sm cursor-pointer" />
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

export default AddUnit;
