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

db.category = require("./category.model")(sequelize, Sequelize);
db.supplier = require("./supplier.model")(sequelize, Sequelize);
db.unit = require("./unit.model")(sequelize, Sequelize);
db.type = require("./type.model")(sequelize, Sequelize);
db.subCategory = require("./subCategory.model")(sequelize, Sequelize);
db.discount = require("./discount.model")(sequelize, Sequelize);
db.vat = require("./vat.model")(sequelize, Sequelize);
db.or = require("./OR.model")(sequelize, Sequelize);
db.medicine = require("./medicine.model")(sequelize, Sequelize);
db.patient = require("./patient.model")(sequelize, Sequelize);
db.handler = require("./handler.model")(sequelize, Sequelize);
db.salesDetail = require("./salesDetail.model")(sequelize, Sequelize);
db.sales = require("./sales.model")(sequelize, Sequelize);

// define model relationships

// CATEGORY
// add relationships for category and sub categories
db.category.hasMany(db.subCategory, { as: "subCategory" });
db.subCategory.belongsTo(db.category, {
	foreignKey: {
		allowNull: false,
	},
});

// MEDICINE
// add relationships for medicine and supplier
db.supplier.hasMany(db.medicine);
db.medicine.belongsTo(db.supplier, {
	as: "supplier",
	foreignKey: {
		allowNull: false,
	},
});

// add relationships for medicine and unit of measure
db.unit.hasMany(db.medicine);
db.medicine.belongsTo(db.unit, {
	as: "unit",
	foreignKey: {
		allowNull: false,
	},
});

// add relationships for medicine and sub-category
db.subCategory.hasMany(db.medicine);
db.medicine.belongsTo(db.subCategory, {
	as: "subCategory",
	foreignKey: {
		allowNull: false,
	},
});

// add relationship for handlers and patient
db.handler.hasMany(db.patient);
db.patient.belongsTo(db.handler, {
	as: "handler",
	foreignKey: {
		allowNull: false,
	},
});

// add relationship for salesDetails with medicine id and sales
db.medicine.hasMany(db.salesDetail);
db.salesDetail.belongsTo(db.medicine, {
	as: "medicine",
	foreignKey: {
		allowNull: false,
	},
});

db.sales.hasMany(db.salesDetail);
db.salesDetail.belongsTo(db.sales, {
	as: "sale",
	foreignKey: {
		allowNull: false,
	},
});

module.exports = db; // export the db object
