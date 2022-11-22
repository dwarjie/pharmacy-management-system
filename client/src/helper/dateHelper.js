// this module helper will format the data into YYYY-MM-DD format
import moment from "moment";

exports.formatDate = (date) => {
	// check if date is empty
	if (date === "") return "";

	return moment(date).format("YYYY-MM-DD");
};
