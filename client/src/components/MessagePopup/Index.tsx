import { FunctionComponent, useEffect } from 'react';
import * as Styled from '../../styled/shared-modal-styles';
import Button from '../Button/Index';

export interface IMessagePopup {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	func?: Function;
}

const MessagePopup: FunctionComponent<IMessagePopup> = ({ setShow, message, func }) => {
	useEffect(() => {
		if (func) {
			func();
		}
	}, []);

	return (
		<Styled.BackgroundContainer>
			<Styled.ColumnContainer>
				<Styled.CapitalText style={{ marginBottom: '20px' }}>{message}</Styled.CapitalText>
				<Button text="Close" light={true} onClick={() => setShow(false)} />
			</Styled.ColumnContainer>
		</Styled.BackgroundContainer>
	);
};

export default MessagePopup;
