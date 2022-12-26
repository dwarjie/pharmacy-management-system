// This reusable component is responsible for showing the information about the data
// that has been created, deleted, or updated
import { useEffect, useState } from "react";

const AlertInfoLayout = (props) => {
	const { content, onClick } = props;

	// set the state for alert message
	const [message, setMessage] = useState(content);

	useEffect(() => {
		setMessage(content);
	}, [content]);

	return (
		<div
			className="alert alert-info alert-dismissible fade show col-11 col-lg-11 mx-auto"
			role={"alert"}
		>
			{message}
			<button
				type="button"
				className="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
				onClick={() => onClick("")} // change the state of the parent element
			></button>
		</div>
	);
};

export default AlertInfoLayout;
