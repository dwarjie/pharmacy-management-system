import { useState } from "react";
import { createAuditTrail } from "../../helper/AuditTrailHelper";
import { isFormValid } from "../../helper/checkFormValid";
import { AlertPrompt } from "./AlertModal.layout";
import AlertInfoLayout from "./AlertInfo.layout";
import UnitOfMeasureService from "../../services/UnitOfMeasureService";
import { useGlobalState } from "../../state";

const ModalUnit = (props) => {
	const { closeUnitModal } = props;
	let [currentUser] = useGlobalState("currentUser");

	const initialUnit = {
		id: null,
		UnitName: "",
	};

	const initialFormErrors = {
		UnitName: "",
	};

	const [newUnit, setNewUnit] = useState(initialUnit);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [alertMessage, setAlertMessage] = useState("");

	// add a new unit
	const createUnitOfMeasure = (event) => {
		event.preventDefault();

		setFormErrors(validateForm(newUnit));
		if (!isFormValid(formErrors)) return;

		// ask for confirmation
		if (!AlertPrompt()) return;

		let data = {
			UnitName: newUnit.UnitName,
		};

		UnitOfMeasureService.createUnitOfMeasure(data)
			.then((response) => {
				console.log(response.data);
				setAlertMessage(response.data.message);
				setNewUnit(initialUnit);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};

		if (!values.UnitName.trim()) {
			errors.UnitName = "Unit name is required!";
		}

		return errors;
	};

	// handle input change events for forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewUnit({ ...newUnit, [name]: value });
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content simple-shadow rounded">
				<span className="close text-right m-0" onClick={() => closeUnitModal()}>
					&times;
				</span>
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
						/>
						<p className="text-error">{formErrors.UnitName}</p>
						<button
							type="submit"
							className="btn btn-primary simple-shadow mt-3"
						>
							Add
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ModalUnit;
