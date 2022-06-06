import { FunctionComponent, useEffect, useState, useContext } from 'react';
import * as Styled from './styled';
import { Outlet } from 'react-router-dom';
import { getProject } from './services/dbServices';
import { useNavigate } from 'react-router-dom';

import WebsiteContainer from '../../components/AppContainer';
import Loading from '../../components/Loading/Index';
import ModalContext from '../../context/modal/ModalContext';

const Dashboard: FunctionComponent = () => {
	const navigate = useNavigate();
	const { addMessageToModal } = useContext(ModalContext);
	const [loading, setLoading] = useState<boolean>(true);

	// If the user has a project joined, take them to their first one. Else, show them a message.
	const getUserProjects = async () => {
		try {
			const projects = await getProject();
			if (projects.data.status !== 'success') throw Error;
			if (projects.data.data.length === 0) return setLoading(false);

			navigate(`/project/${projects.data.data[0].id}`);
			setLoading(false);
		} catch (error: any) {
			addMessageToModal('Error loading projects for this user.', 'error');
			setLoading(false);
		}
	};

	useEffect(() => {
		getUserProjects();
	}, []);

	return (
		<WebsiteContainer>
			{!loading ? (
				<>
					<Outlet />
					<Styled.MessageContainer>
						<p> You are currently not part of any projects! Create your own of wait to be invited to one.</p>
					</Styled.MessageContainer>
				</>
			) : (
				<Loading />
			)}
		</WebsiteContainer>
	);
};

export default Dashboard;
