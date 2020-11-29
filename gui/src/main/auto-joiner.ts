import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { ipcMain } from "electron";

export const ZOOM_AUTOJOINER_PATH: string =
	"D:\\GitHub\\Zoom-Auto-Joiner\\dist\\autojoiner";

export var currentZoomAutojoiner: ChildProcessWithoutNullStreams;

function startSchedule(path: string, sender: Electron.WebContents) {
	if (currentZoomAutojoiner != null) {
		currentZoomAutojoiner.kill("SIGINT");
	}

	return new Promise((res, rej) => {
		currentZoomAutojoiner = spawn(ZOOM_AUTOJOINER_PATH, [path]);

		currentZoomAutojoiner.once("exit", (code: number, signal: string) => {
			if (code == null || code === 0) {
				console.log("exiting...");
				res();
			} else {
				rej(new Error("Exit with error code: " + code));
			}
		});
		currentZoomAutojoiner.once("error", (err: Error) => {
			rej(err);
		});

		currentZoomAutojoiner.stdout.on("data", (chunk) => {
			// var text: string = "";
			// if (typeof chunk === "string") text = chunk;
			// else text = chunk.toString();

            // sender.send('stdio', text);
			// console.log(text);

            sender.send('stdio', chunk);
		});
	});
}

export function autojoinerInit() {
	ipcMain.handle("start-schedule", (
		event,
		path: string /* onWrite: (data: string) => void, onCreateStopper: (stopper: () => void) => void*/
	) => {
		return startSchedule(path, event.sender);
	});

	ipcMain.handle("stop-schedule", (event) => {
		return new Promise((res, rej) => {
			if (currentZoomAutojoiner != null)
				res(currentZoomAutojoiner.kill("SIGINT"));
			else rej("no current zoom autojoiner running");
		});
	});
}
