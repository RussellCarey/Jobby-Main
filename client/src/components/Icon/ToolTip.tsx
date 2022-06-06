import { FunctionComponent } from 'react';
import { Styled } from './styled';

interface IToolTip {
	left: boolean;
	text: string;
}

const ToolTip: FunctionComponent<IToolTip> = ({ left, text }) => {
	return (
		<Styled.TooltipContainer left={left}>
			<p>{text}</p>
		</Styled.TooltipContainer>
	);
};

export default ToolTip;
