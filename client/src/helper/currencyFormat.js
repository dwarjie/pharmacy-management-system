exports.formatCurrency = (amount) => {
	return parseFloat(amount)
		.toFixed(2)
		.toString()
		.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
