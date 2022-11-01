// This reusable component is for creating custom drop downs

const DropDown = (props) => {
	return (
		<div className="dropdown w-auto">
			<button
				className="btn dropdown-toggle w-100 form-input"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{props.content}
			</button>
		</div>
	);
};

export default DropDown;
