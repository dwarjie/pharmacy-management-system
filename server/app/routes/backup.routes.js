module.exports = (app) => {
	const backup = require("../controllers/backupController");
	var router = require("express").Router();

	// creates new tutorial
  router.post("/backup", backup.backupData);
  router.put("/restore", backup.restoreData);
	router.get("/", backup.getFileList)

	app.use("/api/backup-data", router);
};