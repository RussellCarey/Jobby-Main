import { FunctionComponent } from 'react';
import { theme } from '../../../theme/theme';
import * as Styled from './styled';

interface ITaskListItemProps {
	url: string;
	title: string;
	priority: number | string;
}

const TaskListItem: FunctionComponent<ITaskListItemProps> = ({ url, title, priority }) => {
	const setColor = () => {
		if (+priority === 0) return theme.colors.ui.brandLight;
		if (+priority === 1) return theme.colors.ui.orange;
		if (+priority === 2) return theme.colors.ui.red;
	};

	return (
		<Styled.ColorContainer color={setColor()}>
			<Styled.Container>
				<Styled.TextContainer>
					<Styled.StyledLink to={url}>
						<Styled.Text>{title}</Styled.Text>
					</Styled.StyledLink>
				</Styled.TextContainer>
			</Styled.Container>
		</Styled.ColorContainer>
	);
};

export default TaskListItem;
