import { FunctionComponent, useState, useContext } from 'react';
import * as SharedStyled from '../shared/styled';
import ModalContext from '../../../../context/modal/ModalContext';
import { convertDateToUnix } from '../utils/dateToUnix';
import { SignUp } from '../services/UserServices';
import { validateSignUp } from '../utils/validations';
import { useNavigate } from 'react-router-dom';
import { IModal } from '../interfaces/interfaces';
import BackgroundDark from '../shared/BackgroundDark';

const SignupModal: FunctionComponent<IModal> = ({ setShowModal }) => {
	const navigate = useNavigate();
	const { addMessageToModal } = useContext(ModalContext);
	const [message, setMessage] = useState<[text: string, type: 'error' | 'info']>();
	const [user, setUser] = useState<any>({
		firstName: '',
		lastName: '',
		username: '',
		dob: '',
		password: '',
		passwordConfirm: '',
		email: '',
	});

	const submitOnClick = async () => {
		const validationChecks = validateSignUp(user);
		if (validationChecks) return setMessage([validationChecks, 'error']);

		const signupAttempt = await SignUp(user);
		if (signupAttempt.data.status !== 'success') return setMessage([signupAttempt.data.message, 'error']);

		addMessageToModal('You are signed up!');
		navigate('/dashboard');
	};

	const onChangeHandler = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		const variable = target.id!;

		if (variable === 'dob') return setUser({ ...user, dob: convertDateToUnix(target.value) });

		setUser({ ...user, [variable]: target.value });
	};

	return (
		<BackgroundDark>
			<SharedStyled.ModalContainer>
				<SharedStyled.Cross onClick={() => setShowModal(null)}>X</SharedStyled.Cross>
				<SharedStyled.Title>Signup</SharedStyled.Title>
				<SharedStyled.Text>Welcome!</SharedStyled.Text>
				<SharedStyled.Input id="firstName" placeholder="First Name" onChange={onChangeHandler} />
				<SharedStyled.Input id="lastName" placeholder="Last Name" onChange={onChangeHandler} />
				<SharedStyled.Input id="username" placeholder="Desired username.." onChange={onChangeHandler} />
				<SharedStyled.Input id="email" placeholder="Enter email" type="email" onChange={onChangeHandler} />
				<SharedStyled.Input id="password" placeholder="Desired password" type="password" onChange={onChangeHandler} />
				<SharedStyled.Input id="passwordConfirm" placeholder="Confirm password" type="password" onChange={onChangeHandler} />
				<SharedStyled.Input id="dob" placeholder="" type="date" onChange={onChangeHandler} />
				<SharedStyled.SubmitButton onClick={submitOnClick}>Submit</SharedStyled.SubmitButton>
				{message ? <SharedStyled.MessageText color={'error'}>{message[0]}</SharedStyled.MessageText> : null}
			</SharedStyled.ModalContainer>
		</BackgroundDark>
	);
};

export default SignupModal;
