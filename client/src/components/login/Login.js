// This module will include the login front end of the application
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from "../../services/AuthService";

import { PersonCircle } from "react-bootstrap-icons";
import { setGlobalState } from "../../state";
import ReCaptchaService from "../../services/ReCaptchaService";
import { createAuditTrail } from "../../helper/AuditTrailHelper";

const Login = () => {
	const recaptchaRef = useRef(null);
	let navigate = useNavigate();
	const initialLogin = {
		UserName: "",
		Password: "",
	};

	const [credentials, setCredentials] = useState(initialLogin);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [verified, setVerified] = useState(false);
	const [loginCounter, setLoginCounter] = useState(0);

	useEffect(() => {
		// AuthService.logout();
		checkLoggedInUser();
	}, []);

	// check if a user already logged in
	const checkLoggedInUser = () => {
		const loggedInUser = AuthService.getToken()["x-access-token"];

		if (loggedInUser) {
			navigate(`/pharmacy`);
		}
	};

	const loginUser = async (event) => {
		event.preventDefault();

		if (!verified) return alert("Please verify reCaptcha first!");
		let success = await verifyReCaptcha();
		if (!success) return;

		setFormErrors(validateForm(credentials));
		if (!isValidForm(formErrors)) return;

		await AuthService.loginUser(credentials)
			.then((response) => {
				checkLoginSuccess(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};
		if (!values.UserName) {
			errors.UserName = "Username is required!";
		}
		if (!values.Password) {
			errors.Password = "Password is required!";
		} else if (values.Password.trim().length < 6) {
			errors.Password = "Password must be at least 6 characters!";
		}

		return errors;
	};

	const isValidForm = () => {
		if (Object.keys(formErrors).length === 0) return true;

		setVerified(false);
		return false;
	};

	const verifyReCaptcha = async () => {
		const token = recaptchaRef.current.getValue();
		// recaptchaRef.current.reset();
		let success = false;

		await ReCaptchaService.verifyReCaptcha(token)
			.then((response) => {
				console.log(response.data);
				success = response.data.success;
			})
			.catch((err) => {
				console.log(err);
			});

		return success;
	};

	const checkLoginSuccess = async (data) => {
		if (data.message === undefined) {
			if (checkStatus(data)) return;

			AuthService.saveToken(data);
			setGlobalState("currentUser", data);
			setGlobalState("auth", true);
			createAuditTrail("User logged in successfully.", "Logged in", data.id);
			navigate(`/pharmacy/dashboard`);
			// window.location.reload();
			return;
		}

		alert(data.message);
		if (data.invalid) {
			setLoginCounter(loginCounter + 1);
			lockAccount(data.userId);
		}
	};

	const checkStatus = (data) => {
		if (data.locked) {
			alert("This account is locked. Please contact your administrator.");
			return true;
		}

		return false;
	};

	const lockAccount = async (id) => {
		if (loginCounter < 3) return;

		let data = {
			Role: [],
			isLock: true,
		};

		AuthService.updateUser(id, data)
			.then((response) => {
				console.log(response.data);
				alert(
					"Your account has been locked. Please contact your administrator."
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...credentials, [name]: value });
	};

	return (
		<div className="container-fluid d-flex align-content-center justify-content-center mt-5 mt-lg-8 px-0">
			<div className="col-12 col-lg-6">
				<PersonCircle className="d-block mx-auto w-25 h-auto mb-5" />
				<form
					className="d-block mx-auto col-10 col-md-6 col-lg-8 col-xl-6"
					onSubmit={(event) => loginUser(event)}
					autoComplete="off"
				>
					<label htmlFor="username" className="form-lg-label">
						Username:
					</label>
					<input
						type="text"
						className="form-control form-input"
						name="UserName"
						id="UserName"
						placeholder="Username"
						value={credentials.UserName}
						onChange={handleInputChange}
					/>
					<p className="text-error">{formErrors.UserName}</p>
					<label htmlFor="password" className="form-lg-label">
						Password:
					</label>
					<input
						type="password"
						className="form-control form-input"
						name="Password"
						id="Password"
						placeholder="at least 6 characters"
						value={credentials.Password}
						onChange={handleInputChange}
					/>
					<p className="text-error">{formErrors.Password}</p>
					<ReCAPTCHA
						className="d-block w-auto mx-auto mb-4"
						ref={recaptchaRef}
						sitekey={"6Lcx0s8jAAAAAKvokelqodEyghPFpSOPs03pvX-a"}
						onChange={() => setVerified(true)}
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
