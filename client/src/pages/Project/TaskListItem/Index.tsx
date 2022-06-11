import { FunctionComponent } from 'react';
import { theme } from '../../../theme/theme';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';

interface ITaskListItemProps {
	url: string;
	title: string;
	priority: number | string;
}

const TaskListItem: FunctionComponent<ITaskListItemProps> = ({ url, title, priority }) => {
	const navigate = useNavigate();
	const setColor = () => {
		if (+priority === 0) return theme.colors.ui.brandLight;
		if (+priority === 1) return theme.colors.ui.orange;
		if (+priority === 2) return theme.colors.ui.red;
	};

	return (
		<Styled.ColorContainer color={setColor()} onClick={() => navigate(url)}>
			<Styled.Container>
				<Styled.TextContainer>
					<Styled.Text>{title}</Styled.Text>
				</Styled.TextContainer>
			</Styled.Container>
		</Styled.ColorContainer>
	);
};

export default TaskListItem;
