import { FunctionComponent, useState, useEffect, useContext } from 'react';
import { Styled } from './styled';
import { parseDate } from '../../utils/parseUtils';
import { CircleUserImage } from '../HeaderBar/styled';
import { projectURLS } from '../../utils/urls';
import AuthContext from '../../context/auth/AuthContext';

interface IComment {
	data: any;
	showID: boolean;
}

const Comment: FunctionComponent<IComment> = ({ data, showID }) => {
	const { userState } = useContext(AuthContext);
	const [image, setImage] = useState<string>();

	useEffect(() => {
		const image = data.user_thumbnail ? `${projectURLS.image}/${data.user_thumbnail}` : '/images/unknown-user.png';
		if (userState.username === data.user_username) setImage(userState.thumbnail);
		setImage(image);
	}, [data]);

	return (
		<Styled.CommentContainer>
			<Styled.TopSection>
				{/* Usser Image*/}
				<CircleUserImage src={image} size={'35px'} />

				{/* Comment data */}
				<Styled.TextContainer>
					<Styled.NameText>{data.user_username}</Styled.NameText>
					{!showID ? <Styled.DateText>{parseDate(+data.comments_created_at)}</Styled.DateText> : null}
					{showID ? (
						<Styled.TaskText>
							{parseDate(+data.comments_created_at)} - Commented on task #{data.comments_taskId}
						</Styled.TaskText>
					) : null}
				</Styled.TextContainer>
			</Styled.TopSection>

			{/*Comment */}
			<Styled.CommentBox>
				<Styled.CommentText>{data.comments_comment}</Styled.CommentText>
			</Styled.CommentBox>
		</Styled.CommentContainer>
	);
};

export default Comment;
