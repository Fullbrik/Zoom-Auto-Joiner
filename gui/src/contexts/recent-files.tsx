import React, { createContext, ReactElement, useEffect, useState } from "react";

interface IRecentFilesContext {
	files: string[];
	addFile: (file: string) => void;
}

export const RecentFilesContext = createContext<IRecentFilesContext>({
	files: [],
	addFile: null,
});

export default function RecentFilesProvider({ children }: any): ReactElement {
	const [files, setFiles] = useState<string[]>([]);

	const addFile = (file: string) => {
		if (!files.includes(file)) setFiles([...files, file]);
	};

	useEffect(() => {
		if (files.length <= 0) {
			var newFiles: string[] = JSON.parse(localStorage.getItem("recent-files"));
			if (newFiles != null && newFiles.length > 0) setFiles(newFiles);
		} else {
			localStorage.setItem("recent-files", JSON.stringify(files));
		}
	}, [files]);

	return (
		<RecentFilesContext.Provider value={{ files, addFile }}>
			{children}
		</RecentFilesContext.Provider>
	);
}
