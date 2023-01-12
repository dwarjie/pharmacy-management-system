import Handler from "../main/navigation/handler/Handler";

const ModalHandler = (props) => {
	const { closeHandlerModal } = props;
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
				<span
					className="close text-right m-0"
					onClick={() => closeHandlerModal()}
				>
					&times;
				</span>
				<Handler title="Add NCM/Doctor" initialHandler={initialHandler} />
			</div>
		</div>
	);
};

export default ModalHandler;
