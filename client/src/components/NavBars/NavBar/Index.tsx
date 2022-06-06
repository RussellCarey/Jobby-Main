import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Styled from './styled';
import NavIcon from '../../Icon/Index';
import ProjectIcon from './ProjectIcon';
import AuthContext from '../../../context/auth/AuthContext';

export default function NavBar() {
	const navigate = useNavigate();
	const location = useLocation();
	const { userState } = useContext(AuthContext);
	const [isProjectPage, setIsProjectPage] = useState<boolean>(false);

	// Check if the navmab is on the project page to show items to change the project info.
	useEffect(() => {
		const url = window.location.href;
		if (url.includes('project')) setIsProjectPage(true);
	}, []);

	return (
		<>
			<Styled.NavBarContainer>
				<NavIcon
					onClick={() => navigate(`${location.pathname}/create`)}
					name="plus-solid"
					type={'white'}
					size="25px"
					left={false}
					text={'New project'}
				/>

				{/* Check if we are on the project screen../> */}
				{isProjectPage ? (
					<NavIcon
						onClick={() => navigate(`${location.pathname}/createtask`)}
						name="list-check-solid"
						type={`white`}
						size="25px"
						left={false}
						text={`New task`}
					/>
				) : null}

				{isProjectPage ? (
					<NavIcon
						onClick={() => navigate(`${location.pathname}/addmember`)}
						name="users-solid"
						type={`white`}
						size="25px"
						left={false}
						text={`Manage users`}
					/>
				) : null}

				{/* Add users joined projects to the nav bar.. /> */}
				{userState.id
					? userState.projects.map((p: any) => {
							return <ProjectIcon key={p.id} id={p.id} img={p.thumbnail} left={false} text={p.name} onClick={() => navigate(`/project/${p.id}`)} />;
					  })
					: null}
			</Styled.NavBarContainer>
		</>
	);
}
