// This reusable component will return default option for dropdowns
const DropDownDefaultOption = (props) => {
	const { content } = props;
	return (
		<option disabled hidden value="">
			{content}
		</option>
	);
};

export default DropDownDefaultOption;
