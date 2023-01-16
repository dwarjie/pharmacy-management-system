import http from "../http-common";

const backupData = () => {
  return http.post("/backup-data/backup");
}

const restoreData = (fileName) => {
  return http.put("/backup-data/restore", fileName);
}

const getFileList = () => {
  return http.get("/backup-data/");
}

const BackupService = {
  backupData,
  restoreData,
  getFileList
}

export default BackupService;