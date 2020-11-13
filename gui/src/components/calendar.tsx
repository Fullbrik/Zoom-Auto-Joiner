import TimePicker from "rc-time-picker";
import React, { ReactElement } from "react";
import weekdays from "../weekdays";
import Day from "../models/day";
import { Column, Row } from "./layout";
import "./calendar.css";

interface Props {
	times: moment.Moment[];
	addNewTime: () => void;
	removeLastTime: () => void;
	setTimeAtIndex: (index: number, moment: moment.Moment) => void;
	days: Day[];
	addDay: () => void;
	removeLastDay: () => void;
	setWeekdayForDayAtIndex: (index: number, weekday: string) => void;
	classNames: string[];
	addClassForDayAtIndex: (index: number) => void;
	setClassForTimeSlotForDayAtIndex: (
		dayIndex: number,
		timeSlot: number,
		className: string
	) => void;
}

export default function Calendar({
	times,
	addNewTime,
	setTimeAtIndex,
	days,
	setWeekdayForDayAtIndex,
	classNames,
	addClassForDayAtIndex,
	setClassForTimeSlotForDayAtIndex,
	addDay,
	removeLastTime,
	removeLastDay,
}: Props): ReactElement {
	return (
		<Column>
			<h2>Schedule</h2>
			<Row>
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
									{new Array<Day>()
										.concat(
											...weekdays.map((weekday) =>
												days.filter((day) => day.day === weekday)
											)
										)
										.map((day) => day.classes)
										.map((day) => (
											<th>
												<select value={day}>
													{classNames.map((cls) => (
														<option>{cls}</option>
													))}
												</select>
											</th>
										))}
								</tr>
							);
						})}
						{/* <th className="times">
							<tr>Times:</tr>
							{times.map((time, index) => {
								return (
									<tr key={index}>
										<TimePicker
											showSecond={false}
											value={time}
											onChange={(m) => setTimeAtIndex(index, m)}
										></TimePicker>
									</tr>
								);
							})}
						</th>
						{days.map((day, index) => {
							return (
								<th key={index}>
									<tr>
										<select
											value={day.day}
											onChange={(e) =>
												setWeekdayForDayAtIndex(index, e.target.value)
											}
										>
											{weekdays.map((day) => {
												return <option key={day}>{day}</option>;
											})}
										</select>
									</tr>
									{day.classes.map((cls, timeSlot) => {
										return (
											<tr key={timeSlot}>
												<select
													value={cls}
													onChange={(e) => {
														setClassForTimeSlotForDayAtIndex(
															index,
															timeSlot,
															e.target.value
														);
													}}
												>
													{classNames.map((cls) => (
														<option>{cls}</option>
													))}
												</select>
											</tr>
										);
									})}
									{day.classes.length < times.length ? (
										<tr>
											<button
												className="add-class"
												onClick={() => {
													addClassForDayAtIndex(index);
												}}
											>
												+
											</button>
										</tr>
									) : null}
								</th>
							);
						})} */}
					</tbody>
				</table>
				<Column>
					<button onClick={() => addNewTime()} className="add-time">
						+
					</button>
					<button
						onClick={() => removeLastTime()}
						className={"add-time" + (times.length <= 0 ? " disabled" : "")}
					>
						-
					</button>
				</Column>
			</Row>
			<Row>
				<button
					className={days.length >= 7 ? "disabled" : ""}
					onClick={() => {
						addDay();
					}}
				>
					+
				</button>
				<button
					className={days.length <= 0 ? "disabled" : ""}
					onClick={() => {
						removeLastDay();
					}}
				>
					-
				</button>
			</Row>
		</Column>
	);
}
