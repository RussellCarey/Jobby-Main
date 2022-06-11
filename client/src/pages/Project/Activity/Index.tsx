import { FunctionComponent } from 'react';
import { ActivityContainer } from './styled';
import Comment from '../../../components/Comment/Index';
// import Calendar from '../Calendar/Index';

interface IActivityBar {
	// Is a res from the server that is raw. Not the comment schema.
	comments: Array<any>;
}

const ActivitySide: FunctionComponent<IActivityBar> = ({ comments }) => {
	return (
		<ActivityContainer>
			{/* <Calendar /> */}
			<p>
				<b>Comments</b>
			</p>
			{comments && comments.length > 1
				? comments.map((c: any) => {
						return <Comment key={c.comments_id} data={c} showID={true} />;
				  })
				: null}
		</ActivityContainer>
	);
};

export default ActivitySide;
