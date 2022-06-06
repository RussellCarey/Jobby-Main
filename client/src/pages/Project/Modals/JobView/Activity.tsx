import { FunctionComponent, useState, useEffect } from 'react';
import * as Styled from './styled';
import * as ModalStyled from '../../../../styled/shared-modal-styles';
import UpdateItem from './UpdateItem/Index';
import UpdateEnt from '../../../../entities/UpdateEnt';

interface IUpdateList {
	title: string;
	updates: Array<any>;
}

const UpdateList: FunctionComponent<IUpdateList> = ({ title, updates }) => {
	const [update, setUpdates] = useState<Array<UpdateEnt>>();

	useEffect(() => {
		if (!updates) return;
		setUpdates(updates.sort((a, b) => b.updates_date - a.updates_date));
	}, [updates]);

	return (
		<Styled.ListContainer>
			<Styled.SpacedContainer>
				<ModalStyled.CapitalText>{title}</ModalStyled.CapitalText>
			</Styled.SpacedContainer>
			{update
				? update.map((u) => {
						return <UpdateItem key={u.id} update={u} />;
				  })
				: null}
		</Styled.ListContainer>
	);
};

export default UpdateList;
