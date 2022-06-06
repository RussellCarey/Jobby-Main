import styled from 'styled-components';
import { theme } from '../../../../../theme/theme';

export const ActivityBarContainer = styled.div`
	width: 100%;
	height: 50px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${theme.spacing.space.xsmall};

	& > img {
		align-self: center;
	}
`;

export const TextArea = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: ${theme.spacing.space.small};
`;

export const ActivityStyled = {
	ActivityBarContainer,
	TextArea,
};
