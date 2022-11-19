// this module is responsible for adding new NCM/Doctors
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import HandlerService from "../../../../services/HandlerService";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";

const Handler = (props) => {
	const { title, mode, initialHandler } = props;
	const navigate = useNavigate();

	const [handler, setHandler] = useState(initialHandler);
	const [alertMessage, setAlertMessage] = useState("");

	// set onClick function for button to trigger
	const createHandler = (event) => {
		event.preventDefault();

		// ask for confirmation
		if (!AlertPrompt()) return;

		HandlerService.createHandler(handler)
			.then((response) => {
				console.log(response.data);
				setHandler(initialHandler);
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update handler
	const updateHandler = (event) => {
		event.preventDefault();

		HandlerService.updateHandler(handler.id, handler)
			.then((response) => {
				console.log(response.data);
				navigate(-1);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChangeEvent = (event) => {
		const { name, value } = event.target;
		setHandler({ ...handler, [name]: value });
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>{title}</h4>
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
			<div className="p-3">
				<form
					className="col-12 col-lg-10 pb-5 mx-auto"
					onSubmit={(event) =>
						mode === "update" ? updateHandler(event) : createHandler(event)
					}
				>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="FirstName">
								First Name:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="FirstName"
								id="FirstName"
								value={handler.FirstName}
								onChange={handleChangeEvent}
								required
							/>
						</div>
						{/* <div className="col-sm-12 col-md">
							<label htmlFor="middleName">Middle Name:</label>
							<input
								type="text"
								id="middleName"
								className="form-control form-input"
							/>
						</div> */}
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="LastName">
								Last Name:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="LastName"
								id="LastName"
								value={handler.LastName}
								onChange={handleChangeEvent}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Category">
								Category:
							</label>
							<select
								name="Category"
								id="Category"
								className="form-select form-input"
								value={handler.Category}
								onChange={handleChangeEvent}
								required
							>
								<DropDownDefaultOption content={"Select Category"} />
								<option value="NCM">NCM</option>
								<option value="Doctor">Doctor</option>
							</select>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Sex">
								Sex:
							</label>
							<select
								name="Sex"
								id="Sex"
								className="form-select form-input"
								value={handler.Sex}
								onChange={handleChangeEvent}
								required
							>
								<DropDownDefaultOption content={"Select Sex"} />
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="City">City:</label>
							<input
								type="text"
								className="form-control form-input"
								name="City"
								id="City"
								value={handler.City}
								onChange={handleChangeEvent}
							/>
						</div>
						{/* <div className="col-sm-12 col-md">
							<label htmlFor="state">State:</label>
							<input
								type="text"
								id="state"
								className="form-control form-input"
							/>
						</div> */}
						<div className="col-sm-12 col-md">
							<label htmlFor="ZIP">ZIP:</label>
							<input
								type="text"
								className="form-control form-input"
								name="ZIP"
								id="ZIP"
								value={handler.ZIP}
								onChange={handleChangeEvent}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Address">
								Address:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="Address"
								id="Address"
								value={handler.Address}
								onChange={handleChangeEvent}
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label className="required" htmlFor="Mobile">
								Mobile:
							</label>
							<input
								type="text"
								className="form-control form-input"
								name="Mobile"
								id="Mobile"
								value={handler.Mobile}
								onChange={handleChangeEvent}
								required
							/>
						</div>
					</div>
					<div className="row mb-3">
						{/* <div className="col-sm-12 col-md">
							<label htmlFor="phone">Phone:</label>
							<input
								type="text"
								id="phone"
								className="form-control form-input"
								required
							/>
						</div> */}
						<div className="col-sm-12 col-md-6">
							<label htmlFor="Email">Email:</label>
							<input
								type="email"
								className="form-control form-input"
								name="Email"
								id="Email"
								value={handler.Email}
								onChange={handleChangeEvent}
							/>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary simple-shadow me-3 mt-3"
					>
						{mode === "update" ? "Update" : "Save"}
					</button>
					{mode === "update" ? (
						<button
							type="button"
							className="btn btn-secondary simple-shadow me-3 mt-3"
							onClick={() => navigate(-1)}
						>
							Back
						</button>
					) : (
						""
					)}
				</form>
			</div>
		</div>
	);
};

export default Handler;
