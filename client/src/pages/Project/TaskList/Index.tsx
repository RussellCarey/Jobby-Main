import { FunctionComponent, useContext } from 'react';
import { Styled } from './styled';
import SingleList from './SingleList';
import AuthContext from '../../../context/auth/AuthContext';
import TaskEnt from '../../../entities/TaskEnt';

interface ITaskList {
	isTall: boolean;
	isMy: boolean;
	tasks: TaskEnt[];
}

const TaskList: FunctionComponent<ITaskList> = ({ isTall, isMy, tasks }) => {
	const { userState } = useContext(AuthContext);

	const filterTasks = (tasks: Array<TaskEnt>, type: number) => {
		const sortedIntoTypes = tasks.map((t) => {
			if (+t.time_remaining === +0) t.type = 2;
			if (+t.time_logged > +0) t.type = 1;
			if (+t.time_logged === +0) t.type = 0;

			return t;
		});

		const sortedTasks = sortedIntoTypes.filter((t) => +t.type === +type);

		const userFilteredTasks = sortedTasks.filter((ut) => {
			return ut.members.filter((f: any) => +f.id === +userState.id || f.creatorId === +userState.id).length > 0;
		});

		return isMy ? userFilteredTasks : sortedTasks;
	};

	return (
		<Styled.TaskListContainer>
			{tasks && userState ? (
				<>
					<SingleList title={!isMy ? 'To Do' : 'My To Dos'} isTall={isTall} tasks={filterTasks(tasks, 0)} />
					<SingleList title={!isMy ? 'In Progress' : 'My In Progresss'} isTall={isTall} tasks={filterTasks(tasks, 1)} />
					<SingleList title={!isMy ? 'Completed' : 'My Completed'} isTall={isTall} tasks={filterTasks(tasks, 2)} />{' '}
				</>
			) : null}
		</Styled.TaskListContainer>
	);
};

export default TaskList;
