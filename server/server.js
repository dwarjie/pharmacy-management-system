// this module is for the configration of Express JS and cors for the server
// import all the required modules for the server
const express = require("express");
const cors = require("cors");
const initialize = require("./run");

// initialize the express
const app = express();

var corsOptions = {
	origin: "http://localhost:8081",
	// origin: "https://luxury-panda-117012.netlify.app",
};

app.use(cors(corsOptions));

// parse request of content type - application/json
app.use(express.json());
// parse request of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// import all models
// sync the database
const db = require("./app/models");
db.sequelize
	.sync()
	.then(() => {
		console.log("synced database");
	})
	.catch((err) => {
		console.log("failed to sync database: " + err.message);
	});

// FOR DEVELOPMENT ONLY, DROP THE DATABASE AND RE-SYNC THE DATABASE
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync database");
// 	initialize.Run(db.or);
// 	initialize.User(db.user);
// 	initialize.VAT(db.vat);
// 	initialize.Discount(db.discount);
// });

// sample route
app.get("/", function (req, res) {
	res.json({ message: "Hello" });
});

app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);

	next();
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
require("./app/routes/OR.routes")(app);
require("./app/routes/patient.routes")(app);

require("./app/routes/sale.routes")(app);
require("./app/routes/salesDetail.routes")(app);
require("./app/routes/invoice.routes")(app);
require("./app/routes/invoiceDetail.routes")(app);
require("./app/routes/return.routes")(app);

require("./app/routes/purchase.routes")(app);
require("./app/routes/purchaseDetail.routes")(app);
require("./app/routes/stockAdjustment.routes")(app);

require("./app/routes/auth.routes")(app);
require("./app/routes/recaptchat.routes")(app);

// set the server port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running in port ${PORT}.`);
});
