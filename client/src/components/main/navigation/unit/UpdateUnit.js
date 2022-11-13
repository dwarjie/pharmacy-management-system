// This module is responsible for showing the list of the medicine units
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UnitOfMeasureService from "../../../../services/UnitOfMeasureService";
import { AlertPrompt } from "../../../layout/AlertModal.layout";

const UnitList = () => {
	const initialUnit = {
		id: null,
		UnitName: "",
	};
	let navigate = useNavigate();
	let location = useLocation();

	const [unit, setUnit] = useState(initialUnit);
	const [success, setSuccess] = useState(true);

	useEffect(() => {
		setUnit({
			id: location.state.unit.id,
			UnitName: location.state.unit.UnitName,
		});
	}, []);

	// update the unit
	const updateUnitOfMeasure = () => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		UnitOfMeasureService.updateUnitOfMeasure(unit.id, unit)
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

	// handle input change event for form
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUnit({ ...unit, [name]: value });
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
						value={unit.UnitName}
						onChange={handleInputChange}
						required
					/>
				</form>
				<button
					className="btn btn-primary simple-shadow me-3"
					onClick={updateUnitOfMeasure}
				>
					Update
				</button>
				<button
					className="btn btn-secondary simple-shadow me-3"
					onClick={() => navigate(-1)}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default UnitList;
