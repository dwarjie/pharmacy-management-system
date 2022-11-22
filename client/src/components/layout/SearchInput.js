// This component is responsible for searching data from the database
// This will be used for table searching and for POS
import { useState, useEffect } from "react";

const SearchInput = (props) => {
	const { placeholder, name } = props;

	const [title, setTitle] = useState("");

	const handleInputChange = (event) => {
		setTitle(event.target.value);
	};

	return (
		<input
			type="text"
			className="w-100 form-control form-input"
			placeholder={placeholder}
			name={name}
			id={name}
			value={title}
			onChange={handleInputChange}
		/>
	);
};
