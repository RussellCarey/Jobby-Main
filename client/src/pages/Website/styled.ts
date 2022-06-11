import styled from 'styled-components';
import { theme } from '../../theme/theme';

export const PageContainer = styled.div`
    width: 100%:
    height: 100%;

    display: flex;


`;

export const SideImageContainer = styled.div`
	flex: 1.3;
	margin-right: ${theme.spacing.space.xxxlage};
	background-image: url('/images/home-image.png');
	background-size: contain;
	background-position: center;

	@media (max-width: 800px) {
		display: none;
	}
`;

export const SideTextContainer = styled.div`
	flex: 1;
	height: 100vh;
	padding: ${theme.spacing.space.medium};

	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (max-width: 800px) {
		padding: ${theme.spacing.space.large};
		text-align: center;
		align-items: center;
	}
`;

export const Title = styled.h1`
	color: ${theme.colors.ui.black};
	margin-bottom: ${theme.spacing.space.large};
`;

export const Subtitle = styled.h4`
	color: ${theme.colors.ui.black};
	font-weight: 400;
	margin-bottom: ${theme.spacing.space.xxxxlage};
`;

export const Text = styled.p`
	opacity: 50%;
	font-size: ${theme.fonts.fontsizes.smallp};
	color: ${theme.colors.ui.brandDark};
`;

export const TextCursor = styled.p`
	opacity: 50%;
	font-size: ${theme.fonts.fontsizes.smallp};
	color: ${theme.colors.ui.brandDark};
	cursor: pointer;
`;

export const ButtonContainer = styled.button`
	max-width: 50%;
	border-radius: 20px;

	font-size: ${theme.fonts.fontsizes.p};
	color: ${theme.colors.ui.white};
	padding: ${theme.spacing.space.small} ${theme.spacing.space.medium};
	background-color: ${theme.colors.ui.brandLight};

	border: none;
	outline: none;

	transition: all 0.2s ease-in;

	&:hover {
		cursor: pointer;
		transform: scale(105%);
		transform: translateY(-2px);
		box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
	}

	&:not(:last-child) {
		margin-bottom: ${theme.spacing.space.small};
	}

	&:nth-child(4) {
		margin-bottom: ${theme.spacing.space.xxxxlage};
	}
`;

export const NotificationBar = styled.div`
	position: fixed;
	top: 20px;
	left: calc(50% - (50vw / 2));

	width: 50vw;
	padding: ${theme.spacing.space.small};
	background-color: white;
	box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	border: solid 2px black;
	border-radius: 10px;

	font-size: ${theme.fonts.fontsizes.p};
	line-height: ${theme.spacing.space.medium};

	& > p {
		&:first-child {
			margin-bottom: ${theme.spacing.space.small};
		}
	}

	@media (max-width: 500px) {
		width: 90vw;
		left: calc(50% - (90vw / 2));
	}
`;
