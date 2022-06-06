import { FunctionComponent } from 'react';
import { UserBarStyled } from './styled';
import Icon from '../../../../../components/Icon/Index';
import { CircleUserImage } from '../../../../../components/HeaderBar/styled';
import { projectURLS } from '../../../../../utils/urls';

interface IUserBar {
	userData: any;
	canDelete?: boolean;
	canAdd?: boolean;
	onClick?: Function;
}

const UserBar: FunctionComponent<IUserBar> = ({ userData, canDelete = false, canAdd = false, onClick = () => {} }) => {
	return (
		<UserBarStyled.CreatorBar onClick={() => onClick(userData.id)}>
			<UserBarStyled.UserContainer>
				<CircleUserImage src={userData.thumbnail ? `${projectURLS.image}/${userData.thumbnail}` : '/images/unknown-user.png'} size={'30px'} />
				{userData.username}
			</UserBarStyled.UserContainer>

			{canDelete ? <Icon name="x-solid" type="dark" size="10px" left={true} text={'Remove'} /> : false}
			{canAdd ? <Icon name="plus-solid" type="dark" size="10px" left={true} text={'Add member'} /> : false}
		</UserBarStyled.CreatorBar>
	);
};

export default UserBar;
