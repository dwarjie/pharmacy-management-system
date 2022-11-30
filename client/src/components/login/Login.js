// This module will include the login front end of the application
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

import { PersonCircle } from "react-bootstrap-icons";

const Login = () => {
	let navigate = useNavigate();
	const initialLogin = {
		UserName: "",
		Password: "",
	};

	const [credentials, setCredentials] = useState(initialLogin);

	const loginUser = (event) => {
		event.preventDefault();

		AuthService.loginUser(credentials)
			.then((response) => {
				checkLoginSuccess(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const checkLoginSuccess = (data) => {
		if (data.message === undefined) {
			AuthService.saveToken(data);
			navigate(`/pharmacy`);
			window.location.reload();
			return;
		}

		alert(data.message);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...credentials, [name]: value });
	};

	return (
		<div className="container-fluid d-flex align-content-center justify-content-center mt-8 px-0">
			<div className="col-12 col-lg-6">
				<PersonCircle className="d-block mx-auto w-25 h-auto mb-5" />
				<form
					className="d-block mx-auto col-10 col-md-6 col-lg-8 col-xl-6"
					onSubmit={(event) => loginUser(event)}
				>
					<label htmlFor="username" className="form-lg-label">
						Username:
					</label>
					<input
						type="text"
						className="form-control form-input mb-4"
						name="UserName"
						id="UserName"
						placeholder="Username"
						value={credentials.UserName}
						onChange={handleInputChange}
						required
					/>
					<label htmlFor="password" className="form-lg-label">
						Password:
					</label>
					<input
						type="password"
						className="form-control form-input mb-4"
						name="Password"
						id="Password"
						placeholder="at least 6 characters"
						value={credentials.Password}
						onChange={handleInputChange}
						required
					/>
					<button
						type="submit"
						className="btn btn-secondary mx-auto w-100 button-font-md button-padding-md"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
