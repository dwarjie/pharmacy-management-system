// this module is responsible for adding new NCM/Doctors
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HandlerService from "../../../../services/HandlerService";
import DropDownDefaultOption from "../../../layout/DropDownDefaultOption.layout";

const Handler = (props) => {
	const { title, mode, initialHandler } = props;
	const navigate = useNavigate();

	const [handler, setHandler] = useState(initialHandler);

	// set onClick function for button to trigger
	const createHandler = () => {
		HandlerService.createHandler(handler)
			.then((response) => {
				console.log(response.data);
				setHandler(initialHandler);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update handler
	const updateHandler = () => {
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
			<div className="p-3">
				<form className="pb-5">
					<div className="row mb-3">
						<div className="col-sm-12 col-md">
							<label htmlFor="FirstName">First Name:</label>
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
							<label htmlFor="LastName">Last Name:</label>
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
							<label htmlFor="Category">Category:</label>
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
							<label htmlFor="Sex">Sex:</label>
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
							<label htmlFor="Address">Address:</label>
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
							<label htmlFor="Mobile">Mobile:</label>
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
				</form>
				<button
					className="btn btn-primary simple-shadow me-3"
					onClick={() =>
						mode === "update" ? updateHandler() : createHandler()
					}
				>
					{mode === "update" ? "Update" : "Save"}
				</button>
			</div>
		</div>
	);
};

export default Handler;
