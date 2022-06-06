import { useState, useEffect, ChangeEvent, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Styled from '../../../../styled/shared-modal-styles';
import * as FormStyled from '../../../../styled/shared-modal-styles';
import { addUserToProject, getProjectMembers, removeUserFromProject, searchAllMembers } from '../../services/dbServices';
import ModalContext from '../../../../context/modal/ModalContext';
import UserBar from '../JobView/UserBar/Index';
import Loading from '../../../../components/Loading/Index';

import UserEnt from '../../../../entities/UserEnt';

export default function AddProjectMemberModal() {
	const params = useParams();
	const navigate = useNavigate();
	const { addMessageToModal } = useContext(ModalContext);

	const [canSearch, setCanSearch] = useState<boolean>(true);
	const [search, setSearch] = useState<string>('');

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [projectMembers, setProjectMembers] = useState<Array<UserEnt>>([]);
	const [foundMembers, setFoundMembers] = useState<Array<UserEnt>>([]);
	const [gotProjectMembers, setGotProjectMembers] = useState<boolean>();

	const fetchProjectMembers = async () => {
		if (gotProjectMembers) return;

		const members = await getProjectMembers(+params.projectid!);
		if (members.data.status !== 'success') return addMessageToModal('Could not get member data', 'fail');
		setProjectMembers(members.data.data.members);

		setGotProjectMembers(true);
		setIsLoading(false);
	};

	// On inputting to the seach form..
	const searchOnChange = (e: ChangeEvent) => {
		setCanSearch(false);
		const target = e.target as HTMLInputElement;

		setSearch(target.value);

		if (search.length < 2) {
			setFoundMembers([]);
			return setCanSearch(true);
		}
		if (canSearch && search.length > 1) searchForUsers();

		//! Slight delay in searching - Find better method..
		setTimeout(() => {
			setCanSearch(true);
		}, 300);
	};

	// Search for user using the input partial text..
	const searchForUsers = async () => {
		const searchedUsers = await searchAllMembers(search);
		if (searchedUsers.data.data.length < 1) return setFoundMembers([]);

		setFoundMembers([...searchedUsers.data.data]);
		setIsLoading(false);
	};

	const removeMember = async (id: number) => {
		const removingUser = await removeUserFromProject(+params.projectid!, id);
		if (removingUser.data.status !== 'success') return addMessageToModal('Could not remove user', 'fail');

		const members = projectMembers.filter((p) => p.id !== removingUser.data.data);
		setProjectMembers(members);

		return addMessageToModal('Removed member successfully.');
	};

	const addMember = async (id: number) => {
		const addingMember = await addUserToProject(+params.projectid!, id);
		if (addingMember.data.status !== 'success') return addMessageToModal('Could not add user', 'fail');

		setProjectMembers([...projectMembers, addingMember.data.data]);

		return addMessageToModal('Added member successfully');
	};

	useEffect(() => {
		fetchProjectMembers();
	}, []);

	return (
		<Styled.BackgroundContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
			<FormStyled.ColumnContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
				{isLoading ? <Loading /> : null}

				{/* Current members in the project.. */}
				<Styled.TitleText>Manage members</Styled.TitleText>

				<FormStyled.FormContainer>
					<Styled.SubTitleText>Current members</Styled.SubTitleText>
					{projectMembers.length > 0
						? projectMembers.map((pm) => {
								return <UserBar userData={pm} canDelete={true} onClick={removeMember} />;
						  })
						: null}
				</FormStyled.FormContainer>

				{/* Input email / username of user to send notification / email to them.. */}
				<FormStyled.FormContainer>
					<Styled.SubTitleText>Seach members</Styled.SubTitleText>
					<FormStyled.FormInput type={'text'} placeholder="search for a username (case sensitive).." value={search} onChange={searchOnChange} />
				</FormStyled.FormContainer>

				{/* FOund members will show here on searching.. */}
				<FormStyled.FormContainer>
					<Styled.SubTitleText>Found members</Styled.SubTitleText>
					{foundMembers.length >= 1 ? (
						foundMembers.map((fm) => {
							return <UserBar userData={fm} canDelete={false} canAdd={true} onClick={addMember} />;
						})
					) : (
						<Styled.SmallText>No users found</Styled.SmallText>
					)}
				</FormStyled.FormContainer>

				<Styled.CancelText onClick={() => navigate(-1)}>Cancel</Styled.CancelText>
			</FormStyled.ColumnContainer>
		</Styled.BackgroundContainer>
	);
}
