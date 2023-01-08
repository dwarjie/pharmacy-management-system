// This module is responsible for adding new VATS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import VatService from "../../../../services/VatService";

// icons
import { MdDelete } from "react-icons/md";

const VAT = () => {
	const initialVat = {
		id: null,
		VatName: "",
		VatAmount: 0,
	};

	// const [vats, setVats] = useState([]);
	const [newVAT, setNewVAT] = useState(initialVat);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllVATs();
	}, []);

	// create a new VAT
	const updateVAT = (event) => {
		event.preventDefault();

		// ask for confirmation
		// if (!AlertPrompt()) return;

		let data = {
			VatName: newVAT.VatName,
			VatAmount: newVAT.VatAmount,
		};
		VatService.updateVAT(data)
			.then((response) => {
				console.log(response.data);
				refreshList();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// get all vats in the database
	const getAllVATs = () => {
		VatService.getAllVAT()
			.then((response) => {
				console.log(response.data);
				// setVats(response.data);
				setNewVAT({
					id: response.data.id,
					VatName: response.data.VatName,
					VatAmount: response.data.VatAmount,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const deleteVAT = (vat) => {
	// 	// ask for confirmation
	// 	if (!AlertPrompt()) return;

	// 	let data = {
	// 		id: vat.id,
	// 	};
	// 	VatService.deleteVAT(data)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			refreshList();
	// 			setAlertMessage(response.data.message);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// handle input change event for forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewVAT({ ...newVAT, [name]: value });
	};

	// refresh the page
	const refreshList = () => {
		// setVats([]);
		// setNewVAT(initialVat);
		getAllVATs();
	};

	return (
		<div>
			<div className="col-12 h-auto">
				<div className="p-2">
					<h4>Add VAT</h4>
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
						className="col-12 col-lg-10 pb-5 mx-auto"
						onSubmit={(event) => updateVAT(event)}
					>
						<div className="row mb-3">
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="VatName">
									VAT Name:
								</label>
								<input
									type="text"
									className="form-control form-input"
									name="VatName"
									id="VatName"
									disabled
									value={newVAT.VatName}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="col-sm-12 col-md">
								<label className="required" htmlFor="VATAmount">
									Percentage:
								</label>
								<input
									type="number"
									min={1}
									className="form-control form-input"
									name="VatAmount"
									id="VatAmount"
									value={newVAT.VatAmount}
									onChange={handleInputChange}
									required
								/>
							</div>
						</div>
						<button className="btn btn-primary simple-shadow mt-3">
							Update
						</button>
					</form>
				</div>
			</div>
			{/* <div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
				<div className="p-3">
					<h4>VAT List</h4>
					<hr />
				</div>
				<div className="p-3">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Amount</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{vats &&
								vats.map((vat, index) => (
									<tr key={index}>
										<td>{vat.VatName}</td>
										<td>{vat.VatAmount}</td>
										<td>
											<span className="px-2">
												<MdDelete
													className="icon-size-sm cursor-pointer"
													onClick={() => deleteVAT(vat)}
												/>
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div> */}
		</div>
	);
};

export default VAT;
