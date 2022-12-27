// this module is responsible for listing all the handlers
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import HandlerService from "../../../../services/HandlerService";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const HandlerList = () => {
	const navigate = useNavigate();

	const [handlers, setHandlers] = useState([]);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllHandler();
	}, []);

	const getAllHandler = () => {
		HandlerService.getAllHandler()
			.then((response) => {
				console.log(response.data);
				setHandlers(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateHandler = (handler) => {
		navigate(`/pharmacy/maintenance/handler/${handler.id}`, {
			state: {
				handler: handler,
			},
		});
	};

	const deleteHandler = (handler) => {
		// ask for confirmation
		if (!AlertPrompt()) return;

		HandlerService.deleteHandler(handler.id)
			.then((response) => {
				console.log(response.data);
				getAllHandler();
				setAlertMessage(response.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Handler List</h4>
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
				<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="handler-search">Search:</label>
					<input type="text" className="form-control" id="handler-search" />
				</form>
				<table className="table table-striped table-hover">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Category</th>
							<th scope="col">Address</th>
							<th scope="col">Mobile</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{handlers &&
							handlers.map((handler, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{`${handler.FirstName} ${handler.LastName}`}</td>
									<td>{handler.Category}</td>
									<td>{handler.Address}</td>
									<td>{handler.Mobile}</td>
									<td>
										<span className="px-2">
											<FaEdit
												className="icon-size-sm cursor-pointer"
												onClick={() => updateHandler(handler)}
											/>
										</span>
										<span className="px-2">
											<MdDelete
												className="icon-size-sm cursor-pointer"
												onClick={() => deleteHandler(handler)}
											/>
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default HandlerList;
