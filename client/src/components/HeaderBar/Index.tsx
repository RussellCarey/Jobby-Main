import { FunctionComponent, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Styled from './styled';
import AuthContext from '../../context/auth/AuthContext';
import ModalContext from '../../context/modal/ModalContext';
import UserIcon from './UserIcon';
import UserEnt from '../../entities/UserEnt';
import Loading from '../Loading/Index';

interface IHeaderBar {
	userData: UserEnt;
}

const HeaderBar: FunctionComponent<IHeaderBar> = ({ userData }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { logout } = useContext(AuthContext);
	const { addMessageToModal } = useContext(ModalContext);

	const logoutAttempt = async () => {
		setIsLoading(true);

		const tryLogout = await logout();
		if (tryLogout.data.status !== 'success') return addMessageToModal('Logout failed, please try again', 'fail');

		addMessageToModal('Logged out.');
		navigate('/');
	};

	return (
		<Styled.HeaderBarContainer>
			{isLoading ? <Loading /> : null}
			<UserIcon userData={userData} onClick={() => navigate(`${location.pathname}/account`)} />
			<Styled.NameText onClick={() => logoutAttempt()}>Logout</Styled.NameText>
		</Styled.HeaderBarContainer>
	);
};

export default HeaderBar;
