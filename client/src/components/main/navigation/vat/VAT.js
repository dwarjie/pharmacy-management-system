// This module is responsible for adding new VATS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VatService from "../../../../services/VatService";

// icons
import { FaEdit } from "react-icons/fa";

const VAT = () => {
	const initialVat = {
		id: null,
		VatName: "",
		VatAmount: 0,
	};
	let navigate = useNavigate();

	const [vats, setVats] = useState([]);
	const [newVAT, setNewVAT] = useState(initialVat);
	const [tryState, setTryState] = useState();

	useEffect(() => {
		getAllVATs();
	}, []);

	// create a new VAT
	const createVAT = () => {
		let data = {
			VatName: newVAT.VatName,
			VatAmount: newVAT.VatAmount,
		};

		VatService.createVAT(data)
			.then((response) => {
				console.log(response.data);
				refreshList();
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
				setVats(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// delete vat
	const selectVat = (vat) => {
		setTryState({
			id: vat.id,
			service: VatService.deleteVAT,
		});
		navigate(`/pharmacy/maintenance/vat/${vat.id}`, {
			state: {
				data: tryState,
			},
		});
	};

	// handle input change event for forms
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewVAT({ ...newVAT, [name]: value });
	};

	// refresh the page
	const refreshList = () => {
		setVats([]);
		setNewVAT(initialVat);
		getAllVATs();
	};

	return (
		<div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow">
				<div className="p-3">
					<h4>Add VAT</h4>
					<hr />
				</div>
				<div className="p-3">
					<form className="col-12 col-lg-10 pb-5 mx-auto">
						<div className="row mb-3">
							<div className="col-sm-12 col-md">
								<label htmlFor="VatName">VAT Name:</label>
								<input
									type="text"
									className="form-control form-input"
									name="VatName"
									id="VatName"
									value={newVAT.VatName}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="col-sm-12 col-md">
								<label htmlFor="VATAmount">Amount (Percentage):</label>
								<input
									type="number"
									className="form-control form-input"
									name="VatAmount"
									id="VatAmount"
									value={newVAT.VatAmount}
									onChange={handleInputChange}
									required
								/>
							</div>
						</div>
					</form>
					<button className="btn btn-primary simple-shadow" onClick={createVAT}>
						Add
					</button>
				</div>
			</div>
			<div className="col-12 h-auto border border-dark rounded simple-shadow mt-3">
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
												<FaEdit
													className="icon-size-sm cursor-pointer"
													onClick={() => selectVat(vat)}
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

export default VAT;
