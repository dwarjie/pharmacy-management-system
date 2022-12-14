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
db.invoiceDetail = require("./invoiceDetails.model")(sequelize, Sequelize);
db.invoice = require("./invoice.model")(sequelize, Sequelize);
db.return = require("./return.model")(sequelize, Sequelize);

db.purchaseDetail = require("./purchaseDetails.model")(sequelize, Sequelize);
db.purchase = require("./purchaseOrder.model")(sequelize, Sequelize);
db.stockAdjustment = require("./stockAdjustment.model")(sequelize, Sequelize);

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./roleGroup.model")(sequelize, Sequelize);
db.auditTrail = require("./auditTrail.model")(sequelize, Sequelize);
// db.role = require("./role.model")(sequelize, Sequelize);

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

db.user.hasMany(db.sales);
db.sales.belongsTo(db.user, {
	as: "user",
	foreignKey: {
		allowNull: false,
	},
});

// add relationship for purchaseDetails with purchase

db.purchase.hasMany(db.purchaseDetail);
db.purchaseDetail.belongsTo(db.purchase, {
	as: "purchase",
	foreignKey: {
		allowNull: false,
	},
});

db.supplier.hasMany(db.purchase);
db.purchase.belongsTo(db.supplier, {
	as: "supplier",
	foreignKey: {
		allowNull: false,
	},
});

db.medicine.hasMany(db.purchaseDetail);
db.purchaseDetail.belongsTo(db.medicine, {
	as: "medicine",
	foreignKey: {
		allowNull: false,
	},
});

// add relationship for stock adjustment and medicine
db.medicine.hasMany(db.stockAdjustment);
db.stockAdjustment.belongsTo(db.medicine, {
	as: "medicine",
	foreignKey: {
		allowNull: false,
	},
});

db.user.hasMany(db.stockAdjustment);
db.stockAdjustment.belongsTo(db.user, {
	as: "user",
	foreignKey: {
		allowNull: false,
	},
});

// add relationship for invoice details with medicine id and invoice
db.medicine.hasMany(db.invoiceDetail);
db.invoiceDetail.belongsTo(db.medicine, {
	as: "medicine",
	foreignKey: {
		allowNull: false,
	},
});

db.invoice.hasMany(db.invoiceDetail);
db.invoiceDetail.belongsTo(db.invoice, {
	as: "invoice",
	foreignKey: {
		allowNull: false,
	},
});

// add relationship for invoice with patient id, handler id, and user id
db.patient.hasMany(db.invoice);
db.invoice.belongsTo(db.patient, {
	as: "patient",
	foreignKey: {
		allowNull: false,
	},
});

db.handler.hasMany(db.invoice);
db.invoice.belongsTo(db.handler, {
	as: "handler",
	foreignKey: {
		allowNull: false,
	},
});

db.user.hasMany(db.invoice);
db.invoice.belongsTo(db.user, {
	as: "user",
	foreignKey: {
		allowNull: false,
	},
});

// add relationship between return to medicine and user
db.medicine.hasMany(db.return);
db.return.belongsTo(db.medicine, {
	as: "medicine",
	foreignKey: {
		allowNull: false,
	},
});

db.user.hasMany(db.return);
db.return.belongsTo(db.user, {
	as: "user",
	foreignKey: {
		allowNull: false,
	},
});

db.user.hasMany(db.auditTrail);
db.auditTrail.belongsTo(db.user, {
	as: "user",
	foreignKey: {
		allowNull: false,
	},
});

db.role.hasMany(db.user);
db.user.belongsTo(db.role, {
	as: "roleGroup",
	foreignKey: {
		allowNull: false,
	},
});

// // add relationship for users and roles for authorization
// db.role.belongsToMany(db.user, {
// 	through: "user_roles",
// 	foreignKey: "roleId",
// 	otherKey: "userId",
// });

// db.user.belongsToMany(db.role, {
// 	through: "user_roles",
// 	foreignKey: "userId",
// 	otherKey: "roleId",
// });

// // for authorizations
// db.ROLES = [
// 	"admin",
// 	"maintenance",
// 	"inventory",
// 	"sales",
// 	"reports",
// 	"utilities",
// ];

module.exports = db; // export the db object
