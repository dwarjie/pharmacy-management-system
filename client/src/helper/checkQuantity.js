// this module will check if the products quantity is not equal to 0

const checkQuantity = (quantity) => {
	if (parseInt(quantity) === 0) {
		return false;
	}

	return true;
};

export { checkQuantity };
