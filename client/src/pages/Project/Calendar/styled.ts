import styled from 'styled-components';
import { theme } from '../../../theme/theme';

export const CalContainer = styled.div`
	border-top: solid 1px rgba(0, 0, 0, 0.15);
	border-bottom: solid 1px rgba(0, 0, 0, 0.15);

	padding: ${theme.spacing.space.medium} 0 ${theme.spacing.space.medium} 0;
`;

export const CalDate = styled.h2`
	font-size: ${theme.fonts.fontsizes.smallp};
	margin-bottom: ${theme.spacing.space.small};
`;

export const DateContainer = styled.div`
	width: 100%;
	height: max-content;

	display: flex;
	justify-content: space-between;
`;

export const SingleDate = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const DateHightLight = styled.div`
	width: 30px;
	height: 30px;

	border-radius: 50%;

	background-color: ${theme.colors.ui.background};

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const DateText = styled.p`
	font-size: ${theme.fonts.fontsizes.smallp};
	margin-bottom: ${theme.fonts.fontsizes.smallp};
`;
