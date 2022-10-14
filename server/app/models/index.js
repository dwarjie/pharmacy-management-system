// this module is responsible for Initializing the Sequelize module
const dbConfig = require("../config/db.config"); // get the MySQL configuration

// create a connection from Sequelize to MySQL database
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorAliases: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {}; // create an object for the database

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db; // export the db object
