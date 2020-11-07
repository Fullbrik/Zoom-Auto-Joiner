import React, { createContext, ReactElement, useState } from "react";

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
		setFiles([...files, file]);
	};

	return (
		<RecentFilesContext.Provider value={{ files, addFile }}>
			{children}
		</RecentFilesContext.Provider>
	);
}
