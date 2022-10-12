// this module is for the configration of Express JS and cors for the server

// import all the required modules for the server
const express = require("express");
const cors = require("cors");

// initialize the express
const app = express();

var corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse request of content type - application/json
app.use(express.json());
// parse request of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sample route
app.get("/", function (req, res) {
	res.json({ message: "Hello" });
});

// set the server port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running in port ${PORT}.`);
});
