import React, { FunctionComponent, MouseEventHandler, useState } from 'react';
import { theme } from '../../theme/theme';
import { Styled } from './styled';
import ToolTip from './ToolTip';

interface INavIcon {
	name: string;
	type: 'white' | 'grey' | 'dark';
	size: string;
	left: boolean;
	text: string;
	onClick?: MouseEventHandler;
}

const NavIcon: FunctionComponent<INavIcon> = ({ name, type, size, left, text, onClick = () => {} }) => {
	const [showToolTip, setShowToolTip] = useState<boolean>(false);

	const unhideToolTip = (e: React.MouseEvent) => {
		setShowToolTip(true);
	};

	const hideToolTip = () => {
		setShowToolTip(false);
	};

	const colorMap = {
		white: theme.colors.ui.white,
		grey: theme.colors.ui.grey,
		dark: theme.colors.ui.black,
	};

	return (
		<Styled.SVGContainer
			size={size}
			color={colorMap[type] || 'black'}
			onMouseEnter={(e) => unhideToolTip(e)}
			onMouseLeave={hideToolTip}
			className="nav-icon"
			onClick={onClick}
		>
			{showToolTip && text !== '' ? <ToolTip left={left} text={text} /> : null}
			<Styled.SVG src={`/svg/${name}.svg`} />
		</Styled.SVGContainer>
	);
};

export default NavIcon;
