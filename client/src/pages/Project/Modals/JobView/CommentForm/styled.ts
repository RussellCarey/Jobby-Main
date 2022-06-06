import styled from 'styled-components';
import { theme } from '../../../../../theme/theme';

export const Container = styled.div`
	width: 100%;
	height: max-content;
	display: flex;
	flex-direction: column;

	margin: ${theme.spacing.space.small} 0;
`;

export const Form = styled.input`
	width: 100%;
	padding: ${theme.spacing.space.xsmall};
	border-radius: 5px;

	outline: none;
	border: 1px solid black;
	margin-top: ${theme.spacing.space.small};
`;

export const SubmitButton = styled.button`
	margin-left: ${theme.spacing.space.small};
`;
