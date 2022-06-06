import styled from 'styled-components';
import { theme } from '../../theme/theme';

interface IUserImageProps {
	size: string;
}

export const HeaderBarContainer = styled.div`
	width: 100%;
	max-height: 80px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: ${theme.spacing.space.small};
	cursor: pointer;

	transition: all 0.4s;
`;

export const UserIconContainer = styled.div`
	height: 100%;
	display: flex;

	&:hover {
		transform: scale(102%);
	}
`;

export const NameContainer = styled.div`
	height: min-content;

	display: flex;
	flex-direction: column;
	align-self: end;
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	height: 100%;

	@media (max-width: 1200px) {
		justify-content: space-between;
		width: 55px;
	}
`;

export const ImageContainer = styled.div`
	position: relative;
	height: min-content;
	width: min-content;
`;

export const CircleUserImage = styled.img`
	width: ${(props: IUserImageProps) => props.size};
	height: ${(props: IUserImageProps) => props.size};
	margin-right: ${theme.spacing.space.small};
	border-radius: 50%;
	border: solid 2px ${theme.colors.ui.white};
	box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.16);
`;

// Texts
export const NameText = styled.p`
	&:hover {
		transform: scale(102%);
	}
`;

export const UsernameText = styled.p`
	font-size: ${theme.fonts.fontsizes.smallp};
	color: ${theme.colors.text.darkGrey};
`;
