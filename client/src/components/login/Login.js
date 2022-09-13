// This module will include the login front end of the application
import { PersonCircle } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	return (
		<div className="container-fluid d-flex align-content-center justify-content-center mt-8">
			<div className="col-12 col-lg-6">
				<PersonCircle className="d-block mx-auto w-25 h-auto mb-5" />
				<form className="d-block mx-auto col-10 col-md-6 col-lg-8 col-xl-6">
					<label htmlFor="username" className="form-lg-label">
						Username:
					</label>
					<input
						type="text"
						className="form-control form-input mb-4"
						id="username"
						placeholder="Username"
					/>
					<label htmlFor="password" className="form-lg-label">
						Password:
					</label>
					<input
						type="password"
						className="form-control form-input mb-4"
						id="password"
						placeholder="at least 6 characters"
					/>
					<button className="btn btn-primary mx-auto w-100 button-font-md button-padding-md">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
