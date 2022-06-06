import { FunctionComponent } from 'react';
import { SingleDate, DateHightLight, DateText } from './styled';

interface ICalendar {
	day: string;
	date: string;
}

const SingleDay: FunctionComponent<ICalendar> = ({ day, date }) => {
	return (
		<SingleDate>
			<DateText>{day}</DateText>
			<DateHightLight>{date}</DateHightLight>
		</SingleDate>
	);
};

export default SingleDay;
