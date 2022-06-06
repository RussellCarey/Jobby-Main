import { FunctionComponent, useEffect, useContext } from 'react';
import { Styled } from './styled';
import NavBar from '../NavBars/NavBar/Index';
import HeaderBar from '../HeaderBar/Index';
import AuthContext from '../../context/auth/AuthContext';

interface IContainerProps {
	children: React.ReactNode;
}

const WebsiteContainer: FunctionComponent<IContainerProps> = ({ children }) => {
	const { userState, checkLoggedIn } = useContext(AuthContext);

	useEffect(() => {
		checkLoggedIn();
	}, []);

	return (
		<Styled.PageContainer>
			<Styled.SiteContainer>
				{/* Hook that detects width to change the component */}
				{/* {useDetectWidth() > 400 ? <NavBar /> : <MobNavBar />} */}
				<NavBar />
				<Styled.HeaderContentContainer>
					{userState ? <HeaderBar userData={userState} /> : null}
					<Styled.ContentContainer>{children}</Styled.ContentContainer>
				</Styled.HeaderContentContainer>
			</Styled.SiteContainer>
		</Styled.PageContainer>
	);
};

export default WebsiteContainer;
