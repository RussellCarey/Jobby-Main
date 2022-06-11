import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

interface IButtonProps {
	light: boolean;
}

interface IButton {
	light: boolean;
	text: string;
	onClick: Function;
}

// Container
const Container = styled.button`
	background-color: ${(props: IButtonProps) => (props.light ? theme.colors.ui.brandLight : theme.colors.ui.black)};
	padding: ${theme.spacing.space.xsmall} ${theme.spacing.space.medium};
	color: ${theme.colors.ui.white};
	border-radius: 10px;
	outline: none;
	border: none;
	cursor: pointer;
	box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
`;

const Button: FunctionComponent<IButton> = ({ light, text, onClick }) => {
	return (
		<Container light={light} onClick={() => onClick()}>
			{text}
		</Container>
	);
};

export default Button;
