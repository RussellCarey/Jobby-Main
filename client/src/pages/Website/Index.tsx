import * as Styled from './styled';
import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../context/auth/AuthContext';
import LoginModal from './Modals/Login/Index';
import ForgottenModal from './Modals/Forgotten/Index';
import SignupModal from './Modals/Signup/Index';

export default function Index() {
	const navigate = useNavigate();
	const { userState, checkLoggedIn } = useContext(AuthContext);
	const [shownModal, setShowModal] = useState<'login' | 'forgot' | 'signup' | null>(null);

	useEffect(() => {
		checkLoggedIn();
	}, []);

	useEffect(() => {
		if (userState && Cookies.get('jwt')) navigate('/dashboard');
	}, []);

	return (
		<Styled.PageContainer>
			{shownModal === 'signup' ? <SignupModal setShowModal={setShowModal} /> : null}
			{shownModal === 'login' ? <LoginModal setShowModal={setShowModal} /> : null}
			{shownModal === 'forgot' ? <ForgottenModal setShowModal={setShowModal} /> : null}

			<Styled.SideImageContainer />
			<Styled.SideTextContainer>
				<Styled.Title>Jobby</Styled.Title>
				<Styled.Subtitle>Your new project task management app.</Styled.Subtitle>
				<Styled.ButtonContainer onClick={() => setShowModal('signup')}>Sign up</Styled.ButtonContainer>
				<Styled.ButtonContainer onClick={() => setShowModal('login')}>Sign in</Styled.ButtonContainer>
				<Styled.TextCursor onClick={() => setShowModal('forgot')}>Forgotten your password?</Styled.TextCursor>
			</Styled.SideTextContainer>
		</Styled.PageContainer>
	);
}
