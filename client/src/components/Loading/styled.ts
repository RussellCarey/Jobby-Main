import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import { theme } from '../../theme/theme';

export const Container = styled.div`
	z-index: 1000000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;
`;

export const SVGContainer = styled.div`
	width: 90px;
	height: 90px;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${theme.colors.ui.white};
	border-radius: 20px;
`;

export const SVG = styled(ReactSVG)`
	width: 50px;
	height: 50px;
	fill: ${theme.colors.ui.brandLight} !important;
	animation: rotation 1s infinite linear;

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
`;
