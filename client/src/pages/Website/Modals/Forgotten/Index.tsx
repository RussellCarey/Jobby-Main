import { useState, FunctionComponent } from 'react';
import * as SharedStyled from '../shared/styled';
import BackgroundDark from '../shared/BackgroundDark';
import { ForgottenPassword } from '../services/UserServices';
import { IModal } from '../interfaces/interfaces';

const ForgottenModal: FunctionComponent<IModal> = ({ setShowModal }) => {
	const [message, setMessage] = useState<[text: string, type: 'error' | 'info']>();
	const [email, setEmail] = useState<string>('');

	const submitOnClick = async () => {
		const forgottenPasswordAttempt = await ForgottenPassword(email!);
		if (forgottenPasswordAttempt.data.status !== 'success') return setMessage([forgottenPasswordAttempt.data.message, 'error']);

		setMessage(['Email sent. Please click the link sent to you.', 'error']);

		setTimeout(() => {
			setShowModal(null);
		}, 3000);

		if (forgottenPasswordAttempt.data.status !== 'success') return setMessage([forgottenPasswordAttempt.data.message, 'error']);
	};

	const onChangeHandler = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		setEmail(target.value);
	};

	return (
		<BackgroundDark>
			<SharedStyled.ModalContainer>
				<SharedStyled.Cross onClick={() => setShowModal(null)}>X</SharedStyled.Cross>
				<SharedStyled.Title>Forgotten password..</SharedStyled.Title>
				<SharedStyled.Text>Please enter the email you signed up with and we will send you a link to reset your password.</SharedStyled.Text>
				<SharedStyled.Input onChange={onChangeHandler} placeholder="Function not available." />
				<SharedStyled.SubmitButton onClick={submitOnClick}>Submit</SharedStyled.SubmitButton>
				{message ? <SharedStyled.Text>{message[0]}</SharedStyled.Text> : null}
			</SharedStyled.ModalContainer>
		</BackgroundDark>
	);
};

export default ForgottenModal;
