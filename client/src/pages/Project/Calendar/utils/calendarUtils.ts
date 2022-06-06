const daysArray = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const monthArray = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const createDates: () => Array<string[]> = () => {
	const today: Date = new Date(Date.now());
	const week = [];

	//! not working on days less than monday..
	for (let i = -3; i <= 3; i++) {
		const dayValue = today.getDay() + (i - 1);
		const checkedDayValue = dayValue < 0 ? dayValue + 7 : dayValue;
		const dateValue = today.getDate() + i;
		week.push([daysArray[checkedDayValue], String(dateValue)]);
	}

	return week;
};

export const todayString = () => {
	const today: Date = new Date(Date.now());
	const day = daysArray[today.getDay()];
	const date = today.getDate().toString();
	const month = monthArray[today.getMonth()].toString();
	const year = today.getFullYear().toString();

	return `${day} ${date} ${month} ${year}`;
};

export const defaultState = [
	['Day1', 'Date1'],
	['Day2', 'Date2'],
	['Day3', 'Date3'],
	['Day4', 'Date4'],
	['Day5', 'Date5'],
	['Day6', 'Date6'],
	['Day7', 'Date7'],
];
