import { useState, FunctionComponent, useContext } from 'react';
import * as Styled from '../../../../../styled/shared-modal-styles';
import * as StyledT from './styled';
import { changeTimes } from '../../../services/dbServices';
import { useParams } from 'react-router-dom';
import ModalContext from '../../../../../context/modal/ModalContext';
import Loading from '../../../../../components/Loading/Index';
import Button from '../../../../../components/Button/Index';
import TaskEnt from '../../../../../entities/TaskEnt';

interface ITimeChanger {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	setTaskData: React.Dispatch<TaskEnt>;
	taskData: TaskEnt;
}

const TimeChanger: FunctionComponent<ITimeChanger> = ({ setShow, taskData, setTaskData }) => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const { addMessageToModal } = useContext(ModalContext);
	const [values, setValues] = useState({
		logged: null,
		remaining: null,
	});

	const onChangeHandler = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		const name = target.id;
		setValues({ ...values, [name]: target.value });
	};

	const submitNewTimes = async () => {
		if (isLoading) return;

		setIsLoading(true);
		const newTimes = await changeTimes(+params.taskid!, +params.projectid!, values.logged, values.remaining);
		if (newTimes.data.status !== 'success') return addMessageToModal('Error submitting new times. Please try again.');

		setTaskData({ ...taskData, time_logged: newTimes.data.data.time_logged, time_remaining: newTimes.data.data.time_remaining });
		setShow(false);
		addMessageToModal('Time saved!', 'success');
		setIsLoading(false);
	};

	return (
		<Styled.BackgroundContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
			{isLoading ? <Loading /> : null}
			<Styled.ColumnContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
				<Styled.TitleText>Update time</Styled.TitleText>
				<StyledT.FormContainer>
					<StyledT.Form id="logged" type="number" placeholder="Add to logged time" value={values.logged!} onChange={onChangeHandler} />
					<StyledT.Form id="remaining" type="number" placeholder="Time remaining?" value={values.remaining!} onChange={onChangeHandler} />
				</StyledT.FormContainer>
				<StyledT.ButtonContainer>
					<Button text="Submit" light={true} onClick={submitNewTimes} />
					<Styled.CancelText onClick={() => setShow(false)}>Cancel</Styled.CancelText>
				</StyledT.ButtonContainer>
			</Styled.ColumnContainer>
		</Styled.BackgroundContainer>
	);
};

export default TimeChanger;
