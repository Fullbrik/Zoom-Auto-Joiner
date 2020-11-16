import Day from "./models/day";

const weekdays = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
];
export default weekdays;
// export function nextWeekday(prev: string | Day) {
// 	if (prev == null) return weekdays[0];
// 	else if (typeof prev === "string") {
// 		return weekdays[weekdays.indexOf(prev) + 1];
// 	} else {
// 		return weekdays[weekdays.indexOf(prev.day) + 1];
// 	}
// }
