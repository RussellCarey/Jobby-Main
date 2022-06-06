export const parseDate = (date: number) => {
	const newDate = new Date(date * 1000);
	const day = newDate.getDate();
	const month = newDate.getMonth() + 1;
	const year = newDate.getFullYear();

	return `${day}/${month}/${year}`;
};

export const parsePriority = (p: number) => {
	if (p === 0) return 'Low';
	if (p === 1) return 'Medium';
	if (p === 2) return 'High';
	return 'Medium';
};

// Update types:
// 0 - Added Task
// 1 - Deleted Task
// 2 - Edited Task
// 3 - Commented
// 4 - Changed Completion Time
// 5 - Added logged Time
export const parseTypeToString = (type: number) => {
	switch (type) {
		case 0:
			return 'created task';

		case 1:
			return 'deleted task';

		case 2:
			return 'edited task';

		case 3:
			return 'commented';

		case 4:
			return 'changed completion time on';

		case 5:
			return 'logged some time into task';

		default:
			break;
	}
};
