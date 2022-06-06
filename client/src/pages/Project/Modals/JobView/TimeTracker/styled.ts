import styled from 'styled-components';
import { theme } from '../../../../../theme/theme';

export const TimeTrackerContainer = styled.div`
	position: relative;
	width: 100%;
	height: max-content;

	display: flex;
	flex-direction: column;

	margin-bottom: ${theme.spacing.space.small};
	padding-bottom: ${theme.spacing.space.small};
	padding-top: ${theme.spacing.space.small};

	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	border-top: 1px solid rgba(0, 0, 0, 0.15);
`;

export const SpacedAreas = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	&:first-child {
		margin-bottom: ${theme.spacing.space.xsmall};
	}

	&:last-child {
		margin-top: ${theme.spacing.space.xsmall};
	}
`;

export const TimeTrackerBG = styled.div`
	position: relative;
	z-index: 12;
	width: 100%;
	height: 10px;

	margin-left: ${theme.spacing.space.xsmall};

	background-color: ${theme.colors.ui.black};
`;

interface ITimeTrackerProps {
	percentage: number;
}

export const TimeTrackerColor = styled.div`
	z-index: 15;
	position: absolute;
	top: 0;
	left: 0;

	z-index: 13;

	width: ${(props: ITimeTrackerProps) => `${props.percentage}%`};
	height: 100% !important;

	background-color: ${theme.colors.ui.brandLight};
`;
