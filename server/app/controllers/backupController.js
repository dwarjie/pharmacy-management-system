const mysqldump = require("mysqldump");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");

exports.backupData = (req, res) => {
	let now = new Date();
	let dateString = now.toJSON().substring(0, 16).replace(":", "");
	let filename = `db-${dateString}.sql`;
	let folder = path.join(__dirname, "..\\backup\\");
	let filePath = folder + filename;

	try {
		mysqldump({
			connection: {
				user: "root",
				host: "localhost",
				password: "root",
				database: "pharmacy_management",
			},
			dumpToFile: filePath,
		});
		console.log(filePath);
		res.send({
			message: "Backup successfully!",
		});
	} catch (err) {
		console.log(err);
		res.send({
			message: err.message,
		});
	}
};

exports.restoreData = async (req, res) => {
	const file = req.body.fileName;
	const db = require("../models");
	await db.sequelize.drop();

	const connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "pharmacy_management",
		multipleStatements: true,
	});

	//connect to database once app is started
	connection.connect((err) => {
		if (err) {
			throw err;
		}
		console.log("connected");
	});

	//make the connection global
	global.connection = connection;

	const users = fs
		.readFileSync(path.join(__dirname, `..\\backup\\${file}`))
		.toString();
	function restore() {
		const query = connection.query(users, (err, result) => {
			if (err) {
				res.send({
					message: err.message,
				});
			} else {
				res.send({
					message: result,
				});
				console.log("Done..");
			}
		});
		console.log(query);
	}
	restore();
};

exports.getFileList = (req, res) => {
	//joining path of directory
	const directoryPath = path.join(__dirname, "..\\backup\\");
	//passsing directoryPath and callback function
	fs.readdir(directoryPath, function (err, files) {
		//handling error
		if (err) {
			return console.log("Unable to scan directory: " + err);
		}
		//listing all files using forEach
		// files.forEach(function (file) {
		//     // Do whatever you want to do with the file
		//     console.log(file);
		// });
		res.send(files);
	});
};

exports.downloadFile = (req, res) => {
	const file = req.params.name;
	let folder = path.join(__dirname, "..\\backup\\");
	let downloadFolder = path.join(__dirname, "..\\download\\" + file);

	res.download(folder + file, (err) => {
		if (err) {
			res.send({
				message: err.message || `Could not download file ${file}`,
			});
		}
	});
	// res.attachment(folder + file).send();
};
