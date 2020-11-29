import { dialog, ipcMain } from "electron";
import { writeFile, readFile } from "fs";

export default function fileInit() {
	ipcMain.handle("open-folder-dialog", async (event) => {
		return await dialog.showOpenDialog({ properties: ["openDirectory"] });
	});

	ipcMain.handle("open-file-dialog", async () => {
		return await dialog.showOpenDialog({
			properties: ["openFile"],
			filters: [{ name: "schedule files", extensions: ["schedule"] }],
		});
	});

	ipcMain.handle("create-file", (event, name: string, path: string) => {
		return new Promise((res, rej) => {
			var fileName = path + "/" + name + ".schedule";

			writeFile(fileName, "{}", (err) => {
				if (err == null) res(fileName);
				else rej(err);
			});
		});
	});

	ipcMain.handle("read-file", (event, path: string) => {
		return new Promise((res, rej) => {
			readFile(path, { encoding: "utf8" }, (err, data) => {
				if (err == null) res(data);
				else rej(err);
			});
		});
	});

	ipcMain.handle("save-file", (event, path: string, text: string) => {
		return new Promise((res, rej) => {
			writeFile(path, text, (err) => {
				if (err == null) res();
				else rej(err);
			});
		});
	});
}
