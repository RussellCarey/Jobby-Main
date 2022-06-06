import * as Styled from './styled';

export default function Loading() {
	return (
		<Styled.Container>
			<Styled.SVGContainer>
				<Styled.SVG src={`/svg/gear-solid.svg`} />
			</Styled.SVGContainer>
		</Styled.Container>
	);
}
