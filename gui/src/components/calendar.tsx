import TimePicker from "rc-time-picker";
import React, { ReactElement } from "react";
import weekdays from "../weekdays";
import Days from "../models/day";
import { Column, Row } from "./layout";
import "./calendar.css";

interface Props {
	times: moment.Moment[];
	addNewTime: () => void;
	removeLastTime: () => void;
	setTimeAtIndex: (index: number, moment: moment.Moment) => void;
	setClassAtIndexAtDay: (weekday: string, timeIndex: number, value: string) => void;
	days: Days;
	classNames: string[];
}

export default function Calendar({
	times,
	addNewTime,
	setTimeAtIndex,
	days,
	classNames,
	removeLastTime,
	setClassAtIndexAtDay
}:
Props): ReactElement {
	return (
		<Column>
			<h2>Schedule</h2>
			<Row className="calendar-parent">
				<table className="calendar">
					<tbody>
						<tr>
							<th className="day">Times</th>
							<th className="day">Sunday</th>
							<th className="day">Monday</th>
							<th className="day">Tuesday</th>
							<th className="day">Wednesday</th>
							<th className="day">Thursday</th>
							<th className="day">Friday</th>
							<th className="day">Saturday</th>
						</tr>
						{times.map((time, time_index) => {
							return (
								<tr key={time_index}>
									<th>
										<TimePicker
											showSecond={false}
											value={time}
											onChange={(m) => setTimeAtIndex(time_index, m)}
											allowEmpty={false}
										></TimePicker>
									</th>
									{weekdays
										.map((weekday) => days.getDay(weekday)[time_index])
										.map((cls, index) => (
											<th key={index}>
												<select value={cls} onChange={(e) => setClassAtIndexAtDay(weekdays[index], time_index, e.target.value)}>
													{classNames.map((cls) => (
														<option key={cls}>{cls}</option>
													))}
												</select>
											</th>
										))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</Row>
			<Row>
				<button onClick={() => addNewTime()} className="add-time">
					+
				</button>
				<button
					onClick={() => removeLastTime()}
					className={"add-time" + (times.length <= 0 ? " disabled" : "")}
				>
					-
				</button>
			</Row>
		</Column>
	);
}
