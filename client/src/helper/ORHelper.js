// this module will help gettings and updating the OR number
import ORService from "../services/ORService";

const incrementOR = () => {
	ORService.incrementOR()
		.then((response) => {
			console.log(response.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

const getOR = async () => {
	let result;
	await ORService.getCurrentOR()
		.then((response) => {
			console.log(response.data);
			result = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return result;
};

export { incrementOR, getOR };
