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
};
