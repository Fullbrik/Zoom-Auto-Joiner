import ClassData from "./models/class";
import Days from "./models/day";
import weekdays from "./weekdays";

export function createDataFrom(
	classes: ClassData[],
	days: Days,
	times: moment.Moment[]
) {
	const getClass = (className: String) => {
		return classes.find((cls) => cls.class == className);
	}

	const getDay = (day: string) => {
		if (
			day == "sunday" ||
			day == "monday" ||
			day == "tuesday" ||
			day == "wednesday" ||
			day == "thursday" ||
			day == "friday" ||
			day == "saturday"
		) {
			return days[day].map((cls, index) => ({
				class: cls,
				time: times[index].format("HH:mm"),
				...getClass(cls)
			}));
		}
		else{
			return [];
		}
	};

	var daysObj: any = {};

	weekdays.forEach((day) => {
		daysObj[day] = getDay(day);
	});

	return {
		classes,
		schedule: {
			days,
			times,
		},
		...daysObj,
	};
}
