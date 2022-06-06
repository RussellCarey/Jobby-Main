import styled from 'styled-components';
import { theme } from '../../../../../theme/theme';

export const CreatorBar = styled.div`
	width: 100%;
	height: 40px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: rgba(104, 212, 207, 0.4);
	border-radius: 5px;

	padding: ${theme.spacing.space.xsmall};

	margin-bottom: ${theme.spacing.space.xsmall};
`;

export const UserContainer = styled.div`
	display: flex;

	align-items: center;

	&:first-child {
		margin-right: ${theme.spacing.space.xsmall};
	}
`;

export const UserBarStyled = {
	CreatorBar,
	UserContainer,
};
