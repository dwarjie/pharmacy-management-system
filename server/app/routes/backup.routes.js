module.exports = (app) => {
	const backup = require("../controllers/backupController");
	var router = require("express").Router();

	// creates new tutorial
	router.post("/backup", backup.backupData);
	router.put("/restore", backup.restoreData);
	router.get("/", backup.getFileList);
	router.get("/:name", backup.downloadFile);

	app.use("/api/backup-data", router);
};
