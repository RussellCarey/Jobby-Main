import * as ModalStyled from '../../../../../styled/shared-modal-styles';
import { ActivityStyled } from './styled';
import { CircleUserImage } from '../../../../../components/HeaderBar/styled';
import { FunctionComponent } from 'react';
import { parseDate, parseTypeToString } from '../../../../../utils/parseUtils';

interface IUpdateItem {
	update: any;
}

const UpdateItem: FunctionComponent<IUpdateItem> = ({ update }) => {
	return (
		<ActivityStyled.ActivityBarContainer>
			<ActivityStyled.TextArea>
				<ModalStyled.SmallText>
					{update.user_username} {parseTypeToString(update.updates_type)}
				</ModalStyled.SmallText>
				<ModalStyled.SmallText>{parseDate(update.updates_date)}</ModalStyled.SmallText>
			</ActivityStyled.TextArea>
			<CircleUserImage src={update.user_thumbnail || '/images/unknown-user.png'} size={'30px'} />
		</ActivityStyled.ActivityBarContainer>
	);
};

export default UpdateItem;
