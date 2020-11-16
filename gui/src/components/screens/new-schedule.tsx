import { ipcRenderer } from "electron";
import { OpenDialogReturnValue } from "electron/main";
import React, { ReactElement, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import bind from "../../2waybind";
import { RecentFilesContext } from "../../contexts/recent-files";
import AbsoluteCenter from "../absolute-center";
import { Row } from "../layout";
import "./new-schedule.css";

interface Props {}

export default function NewScheduleScreen({}: Props): ReactElement {
	const { files, addFile } = useContext(RecentFilesContext);
	const [name, setName] = useState("Schedule" + files.length);
	const [path, setPath] = useState("");
	const [didSubmit, setDidSubmit] = useState(false);

	return (
		<AbsoluteCenter>
			<form
				className="new-schedule"
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						var file: string = await ipcRenderer.invoke(
							"create-file",
							name,
							path
						);
						addFile(file);
						setDidSubmit(true);
					} catch (error) {
						throw error;
					}
					console.log(file);
				}}
			>
				{didSubmit ? <Redirect to="/"></Redirect> : null}
				<Link to="/" className="back">
					{"<"}
				</Link>
				<br></br>
				<label htmlFor="name">Schedule name:</label>
				<input
					type="text"
					name="name"
					id="name"
					{...bind(name, setName)}
				></input>
				<br></br>
				<div style={{ margin: "10px" }}></div>
				<label htmlFor="path">File path:</label>
				<Row>
					<input
						type="text"
						name="path"
						id="path"
						{...bind(path, setPath)}
					></input>
					<button
						className="path-select"
						type="button"
						onClick={async () => {
							try {
								var folder: OpenDialogReturnValue = await ipcRenderer.invoke(
									"open-folder-dialog"
								);
								if (folder.filePaths.length > 0) {
									setPath(folder.filePaths[0]);
								}
							} catch (error) {
								throw error;
							}
						}}
					>
						...
					</button>
				</Row>
				<br></br>
				<br></br>
				<button type="submit">Save</button>
			</form>
		</AbsoluteCenter>
	);
}
