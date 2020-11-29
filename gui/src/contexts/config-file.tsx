import { ipcRenderer } from "electron";
import React, { createContext, ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface IConfigFileContext {
	path: string;
	// data: any;
	// setData: (data: React.Dispatch<any>) => void;
	loadData: () => Promise<any>;
	openFile: (path: string) => void;
	saveData: (data: any) => Promise<void>;
}

export const ConfigFileContext = createContext<IConfigFileContext>(null);

export default function ConfigFileProvider({ children }: any): ReactElement {
	const history = useHistory();

	const [path, setPath] = useState("");

	const openFile = async (path: string) => {
		setPath(path);
		history.push("/edit");
	};

	const loadData = async () => {
		var text = await ipcRenderer.invoke("read-file", path);
		return JSON.parse(text);
	}

	const saveData = async (data: any) => {
		if (path == null || path.length <= 0 || data == null || data == {}) return;

		var fileText = JSON.stringify(data);
		await ipcRenderer.invoke("save-file", path, fileText);
	};

	return (
		<ConfigFileContext.Provider
			value={{
				path,
				openFile,
				//data,
				//setData,
				loadData,
				saveData,
			}}
		>
			{children}
		</ConfigFileContext.Provider>
	);
}
