// This component will show is the user is not found

const NotFound = ({ content }) => {
	return (
		<div className="container d-flex justify-content-center align-items-center">
			<h1 className="mt-8">
				<strong>{content}</strong>
			</h1>
		</div>
	);
};

export default NotFound;
