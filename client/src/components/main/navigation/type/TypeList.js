// This module is responsible for showing all the type list

const TypeList = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Type List</h4>
				<hr />
			</div>
			<div className="p-3">
				<form className="col-12 col-md-8 col-lg-6 d-flex flex-row align-items-center gap-2 pb-5">
					<label htmlFor="type-search">Search:</label>
					<input type="text" className="form-control" id="type-search" />
				</form>
			</div>
		</div>
	);
};

export default TypeList;
