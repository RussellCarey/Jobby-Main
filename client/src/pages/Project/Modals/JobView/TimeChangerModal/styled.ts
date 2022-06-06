import styled from 'styled-components';
import { theme } from '../../../../../theme/theme';

export const Title = styled.h6``;

export const FormContainer = styled.div`
	width: 100%;
	margin-bottom: ${theme.spacing.space.medium};
`;

export const ButtonContainer = styled.div`
	width: 40%;

	display: flex;
	align-items: center;
	justify-content: space-between;
	align-self: end;
`;

export const Form = styled.input`
	border: solid 1px grey;
	padding: ${theme.spacing.space.xsmall} ${theme.spacing.space.small};
	border-radius: 5px;

	&:first-child {
		margin-right: ${theme.spacing.space.small};
	}

	@media (max-width: 400px) {
		&:first-child {
			margin: 0;
			margin-bottom: ${theme.spacing.space.small};
		}
	}
`;
