// This async function will be called when the database is created for the first time
const OR = require("./app/controllers/OR.controller");
const bcrypt = require("bcryptjs");

exports.Run = async () => {
	// *create the only record for OR
	const onlyOR = await OR.create({
		StartOR: 0,
		MaxOR: 0,
		CurrentOR: 0,
	});
	console.log(onlyOR);
};

exports.VAT = async (vat) => {
	vat.create({
		id: 1,
		VatName: "Tax",
		VatAmount: 12,
	});
};

exports.Role = async (role) => {
	role.create({
		id: 1,
		RoleName: "admin",
	});

	role.create({
		id: 2,
		RoleName: "maintenance",
	});

	role.create({
		id: 3,
		RoleName: "inventory",
	});

	role.create({
		id: 4,
		RoleName: "sales",
	});

	role.create({
		id: 5,
		RoleName: "reports",
	});

	role.create({
		id: 6,
		RoleName: "utilities",
	});
};

exports.User = async (user) => {
	user.create({
		FirstName: "Mark Darius",
		LastName: "Pagaduan",
		UserName: "admin",
		Password: bcrypt.hashSync("admin", 8),
		Role: ["maintenance", "inventory", "sales", "reports", "utilities"],
	});
};

exports.Discount = async (discount) => {
	discount.create({
		DiscountName: "Senior/PWD",
		DiscountAmount: 20,
		DiscountType: "%",
	});
};
