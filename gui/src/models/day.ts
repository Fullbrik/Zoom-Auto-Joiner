// export default interface Day {
// 	day: string;
// 	classes: string[];
// }

declare global {
	interface Array<T> {
		appendWith(item: T, count: number): Array<T>;
		removeUntilLength(length: number): Array<T>;
		setLength(length: number, filler: T): Array<T>;
	}
}

Array.prototype.appendWith = function <T>(
	this: T[],
	item: T,
	count: number
): Array<T> {
	return [...this, ...new Array<T>(count).fill(item)];
};

Array.prototype.removeUntilLength = function <T>(
	this: T[],
	length: number
): Array<T> {
	return this.filter((_v, index) => index < length);
};

Array.prototype.setLength = function <T>(
	this: T[],
	length: number,
	filler: T
): Array<T> {
	if (this.length < length)
		return this.appendWith(filler, length - this.length);
	else if (this.length > length) return this.removeUntilLength(length);
	else return this;
};

type classList = string[];

export default class Days {
	sunday: classList = [];
	monday: classList = [];
	tuesday: classList = [];
	wednesday: classList = [];
	thursday: classList = [];
	friday: classList = [];
	saturday: classList = [];

	constructor(days?: any){
		if(days != null){
			this.sunday = days.sunday;
			this.monday = days.monday;
			this.tuesday = days.tuesday;
			this.wednesday = days.wednesday;
			this.thursday = days.thursday;
			this.friday = days.friday;
			this.saturday = days.saturday;
		}
	}

	getDay(day: string): string[] {
		switch (day) {
			case "sunday":
				return this.sunday;
			case "monday":
				return this.monday;
			case "tuesday":
				return this.tuesday;
			case "wednesday":
				return this.wednesday;
			case "thursday":
				return this.thursday;
			case "friday":
				return this.friday;
			case "saturday":
				return this.saturday;

			default:
				return [];
		}
	}

	setTimesCount(count: number, firstClass: string) {
		this.sunday = this.sunday.setLength(count, firstClass);
		this.monday = this.monday.setLength(count, firstClass);
		this.tuesday = this.tuesday.setLength(count, firstClass);
		this.wednesday = this.wednesday.setLength(count, firstClass);
		this.thursday = this.thursday.setLength(count, firstClass);
		this.friday = this.friday.setLength(count, firstClass);
		this.saturday = this.saturday.setLength(count, firstClass);
	}
}
