import styled from 'styled-components';
import { theme } from '../../theme/theme';

export const AllListContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;

	min-width: 0;
	min-height: 0;
	max-height: 500px;

	margin-top: ${theme.spacing.space.xsmall};
`;
