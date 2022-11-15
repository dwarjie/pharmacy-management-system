// This component is responsible for viewing the start, end, and current OR for the system

const OR = () => {
	return (
		<div className="col-12 h-auto border border-dark rounded simple-shadow">
			<div className="p-3">
				<h4>Current OR</h4>
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
								required
							/>
						</div>
						<div className="col-sm-12 col-md">
							<label htmlFor="VATAmount">Percentage:</label>
							<input
								type="number"
								className="form-control form-input"
								name="VatAmount"
								id="VatAmount"
								required
							/>
						</div>
					</div>
				</form>
				<button className="btn btn-primary simple-shadow">Add</button>
			</div>
		</div>
	);
};

export default OR;
