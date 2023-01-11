// this module helper will format the data into YYYY-MM-DD format
import moment from "moment";

const formatDate = (date) => {
	// check if date is empty
	if (date === "") return "";

	return moment(date).format("YYYY-MM-DD");
};

const getCurrentDate = () => {
	return moment().format("dddd, MMMM, D YYYY");
};

const getCurrentTime = () => {
	let date = new Date();
	let time =
		date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

	return moment(time, "HH:mm").format("hh:mm A");
};

const generateOrderNumber = () => {
	let date = new Date();
	return `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
};

export { formatDate, getCurrentTime, getCurrentDate, generateOrderNumber };
