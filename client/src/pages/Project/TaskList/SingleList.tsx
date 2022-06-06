import { Styled } from './styled';
import { useLocation } from 'react-router-dom';
import { FunctionComponent } from 'react';
import TaskListItem from '../TaskListItem/Index';

interface ISingleList {
	title: string;
	isTall?: boolean;
	tasks: Array<any>;
}

const SingleList: FunctionComponent<ISingleList> = ({ title, isTall = false, tasks }) => {
	const location = useLocation();

	return (
		<Styled.ListContainer>
			<Styled.ListHeader>
				<Styled.ListTitle>{title}</Styled.ListTitle>
			</Styled.ListHeader>

			<Styled.JobList>
				{tasks
					? tasks.map((t) => {
							return <TaskListItem key={t.id} url={`${location.pathname}/task/${t.id}`} title={t.title} priority={t.priority} />;
					  })
					: null}
			</Styled.JobList>
		</Styled.ListContainer>
	);
};

export default SingleList;
