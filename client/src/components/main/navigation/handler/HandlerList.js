// this module is responsible for listing all the handlers

const HandlerList = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Handler List</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="handler-search">Search:</label>
					<input type="text" className="form-control" id="handler-search" />
				</form>
			</div>
		</div>
	);
};

export default HandlerList;
