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

	return moment(time, "HH:mm:ss").format("hh:mm:ss A");
};

export { formatDate, getCurrentTime, getCurrentDate };
