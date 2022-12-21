const Loader = () => {
	return (
		<div className="d-flex flex-column gap-5 justify-content-center w-auto h-auto">
			<div className="spinner-grow text-danger loader" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
			<h3>Loading</h3>
		</div>
	);
};

export default Loader;
