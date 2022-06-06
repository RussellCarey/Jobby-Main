import React, { useState, useContext, FunctionComponent } from 'react';
import * as Styled from './styled';
import * as ModalStyled from '../../../../../styled/shared-modal-styles';
import { addComment } from '../../../services/dbServices';
import { useParams } from 'react-router-dom';
import ModalContext from '../../../../../context/modal/ModalContext';
import AuthContext from '../../../../../context/auth/AuthContext';
import MessagePopup from '../../../../../components/MessagePopup/Index';
import Loading from '../../../../../components/Loading/Index';
import CommentEnt from '../../../../../entities/CommentEnt';

interface ICommentForm {
	commentData: Array<CommentEnt>;
	setCommentData: React.Dispatch<React.SetStateAction<CommentEnt[]>>;
}

const CommentForm: FunctionComponent<ICommentForm> = ({ commentData, setCommentData }) => {
	const params = useParams();
	const { addMessageToModal } = useContext(ModalContext);
	const { userState } = useContext(AuthContext);
	const [comment, setComment] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showStatus, setShowStatus] = useState<boolean>(false);

	const onChangeHandler = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		setComment(target.value);
	};

	const submitComment = async (e: React.KeyboardEvent) => {
		if (isLoading) return;
		if (e.code !== 'Enter') return;
		if (comment.length < 1) return;

		setIsLoading(true);
		const newComment = await addComment(+params.taskid!, +params.projectid!, comment, userState.id);
		if (newComment.data.status !== 'success') return addMessageToModal('Could not submit comment. Please try again');
		setIsLoading(false);
		setCommentData([newComment.data.data, ...commentData]);
		addMessageToModal('Comment saved!', 'success');
		setComment('');
	};

	return (
		<Styled.Container>
			<ModalStyled.CapitalText>COMMENTS</ModalStyled.CapitalText>
			{isLoading ? <Loading /> : null}
			{showStatus ? <MessagePopup message={'Your comment has been submitted! Refresh to see it.'} setShow={setShowStatus} /> : null}
			<Styled.Form value={comment} onKeyPress={(e) => submitComment(e)} onChange={onChangeHandler} placeholder="Add a comment then press enter.." />
		</Styled.Container>
	);
};

export default CommentForm;
