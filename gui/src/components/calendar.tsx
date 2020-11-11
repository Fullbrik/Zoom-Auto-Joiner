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
	removeLastDay
}: Props): ReactElement {
	return (
		<Column>
			<h2>Schedule</h2>
			<Row>
				<table className="calendar">
					<tbody>
						<tr className="times">
							<th>Times:</th>
							{times.map((time, index) => {
								return (
									<th key={index}>
										<TimePicker
											showSecond={false}
											value={time}
											onChange={(m) => setTimeAtIndex(index, m)}
										></TimePicker>
									</th>
								);
							})}
						</tr>
						{days.map((day, index) => {
							return (
								<tr key={index}>
									<th>
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
									</th>
									{day.classes.map((cls, timeSlot) => {
										return (
											<th key={timeSlot}>
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
											</th>
										);
									})}
									{day.classes.length < times.length ? (
										<th>
											<button
												className="add-class"
												onClick={() => {
													addClassForDayAtIndex(index);
												}}
											>
												+
											</button>
										</th>
									) : null}
								</tr>
							);
						})}
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
