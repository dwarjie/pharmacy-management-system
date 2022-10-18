// This will set the base URL for the client in order to request to the server
import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:8080/api",
	headers: {
		ContentType: "application/json",
	},
});
