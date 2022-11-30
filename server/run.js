// This async function will be called when the database is created for the first time
const OR = require("./app/controllers/OR.controller");

exports.Run = async () => {
	// *create the only record for OR
	const onlyOR = await OR.create({
		StartOR: 0,
		MaxOR: 0,
		CurrentOR: 0,
	});
	console.log(onlyOR);
};

exports.Role = async (role) => {
	role.create({
		id: 1,
		RoleName: "admin",
	});

	role.create({
		id: 2,
		RoleName: "cleark",
	});
};
