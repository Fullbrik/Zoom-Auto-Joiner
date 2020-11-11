import { ipcRenderer } from "electron";
import React, { createContext, ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface IConfigFileContext {
	path: string;
	data: any;
	openFile: (path: string) => void;
}

export const ConfigFileContext = createContext<IConfigFileContext>(null);

export default function ConfigFileProvider({ children }: any): ReactElement {
	const history = useHistory();

	const [path, setPath] = useState("");
	const [data, setData] = useState<any>({});

	const openFile = async (path: string) => {
		setPath(path);
		await loadData();
		history.push("/edit");
	};

	const loadData = async () => {
		var newData = await ipcRenderer.invoke("read-file", path);
		setData(newData);
	};

	const saveData = async (data: any) => {
		//setData()
	}

	useEffect(() => {
		if (path.length > 0) loadData();
	}, [path]);

	return (
		<ConfigFileContext.Provider value={{ path, openFile, data }}>
			{children}
		</ConfigFileContext.Provider>
	);
}
