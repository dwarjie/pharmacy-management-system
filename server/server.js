// this module is for the configration of Express JS and cors for the server
// import all the required modules for the server
const express = require("express");
const cors = require("cors");
const initialize = require("./run");

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

// import all models
// sync the database
const db = require("./app/models");
// db.sequelize
// 	.sync()
// 	.then(() => {
// 		console.log("synced database");
// 	})
// 	.catch((err) => {
// 		console.log("failed to sync database: " + err.message);
// 	});

// FOR DEVELOPMENT ONLY, DROP THE DATABASE AND RE-SYNC THE DATABASE
db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync database");
	initialize.Run();
});

// sample route
app.get("/", function (req, res) {
	res.json({ message: "Hello" });
});

// server routes for the controllers
require("./app/routes/category.routes")(app);
require("./app/routes/supplier.routes")(app);
require("./app/routes/type.routes")(app);
require("./app/routes/unit.routes")(app);
require("./app/routes/subCategory.routes")(app);
require("./app/routes/discount.routes")(app);
require("./app/routes/vat.routes")(app);
require("./app/routes/medicine.routes")(app);
require("./app/routes/handler.routes")(app);

// set the server port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running in port ${PORT}.`);
});
