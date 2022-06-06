import styled from 'styled-components';
import { theme } from '../../../../theme/theme';

export const ModalContainer = styled.div`
	position: relative;
	z-index: 10;
	width: 30%;
	height: max-content;

	padding: ${theme.spacing.space.xxxxlage};

	border-radius: 5px;
	background-color: ${theme.colors.ui.white};
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 400px) {
		width: 90vw;
		text-align: center;
	}
`;

export const Input = styled.input`
	height: 40px;
	width: 100%;

	border-radius: 5px;
	margin-bottom: 3px;

	outline: none;
	border: 1px solid black;

	padding: 0 ${theme.spacing.space.xsmall};

	&:not(:last-child) {
		margin-bottom: ${theme.spacing.space.medium};
	}

	&:focus {
		outline: solid 1px ${theme.colors.ui.brandLight};
	}
`;

export const Title = styled.h5`
	margin-bottom: ${theme.spacing.space.medium};
`;

export const Text = styled.p`
	text-align: center;
	margin-bottom: ${theme.spacing.space.medium};
`;

export const MessageText = styled.p`
	color: ${(props) => (props.color === 'error' ? theme.colors.ui.red : theme.colors.ui.brandLight)};
	font-size: ${theme.fonts.fontsizes.smallp};
	font-weight: bold;
	margin-top: ${theme.spacing.space.medium};
`;

export const SubmitButton = styled.button`
	width: 100px;
	height: 50px;

	border-radius: 20px;
	outline: none;
	border: none;

	background-color: ${theme.colors.ui.brandLight};

	color: white;

	&:hover {
		cursor: pointer;
	}
`;

export const Cross = styled.h6`
	position: absolute;
	top: 20px;
	right: 20px;

	cursor: pointer;
`;
