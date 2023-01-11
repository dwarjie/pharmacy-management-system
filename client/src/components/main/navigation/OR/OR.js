// This component is responsible for viewing the start, end, and current OR for the system
import { useState, useEffect } from "react";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { isFormValid } from "../../../../helper/checkFormValid";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import ORService from "../../../../services/ORService";

const OR = () => {
	const initialOR = {
		StartOR: 0,
		MaxOR: 0,
		CurrentOR: 0,
	};

	const initialFormErrors = {
		StartOR: "",
		MaxOR: "",
	};

	const [valueOR, setValueOR] = useState(initialOR);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [editMode, setEditMode] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	// get current OR every load
	useEffect(() => {
		getCurrentOR();
	}, [editMode]);

	// if the start is changing
	useEffect(() => {
		let start = parseInt(valueOR.StartOR);
		setValueOR((prevState) => ({ ...prevState, CurrentOR: (start += 1) }));
	}, [valueOR.StartOR]);

	// get the current OR value from database
	const getCurrentOR = () => {
		ORService.getCurrentOR()
			.then((response) => {
				console.log(response.data);
				setValueOR(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update current OR
	const updateCurrentOR = async (event) => {
		event.preventDefault();

		setFormErrors(validateForm(valueOR));
		if (!isFormValid(formErrors)) return;

		// if (valueOR.StartOR >= valueOR.MaxOR)
		// 	return alert("End should be greater than Start.");
		// ask for confirmation
		if (!AlertPrompt()) return;

		ORService.updateCurrentOR(valueOR)
			.then((response) => {
				console.log(response.data);
				getCurrentOR();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};

		if (!values.StartOR) {
			errors.StartOR = "OR Start is required!";
		} else if (parseInt(values.StartOR) >= parseInt(values.MaxOR)) {
			errors.StartOR = "End should be greater than Start!";
		}
		if (!values.MaxOR) {
			errors.MaxOR = "OR End is required!";
		} else if (parseInt(values.StartOR) >= parseInt(values.MaxOR)) {
			errors.StartOR = "End should be greater than Start!";
		}

		return errors;
	};

	// const computeCurrentOR = () => {
	// 	let start = valueOR.StartOR;
	// 	let end = valueOR.MaxOR;
	// 	let current = valueOR.CurrentOR;

	// 	if (start > end) return alert("End should be greated than Start."); // check if start < end

	// 	// check if OR need to be updated
	// 	if (current >= end - 1) return 0;

	// 	return setValueOR((prevState) => ({
	// 		...prevState,
	// 		CurrentOR: (start += 1),
	// 	}));
	// };

	// set the edit mode to true
	// enable the forms and update button
	const enableEditMode = () => {
		setEditMode(!editMode);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setValueOR({ ...valueOR, [name]: value });
	};

	return (
		<div className="col-12 h-auto">
			<div className="p-2">
				<h4>Current OR</h4>
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
					onSubmit={(event) => updateCurrentOR(event)}
				>
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md-6">
							<label className="required" htmlFor="StartOR">
								Start:
							</label>
							<input
								type="number"
								className="form-control form-input"
								name="StartOR"
								min={0}
								id="StartOR"
								disabled={editMode === true ? false : true}
								value={valueOR.StartOR}
								onChange={handleInputChange}
							/>
							<p className="text-error">{formErrors.StartOR}</p>
						</div>
					</div>
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md-6">
							<label className="required" htmlFor="MaxOR">
								End
							</label>
							<input
								type="number"
								className="form-control form-input"
								// min={valueOR.StartOR}
								name="MaxOR"
								id="MaxOR"
								disabled={editMode === true ? false : true}
								value={valueOR.MaxOR}
								onChange={handleInputChange}
							/>
							<p className="text-error">{formErrors.MaxOR}</p>
						</div>
					</div>
					<div className="row mb-sm-3">
						<div className="col-sm-12 col-md-6">
							<label className="required" htmlFor="CurrentOR">
								Current:
							</label>
							<input
								type="number"
								className="form-control form-input"
								name="CurrentOR"
								id="CurrentOR"
								disabled={true}
								value={valueOR.CurrentOR}
								required
							/>
						</div>
					</div>
					<button
						type="button"
						className="btn btn-primary simple-shadow mt-3 me-3"
						onClick={enableEditMode}
					>
						{editMode ? "Cancel" : "Edit"}
					</button>
					<button
						type="submit"
						className="btn btn-primary simple-shadow mt-3"
						disabled={!editMode}
					>
						Update
					</button>
				</form>
			</div>
		</div>
	);
};

export default OR;
