import styled from 'styled-components';
import { theme } from '../../../theme/theme';
import { Link } from 'react-router-dom';

export const NavBarContainer = styled.div`
	position: fixed;
	left: 0;

	z-index: 21;
	width: 65px;
	height: 100vh;
	min-height: 100vh;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background-color: ${theme.colors.ui.black};

	box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);

	& > .nav-icon {
		margin-bottom: ${theme.spacing.space.medium};
	}
`;

type IProps = { isOpen: boolean };

export const MenuContainer = styled.div`
	z-index: 20;
	width: 300px;
	height: 100vh;
	position: absolute;

	top: 0;
	left: 60px;
	display: ${(props: IProps) => (props.isOpen ? 'flex' : 'none')};

	flex-direction: column;
	background-color: white;

	padding: ${theme.spacing.space.medium};

	box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);

	overflow: hidden;
`;

export const MenuLink = styled(Link)`
	font-weight: 600;
	font-size: ${theme.fonts.fontsizes.h6};
	text-decoration: none;

	margin-bottom: ${theme.spacing.space.medium};

	&:visited {
		color: black;
	}
`;

export const SmallMenuLink = styled.a`
	font-weight: 600;
	font-size: ${theme.fonts.fontsizes.p};
	text-decoration: none;

	margin-bottom: ${theme.spacing.space.xsmall};

	&:visited {
		color: black;
	}
`;

export const MenuTitle = styled.h6`
	margin-bottom: ${theme.spacing.space.xsmall};
`;

export const ProjectIcon = styled.img`
	width: 30px;
	height: 30px;

	border-radius: 20%;

	box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.16);
	margin-bottom: 20px;
`;
