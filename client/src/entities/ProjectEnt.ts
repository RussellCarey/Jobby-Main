import Task from './TaskEnt';
import User from './UserEnt';

export default interface Project {
	id: number;
	name: string;
	thumbnail: string;
	image: string;
	description: string;
	tasks: Task[];
	creator: User;
	creatorId: number;
	members: User[];
	created_at: number;
}
