import { FunctionComponent, useEffect, useState, useContext } from 'react';
import * as ModalStyled from '../../../../styled/shared-modal-styles';
import * as Styled from './styled';

import AuthContext from '../../../../context/auth/AuthContext';
import ModalContext from '../../../../context/modal/ModalContext';

import { useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import useDetectWidth from '../../../../hooks/useDetectWidth';
import { getTaskComments, getTaskData, getTaskUpdates, getTaskMembers } from '../../services/dbServices';
import { parseDate, parsePriority } from '../../../../utils/parseUtils';

import Icon from '../../../../components/Icon/Index';
import TimeTracker from './TimeTracker/TimeTracker';
import Comment from '../../../../components/Comment/Index';
import UserList from './UserList/Index';
import ActivityList from './Activity';
import DeleteTaskPopup from '../JobForm/DeleteTaskModal/Index';
import CommentForm from './CommentForm/Index';
import Loading from '../../../../components/Loading/Index';
import MessagePopup from '../../../../components/MessagePopup/Index';
import TimeChanger from './TimeChangerModal/Index';

import TaskEnt from '../../../../entities/TaskEnt';
import UpdateEnt from '../../../../entities/UpdateEnt';
import UserEnt from '../../../../entities/UserEnt';

const JobView: FunctionComponent = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const { userState } = useContext(AuthContext);
	const { addMessageToModal } = useContext(ModalContext);
	const [showDelete, setShowDelete] = useState<boolean>(false);
	const [showCopy, setShowCopy] = useState<boolean>(false);
	const [showTimeEdit, setShowTimeEdit] = useState<boolean>(false);

	const screenWidth = useDetectWidth();
	const [taskData, setTaskData] = useState<TaskEnt>();
	const [commentData, setCommentData] = useState<Array<any>>([]);
	const [updatesData, setUpdatesData] = useState<Array<UpdateEnt>>([]);
	const [membersData, setMembersData] = useState<Array<UserEnt>>([]);

	const navigate = useNavigate();
	const params = useParams();
	const location = useLocation();

	const getAllItems = async () => {
		try {
			const [task, comments, members, updates] = await Promise.all([
				await getTaskData(+params.taskid!, +params.projectid!),
				await getTaskComments(+params.taskid!, +params.projectid!),
				await getTaskMembers(+params.taskid!, +params.projectid!),
				await getTaskUpdates(+params.taskid!, +params.projectid!),
			]);

			if (task.data.status !== 'success') throw Error;
			if (comments.data.status !== 'success') throw Error;
			if (members.data.status !== 'success') throw Error;
			if (updates.data.status !== 'success') throw Error;

			setTaskData(task.data.data);
			setCommentData(comments.data.data);
			setUpdatesData(updates.data.data);
			setMembersData(members.data.data.members);
			setLoading(false);
		} catch (error: any) {
			addMessageToModal('Error collecting task data. Please try again', 'error');
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	useEffect(() => {
		getAllItems();
	}, [location.state]);

	// Miixin for the icons that are repeated
	const Icons = () => {
		return (
			<Styled.IconContainer>
				<Icon name="link-solid" type="dark" size="20px" left={true} text={'share'} onClick={() => setShowCopy(true)} />

				{/* Check if user is creator of task and show edit button.. */}
				{userState.id === taskData?.creatorId ? (
					<Icon name="pen" type="dark" size="20px" left={true} text={'edit'} onClick={() => navigate(location.pathname + '/edit')} />
				) : null}

				<Icon name="x-solid" type="dark" size="15px" left={true} text={'close'} onClick={() => navigate(-1)} />
			</Styled.IconContainer>
		);
	};

	// Miixin for the Comments that are repeated
	const Comments = () => {
		return (
			<Styled.CommentContainer>
				{commentData && commentData.length > 0
					? commentData.map((c) => {
							return <Comment key={c.comments_id} data={c} showID={false} />;
					  })
					: null}
			</Styled.CommentContainer>
		);
	};

	return (
		<ModalStyled.BackgroundContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
			{/* Modals window and confirm windows */}
			{showDelete ? <DeleteTaskPopup setShow={setShowDelete} /> : null}
			{showCopy ? (
				<MessagePopup setShow={setShowCopy} func={() => copyToClipboard(window.location.toString())} message={'Task URL copied to your clipboard!'} />
			) : null}
			{showTimeEdit ? <TimeChanger setShow={setShowTimeEdit} taskData={taskData!} setTaskData={setTaskData} /> : null}

			{/* MAIN */}
			<ModalStyled.Container initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
				{!loading ? (
					<>
						<Outlet />
						<Styled.MainContainer>
							{/* Move items depending on screen width*/}
							{screenWidth <= 800 ? <Icons /> : null}

							{/* The Jobs main info for the top bar */}
							<Styled.InfoHeaderContainer>
								<ModalStyled.SmallText>
									Job #{taskData?.id!} - Created {parseDate(taskData?.created_at!)}
								</ModalStyled.SmallText>
								<ModalStyled.SmallText>Priority: {parsePriority(taskData?.priority!)}</ModalStyled.SmallText>
							</Styled.InfoHeaderContainer>

							{/* Title, description etc of the task*/}
							<Styled.DescriptionContainer>
								<ModalStyled.TitleText>{taskData?.title}</ModalStyled.TitleText>
								<ModalStyled.Text>{taskData?.description}</ModalStyled.Text>
							</Styled.DescriptionContainer>

							{/* Move items depending on screen width */}
							{screenWidth > 800 ? <CommentForm commentData={commentData} setCommentData={setCommentData} /> : null}
							{screenWidth > 800 ? <Comments /> : null}
						</Styled.MainContainer>

						{/* Side bar: time tracker, members, updates */}
						<Styled.SideContainer>
							{screenWidth > 800 ? <Icons /> : null}
							<TimeTracker
								percentage={30}
								timeRemaining={taskData?.time_remaining! ?? '0'}
								timeLogged={taskData?.time_logged! ?? '0'}
								setShowTimeEdit={setShowTimeEdit}
							/>
							<UserList creator={taskData?.creator!} members={membersData} />
							{screenWidth <= 800 ? <CommentForm commentData={commentData} setCommentData={setCommentData} /> : null}
							{screenWidth <= 800 ? <Comments /> : null}
							<ActivityList title={'RECENT'} updates={updatesData} />
						</Styled.SideContainer>
					</>
				) : (
					<Loading />
				)}
			</ModalStyled.Container>
		</ModalStyled.BackgroundContainer>
	);
};

export default JobView;
