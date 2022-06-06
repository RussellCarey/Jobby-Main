import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../../theme/theme';

export const ColorContainer = styled.div`
	position: relative;
	width: 100%;
	min-width: 100px;
	height: max-content;

	background-color: ${(props) => props.color};
	border-radius: 5px;

	display: flex;
	justify-content: flex-end;

	font-size: ${theme.fonts.fontsizes.p};
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);

	&:not(:last-child) {
		margin-bottom: ${theme.spacing.space.xsmall};
	}

	@media (max-width: 1200px) {
		height: 50px;
	}
`;

export const Container = styled.div`
	z-index: 10;

	background-color: white;

	width: 98%;
	padding: ${theme.spacing.space.xsmall};

	border-radius: 5px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	cursor: pointer;

	transition: all 0.2s;
	box-shadow: 0 5px 5px rgba(0, 0, 0, 0);

	&:hover {
		transform: scale(101%);
		box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
	}
`;

export const TextContainer = styled.div`
	width: max-content;
	max-width: 100%;
	min-width: 100px;
	height: max-content;

	display: flex;
	align-items: center;
`;

export const Text = styled.div`
	width: 100%;
	margin-left: ${theme.spacing.space.xsmall};

	text-decoration: none;
	color: black;
`;

export const StyledLink = styled(Link)`
	text-decoration: none;
`;

export const UserImage = styled.img`
	width: 30px;
	min-width: 30px;
	height: 30px;

	border-radius: 50%;
	border: solid 2px ${theme.colors.ui.white};

	box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.16);
`;
