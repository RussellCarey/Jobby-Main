import React, { useState, useContext, FunctionComponent } from 'react';
import * as SharedStyled from '../shared/styled';
import { useNavigate } from 'react-router-dom';
import { Login } from '../services/UserServices';
import { IModal } from '../interfaces/interfaces';
import ModalContext from '../../../../context/modal/ModalContext';
import BackgroundDark from '../shared/BackgroundDark';
import Loading from '../../../../components/Loading/Index';

const LoginModal: FunctionComponent<IModal> = ({ setShowModal }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [user, setNewUser] = useState<any>({
		username: 'Dummy',
		password: 'Dummy1122!!',
	});
	const { addMessageToModal } = useContext(ModalContext);

	const submitOnClick = async () => {
		try {
			setIsLoading(true);

			const loginAttempt = await Login(user.username, user.password);
			if (loginAttempt.data.status !== 'success') {
				setIsLoading(false);
				return addMessageToModal(`${loginAttempt.data.message}`, 'error');
			}

			navigate('/dashboard');
		} catch (error) {
			setIsLoading(false);
			addMessageToModal(`Error logging in. Please try again.`, 'error');
		}
	};

	const onChangeHandler = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		const variable = target.id!;
		setNewUser({ ...user, [variable]: target.value });
	};

	return (
		<BackgroundDark>
			{isLoading ? <Loading /> : null}
			<SharedStyled.ModalContainer>
				<SharedStyled.Cross onClick={() => setShowModal(null)}>X</SharedStyled.Cross>
				<SharedStyled.Title>Login</SharedStyled.Title>
				<SharedStyled.Text>Welcome back!</SharedStyled.Text>
				<SharedStyled.Text>You can log into the dummy account automatically populated below to try the app!</SharedStyled.Text>
				<SharedStyled.Input id="username" onChange={onChangeHandler} value={user.username} />
				<SharedStyled.Input id="password" type="password" onChange={onChangeHandler} value={user.password} />
				<SharedStyled.SubmitButton onClick={submitOnClick}>Let's go!</SharedStyled.SubmitButton>
			</SharedStyled.ModalContainer>
		</BackgroundDark>
	);
};

export default LoginModal;
