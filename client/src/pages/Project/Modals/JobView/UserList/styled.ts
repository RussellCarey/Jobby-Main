import styled from 'styled-components';
import { theme } from '../../../../../theme/theme';

export const UserAreaContainer = styled.div`
	display: flex;
	flex-direction: column;

	padding-bottom: ${theme.spacing.space.xsmall};

	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

export const UserListContainer = styled.div`
	width: 100%;
	height: max-content;

	display: flex;
	flex-direction: column;

	& > div:first-child {
		margin-bottom: ${theme.spacing.space.xsmall};
	}
`;

export const UserListStyled = {
	UserAreaContainer,
	UserListContainer,
};
