import Task from './TaskEnt';
import User from './UserEnt';

export default interface Update {
	id: number;
	user: User;
	userId: number;
	type: number;
	task: Task;
	taskId: number;
	date: number;
	deleted_at: number;
}
