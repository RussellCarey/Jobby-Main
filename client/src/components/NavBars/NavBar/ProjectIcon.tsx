import React, { FunctionComponent, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import ToolTip from '../../Icon/ToolTip';
import { projectURLS } from '../../../utils/urls';

interface IProjectIcon {
	id: number;
	img: string;
	left: boolean;
	text: string;
	onClick?: MouseEventHandler;
}

const LinkDiv = styled.a`
	width: max-width;
	height: max-height;
	margin-bottom: 20px;
`;

const IconContainer = styled.div`
	position: relative;
	width: 30px;
	height: 30px;
`;

const IconImage = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 20%;
	cursor: pointer;
`;

const ProjectIcon: FunctionComponent<IProjectIcon> = ({ id, img, left, text, onClick = () => {} }) => {
	const [showToolTip, setShowToolTip] = useState<boolean>(false);

	const unhideToolTip = (e: React.MouseEvent) => {
		setShowToolTip(true);
	};

	const hideToolTip = () => {
		setShowToolTip(false);
	};

	return (
		<LinkDiv href={`/project/${id}`}>
			<IconContainer onMouseEnter={(e: React.MouseEvent) => unhideToolTip(e)} onMouseLeave={hideToolTip} className="nav-icon" onClick={onClick}>
				{showToolTip && text !== '' ? <ToolTip left={left} text={text} /> : null}
				<IconImage src={`${projectURLS.image}/${img}`} />
			</IconContainer>
		</LinkDiv>
	);
};

export default ProjectIcon;
