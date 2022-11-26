// this module will check if the products quantity is not equal to 0

const checkQuantity = (quantity) => {
	if (parseInt(quantity) === 0) {
		return false;
	}

	return true;
};

// this will check if the stock is greated than the desired quantity
const checkStock = (stock, quantity) => {
	if (stock >= quantity) {
		return true;
	}

	return false;
};

export { checkQuantity, checkStock };
