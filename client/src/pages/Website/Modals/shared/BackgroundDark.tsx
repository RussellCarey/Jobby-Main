import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;

	top: 0;
	left: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.2);
`;

interface IContainerProps {
	children: React.ReactNode;
}

export default function BackgroundDark(props: IContainerProps) {
	return <Container>{props.children}</Container>;
}
