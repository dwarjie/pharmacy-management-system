// This reusable component is used for CheckBox
import { useState } from "react";

const CheckBox = (props) => {
	// get the value of the props
	const { label, inputName, value, onChange } = props;

	return (
		<div className="form-check">
			<input
				className="form-check-input"
				type="checkbox"
				name={inputName}
				id={inputName}
				checked={value}
				onChange={onChange}
			/>
			<label className="form-check-label" htmlFor={inputName}>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
