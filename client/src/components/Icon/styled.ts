import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import { theme } from '../../theme/theme';

interface ISVGProps {
	size: string;
	color: string;
}

export const SVGContainer = styled.div`
	position: relative;
	width: ${(props: ISVGProps) => props.size};
	height: ${(props: ISVGProps) => props.size};
	min-width: ${(props: ISVGProps) => props.size} !important;

	fill: ${(props: ISVGProps) => props.color} !important;
`;

export const SVG = styled(ReactSVG)`
	width: 100%;
	height: 100%;
	transition: 0.2s all;

	&:hover {
		transform: rotate(-5deg);
		cursor: pointer;
	}
`;

interface IToolTipProps {
	left: boolean;
}

export const TooltipContainer = styled.div`
	position: absolute;

	top: -15px;
	left: ${(props: IToolTipProps) => (props.left ? '-70px' : '50px')} !important;

	width: max-content;
	height: max-content;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${theme.colors.ui.black};
	color: ${theme.colors.ui.white};

	font-weight: bold;
	font-size: ${theme.fonts.fontsizes.smallp};

	border-radius: 2px;

	padding: ${theme.spacing.space.xsmall};
`;

export const Styled = {
	SVGContainer,
	SVG,
	TooltipContainer,
};
