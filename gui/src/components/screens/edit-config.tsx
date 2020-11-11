import moment from "moment";
import TimePicker from "rc-time-picker";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import Select from "react-dropdown-select";
import weekdays, { nextWeekday } from "../../weekdays";
import { ConfigFileContext } from "../../contexts/config-file";
import AbsoluteCenter from "../absolute-center";
import { Column, Row } from "../layout";
import "./edit-config.css";
import Day from "../../models/day";
import Calendar from "../calendar";
import Classes from "../classes";
import ClassData from "../../models/class";
import { createDataFrom } from "../../dataManagement";
import { Link } from "react-router-dom";

export default function EditConfigScreen(): ReactElement {
	const { path, data } = useContext(ConfigFileContext);

	const [classes, setClasses] = useState<ClassData[]>([
		{ class: "Free Period", id: "", password: "" },
	]);

	const [days, setDays] = useState<Day[]>([]);

	const [times, setTimes] = useState<moment.Moment[]>([]);

	useEffect(() => {
		setDays(
			days.map<Day>((day) => {
				if (day.classes.length > times.length)
					return {
						day: day.day,
						classes: day.classes.filter((_v, i) => i < times.length),
					};
				else if (day.classes.length < times.length)
					return {
						day: day.day,
						classes: [
							...day.classes,
							...new Array(times.length - day.classes.length).fill(
								classes[0].class,
								0,
								times.length
							),
						],
					};
				else return day;
			})
		);
	}, [times]);

	/* add function */
	const addNewTime = () => {
		setTimes([...times, moment()]);
	};
	const addDay = () => {
		if (days.length < 7)
			setDays([
				...days,
				{
					day: nextWeekday(days[days.length - 1]),
					classes: new Array(times.length).fill(
						classes[0].class,
						0,
						times.length
					),
				},
			]);
	};
	const addClass = () => {
		setClasses([
			...classes,
			{ class: "Class" + classes.length, id: "", password: "" },
		]);
	};

	/* remove functions */
	const removeLastTime = () => {
		setTimes(times.filter((_t, i) => i !== times.length - 1));
	};
	const removeLastDay = () => {
		setDays(days.filter((_v, i) => i !== days.length - 1));
	};
	const removeClassAtIndex = (index: number) => {
		if (classes.length > 1) setClasses(classes.filter((_v, i) => i !== index));
	};

	/* set at index functions */
	const setTimeAtIndex = (index: number, moment: moment.Moment) => {
		setTimes(
			times.map((t, i) => {
				if (i === index) return moment;
				else return t;
			})
		);
	};
	const setWeekdayForDayAtIndex = (index: number, weekday: string) => {
		setDays(
			days.map((v, i) => {
				return index === i ? { day: weekday, classes: v.classes } : v;
			})
		);
	};
	const setClassForTimeSlotForDayAtIndex = (
		dayIndex: number,
		timeSlot: number,
		className: string
	) => {
		setDays(
			days.map((d, i) =>
				dayIndex === i
					? {
							day: d.day,
							classes: d.classes.map((c, ii) =>
								ii === timeSlot ? className : c
							),
					  }
					: d
			)
		);
	};
	const setClassAtIndex = (index: number, data: ClassData) => {
		setClasses(classes.map((v, i) => (index === i ? data : v)));
	};

	/* add at index */
	const addClassForDayAtIndex = (index: number) => {
		setDays(
			days.map((v, i) => {
				return index === i
					? { day: v.day, classes: [...v.classes, classes[0].class] }
					: v;
			})
		);
	};

	/* getters */
	const getClassNames = () => {
		return classes.map((cls) => cls.class);
	};

	/* Saving and loading */
	const save = () => {
		if (path == null || path.length <= 0) {
			alert(`No file provided. Please go back and select a file.`);
			return;
		}

		console.log(path);

		var data = createDataFrom(classes, days, times);
		var fileText = JSON.stringify(data);
		console.log(fileText);
	};

	/* JSX */
	return (
		<AbsoluteCenter>
			<div className="edit-config">
				<Link to="/" className="back">
					{"<"}
				</Link>
				<h1>Edit schedule</h1>
				<h4 className="path-name">{path}</h4>
				<br></br>
				<Row>
					<Classes
						classes={classes}
						addClass={addClass}
						setClassAtIndex={setClassAtIndex}
						removeClassAtIndex={removeClassAtIndex}
					></Classes>
					<hr className="divider"></hr>
					<Calendar
						times={times}
						days={days}
						classNames={getClassNames()}
						addNewTime={addNewTime}
						setTimeAtIndex={setTimeAtIndex}
						addDay={addDay}
						setWeekdayForDayAtIndex={setWeekdayForDayAtIndex}
						setClassForTimeSlotForDayAtIndex={setClassForTimeSlotForDayAtIndex}
						addClassForDayAtIndex={addClassForDayAtIndex}
						removeLastTime={removeLastTime}
						removeLastDay={removeLastDay}
					></Calendar>
				</Row>
				<br></br>
				<button
					onClick={() => {
						save();
					}}
				>
					Save
				</button>
			</div>
		</AbsoluteCenter>
	);
}
