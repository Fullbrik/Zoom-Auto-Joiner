import moment from "moment";
import TimePicker from "rc-time-picker";
import React, {
	ReactElement,
	Component,
	useContext,
	useEffect,
	useState,
} from "react";
import Select from "react-dropdown-select";
import weekdays from "../../weekdays";
import { ConfigFileContext } from "../../contexts/config-file";
import AbsoluteCenter from "../absolute-center";
import { Column, Row } from "../layout";
import "./edit-config.css";
import Days from "../../models/day";
import Calendar from "../calendar";
import Classes from "../classes";
import ClassData from "../../models/class";
import { createDataFrom } from "../../dataManagement";
import { Link, Redirect } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useForceUpdate from "use-force-update";

export default function EditConfigScreen(): ReactElement {
	const { path, saveData, loadData } = useContext(ConfigFileContext);

	const [classes, setClasses] = useState<ClassData[]>([
		{ class: "Free Period", id: "", password: "" },
	]);

	const [days, setDays] = useState<Days>(new Days());

	const [times, setTimes] = useState<moment.Moment[]>([]);

	const forceUpdate = useForceUpdate();

	useEffect(() => {
		loadData()
			.then((data) => {
				setClasses(data.classes);
				setDays(new Days(data.schedule.days));
				setTimes(
					data.schedule.times.map((time: moment.MomentInput) => moment(time))
				);
			})
			.catch((err) => {
				if (path != null && path.length > 0) alert(err);
			});
		return () => {};
	}, []);

	useEffect(() => {
		days.setTimesCount(times.length, classes[0].class);
	}, [times]);

	/* add function */
	const addNewTime = () => {
		setTimes([...times, moment()]);
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

	const setClassAtIndex = (index: number, data: ClassData) => {
		setClasses(classes.map((v, i) => (index === i ? data : v)));
	};
	const setClassAtIndexAtDay = (
		weekday: string,
		timeIndex: number,
		value: string
	) => {
		if (
			weekday == "sunday" ||
			weekday == "monday" ||
			weekday == "tuesday" ||
			weekday == "wednesday" ||
			weekday == "thursday" ||
			weekday == "friday" ||
			weekday == "saturday"
		) {
			var newDays = days;
			newDays[weekday][timeIndex] = value;
			setDays(newDays);
			forceUpdate();
		}
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
		console.log(data);
		// setData(data);
		saveData(data);
	};

	/* JSX */
	return (
		<AbsoluteCenter>
			{path == null || path.length <= 0 ? <Redirect to="/" /> : null}
			<div className="edit-config">
				<Link to="/" className="back">
					{"<"}
				</Link>
				<h1>Edit schedule</h1>
				<h4 className="path-name">{path}</h4>
				<br></br>
				<Tabs>
					<TabList>
						<Tab>Classes</Tab>
						<Tab>Schedule</Tab>
					</TabList>
					<TabPanel>
						<Classes
							classes={classes}
							addClass={addClass}
							setClassAtIndex={setClassAtIndex}
							removeClassAtIndex={removeClassAtIndex}
						></Classes>
					</TabPanel>
					<TabPanel>
						<Calendar
							times={times}
							days={days}
							classNames={getClassNames()}
							addNewTime={addNewTime}
							setTimeAtIndex={setTimeAtIndex}
							setClassAtIndexAtDay={setClassAtIndexAtDay}
							// addDay={addDay}
							// setWeekdayForDayAtIndex={setWeekdayForDayAtIndex}
							// setClassForTimeSlotForDayAtIndex={setClassForTimeSlotForDayAtIndex}
							// addClassForDayAtIndex={addClassForDayAtIndex}
							removeLastTime={removeLastTime}
							// removeLastDay={removeLastDay}
						></Calendar>
					</TabPanel>
				</Tabs>
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
