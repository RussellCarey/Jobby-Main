import { theme } from '../../theme/theme';
import styled from 'styled-components';

export const Container = styled.div`
	z-index: 2000;
	position: fixed;
	width: 100vw;
	height: max-content;
	top: 0;
	left: 0;
`;

type IModalContainer = { bg: string };
export const ModalContainer = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;

	width: max-content;
	max-width: 400px;
	height: max-content;
	padding: ${theme.spacing.space.medium};
	color: white;
	outline: 2px solid white;
	border-radius: 5px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
	background-color: ${(props: IModalContainer) => (props.bg === 'error' ? theme.colors.modal.error : theme.colors.modal.ok)};
`;

export const ModalText = styled.p``;
