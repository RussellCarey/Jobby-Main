import styled from 'styled-components';

export const PageContainer = styled.div`
	z-index: 100;
	position: absolute;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;

	overflow-x: hidden;
`;

export const SiteContainer = styled.div`
	width: 100%;
	height: 100%;
	max-width: 1800px;

	display: flex;
`;

export const HeaderContentContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	margin-left: 70px;

	// Fixed resizing div issue - BP 1030;
	min-width: 0;
	min-height: 0;
`;

export const ContentContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	/* @media (max-width: 1200px) {
    flex-direction: column;
  } */
`;

export const Styled = {
	PageContainer,
	SiteContainer,
	HeaderContentContainer,
	ContentContainer,
};
