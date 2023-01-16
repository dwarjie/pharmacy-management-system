import http from "../http-common";

const backupData = () => {
	return http.post("/backup-data/backup");
};

const restoreData = (fileName) => {
	return http.put("/backup-data/restore", fileName);
};

const getFileList = () => {
	return http.get("/backup-data/");
};

const downloadFile = (fileName) => {
	return http.get(`/backup-data/${fileName}`);
};

const BackupService = {
	backupData,
	restoreData,
	getFileList,
	downloadFile,
};

export default BackupService;
