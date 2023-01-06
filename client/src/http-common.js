// This will set the base URL for the client in order to request to the server
import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:8080/api",
	// baseURL: "https://pharmacy-management-system.herokuapp.com/api",
	headers: {
		ContentType: "application/json",
	},
});
