import ClassData from "./models/class";
import Day from "./models/day";
import weekdays from "./weekdays";

export function createDataFrom(
	classes: ClassData[],
	days: Day[],
	times: moment.Moment[]
) {
	const getDay = (day: string) => {
		var filteredDays = days
			.filter((d) => d.day === day)
			.map((d) => d.classes)
			.map((classNames) => {
				return classNames.map((className, index) => {
					var classData = classes.find((cls) => cls.class == className);

					return {
						time: times[index].format("hh:mm"),
						...classData,
					};
				});
			});

		return [].concat(...filteredDays);
	};

	var daysObj: any = {};

	weekdays.forEach((day) => {
		daysObj[day] = getDay(day);
	});

	return {
		classes,
		schedule: {
			days,
			times
		},
		...daysObj
	};
}