import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import AbsoluteCenter from "../absolute-center";
import "./new-schedule.css";

interface Props {}

export default function NewScheduleScreen({}: Props): ReactElement {
	return (
		<AbsoluteCenter>
			<form className="new-schedule">
                <Link to="/" className="back">{"<"}</Link>
                <br></br>
				<label htmlFor="name">Schedule name:</label>
				<input type="text" name="name" id="name"></input>
				<br></br>
                <div style={{margin: '10px'}}></div>
				<label htmlFor="path">File path:</label>
				<input type="text" name="path"></input>
				<br></br>
                <br></br>
				<button type="submit">Save</button>
			</form>
		</AbsoluteCenter>
	);
}
