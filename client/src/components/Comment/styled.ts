import styled from 'styled-components';
import { theme } from '../../theme/theme';

const CommentContainer = styled.div`
	width: 100%;
	height: max-content;
	margin-bottom: ${theme.spacing.space.small};

	&:not(:first-child) {
		margin-top: ${theme.spacing.space.small};
	}
`;

const TopSection = styled.div`
	height: 40px;
	width: 100%;

	display: flex;
	align-items: center;
	margin-bottom: ${theme.spacing.space.xsmall};
`;

const TextContainer = styled.div`
	width: max-content;
	height: max-content;

	display: flex;
	flex-direction: column;
`;

const NameText = styled.p`
	font-size: ${theme.fonts.fontsizes.smallp};
	margin-bottom: ${theme.spacing.space.xxsmall};
`;

const DateText = styled.p`
	font-size: ${theme.fonts.fontsizes.xsmallp};
	color: ${theme.colors.text.darkGrey};
`;

const TaskText = styled.p`
	font-size: ${theme.fonts.fontsizes.smallp};
	color: ${theme.colors.ui.brandLight};
`;

const CommentBox = styled.div`
	width: 100%;
	height: max-content;

	background-color: ${theme.colors.ui.background};
	border-radius: 5px;

	padding: ${theme.spacing.space.xsmall};
`;

const CommentText = styled.p`
	font-size: ${theme.fonts.fontsizes.smallp};
`;

export const Styled = {
	CommentContainer,
	TopSection,
	TextContainer,
	NameText,
	DateText,
	TaskText,
	CommentBox,
	CommentText,
};
