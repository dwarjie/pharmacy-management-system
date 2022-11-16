// !this module is for parsing the data value contained by the drop down options

// parse the dropdown value into JSON and return it
const parseDropdownValue = (event) => {
	return JSON.parse(
		event.target[event.target.selectedIndex].getAttribute("data-value")
	);
};

export default parseDropdownValue;
