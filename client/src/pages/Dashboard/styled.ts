import styled from 'styled-components';
import { theme } from '../../theme/theme';

export const UpdateContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	margin-left: ${theme.spacing.space.medium};
`;

export const UpdateItem = styled.div`
	width: max-content;
	height: max-content;

	display: flex;
	align-items: center;
	padding: ${theme.spacing.space.small};

	border: solid 1px black;

	&:not(:last-child) {
		margin-bottom: ${theme.spacing.space.medium};
	}
`;

export const MessageContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 800px) {
		text-align: center;
		padding: 0 ${theme.spacing.space.large};
	}
`;
