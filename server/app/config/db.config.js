// this module is responsible for configuring the MySQL server connection
module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "root",
	DB: "pharmacy_management",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	// HOST: "us-cdbr-east-06.cleardb.net",
	// USER: "b175fea9814a64",
	// PASSWORD: "a7559adc",
	// DB: "heroku_175301cfd34846b",
	// dialect: "mysql",
	// pool: {
	// 	max: 5,
	// 	min: 0,
	// 	acquire: 30000,
	// 	idle: 10000,
	// },
};
// mysql://b175fea9814a64:a7559adc@us-cdbr-east-06.cleardb.net/heroku_175301cfd34846b?reconnect=true
