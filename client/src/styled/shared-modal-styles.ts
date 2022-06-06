import styled from 'styled-components';
import { theme } from '../theme/theme';
import { motion } from 'framer-motion';

// Modal Containers
export const BackgroundContainer = styled(motion.div)`
	z-index: 300;
	position: fixed;
	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;

	background-color: rgba(0, 0, 0, 0.6);

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Container = styled(motion.div)`
	z-index: 11;
	width: 50vw;
	height: 90vh;

	display: flex;
	background-color: ${theme.colors.ui.white};

	border-radius: 5px;

	overflow-y: scroll;

	@media (max-width: 1700px) {
		width: 60vw;
	}

	@media (max-width: 1200px) {
		width: 80vw;
	}

	@media (max-width: 800px) {
		flex-direction: column;
		justify-content: space-between;
	}

	@media (max-width: 400px) {
		width: 95vw;
		height: 95vh;
	}
`;

export const ColumnContainer = styled(motion.div)`
	position: relative;
	z-index: 11;
	width: 50vw;
	max-width: max-content;
	max-height: max-content;

	padding: ${theme.spacing.space.large};

	display: flex;
	background-color: ${theme.colors.ui.white};
	flex-direction: column;

	border-radius: 5px;
	overflow-y: scroll;

	@media (max-width: 1700px) {
		width: 60vw;
	}

	@media (max-width: 1200px) {
		width: 80vw;
	}

	@media (max-width: 800px) {
		flex-direction: column;
	}

	@media (max-width: 400px) {
		padding: ${theme.spacing.space.small};
		width: 90vw;
		justify-content: center;
	}
`;

export const FormContainer = styled(motion.div)`
	position: relative;
	width: 40vw;
	height: max-content;

	display: flex;
	flex-direction: column;

	background-color: ${theme.colors.ui.white};
	border-radius: 5px;

	margin-bottom: ${theme.spacing.space.large};

	@media (max-width: 1100px) {
		width: 80vw;
	}

	@media (max-width: 600px) {
		width: 100%;
	}
`;

export const ImageSelectContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

// Texts
export const TitleText = styled.h6`
	font-weight: bold;
	margin-bottom: ${theme.spacing.space.small};
`;

export const SubTitleText = styled.p`
	font-weight: bold;
	margin-bottom: ${theme.spacing.space.xsmall};
`;

export const Text = styled.p`
	line-height: 2.4rem;
`;

export const SmallText = styled.p`
	font-size: ${theme.fonts.fontsizes.smallp};
	color: ${theme.colors.text.darkGrey};
`;

export const CapitalText = styled(SmallText)`
	font-weight: bold;
	color: ${theme.colors.text.black};
`;

export const CancelText = styled(SmallText)`
	color: ${theme.colors.text.black};
	cursor: pointer;
	align-self: center;
`;

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: auto;
	margin-top: ${theme.spacing.space.small};

	& > button {
		margin-right: ${theme.spacing.space.small};
	}
`;

export const Button = styled.button`
	width: max-content;
	height: max-content;

	padding: ${theme.spacing.space.xxsmall} ${theme.spacing.space.small};

	color: ${theme.colors.ui.white};
	background-color: ${theme.colors.ui.brandLight};

	border: none;
	border-radius: 5px;
`;

export const FileInput = styled.input``;

export const FormInput = styled.input`
	height: 40px;
	border-radius: 5px;
	margin-bottom: 3px;
	border: solid 1px black;
	padding: 0 ${theme.spacing.space.xsmall};
`;

export const SelectInput = styled.select`
	height: 40px;
	border-radius: 5px;
	margin-bottom: 3px;
	padding: 0 ${theme.spacing.space.xsmall};
`;

export const FormTextArea = styled.textarea`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif;
	resize: none;
	height: 180px;
	padding: ${theme.spacing.space.xsmall};
`;

export const Description = styled.p`
	color: grey;
	font-size: ${theme.fonts.fontsizes.smallp};
	margin-left: 5px;
`;

export const ImagePreview = styled.img`
	width: ${theme.spacing.space.xxxxlage};
	margin-bottom: ${theme.spacing.space.small};
`;
