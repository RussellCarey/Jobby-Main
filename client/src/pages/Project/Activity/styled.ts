import styled from 'styled-components';
import { theme } from '../../../theme/theme';

export const ActivityContainer = styled.div`
	width: 400px;
	min-width: 300px;
	height: max-content;

	padding: ${theme.spacing.space.small};
	padding-top: ${theme.spacing.space.xsmall};
	padding-left: 0;

	@media (max-width: 1200px) {
		z-index: 10;
		position: absolute;
		top: 0;
		right: -400px;

		background-color: white;
		padding: ${theme.spacing.space.small};

		box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.05);
	}
`;
