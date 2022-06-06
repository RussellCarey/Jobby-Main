import User from './UserEnt';
import Task from './TaskEnt';

//
export default interface Comment {
	id: number;
	comment: string;
	creator: User;
	creatorId: number;
	task: Task;
	taskId: number;
	created_at: number;
	deleted_at: number;
}
