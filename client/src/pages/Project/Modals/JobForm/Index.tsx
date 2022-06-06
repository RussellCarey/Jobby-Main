import { FunctionComponent, useState, useEffect, useContext } from 'react';
import * as Styled from '../../../../styled/shared-modal-styles';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getTaskData, updateTaskData, getTaskMembers, getProjectMembers, deleteTask, addNewTaskData } from '../../services/dbServices';
import UserBar from '../JobView/UserBar/Index';
import Loading from '../../../../components/Loading/Index';
import Button from '../../../../components/Button/Index';
import AuthContext from '../../../../context/auth/AuthContext';
import ModalContext from '../../../../context/modal/ModalContext';
import UserEnt from '../../../../entities/UserEnt';

interface IJobForm {
	type: 'create' | 'edit';
}

interface ITaskObject {
	description: string;
	members: Array<UserEnt>;
	priority: number;
	title: string;
	type: number;
}

const JobForm: FunctionComponent<IJobForm> = ({ type }) => {
	const params = useParams();
	const navigate = useNavigate();

	const { userState } = useContext(AuthContext);
	const { addMessageToModal } = useContext(ModalContext);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [taskDetails, setTaskDetails] = useState<ITaskObject>({
		title: '',
		description: '',
		priority: 0,
		type: 0,
		members: [],
	});
	const [projectMembers, setProjectMembers] = useState<Array<UserEnt>>([]);
	const [gotProjectMembers, setGotProjectMembers] = useState<boolean>(false);

	const getAllItems = async () => {
		setIsLoading(true);
		try {
			const [tasks, members] = await Promise.all([
				await getTaskData(+params.taskid!, +params.projectid!),
				await getTaskMembers(+params.taskid!, +params.projectid!),
			]);

			if (tasks.data.status !== 'success') return addMessageToModal('Error getting task details.', 'error');
			if (members.data.status !== 'success') return addMessageToModal('Error getting task details.', 'error');

			setTaskDetails({ ...tasks.data.data, members: members.data.data.members });
			setIsLoading(false);
		} catch (error: any) {
			addMessageToModal('Error getting task details.', 'error');
			setIsLoading(false);
			console.log(error.response.message);
		}
	};

	const fetchProjectMembers = async () => {
		if (gotProjectMembers) return;

		const members = await getProjectMembers(+params.projectid!);
		if (members.data.status !== 'success') return addMessageToModal('Could not get project members', 'error');

		setProjectMembers([...members.data.data.members, ...members.data.data.members]);
		setGotProjectMembers(true);
	};

	const addMember = (e: any) => {
		const member = JSON.parse(e.target.value);
		if (taskDetails.members.filter((m) => m.id === member.id).length > 0) return;
		setTaskDetails({ ...taskDetails, members: [...taskDetails.members!, member] });
	};

	const removeMember = (memberid: number) => {
		const members = taskDetails.members || [];
		const editedMembers: Array<UserEnt> = members.filter((m) => m.id !== memberid);
		setTaskDetails({ ...taskDetails, members: editedMembers });
	};

	const submitEditedTask = async () => {
		setIsLoading(true);

		const uploadTask = await updateTaskData(+params.taskid!, +params.projectid!, taskDetails);
		if (uploadTask.data.status !== 'success') return addMessageToModal('Could not saved updated task', 'error');

		addMessageToModal('Edited task was uploaded successfully.');
		setIsLoading(false);
		navigate(-1);
	};

	const submitNewTask = async () => {
		setIsLoading(true);

		const uploadTask = await addNewTaskData(+params.projectid!, taskDetails);
		if (uploadTask.data.status !== 'success') return addMessageToModal('Could not saved task', 'error');

		addMessageToModal('New task created successfully.');
		setIsLoading(false);
		navigate(-1);
	};

	const removeTask = async () => {
		setIsLoading(true);

		const taskToDelete = await deleteTask(+params.taskid!, +params.projectid!);
		if (taskToDelete.data.status !== 'success') return addMessageToModal('Could not removed task', 'error');

		addMessageToModal('Task was removed successfully. ');
		setIsLoading(false);
		navigate(-2);
	};

	const onChangeHandler = (e: React.ChangeEvent) => {
		const target = e.target.id !== 'priority' ? (e.target as HTMLInputElement) : (e.target as HTMLSelectElement);
		const value = e.target.id !== 'priority' ? target.value : +target.value;
		setTaskDetails({ ...taskDetails, [e.target.id]: value });
	};

	useEffect(() => {
		if (type === 'edit') {
			getAllItems();
		}
	}, []);

	return (
		<Styled.BackgroundContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
			{isLoading ? <Loading /> : null}
			<Styled.ColumnContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
				<Styled.TitleText>{type === 'edit' ? `Edit task #${+params.taskid!}` : 'Create new task'}</Styled.TitleText>

				<Styled.SubTitleText>Task details</Styled.SubTitleText>
				{/* Edit Title */}
				<Styled.FormContainer>
					<Styled.FormInput type="text" id="title" placeholder="Enter task title.." value={taskDetails.title} onChange={(e) => onChangeHandler(e)} />
					<Styled.Description>Enter a ticket name.</Styled.Description>
				</Styled.FormContainer>

				{/* Edit Description */}
				<Styled.FormContainer>
					<Styled.FormTextArea
						placeholder={'Enter description'}
						value={taskDetails.description}
						id="description"
						onChange={(e) => onChangeHandler(e)}
					/>
					<Styled.Description>Enter ticket description.</Styled.Description>
				</Styled.FormContainer>

				{/* Edit Priority */}
				<Styled.FormContainer>
					<Styled.SelectInput id="priority" value={taskDetails.priority} onChange={(e) => onChangeHandler(e)}>
						<option value="0">Low</option>
						<option value="1">Medium</option>
						<option value="2">High</option>
					</Styled.SelectInput>
					<Styled.Description>Set ticket priority.</Styled.Description>
				</Styled.FormContainer>

				<Styled.SubTitleText>Members</Styled.SubTitleText>
				{/* Add Member */}
				<Styled.FormContainer>
					<Styled.SelectInput onClick={fetchProjectMembers} onChange={(e) => addMember(e)} placeholder={'Add new member'} defaultValue={''}>
						<option value="" disabled>
							Click to load members
						</option>
						{projectMembers
							? projectMembers.map((pm) => {
									// If found user is not current user of the client
									if (pm.id !== userState.id) return <option value={JSON.stringify(pm)}>{`${pm.username} (${pm.firstName} ${pm.lastName})`}</option>;
							  })
							: null}
					</Styled.SelectInput>
					<Styled.Description>Click to add members from current project.</Styled.Description>
				</Styled.FormContainer>

				{/* Show list of members with option to delete.. */}
				{taskDetails.members
					? taskDetails.members.map((m) => {
							return <UserBar key={m.id} userData={m} canDelete={true} onClick={removeMember} />;
					  })
					: null}

				{/* Buttons eg submit. */}
				<Styled.ButtonContainer>
					<Button light={true} onClick={type === 'edit' ? submitEditedTask : submitNewTask} text={type === 'edit' ? 'Submit edited' : 'Submit new'} />
					{type === 'edit' ? <Button text="Delete Task" light={false} onClick={removeTask} /> : null}
					<Styled.CancelText onClick={() => navigate(-1)}>Cancel</Styled.CancelText>
				</Styled.ButtonContainer>
			</Styled.ColumnContainer>
		</Styled.BackgroundContainer>
	);
};

export default JobForm;
