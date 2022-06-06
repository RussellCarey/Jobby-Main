import { FunctionComponent, useEffect, useState } from 'react';
import { projectURLS } from '../../utils/urls';
import * as Styled from './styled';

import UserEnt from '../../entities/UserEnt';

interface IUserIcon {
	userData: UserEnt;
	onClick: any;
}

const UserIcon: FunctionComponent<IUserIcon> = ({ userData, onClick }) => {
	const [image, setImage] = useState<string>();

	useEffect(() => {
		const image = userData.thumbnail ? `${projectURLS.image}/${userData.thumbnail}` : '/images/unknown-user.png';
		setImage(image);
	}, [userData]);

	return (
		<Styled.UserIconContainer onClick={() => onClick()}>
			<Styled.ImageContainer>
				{/* User image */}
				<Styled.CircleUserImage src={image} size={'45px'} />
			</Styled.ImageContainer>

			{/* Name Info */}
			<Styled.NameContainer>
				<Styled.NameText>{`${userData.firstName} ${userData.lastName}`}</Styled.NameText>
				<Styled.UsernameText>{userData.username}</Styled.UsernameText>
			</Styled.NameContainer>
		</Styled.UserIconContainer>
	);
};

export default UserIcon;
