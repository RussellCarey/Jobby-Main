import { FunctionComponent } from 'react';
import * as Styled from './styled';

interface IMessageQueue {
	messageQueue: Array<{ message: ''; type: 'error' | 'success'; id: string }>;
}

const MainModal: FunctionComponent<IMessageQueue> = ({ messageQueue }) => {
	return (
		<Styled.Container>
			<Styled.ModalContainer bg={messageQueue[0].type}>
				<Styled.ModalText>{messageQueue[0]?.message ?? 'Error showing modal'}</Styled.ModalText>
			</Styled.ModalContainer>
		</Styled.Container>
	);
};

export default MainModal;
