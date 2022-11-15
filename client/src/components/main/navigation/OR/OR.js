// This component is responsible for viewing the start, end, and current OR for the system
import { useState, useEffect } from "react";
import ORService from "../../../../services/ORService";

const OR = () => {
	const initialOR = {
		StartOR: 0,
		MaxOR: 0,
		CurrentOR: 0,
	};

	const [valueOR, setValueOR] = useState(initialOR);
	const [editMode, setEditMode] = useState(false);

	// get current OR every load
	useEffect(() => {
		getCurrentOR();
	}, []);

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
	const updateCurrentOR = () => {
		ORService.updateCurrentOR(valueOR)
			.then((response) => {
				console.log(response.data);
				getCurrentOR();
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Current OR</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-lg-10 pb-5 mx-auto">
					<div className="row mb-3">
						<div className="col-sm-12 col-md-6">
							<label htmlFor="StartOR">Start:</label>
							<input
								type="number"
								className="form-control form-input"
								name="StartOR"
								id="StartOR"
								disabled={editMode === true ? false : true}
								value={valueOR.StartOR}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md-6">
							<label htmlFor="MaxOR">Max:</label>
							<input
								type="number"
								className="form-control form-input"
								name="MaxOR"
								id="MaxOR"
								disabled={editMode === true ? false : true}
								value={valueOR.MaxOR}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md-6">
							<label htmlFor="CurrentOR">Current:</label>
							<input
								type="number"
								className="form-control form-input"
								name="CurrentOR"
								id="CurrentOR"
								disabled={editMode === true ? false : true}
								value={valueOR.CurrentOR}
								onChange={handleInputChange}
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
						onClick={updateCurrentOR}
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
