import Handler from "../main/navigation/handler/Handler";

const ModalHandler = (props) => {
	const { closeModal } = props;
	const initialHandler = {
		id: null,
		Category: "",
		FirstName: "",
		LastName: "",
		Sex: "",
		City: "",
		ZIP: "",
		Address: "",
		Mobile: "",
		Email: "",
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content simple-shadow rounded">
				<span className="close text-right m-0" onClick={() => closeModal()}>
					&times;
				</span>
				<Handler title="Add NCM/Doctor" initialHandler={initialHandler} />
				{/* <div className="">
					<form className="col-12 col-lg-10 pb-5 mx-auto">
						<label className="required" htmlFor="CategoryName">
							Category Name:
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="CategoryName"
							name="CategoryName"
						/>
						<button
							className="btn btn-primary simple-shadow mt-3 me-3"
							type="submit"
						>
							Add
						</button>
						<button
							className="btn btn-secondary simple-shadow mt-3 me-3"
							type="button"
							onClick={() => setHandlerModal(false)}
						>
							Close
						</button>
					</form>
				</div> */}
			</div>
		</div>
	);
};

export default ModalHandler;
