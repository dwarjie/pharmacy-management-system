import { useState } from "react";
import { createAuditTrail } from "../../helper/AuditTrailHelper";
import { isFormValid } from "../../helper/checkFormValid";
import { AlertPrompt } from "./AlertModal.layout";
import AlertInfoLayout from "./AlertInfo.layout";
import CategoryService from "../../services/CategoryService";
import { useGlobalState } from "../../state";

const ModalCategory = (props) => {
	const { closeCategoryModal } = props;
	let [currentUser] = useGlobalState("currentUser");

	const initialCategory = {
		CategoryName: "",
	};

	const [category, setCategory] = useState(initialCategory);
	const [formErrors, setFormErrors] = useState(initialCategory);
	const [alertMessage, setAlertMessage] = useState("");

	const createCategory = async (event) => {
		event.preventDefault();

		await createAuditTrail(
			"Clicked Save in category.",
			"Click",
			currentUser.id
		);

		setFormErrors(validateForm(category));
		if (!isFormValid(formErrors)) return;

		// confirm the user if they want to proceed
		if (!AlertPrompt()) return;

		let data = {
			CategoryName: category.CategoryName,
		};

		// call the service in order to send the data to database
		CategoryService.createCategory(data)
			.then((response) => {
				console.log(response.data);
				setAlertMessage(response.data.message);
				createAuditTrail(
					`Added ${data.CategoryName} in category.`,
					"Create",
					currentUser.id
				);
				setCategory(initialCategory);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (values) => {
		const errors = {};

		if (!values.CategoryName.trim()) {
			errors.CategoryName = "Category name is required!";
		}

		return errors;
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content simple-shadow rounded">
				<span
					className="close text-right m-0"
					onClick={() => closeCategoryModal()}
				>
					&times;
				</span>
				<div className="p-2">
					<h4>Add Category</h4>
					<hr />
				</div>
				<div className="">
					{alertMessage ? (
						<AlertInfoLayout
							content={alertMessage}
							onClick={(value) => setAlertMessage(value)}
						/>
					) : (
						""
					)}
					<form
						className="col-12 col-lg-10 pb-5 mx-auto"
						onSubmit={(event) => createCategory(event)}
					>
						<label className="required" htmlFor="CategoryName">
							Category Name:
						</label>
						<input
							type="text"
							className="form-control form-input"
							id="CategoryName"
							name="CategoryName"
							value={category.CategoryName}
							onChange={(event) =>
								setCategory((prevState) => ({
									...prevState,
									CategoryName: event.target.value,
								}))
							}
						/>
						<p className="text-error">{formErrors.CategoryName}</p>
						<button
							className="btn btn-primary simple-shadow mt-3 me-3"
							type="submit"
						>
							Add
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ModalCategory;
