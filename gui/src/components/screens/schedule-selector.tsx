import React, { ReactElement, useContext } from "react";
import { Column, Row } from "../layout";
import { Link } from "react-router-dom";
import { RecentFilesContext } from "../../contexts/recent-files";
import AbsoluteCenter from "../absolute-center";
import "./selector.css";
import { ConfigFileContext } from "../../contexts/config-file";

export default function ScheduleSelectorScreen(): ReactElement {
	const { files } = useContext(RecentFilesContext);
	const { openFile } = useContext(ConfigFileContext);

	return (
		<AbsoluteCenter>
			<div className="selector">
				<Row style={{ width: "100%" }}>
					<Column className="recent">
						<h2 className="title">Open recent schedule</h2>
						<ul>
							{files.map((file, index) => (
								<li key={index}>
									<button
										onClick={() => {
											openFile(file);
										}}
									>
										{file}
									</button>
								</li>
							))}
						</ul>
					</Column>
					<hr className="divider"></hr>
					<Column>
						<h2 className="title">File options</h2>
						<ul className="options">
							<div className="margin"></div>
							<li>
								<Link to="/new">New</Link>
							</li>
							<li>
								<button>Open</button>
							</li>
						</ul>
					</Column>
				</Row>
			</div>
		</AbsoluteCenter>
	);
}
