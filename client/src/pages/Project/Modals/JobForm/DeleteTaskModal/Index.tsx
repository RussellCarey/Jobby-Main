import { FunctionComponent, useState } from 'react';
import * as Styled from '../../../../../styled/shared-modal-styles';
import { deleteTask } from '../../../services/dbServices';
import { useParams } from 'react-router-dom';

export interface IPopup {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMessagePopup {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	func?: Function;
}

const DeleteTaskPopup: FunctionComponent<IPopup> = ({ setShow }) => {
	const params = useParams();
	const [errorText, setErrorText] = useState<string>('');

	const DeleteAttempt = async () => {
		const deletedTask = await deleteTask(+params.taskid!, +params.projectid!);
		if (deletedTask.data.status !== 'success') return setErrorText(deletedTask.data.message);
		setErrorText('Success!');
	};

	return (
		<Styled.BackgroundContainer>
			<Styled.Container>
				Are you sure you want to delete this task?
				<Styled.Button onClick={DeleteAttempt}>Confirm</Styled.Button>
				<p onClick={() => setShow(false)}>cancel</p>
				{errorText ? <p>{errorText}</p> : null}
			</Styled.Container>
		</Styled.BackgroundContainer>
	);
};

export default DeleteTaskPopup;
