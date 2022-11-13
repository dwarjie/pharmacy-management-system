// This reusable component will ask the user if they wish to proceed the operation
// or not. If yes, return true, otherwise return false

export const AlertPrompt = (message = "Are you sure?") => {
	let proceed = false;

	if (window.confirm(message) === true) {
		proceed = true;
	}

	return proceed;
};
