import styled from 'styled-components';
import { theme } from '../../../theme/theme';

export const TaskListContainer = styled.div`
	display: flex !important;

	// If its third the must be on the dash.
	&:nth-child(2) {
		margin-top: ${theme.spacing.space.small};
	}

	@media (max-width: 1200px) {
		&:nth-child(2) {
			margin-top: ${theme.spacing.space.xsmall};
		}
	}

	@media (max-width: 800px) {
		flex-direction: column;
	}
`;

export const ListContainer = styled.div`
	position: relative;
	flex: 1;

	height: 100%;
	max-height: 400px;
	overflow-y: scroll;

	padding: ${theme.spacing.space.small};

	// Fixed resizing div issue - BP 1020
	min-width: 200px;

	// Positions
	&:nth-child(1) {
		margin-left: ${theme.spacing.space.small};
		margin-right: ${theme.spacing.space.xsmall};
		margin-bottom: ${theme.spacing.space.small};
	}

	&:nth-child(2) {
		margin-left: ${theme.spacing.space.xsmall};
		margin-right: ${theme.spacing.space.xsmall};
		margin-bottom: ${theme.spacing.space.small};
	}

	&:nth-child(3) {
		margin-left: ${theme.spacing.space.xsmall};
		margin-right: ${theme.spacing.space.small};
		margin-bottom: ${theme.spacing.space.small};
	}

	display: flex;
	flex-direction: column;

	background-color: ${theme.colors.ui.background};

	border-radius: 5px;

	@media (max-width: 1200px) {
		// Positions
		&:nth-child(1) {
			margin-left: ${theme.spacing.space.xsmall};
			margin-right: 0;
			margin-bottom: ${theme.spacing.space.xsmall};
		}

		&:nth-child(2) {
			margin-left: ${theme.spacing.space.xsmall};
			margin-right: 0;
			margin-bottom: ${theme.spacing.space.xsmall};
		}

		&:nth-child(3) {
			margin-left: ${theme.spacing.space.xsmall};
			margin-right: ${theme.spacing.space.xsmall};
			margin-bottom: ${theme.spacing.space.xsmall};
		}
	}

	@media (max-width: 800px) {
		margin: 0 ${theme.spacing.space.xsmall} !important;
		padding: ${theme.spacing.space.xsmall};
		padding-bottom: ${theme.spacing.space.large};

		&:nth-child(1) {
			margin-bottom: ${theme.spacing.space.xsmall} !important;
		}

		&:nth-child(2) {
			margin-bottom: ${theme.spacing.space.xsmall} !important;
		}

		&:nth-child(3) {
			margin-bottom: ${theme.spacing.space.xsmall} !important;
		}
	}
`;

export const JobList = styled.div`
	height: 100%;
	min-height: 300px;

	display: flex;
	flex-direction: column;
`;

export const ListHeader = styled.div`
	height: 50px;

	display: flex;
	justify-content: space-between;
`;

export const ListTitle = styled.p``;

export const SeeAllText = styled.p`
	position: absolute;
	right: ${theme.spacing.space.small};
	bottom: ${theme.spacing.space.small};

	&:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;

export const Styled = {
	TaskListContainer,
	ListContainer,
	JobList,
	ListHeader,
	ListTitle,
	SeeAllText,
};
