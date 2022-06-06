import * as Styled from '../styled';
import * as ModalStyled from '../../../../../styled/shared-modal-styles';
import { FunctionComponent } from 'react';
import { UserListStyled } from './styled';
import UserBar from '../UserBar/Index';
import UserEnt from '../../../../../entities/UserEnt';

interface IUserList {
	members: Array<UserEnt>;
	creator: UserEnt;
}

const UserList: FunctionComponent<IUserList> = ({ members, creator }) => {
	return (
		<UserListStyled.UserAreaContainer>
			<UserListStyled.UserListContainer>
				{/* Creator of the task */}
				<Styled.SpacedContainer>
					<ModalStyled.CapitalText>CREATOR</ModalStyled.CapitalText>
				</Styled.SpacedContainer>
				<UserBar userData={creator} canDelete={false} />
			</UserListStyled.UserListContainer>

			{/* List of current members of the project */}
			<UserListStyled.UserListContainer>
				<Styled.SpacedContainer>
					<ModalStyled.CapitalText>MEMBERS</ModalStyled.CapitalText>
				</Styled.SpacedContainer>

				{/* Project always has a member, just incase to save an error.*/}
				{members.length > 0
					? members.map((m) => {
							return <UserBar key={m.id} userData={m} canDelete={false} />;
					  })
					: null}
			</UserListStyled.UserListContainer>
		</UserListStyled.UserAreaContainer>
	);
};

export default UserList;
