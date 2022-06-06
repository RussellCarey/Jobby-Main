import styled from 'styled-components';
import { theme } from '../../../../theme/theme';

// THis creates seperation of colu,ms for the view
export const MainContainer = styled.div`
	width: 100%;
	height: 30vh;

	display: flex;
	flex-direction: column;
	padding: ${theme.spacing.space.medium};
	padding-right: 0;

	@media (max-width: 800px) {
		height: max-content;
		padding: ${theme.spacing.space.medium};
	}
`;

export const InfoHeaderContainer = styled.div`
	width: 100%;
	height: max-content;

	display: flex;
	justify-content: space-between;

	margin-bottom: ${theme.spacing.space.small};

	@media (max-width: 800px) {
		order: 1;
		margin-bottom: ${theme.spacing.space.xsmall};
	}

	@media (max-width: 400px) {
		margin-bottom: ${theme.spacing.space.medium};
	}
`;

export const DescriptionContainer = styled.div`
	width: 100%;
	height: max-content;

	display: flex;
	flex-direction: column;

	margin-bottom: ${theme.spacing.space.small};

	@media (max-width: 800px) {
		order: 2;
		margin-bottom: 0;
	}
`;

export const CommentContainer = styled.div`
	width: 100%;
	height: max-content;

	display: flex;
	flex-direction: column;

	& > div:nth-child(2) {
		margin-top: ${theme.spacing.space.xsmall} !important;
	}

	@media (max-width: 800px) {
		order: 4;
		padding: ${theme.spacing.space.small} 0;
	}
`;

// Side
export const SideContainer = styled.div`
	position: relative;
	width: 400px;
	height: 100%;

	padding: ${theme.spacing.space.medium};

	@media (max-width: 800px) {
		width: 100% !important;
		order: 2;
		padding-top: 0;
	}
`;

// Side Icons
export const IconContainer = styled.div`
	width: 100%;
	height: 20px;

	display: flex;
	justify-content: space-between;

	margin-bottom: ${theme.spacing.space.small};

	@media (max-width: 400px) {
		margin-bottom: ${theme.spacing.space.large};
	}
`;

export const SpacedContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

// Activity
export const ListContainer = styled.div`
	width: 100%;
	height: max-content;
	display: flex;
	flex-direction: column;

	& > div:first-child {
		margin-bottom: ${theme.spacing.space.xsmall};
	}

	padding-top: ${theme.spacing.space.small};

	@media (max-width: 800px) {
		padding-bottom: ${theme.spacing.space.xsmall};
		border-bottom: solid 1px rgba(0, 0, 0, 0.15);
	}

	@media (max-width: 800px) {
		border-top: 1px solid rgba(0, 0, 0, 0.15);
	}
`;
