import { ipcRenderer } from "electron";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ConfigFileContext } from "../../contexts/config-file";
import AbsoluteCenter from "../absolute-center";
import "./run.css";

export default function RunScreen({}): ReactElement {
	const { path } = useContext(ConfigFileContext);
	const [output, setOutput] = useState<string>("");

	useEffect(() => {
		mount();
		return () => {
			unmount();
		};
	}, []);

	const mount = () => {
		ipcRenderer.invoke("start-schedule", path).catch((err) => console.log(err));

		ipcRenderer.on("stdio", (e, message) => {
			setOutput(output + message);
		});
	};

	const unmount = () => {
		ipcRenderer.invoke("stop-schedule");
	};

	return path == null || path.length <= 0 ? (
		<Redirect to="/" />
	) : (
		<AbsoluteCenter>
			<div className="run-schedule">
				<h1>Running: {path}</h1>
				<p className="output">{output}</p>
				<Link to="/edit">Stop</Link>
			</div>
		</AbsoluteCenter>
	);
}
