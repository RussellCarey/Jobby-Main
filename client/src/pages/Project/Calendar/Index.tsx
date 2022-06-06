import { useEffect, useState } from 'react';
import { CalContainer, CalDate, DateContainer } from './styled';
import SingleDay from './SingleDay';
import { createDates, todayString, defaultState } from './utils/calendarUtils';

export default function Calendar() {
	const [week, setWeek] = useState<Array<string[]>>(defaultState);

	useEffect(() => {
		const formattedWeek = createDates();
		setWeek(formattedWeek);
	}, []);

	return (
		<CalContainer>
			<CalDate>{todayString()}</CalDate>
			<DateContainer>
				{week.map((oneDay) => {
					return <SingleDay key={oneDay[1]} day={oneDay[0]} date={oneDay[1]} />;
				})}
			</DateContainer>
		</CalContainer>
	);
}
