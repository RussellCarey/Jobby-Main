import { useState, useEffect, useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import * as Styled from './styled';
import ModalContext from '../../context/modal/ModalContext';
import { useLocation } from 'react-router-dom';
import { getTasks, getComments } from '../services/dbServices';
import WebsiteContainer from '../../components/AppContainer/index';
import Loading from '../../components/Loading/Index';
import TaskList from './TaskList/Index';
import ActivitySide from './Activity/Index';
import TaskEnt from '../../entities/TaskEnt';
import CommentEnt from '../../entities/CommentEnt';

const Dashboard = () => {
	const { projectid } = useParams();
	const location = useLocation();
	const { addMessageToModal } = useContext(ModalContext);
	const [loading, setLoading] = useState<boolean>(true);
	const [tasks, setTasks] = useState<Array<TaskEnt>>();
	const [comments, setComments] = useState<Array<CommentEnt>>();

	const getAllItems = async () => {
		try {
			const [tasks, comments] = await Promise.all([await getTasks(+projectid!), await getComments(+projectid!)]);
			setTasks(tasks.data.data);
			setComments(comments.data.data);
			setLoading(false);
		} catch (error: any) {
			addMessageToModal('Error getting data', 'error');
		}
	};

	useEffect(() => {
		// Check for added / at the end if the URL and remove it. Causes bugs..
		const last = location.pathname.charAt(location.pathname.length - 1);
		const sliced = location.pathname.slice(0, -1);
		if (last === '/') location.pathname = sliced;

		getAllItems();
	}, [location.state]);

	return (
		<WebsiteContainer>
			{loading ? (
				<Loading />
			) : (
				<>
					<Outlet />
					<Styled.AllListContainer>
						<TaskList isTall={false} isMy={false} tasks={tasks!} />
						<TaskList isTall={false} isMy={true} tasks={tasks!} />
					</Styled.AllListContainer>
					<ActivitySide comments={comments!} />
				</>
			)}
		</WebsiteContainer>
	);
};

export default Dashboard;
