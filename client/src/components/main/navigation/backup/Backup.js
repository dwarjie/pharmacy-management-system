import { useEffect, useState } from "react"
import Loader from "../../../layout/Loader";
import BackupService from "../../../../services/BackupService";
import AlertInfoLayout from "../../../layout/AlertInfo.layout";
import { AlertPrompt } from "../../../layout/AlertModal.layout";
import { createAuditTrail } from "../../../../helper/AuditTrailHelper";
import { useGlobalState } from "../../../../state";

import {MdRestorePage} from "react-icons/md"

const Backup = () => {
	let [currentUser] = useGlobalState("currentUser")

  const [loading, setLoading] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [alertMessage, setAlertMessage] = useState("");

	useEffect(() => {
		getAllFiles();
	}, []);

	const getAllFiles = async () => {
		await BackupService.getFileList()
			.then(response => {
				console.log(response.data)
				setFileList(response.data);
				setLoading(false)
			})
			.catch(err => {
				console.log(err)
			});
	}

	const backupData = async () => {
		setLoading(true)
		await BackupService.backupData()
			.then(response => {
				console.log(response.data)
				setAlertMessage(response.data.message)
				createAuditTrail(`Backup the database.`, "Backup", currentUser.id);
			})
			.catch(err => {
				console.log(err)
			});
			getAllFiles();
	}

	const restoreData = async (fileName) => {
		if(!AlertPrompt("Restore " + fileName + " data?")) return;

		setLoading(true)

		let data = {
			fileName: fileName
		}
		await BackupService.restoreData(data)
			.then(response => {
				console.log(response.data)
				setAlertMessage("Restored Successfully!")
				createAuditTrail(`Restored ${fileName} data.`, "Restore", currentUser.id);
			})
			.catch(err => {
				console.log(err)
			});
			setLoading(false)
	}

  return (
   <>
			{loading ? (
				<div className="w-auto mt-8 d-flex justify-content-center align-items-center">
          <Loader />
				</div>
			) : (
				<>
					<div className="h-auto d-flex flex-column justify-content-between gap-1">
						<div className="p-2">
							<h4>Backup Data</h4>
							<hr />
						</div>
						{alertMessage ? (
							<AlertInfoLayout
								content={alertMessage}
								onClick={(value) => setAlertMessage(value)}
							/>
						) : (
							""
						)}
            <div className="d-flex flex-row justify-content-center py-5">
              <button className="btn btn-primary" onClick={backupData}>Backup Data</button>
            </div>
					</div>
					<FileList fileList={fileList} restoreData={restoreData}/>
				</>
			)}
		</> 
  )
}

const FileList = ({ fileList, restoreData }) => {
	return (
		<div className="col-12 h-auto mt-3">
			<div className="p-2">
				<h4>Restore Data</h4>
				<hr />
			</div>
			<div className="p-2 table-responsive">
				<table className="table table-hover table-striped">
					<thead className="table-dark">
						<tr>
							<th scope="col">File name</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{fileList &&
							fileList.map((file, index) => (
								<tr key={index} className="cursor-pointer">
									<td>{file}</td>
									<td>
										<span className="px-2">
											<MdRestorePage
												className="icon-size-sm cursor-pointer"
												onClick={() => restoreData(file)}
											/>
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Backup;