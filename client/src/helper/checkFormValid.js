const isFormValid = (values) => {
	if (Object.keys(values).length === 0) return true;

	return false;
};

export { isFormValid };
